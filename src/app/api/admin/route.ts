import { NextRequest, NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"
import { getServerSession } from "next-auth"
import { authOptions } from "@/lib/auth"

export async function GET(req: NextRequest) {
  try {
    const session = await getServerSession(authOptions)
    if (!session || !session.user || session.user.role !== "ADMIN") {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const { searchParams } = new URL(req.url)
    const entity = searchParams.get("entity")
    const page = parseInt(searchParams.get("page") || "1")
    const limit = parseInt(searchParams.get("limit") || "20")

    let data = []
    let total = 0
    if (entity === "users") {
      [data, total] = await Promise.all([
        prisma.user.findMany({
          skip: (page - 1) * limit,
          take: limit,
          orderBy: { createdAt: "desc" },
        }),
        prisma.user.count(),
      ])
    } else if (entity === "jobs") {
      [data, total] = await Promise.all([
        prisma.jobPosting.findMany({
          skip: (page - 1) * limit,
          take: limit,
          orderBy: { createdAt: "desc" },
        }),
        prisma.jobPosting.count(),
      ])
    } else {
      return NextResponse.json({ error: "Invalid entity" }, { status: 400 })
    }

    return NextResponse.json({
      data,
      total,
      page,
      totalPages: Math.ceil(total / limit),
    })
  } catch (error) {
    console.error("Error in admin GET:", error)
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 })
  }
}

export async function DELETE(req: NextRequest) {
  try {
    const session = await getServerSession(authOptions)
    if (!session || !session.user || session.user.role !== "ADMIN") {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const { searchParams } = new URL(req.url)
    const entity = searchParams.get("entity")
    const id = searchParams.get("id")

    if (!entity || !id) {
      return NextResponse.json({ error: "Entity and ID required" }, { status: 400 })
    }

    if (entity === "users") {
      await prisma.user.delete({ where: { id } })
    } else if (entity === "jobs") {
      await prisma.jobPosting.delete({ where: { id } })
    } else {
      return NextResponse.json({ error: "Invalid entity" }, { status: 400 })
    }

    return NextResponse.json({ message: "Deleted successfully" })
  } catch (error) {
    console.error("Error in admin DELETE:", error)
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 })
  }
} 