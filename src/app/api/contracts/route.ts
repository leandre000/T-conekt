import { NextRequest, NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"
import { getServerSession } from "next-auth"
import { authOptions } from "@/lib/auth"

export async function POST(req: NextRequest) {
  try {
    const session = await getServerSession(authOptions)
    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }
    const body = await req.json()
    const { jobId, talentId, terms, startDate, endDate, paymentAmount } = body
    const contract = await prisma.contract.create({
      data: {
        jobId,
        talentId,
        hirerId: session.user.id,
        terms,
        startDate: new Date(startDate),
        endDate: new Date(endDate),
        paymentAmount,
        status: "PENDING",
      },
      include: {
        job: { select: { title: true } },
        talent: { select: { name: true } },
        hirer: { select: { name: true } },
      },
    })
    return NextResponse.json(contract, { status: 201 })
  } catch (error) {
    console.error("Error creating contract:", error)
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
      ...(session.user.role === "HIRER" && { hirerId: session.user.id }),
      ...(status && { status }),
    }
    const [contracts, total] = await Promise.all([
      prisma.contract.findMany({
        where,
        include: {
          job: { select: { title: true } },
          talent: { select: { name: true } },
          hirer: { select: { name: true } },
        },
        orderBy: { createdAt: "desc" },
        skip: (page - 1) * limit,
        take: limit,
      }),
      prisma.contract.count({ where }),
    ])
    return NextResponse.json({
      contracts,
      total,
      page,
      totalPages: Math.ceil(total / limit),
    })
  } catch (error) {
    console.error("Error fetching contracts:", error)
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 })
  }
} 