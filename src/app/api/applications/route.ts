import { NextRequest, NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"
import { getServerSession } from "next-auth"
import { authOptions } from "@/lib/auth"
import { ApplicationStatus } from "@prisma/client"

export async function POST(req: NextRequest) {
  try {
    const session = await getServerSession(authOptions)
    if (!session || session.user.role !== "TALENT") {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const body = await req.json()
    const { jobId, coverLetter } = body

    // Check if job exists
    const job = await prisma.jobPosting.findUnique({
      where: { id: jobId },
    })

    if (!job) {
      return NextResponse.json({ error: "Job not found" }, { status: 404 })
    }

    // Check if talent already applied
    const existingApplication = await prisma.application.findFirst({
      where: {
        jobId,
        talentId: session.user.id,
      },
    })

    if (existingApplication) {
      return NextResponse.json(
        { error: "You have already applied for this job" },
        { status: 400 }
      )
    }

    const application = await prisma.application.create({
      data: {
        jobId,
        talentId: session.user.id,
        coverLetter,
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
      },
    })

    return NextResponse.json(application, { status: 201 })
  } catch (error) {
    console.error("Error creating application:", error)
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 })
  }
}

export async function GET(req: NextRequest) {
  try {
    const session = await getServerSession(authOptions)
    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const { searchParams } = new URL(req.url)
    const status = searchParams.get("status")
    const page = parseInt(searchParams.get("page") || "1")
    const limit = parseInt(searchParams.get("limit") || "10")

    const where = {
      ...(session.user.role === "TALENT" && { talentId: session.user.id }),
      ...(session.user.role === "HIRER" && {
        job: { hirerId: session.user.id },
      }),
      ...(status && { status: status as ApplicationStatus }),
    }

    const [applications, total] = await Promise.all([
      prisma.application.findMany({
        where,
        skip: (page - 1) * limit,
        take: limit,
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
        orderBy: { createdAt: "desc" },
      }),
      prisma.application.count({ where }),
    ])

    return NextResponse.json({
      applications,
      total,
      page,
      totalPages: Math.ceil(total / limit),
    })
  } catch (error) {
    console.error("Error fetching applications:", error)
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 })
  }
} 
 