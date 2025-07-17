import { NextRequest, NextResponse } from "next/server"

export async function POST(req: NextRequest) {
  // TODO: Create talent profile
  return NextResponse.json({ message: "Create talent profile" }, { status: 201 })
}

export async function GET(req: NextRequest) {
  // TODO: Search/filter talent profiles
  return NextResponse.json({ message: "List talent profiles" }, { status: 200 })
} 