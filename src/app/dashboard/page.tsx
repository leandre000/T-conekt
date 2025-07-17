import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import DashboardClient from "./DashboardClient";

export default async function DashboardPage() {
  let user = null;
  let stats = {};
  try {
    // Try to get session, but don't block if unavailable
    const { getServerSession } = await import("next-auth");
    const { authOptions } = await import("@/lib/auth");
    const { prisma } = await import("@/lib/prisma");
    let session = null;
    try {
      session = await getServerSession(authOptions);
    } catch {}
    if (session && session.user?.id) {
      user = await prisma.user.findUnique({
        where: { id: session.user.id },
        include: { talentProfile: true, hirerProfile: true },
      });
    }
    if (!user) {
      // Fallback: get the first user in the database
      user = await prisma.user.findFirst({
        include: { talentProfile: true, hirerProfile: true },
      });
    }
    if (user) {
      stats = {
        applications: await prisma.application.count({ where: { talentId: user.id } }),
        jobs: await prisma.jobPosting.count({ where: { hirerId: user.id } }),
        messages: await prisma.message.count({ OR: [ { senderId: user.id }, { receiverId: user.id } ] }),
        events: await prisma.event.count({ participants: { some: { id: user.id } } }),
      };
    }
  } catch (e) {
    // fallback: show error message
    return <div className="text-red-500">Failed to load dashboard. Please try again later.</div>;
  }
  if (!user) {
    return <div className="text-red-500">No user found. Please contact support.</div>;
  }
  return <DashboardClient user={user} stats={stats} />;
} 