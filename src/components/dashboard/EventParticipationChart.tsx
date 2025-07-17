import { prisma } from "@/lib/prisma";
import { EventParticipationChartClient } from "./EventParticipationChartClient";

export async function EventParticipationChart({ userId }: { userId: string }) {
  const events = await prisma.event.findMany({
    where: { participants: { some: { id: userId } } },
    select: { startDate: true },
  });
  // Group by month
  const dataMap: Record<string, number> = {};
  events.forEach((event) => {
    const month = event.startDate.toLocaleString("default", { month: "short", year: "numeric" });
    dataMap[month] = (dataMap[month] || 0) + 1;
  });
  const data = Object.entries(dataMap).map(([month, count]) => ({ month, count }));
  data.sort((a, b) => new Date(a.month).getTime() - new Date(b.month).getTime());

  return <EventParticipationChartClient data={data} />;
} 