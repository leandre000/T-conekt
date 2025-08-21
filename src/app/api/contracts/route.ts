import { NextRequest, NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"
import { getServerSession } from "next-auth"
import { authOptions } from "@/lib/auth"
import { ContractStatus } from "@prisma/client"

export async function POST(req: NextRequest) {
  try {
    const session = await getServerSession(authOptions)
    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }
    const body = await req.json()
    const { jobId, talentId, terms, startDate, endDate, paymentAmount } = body
    // Get hirer profile ID
    const hirerProfile = await prisma.hirerProfile.findUnique({
      where: { userId: session.user.id }
    });
    
    if (!hirerProfile) {
      return NextResponse.json({ error: "Hirer profile not found" }, { status: 404 });
    }

    const contract = await prisma.contract.create({
      data: {
        jobId,
        talentId,
        hirerId: hirerProfile.id,
        terms,
        startDate: new Date(startDate),
        endDate: new Date(endDate),
        paymentAmount,
        status: "DRAFT" as ContractStatus,
      },
      include: {
        job: { select: { title: true } },
        talent: { 
          select: { 
            user: { select: { firstName: true, lastName: true } }
          } 
        },
        hirer: { 
          select: { 
            user: { select: { firstName: true, lastName: true } }
          } 
        },
      },
    })
    return NextResponse.json(contract, { status: 201 })
  } catch (error) {
    console.error("Error creating contract:", error)
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 })
  }
}

export async function GET(req: NextRequest) {
  try {
    const session = await getServerSession(authOptions)
    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }
    const { searchParams } = new URL(req.url)
    const status = searchParams.get("status")
    const page = parseInt(searchParams.get("page") || "1")
    const limit = parseInt(searchParams.get("limit") || "10")
    // Get user's profile ID
    let profileId: string | undefined;
    if (session.user.role === "TALENT") {
      const talentProfile = await prisma.talentProfile.findUnique({
        where: { userId: session.user.id }
      });
      profileId = talentProfile?.id;
    } else if (session.user.role === "HIRER") {
      const hirerProfile = await prisma.hirerProfile.findUnique({
        where: { userId: session.user.id }
      });
      profileId = hirerProfile?.id;
    }

    const where = {
      ...(session.user.role === "TALENT" && profileId && { talentId: profileId }),
      ...(session.user.role === "HIRER" && profileId && { hirerId: profileId }),
      ...(status && { status: status as ContractStatus }),
    }
    const [contracts, total] = await Promise.all([
      prisma.contract.findMany({
        where,
        include: {
          job: { select: { title: true } },
          talent: { 
            select: { 
              user: { select: { firstName: true, lastName: true } }
            } 
          },
          hirer: { 
            select: { 
              user: { select: { firstName: true, lastName: true } }
            } 
          },
        },
        orderBy: { createdAt: "desc" },
        skip: (page - 1) * limit,
        take: limit,
      }),
      prisma.contract.count({ where }),
    ])
    return NextResponse.json({
      contracts,
      total,
      page,
      totalPages: Math.ceil(total / limit),
    })
  } catch (error) {
    console.error("Error fetching contracts:", error)
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 })
  }
} 