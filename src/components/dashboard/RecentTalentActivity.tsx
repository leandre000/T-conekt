import { prisma } from "@/lib/prisma";
import React from "react";

interface RecentTalentActivityProps {
  userId: string;
}

export async function RecentTalentActivity({ userId }: RecentTalentActivityProps) {
  // Fetch recent applications
  const recentApplications = await prisma.application.findMany({
    where: { talentId: userId },
    include: { job: true },
    orderBy: { createdAt: "desc" },
    take: 3,
  });
  // Fetch recent events
  const recentEvents = await prisma.event.findMany({
    where: { participants: { some: { id: userId } } },
    orderBy: { startDate: "desc" },
    take: 3,
  });
  return (
    <div className="grid gap-4 md:grid-cols-2">
      <div className="bg-white dark:bg-neutral-900 rounded-lg shadow p-4">
        <h3 className="font-semibold mb-2 text-gray-900 dark:text-white">Recent Applications</h3>
        {recentApplications.length === 0 ? (
          <div className="text-gray-400 italic">No recent applications.</div>
        ) : (
          <ul className="space-y-2">
            {recentApplications.map((app, i) => (
              <li key={i} className="flex justify-between items-center">
                <span>{app.job?.title || "Unknown Job"}</span>
                <span className="text-xs text-gray-400">{app.createdAt.toLocaleDateString()}</span>
              </li>
            ))}
          </ul>
        )}
      </div>
      <div className="bg-white dark:bg-neutral-900 rounded-lg shadow p-4">
        <h3 className="font-semibold mb-2 text-gray-900 dark:text-white">Recent Events</h3>
        {recentEvents.length === 0 ? (
          <div className="text-gray-400 italic">No recent events.</div>
        ) : (
          <ul className="space-y-2">
            {recentEvents.map((event, i) => (
              <li key={i} className="flex justify-between items-center">
                <span>{event.name}</span>
                <span className="text-xs text-gray-400">{event.startDate.toLocaleDateString()}</span>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
} 