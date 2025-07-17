import { NextRequest, NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"
import { getServerSession } from "next-auth"
import { authOptions } from "@/lib/auth"

export async function GET(
  req: NextRequest,
  { params }: { params: { threadId: string } }
) {
  try {
    const thread = await prisma.forumThread.findUnique({
      where: { id: params.threadId },
      include: {
        author: { select: { name: true, image: true } },
        replies: {
          include: {
            author: { select: { name: true, image: true } },
          },
          orderBy: { createdAt: "asc" },
        },
      },
    })
    if (!thread) {
      return NextResponse.json({ error: "Thread not found" }, { status: 404 })
    }
    return NextResponse.json(thread)
  } catch (error) {
    console.error("Error fetching forum thread:", error)
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 })
  }
}

export async function POST(
  req: NextRequest,
  { params }: { params: { threadId: string } }
) {
  try {
    const session = await getServerSession(authOptions)
    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }
    const body = await req.json()
    const { content } = body
    const reply = await prisma.forumReply.create({
      data: {
        content,
        threadId: params.threadId,
        authorId: session.user.id,
      },
      include: {
        author: { select: { name: true, image: true } },
      },
    })
    return NextResponse.json(reply, { status: 201 })
  } catch (error) {
    console.error("Error creating forum reply:", error)
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 })
  }
}

export async function DELETE(
  req: NextRequest,
  { params }: { params: { threadId: string } }
) {
  try {
    const session = await getServerSession(authOptions)
    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }
    const thread = await prisma.forumThread.findUnique({
      where: { id: params.threadId },
    })
    if (!thread) {
      return NextResponse.json({ error: "Thread not found" }, { status: 404 })
    }
    if (thread.authorId !== session.user.id && session.user.role !== "ADMIN") {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }
    await prisma.forumThread.delete({ where: { id: params.threadId } })
    return NextResponse.json({ message: "Thread deleted successfully" })
  } catch (error) {
    console.error("Error deleting forum thread:", error)
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 })
  }
} 