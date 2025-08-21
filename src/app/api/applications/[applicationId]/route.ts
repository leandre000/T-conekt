import { NextRequest, NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"
import { getServerSession } from "next-auth"
import { authOptions } from "@/lib/auth"

export async function GET(
  req: NextRequest,
  { params }: { params: { applicationId: string } }
) {
  try {
    const session = await getServerSession(authOptions)
    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const application = await prisma.application.findUnique({
      where: { id: params.applicationId },
      include: {
        job: {
          select: {
            title: true,
            description: true,
            skillsRequired: true,
            budget: true,
            jobType: true,
            location: true,
            deadline: true,
            hirer: {
              select: {
                id: true,
                companyName: true,
                description: true,
                location: true,
              },
            },
          },
        },
        talent: {
          select: {
            bio: true,
            skills: true,
            location: true,
            ratePerHour: true,
            portfolio: true,
          },
        },
      },
    })

    if (!application) {
      return NextResponse.json({ error: "Application not found" }, { status: 404 })
    }

    // Check if user has permission to view this application
    if (
      session.user.role !== "ADMIN" &&
      session.user.id !== application.talentId &&
      session.user.id !== application.job.hirer.id
    ) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    return NextResponse.json(application)
  } catch (error) {
    console.error("Error fetching application:", error)
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 })
  }
}

export async function PATCH(
  req: NextRequest,
  { params }: { params: { applicationId: string } }
) {
  try {
    const session = await getServerSession(authOptions)
    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const application = await prisma.application.findUnique({
      where: { id: params.applicationId },
      include: {
        job: {
          select: {
            hirerId: true,
          },
        },
      },
    })

    if (!application) {
      return NextResponse.json({ error: "Application not found" }, { status: 404 })
    }

    // Only hirer can update application status
    if (session.user.id !== application.job.hirerId) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const body = await req.json()
    const { status } = body

    const updatedApplication = await prisma.application.update({
      where: { id: params.applicationId },
      data: {
        status,
      },
      include: {
        job: {
          select: {
            title: true,
            hirer: {
              select: {
                companyName: true,
              },
            },
          },
        },
        talent: {
          select: {
            bio: true,
            skills: true,
            location: true,
            ratePerHour: true,
          },
        },
      },
    })

    return NextResponse.json(updatedApplication)
  } catch (error) {
    console.error("Error updating application:", error)
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 })
  }
}

export async function DELETE(
  req: NextRequest,
  { params }: { params: { applicationId: string } }
) {
  try {
    const session = await getServerSession(authOptions)
    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const application = await prisma.application.findUnique({
      where: { id: params.applicationId },
    })

    if (!application) {
      return NextResponse.json({ error: "Application not found" }, { status: 404 })
    }

    // Only talent can withdraw their application
    if (session.user.id !== application.talentId) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    await prisma.application.delete({
      where: { id: params.applicationId },
    })

    return NextResponse.json({ message: "Application withdrawn successfully" })
  } catch (error) {
    console.error("Error deleting application:", error)
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 })
  }
} 