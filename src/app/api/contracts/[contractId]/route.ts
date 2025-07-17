import { NextRequest, NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"
import { getServerSession } from "next-auth"
import { authOptions } from "@/lib/auth"

export async function GET(
  req: NextRequest,
  { params }: { params: { contractId: string } }
) {
  try {
    const session = await getServerSession(authOptions)
    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }
    const contract = await prisma.contract.findUnique({
      where: { id: params.contractId },
      include: {
        job: { select: { title: true } },
        talent: { select: { name: true } },
        hirer: { select: { name: true } },
      },
    })
    if (!contract) {
      return NextResponse.json({ error: "Contract not found" }, { status: 404 })
    }
    if (
      contract.talentId !== session.user.id &&
      contract.hirerId !== session.user.id &&
      session.user.role !== "ADMIN"
    ) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }
    return NextResponse.json(contract)
  } catch (error) {
    console.error("Error fetching contract:", error)
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 })
  }
}

export async function PATCH(
  req: NextRequest,
  { params }: { params: { contractId: string } }
) {
  try {
    const session = await getServerSession(authOptions)
    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }
    const contract = await prisma.contract.findUnique({
      where: { id: params.contractId },
    })
    if (!contract) {
      return NextResponse.json({ error: "Contract not found" }, { status: 404 })
    }
    if (
      contract.talentId !== session.user.id &&
      contract.hirerId !== session.user.id &&
      session.user.role !== "ADMIN"
    ) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }
    const body = await req.json()
    const { status, terms, startDate, endDate, paymentAmount } = body
    const updatedContract = await prisma.contract.update({
      where: { id: params.contractId },
      data: {
        status,
        terms,
        startDate: startDate ? new Date(startDate) : undefined,
        endDate: endDate ? new Date(endDate) : undefined,
        paymentAmount,
      },
      include: {
        job: { select: { title: true } },
        talent: { select: { name: true } },
        hirer: { select: { name: true } },
      },
    })
    return NextResponse.json(updatedContract)
  } catch (error) {
    console.error("Error updating contract:", error)
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 })
  }
}

export async function DELETE(
  req: NextRequest,
  { params }: { params: { contractId: string } }
) {
  try {
    const session = await getServerSession(authOptions)
    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }
    const contract = await prisma.contract.findUnique({
      where: { id: params.contractId },
    })
    if (!contract) {
      return NextResponse.json({ error: "Contract not found" }, { status: 404 })
    }
    if (
      contract.talentId !== session.user.id &&
      contract.hirerId !== session.user.id &&
      session.user.role !== "ADMIN"
    ) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }
    await prisma.contract.delete({ where: { id: params.contractId } })
    return NextResponse.json({ message: "Contract deleted successfully" })
  } catch (error) {
    console.error("Error deleting contract:", error)
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 })
  }
} 