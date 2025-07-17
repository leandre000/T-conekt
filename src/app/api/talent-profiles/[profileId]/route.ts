import { prisma } from "@/src/lib/prisma"
import { getServerSession } from "next-auth"
import { authOptions } from "@/src/app/api/auth/[...nextauth]/route"
import { NextRequest, NextResponse } from "next/server"

export async function GET(req: NextRequest, { params }: { params: { profileId: string } }) {
  const { profileId } = params
  try {
    const profile = await prisma.talentProfile.findUnique({
      where: { id: profileId },
      include: { user: { select: { firstName: true, lastName: true, email: true } } },
    })
    if (!profile) return NextResponse.json({ error: "Profile not found" }, { status: 404 })
    return NextResponse.json(profile, { status: 200 })
  } catch (error) {
    return NextResponse.json({ error: "Failed to fetch profile" }, { status: 500 })
  }
}

export async function PUT(req: NextRequest, { params }: { params: { profileId: string } }) {
  const session = await getServerSession(authOptions)
  if (!session || !session.user?.email) {
    return NextResponse.json({ error: "Not authenticated" }, { status: 401 })
  }
  const { profileId } = params
  try {
    const user = await prisma.user.findUnique({ where: { email: session.user.email } })
    if (!user) return NextResponse.json({ error: "User not found" }, { status: 404 })
    const profile = await prisma.talentProfile.findUnique({ where: { id: profileId } })
    if (!profile || profile.userId !== user.id) {
      return NextResponse.json({ error: "Not authorized" }, { status: 403 })
    }
    const data = await req.json()
    const updated = await prisma.talentProfile.update({ where: { id: profileId }, data })
    return NextResponse.json(updated, { status: 200 })
  } catch (error) {
    return NextResponse.json({ error: "Failed to update profile" }, { status: 500 })
  }
} 