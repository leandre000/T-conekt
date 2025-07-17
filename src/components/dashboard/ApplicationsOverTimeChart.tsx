import { prisma } from "@/lib/prisma";
import { ApplicationsOverTimeChartClient } from "./ApplicationsOverTimeChartClient";

export async function ApplicationsOverTimeChart({ userId, role }: { userId: string; role: string }) {
  // Fetch application data grouped by month
  const applications = await prisma.application.findMany({
    where: role === "TALENT" ? { talentId: userId } : { job: { hirerId: userId } },
    select: { createdAt: true },
  });
  // Group by month
  const dataMap: Record<string, number> = {};
  applications.forEach((app) => {
    const month = app.createdAt.toLocaleString("default", { month: "short", year: "numeric" });
    dataMap[month] = (dataMap[month] || 0) + 1;
  });
  const data = Object.entries(dataMap).map(([month, count]) => ({ month, count }));
  data.sort((a, b) => new Date(a.month).getTime() - new Date(b.month).getTime());

  return <ApplicationsOverTimeChartClient data={data} />;
} 