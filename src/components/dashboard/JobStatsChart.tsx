import { prisma } from "@/lib/prisma";
import { JobStatsChartClient } from "./JobStatsChartClient";

export async function JobStatsChart({ userId, role }: { userId: string; role: string }) {
  let jobs = [];
  if (role === "HIRER") {
    jobs = await prisma.jobPosting.findMany({
      where: { hirerId: userId },
      select: { createdAt: true },
    });
  } else {
    jobs = await prisma.application.findMany({
      where: { talentId: userId },
      select: { createdAt: true },
    });
  }
  // Group by month
  const dataMap: Record<string, number> = {};
  jobs.forEach((item: any) => {
    const month = item.createdAt.toLocaleString("default", { month: "short", year: "numeric" });
    dataMap[month] = (dataMap[month] || 0) + 1;
  });
  const data = Object.entries(dataMap).map(([month, count]) => ({ month, count }));
  data.sort((a, b) => new Date(a.month).getTime() - new Date(b.month).getTime());

  return <JobStatsChartClient data={data} role={role} />;
} 