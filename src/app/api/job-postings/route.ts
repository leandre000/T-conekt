import { NextRequest, NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"
import { getServerSession } from "next-auth"
import { authOptions } from "@/lib/auth"
import { JobType } from "@prisma/client"

export async function POST(req: NextRequest) {
  try {
    const session = await getServerSession(authOptions)
    if (!session || session.user.role !== "HIRER") {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const body = await req.json()
    const { title, description, skillsRequired, budget, jobType, location, deadline } = body

    // Get hirer profile ID
    const hirerProfile = await prisma.hirerProfile.findUnique({
      where: { userId: session.user.id }
    });
    
    if (!hirerProfile) {
      return NextResponse.json({ error: "Hirer profile not found" }, { status: 404 });
    }

    const jobPosting = await prisma.jobPosting.create({
      data: {
        title,
        description,
        skillsRequired,
        budget,
        jobType: jobType as JobType,
        location,
        deadline: deadline ? new Date(deadline) : null,
        hirerId: hirerProfile.id,
      },
    })

    return NextResponse.json(jobPosting, { status: 201 })
  } catch (error) {
    console.error("Error creating job posting:", error)
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 })
  }
}

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url)
    const skills = searchParams.get("skills")?.split(",")
    const location = searchParams.get("location")
    const jobType = searchParams.get("jobType")
    const minBudget = searchParams.get("minBudget")
    const maxBudget = searchParams.get("maxBudget")
    const page = parseInt(searchParams.get("page") || "1")
    const limit = parseInt(searchParams.get("limit") || "10")

    const where = {
      ...(skills && { skillsRequired: { hasSome: skills } }),
      ...(location && { location }),
      ...(jobType && { jobType: jobType as JobType }),
      ...(minBudget && { budget: { gte: parseFloat(minBudget) } }),
      ...(maxBudget && { budget: { lte: parseFloat(maxBudget) } }),
    }

    const [jobPostings, total] = await Promise.all([
      prisma.jobPosting.findMany({
        where,
        skip: (page - 1) * limit,
        take: limit,
        include: {
          hirer: {
            select: {
              companyName: true,
              location: true,
            },
          },
        },
        orderBy: { createdAt: "desc" },
      }),
      prisma.jobPosting.count({ where }),
    ])

    return NextResponse.json({
      jobPostings,
      total,
      page,
      totalPages: Math.ceil(total / limit),
    })
  } catch (error) {
    console.error("Error fetching job postings:", error)
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 })
  }
} 