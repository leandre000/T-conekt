import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import AdminDashboardClient from "./AdminDashboardClient";

export default async function AdminDashboard(props: { searchParams: { tab?: string; page?: string } }) {
  const { searchParams } = props;
  const session = await getServerSession(authOptions);
  if (!session || session.user.role !== "ADMIN") redirect("/not-authorized");
  const tab = searchParams.tab === "jobs" ? "jobs" : "users";
  const page = parseInt(searchParams.page || "1");
  let stats = {};
  try {
    stats = {
      users: await prisma.user.count({}),
      jobs: await prisma.jobPosting.count({}),
      applications: await prisma.application.count({}),
      events: await prisma.event.count({}),
    };
  } catch (e) {
    // fallback: empty stats
    stats = { users: 0, jobs: 0, applications: 0, events: 0 };
  }
  // Pass session, tab, page, and stats
  return <AdminDashboardClient session={session} tab={tab} page={page} stats={stats} />;
} 