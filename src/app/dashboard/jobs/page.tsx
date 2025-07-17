import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import JobsDashboardClient from "./JobsDashboardClient";

export default async function JobsPage() {
  let session;
  try {
    session = await getServerSession(authOptions);
  } catch (e) {
    return <div className="text-red-500">Failed to load session. Please refresh.</div>;
  }
  if (!session || !session.user?.id) {
    redirect("/auth/login");
  }
  let user;
  try {
    user = await prisma.user.findUnique({ where: { id: session.user.id } });
  } catch (e) {
    return <div className="text-red-500">Failed to load user. Please try again later.</div>;
  }
  if (!user) {
    redirect("/auth/login");
  }
  let jobs = [];
  try {
    if (user.role === "HIRER") {
      jobs = await prisma.jobPosting.findMany({
        where: { hirerId: user.id },
        include: { applications: true },
        orderBy: { createdAt: "desc" },
      });
    } else {
      jobs = await prisma.jobPosting.findMany({
        include: { applications: true },
        orderBy: { createdAt: "desc" },
      });
    }
  } catch (e) {
    return <div className="text-red-500">Failed to load jobs. Please try again later.</div>;
  }
  return <JobsDashboardClient user={user} jobs={jobs} />;
} 