import { NextRequest, NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"
import { getServerSession } from "next-auth"
import { authOptions } from "@/lib/auth"
import { emitNotificationToUser } from "@/pages/api/socket";

export async function GET(req: NextRequest) {
  try {
    const session = await getServerSession(authOptions)
    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }
    const { searchParams } = new URL(req.url)
    const page = parseInt(searchParams.get("page") || "1")
    const limit = parseInt(searchParams.get("limit") || "20")
    const [notifications, total] = await Promise.all([
      prisma.notification.findMany({
        where: { userId: session.user.id },
        orderBy: { createdAt: "desc" },
        skip: (page - 1) * limit,
        take: limit,
      }),
      prisma.notification.count({ where: { userId: session.user.id } }),
    ])
    return NextResponse.json({
      notifications,
      total,
      page,
      totalPages: Math.ceil(total / limit),
    })
  } catch (error) {
    console.error("Error fetching notifications:", error)
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 })
  }
}

// Example: Call this after creating a notification
export async function createAndEmitNotification(userId: string, message: string) {
  const notification = await prisma.notification.create({
    data: {
      userId,
      message,
      read: false,
    },
  });
  emitNotificationToUser(userId, notification);
  return notification;
}

export async function PATCH(req: NextRequest) {
  try {
    const session = await getServerSession(authOptions)
    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }
    const body = await req.json()
    const { notificationIds } = body
    await prisma.notification.updateMany({
      where: {
        id: { in: notificationIds },
        userId: session.user.id,
      },
      data: { read: true },
    })
    return NextResponse.json({ message: "Notifications marked as read" })
  } catch (error) {
    console.error("Error updating notifications:", error)
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
    const notificationId = searchParams.get("notificationId")
    if (notificationId) {
      await prisma.notification.delete({
        where: { id: notificationId, userId: session.user.id },
      })
    } else {
      await prisma.notification.deleteMany({
        where: { userId: session.user.id },
      })
    }
    return NextResponse.json({ message: "Notifications deleted successfully" })
  } catch (error) {
    console.error("Error deleting notifications:", error)
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 })
  }
} 