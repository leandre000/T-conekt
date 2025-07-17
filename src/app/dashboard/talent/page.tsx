import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import TalentDashboardClient from "./TalentDashboardClient";

export default async function TalentDashboardPage() {
  const session = await getServerSession(authOptions);
  if (!session || session.user.role !== "TALENT") {
    redirect("/not-authorized");
  }
  let user;
  try {
    user = await prisma.user.findUnique({
      where: { id: session.user.id },
      include: { talentProfile: true },
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
      applications: await prisma.application.count({ where: { talentId: user.id } }),
      jobs: await prisma.jobPosting.count({}),
      messages: await prisma.message.count({ OR: [ { senderId: user.id }, { receiverId: user.id } ] }),
      events: await prisma.event.count({ participants: { some: { id: user.id } } }),
    };
  } catch (e) {
    return <div className="text-red-500">Failed to load stats. Please try again later.</div>;
  }
  return <TalentDashboardClient user={user} stats={stats} userId={user.id} />;
} 