import { NextRequest, NextResponse } from "next/server"

export async function POST(req: NextRequest) {
  // If using NextAuth, this endpoint can redirect or return a message
  return NextResponse.json({ message: "Please use /api/auth/signin for login (NextAuth)" }, { status: 200 })
} 