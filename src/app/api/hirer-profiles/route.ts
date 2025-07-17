import { prisma } from "@/src/lib/prisma"
import { getServerSession } from "next-auth"
import { authOptions } from "@/src/app/api/auth/[...nextauth]/route"
import { NextRequest, NextResponse } from "next/server"

export async function POST(req: NextRequest) {
  const session = await getServerSession(authOptions)
  if (!session || !session.user?.email) {
    return NextResponse.json({ error: "Not authenticated" }, { status: 401 })
  }
  try {
    const data = await req.json()
    const user = await prisma.user.findUnique({ where: { email: session.user.email } })
    if (!user) return NextResponse.json({ error: "User not found" }, { status: 404 })
    const profile = await prisma.hirerProfile.create({
      data: {
        userId: user.id,
        ...data,
      },
    })
    return NextResponse.json(profile, { status: 201 })
  } catch (error) {
    return NextResponse.json({ error: "Failed to create profile" }, { status: 500 })
  }
}

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url)
    const industry = searchParams.get("industry")
    const where = industry ? { industry } : {}
    const profiles = await prisma.hirerProfile.findMany({
      where,
      include: { user: { select: { firstName: true, lastName: true, email: true } } },
    })
    return NextResponse.json(profiles, { status: 200 })
  } catch (error) {
    return NextResponse.json({ error: "Failed to fetch profiles" }, { status: 500 })
  }
} 