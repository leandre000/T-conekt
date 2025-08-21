import { NextRequest, NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"
import { getServerSession } from "next-auth"
import { authOptions } from "@/lib/auth"

export async function POST(req: NextRequest) {
  try {
    const session = await getServerSession(authOptions);
    if (!session || !session.user?.id) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }
    const body = await req.json();
    const { title, content, category } = body;
    if (!title || !content) {
      return NextResponse.json({ error: "Title and content are required." }, { status: 400 });
    }
    const thread = await prisma.forumThread.create({
      data: {
        title,
        content,
        category: category || "GENERAL",
        authorId: session.user.id,
      },
      include: {
        author: {
          select: { firstName: true, lastName: true, email: true },
        },
      },
    });
    return NextResponse.json(thread, { status: 201 });
  } catch (error) {
    console.error("Error creating forum thread:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url)
    const category = searchParams.get("category")
    const page = parseInt(searchParams.get("page") || "1")
    const limit = parseInt(searchParams.get("limit") || "10")
    const search = searchParams.get("search") || ""
    const where = {
      ...(category && { category }),
      ...(search && {
        OR: [
          { title: { contains: search, mode: "insensitive" as const } },
          { content: { contains: search, mode: "insensitive" as const } },
        ],
      }),
    }
    const [threads, total] = await Promise.all([
      prisma.forumThread.findMany({
        where,
        include: {
          author: { select: { firstName: true, lastName: true, email: true } },
          _count: { select: { replies: true } },
        },
        orderBy: { createdAt: "desc" },
        skip: (page - 1) * limit,
        take: limit,
      }),
      prisma.forumThread.count({ where }),
    ])
    return NextResponse.json({
      threads,
      total,
      page,
      totalPages: Math.ceil(total / limit),
    })
  } catch (error) {
    console.error("Error fetching forum threads:", error)
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 })
  }
} 