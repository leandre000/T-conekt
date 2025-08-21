import { NextRequest, NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"
import { getServerSession } from "next-auth"
import { authOptions } from "@/lib/auth"

export async function POST(req: NextRequest) {
  try {
    const session = await getServerSession(authOptions)
    if (!session || session.user.role !== "HIRER") {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const body = await req.json()
    const { reviewedId, score, comment } = body

    // Check if reviewed user exists
    const reviewedUser = await prisma.user.findUnique({
      where: { id: reviewedId },
    })

    if (!reviewedUser) {
      return NextResponse.json({ error: "User not found" }, { status: 404 })
    }

    // Check if reviewer has already reviewed this user
    const existingReview = await prisma.review.findFirst({
      where: {
        reviewerId: session.user.id,
        reviewedId,
      },
    })

    if (existingReview) {
      return NextResponse.json(
        { error: "You have already reviewed this user" },
        { status: 400 }
      )
    }

    const review = await prisma.review.create({
      data: {
        reviewerId: session.user.id,
        reviewedId,
        score,
        comment,
      },
      include: {
        reviewer: {
          select: {
            firstName: true,
            lastName: true,
            email: true,
          },
        },
      },
    })

    return NextResponse.json(review, { status: 201 })
  } catch (error) {
    console.error("Error creating review:", error)
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 })
  }
}

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url)
    const reviewedId = searchParams.get("reviewedId")
    const page = parseInt(searchParams.get("page") || "1")
    const limit = parseInt(searchParams.get("limit") || "10")

    if (!reviewedId) {
      return NextResponse.json(
        { error: "Reviewed user ID is required" },
        { status: 400 }
      )
    }

    const [reviews, total] = await Promise.all([
      prisma.review.findMany({
        where: { reviewedId },
        skip: (page - 1) * limit,
        take: limit,
        include: {
          reviewer: {
            select: {
              firstName: true,
              lastName: true,
              email: true,
            },
          },
        },
        orderBy: { createdAt: "desc" },
      }),
      prisma.review.count({ where: { reviewedId } }),
    ])

    // Calculate average score
    const averageScore =
      reviews.reduce((acc, review) => acc + review.score, 0) / reviews.length

    return NextResponse.json({
      reviews,
      total,
      page,
      totalPages: Math.ceil(total / limit),
      averageScore: isNaN(averageScore) ? 0 : averageScore,
    })
  } catch (error) {
    console.error("Error fetching reviews:", error)
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 })
  }
} 