import { NextRequest, NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"
import { getServerSession } from "next-auth"
import { authOptions } from "@/lib/auth"

export async function GET(
  req: NextRequest,
  { params }: { params: { jobId: string } }
) {
  try {
    const jobPosting = await prisma.jobPosting.findUnique({
      where: { id: params.jobId },
      include: {
        hirer: {
          select: {
            companyName: true,
            location: true,
            description: true,
            websiteUrl: true,
          },
        },
        applications: {
          select: {
            id: true,
            status: true,
            createdAt: true,
            talent: {
              select: {
                id: true,
                bio: true,
                skills: true,
                location: true,
                ratePerHour: true,
              },
            },
          },
        },
      },
    })

    if (!jobPosting) {
      return NextResponse.json({ error: "Job posting not found" }, { status: 404 })
    }

    return NextResponse.json(jobPosting)
  } catch (error) {
    console.error("Error fetching job posting:", error)
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 })
  }
}

export async function PUT(
  req: NextRequest,
  { params }: { params: { jobId: string } }
) {
  try {
    const session = await getServerSession(authOptions)
    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const jobPosting = await prisma.jobPosting.findUnique({
      where: { id: params.jobId },
    })

    if (!jobPosting) {
      return NextResponse.json({ error: "Job posting not found" }, { status: 404 })
    }

    if (jobPosting.hirerId !== session.user.id && session.user.role !== "ADMIN") {
      return NextResponse.json({ error: "Forbidden" }, { status: 403 })
    }

    const body = await req.json()
    const { title, description, skillsRequired, budget, jobType, location, deadline } = body

    const updatedJobPosting = await prisma.jobPosting.update({
      where: { id: params.jobId },
      data: {
        title,
        description,
        skillsRequired,
        budget,
        jobType,
        location,
        deadline: deadline ? new Date(deadline) : null,
      },
    })

    return NextResponse.json(updatedJobPosting)
  } catch (error) {
    console.error("Error updating job posting:", error)
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 })
  }
}

export async function DELETE(
  req: NextRequest,
  { params }: { params: { jobId: string } }
) {
  try {
    const session = await getServerSession(authOptions)
    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const jobPosting = await prisma.jobPosting.findUnique({
      where: { id: params.jobId },
    })

    if (!jobPosting) {
      return NextResponse.json({ error: "Job posting not found" }, { status: 404 })
    }

    if (jobPosting.hirerId !== session.user.id && session.user.role !== "ADMIN") {
      return NextResponse.json({ error: "Forbidden" }, { status: 403 })
    }

    await prisma.jobPosting.delete({
      where: { id: params.jobId },
    })

    return NextResponse.json({ message: "Job posting deleted successfully" })
  } catch (error) {
    console.error("Error deleting job posting:", error)
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 })
  }
} 