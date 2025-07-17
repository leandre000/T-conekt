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
    const { talentId, rating, comment } = body

    // Check if talent exists
    const talent = await prisma.talentProfile.findUnique({
      where: { userId: talentId },
    })

    if (!talent) {
      return NextResponse.json({ error: "Talent not found" }, { status: 404 })
    }

    // Check if hirer has already reviewed this talent
    const existingReview = await prisma.review.findFirst({
      where: {
        talentId,
        hirerId: session.user.id,
      },
    })

    if (existingReview) {
      return NextResponse.json(
        { error: "You have already reviewed this talent" },
        { status: 400 }
      )
    }

    const review = await prisma.review.create({
      data: {
        talentId,
        hirerId: session.user.id,
        rating,
        comment,
      },
      include: {
        hirer: {
          select: {
            companyName: true,
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
    const talentId = searchParams.get("talentId")
    const page = parseInt(searchParams.get("page") || "1")
    const limit = parseInt(searchParams.get("limit") || "10")

    if (!talentId) {
      return NextResponse.json(
        { error: "Talent ID is required" },
        { status: 400 }
      )
    }

    const [reviews, total] = await Promise.all([
      prisma.review.findMany({
        where: { talentId },
        skip: (page - 1) * limit,
        take: limit,
        include: {
          hirer: {
            select: {
              companyName: true,
              companyDescription: true,
              location: true,
            },
          },
        },
        orderBy: { createdAt: "desc" },
      }),
      prisma.review.count({ where: { talentId } }),
    ])

    // Calculate average rating
    const averageRating =
      reviews.reduce((acc, review) => acc + review.rating, 0) / reviews.length

    return NextResponse.json({
      reviews,
      total,
      page,
      totalPages: Math.ceil(total / limit),
      averageRating: isNaN(averageRating) ? 0 : averageRating,
    })
  } catch (error) {
    console.error("Error fetching reviews:", error)
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 })
  }
} 