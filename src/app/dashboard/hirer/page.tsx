import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import HirerDashboardClient from "./HirerDashboardClient";

export default async function HirerDashboardPage() {
  let session;
  try {
    session = await getServerSession(authOptions);
  } catch (e) {
    return <div className="text-red-500">Failed to load session. Please refresh.</div>;
  }
  if (!session || session.user.role !== "HIRER") {
    redirect("/not-authorized");
  }
  let user;
  try {
    user = await prisma.user.findUnique({
      where: { id: session.user.id },
      include: { hirerProfile: true },
    });
  } catch (e) {
    return <div className="text-red-500">Failed to load user. Please try again later.</div>;
  }
  if (!user) {
    redirect("/auth/login");
  }
  let stats = {};
  try {
    stats = {
      applications: await prisma.application.count({ where: { job: { hirerId: user.id } } }),
      jobs: await prisma.jobPosting.count({ where: { hirerId: user.id } }),
      messages: await prisma.message.count({ OR: [ { senderId: user.id }, { receiverId: user.id } ] }),
      events: await prisma.event.count({ organizerId: user.id }),
    };
  } catch (e) {
    return <div className="text-red-500">Failed to load stats. Please try again later.</div>;
  }
  return <HirerDashboardClient user={user} stats={stats} userId={user.id} />;
} 