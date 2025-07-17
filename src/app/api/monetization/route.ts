import { NextRequest, NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"
import { getServerSession } from "next-auth"
import { authOptions } from "@/lib/auth"
import Stripe from "stripe"

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: "2023-10-16",
})

export async function POST(req: NextRequest) {
  try {
    const session = await getServerSession(authOptions)
    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }
    const body = await req.json()
    const { planId } = body
    const user = await prisma.user.findUnique({
      where: { id: session.user.id },
    })
    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 404 })
    }
    const subscription = await prisma.subscription.create({
      data: {
        userId: session.user.id,
        planId,
        status: "PENDING",
      },
    })
    const paymentIntent = await stripe.paymentIntents.create({
      amount: 1000, // Example amount in cents
      currency: "usd",
      customer: user.stripeCustomerId,
      metadata: {
        subscriptionId: subscription.id,
      },
    })
    return NextResponse.json({ clientSecret: paymentIntent.client_secret })
  } catch (error) {
    console.error("Error creating payment:", error)
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 })
  }
}

export async function GET(req: NextRequest) {
  try {
    const session = await getServerSession(authOptions)
    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }
    const subscriptions = await prisma.subscription.findMany({
      where: { userId: session.user.id },
      include: { plan: true },
    })
    return NextResponse.json(subscriptions)
  } catch (error) {
    console.error("Error fetching subscriptions:", error)
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 })
  }
} 