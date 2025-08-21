import { NextRequest, NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"
import { getServerSession } from "next-auth"
import { authOptions } from "@/lib/auth"

export async function GET(req: NextRequest) {
  try {
    const session = await getServerSession(authOptions)
    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const { searchParams } = new URL(req.url)
    const page = parseInt(searchParams.get("page") || "1")
    const limit = parseInt(searchParams.get("limit") || "10")

    const [conversations, total] = await Promise.all([
      prisma.conversation.findMany({
        where: {
          OR: [
            { participant1Id: session.user.id },
            { participant2Id: session.user.id },
          ],
        },
        include: {
          participant1: {
            select: {
              id: true,
              firstName: true,
              lastName: true,
              email: true,
              role: true,
            },
          },
          participant2: {
            select: {
              id: true,
              firstName: true,
              lastName: true,
              email: true,
              role: true,
            },
          },
          messages: {
            take: 1,
            orderBy: { createdAt: "desc" },
            select: {
              content: true,
              createdAt: true,
              senderId: true,
            },
          },
        },
        orderBy: {
          updatedAt: "desc",
        },
        skip: (page - 1) * limit,
        take: limit,
      }),
      prisma.conversation.count({
        where: {
          OR: [
            { participant1Id: session.user.id },
            { participant2Id: session.user.id },
          ],
        },
      }),
    ])

    // Transform conversations to include unread count and last message
    const transformedConversations = await Promise.all(
      conversations.map(async (conversation) => {
        const otherParticipant =
          conversation.participant1Id === session.user.id
            ? conversation.participant2
            : conversation.participant1

        const unreadCount = await prisma.message.count({
          where: {
            conversationId: conversation.id,
            senderId: otherParticipant.id,
            read: false,
          },
        })

        return {
          id: conversation.id,
          otherParticipant,
          lastMessage: conversation.messages[0] || null,
          unreadCount,
          updatedAt: conversation.updatedAt,
        }
      })
    )

    return NextResponse.json({
      conversations: transformedConversations,
      total,
      page,
      totalPages: Math.ceil(total / limit),
    })
  } catch (error) {
    console.error("Error fetching conversations:", error)
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 })
  }
}

export async function DELETE(req: NextRequest) {
  try {
    const session = await getServerSession(authOptions)
    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const { searchParams } = new URL(req.url)
    const conversationId = searchParams.get("conversationId")

    if (!conversationId) {
      return NextResponse.json(
        { error: "Conversation ID is required" },
        { status: 400 }
      )
    }

    const conversation = await prisma.conversation.findUnique({
      where: { id: conversationId },
    })

    if (!conversation) {
      return NextResponse.json(
        { error: "Conversation not found" },
        { status: 404 }
      )
    }

    if (
      conversation.participant1Id !== session.user.id &&
      conversation.participant2Id !== session.user.id
    ) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    // Delete all messages in the conversation
    await prisma.message.deleteMany({
      where: { conversationId },
    })

    // Delete the conversation
    await prisma.conversation.delete({
      where: { id: conversationId },
    })

    return NextResponse.json({ message: "Conversation deleted successfully" })
  } catch (error) {
    console.error("Error deleting conversation:", error)
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 })
  }
} 