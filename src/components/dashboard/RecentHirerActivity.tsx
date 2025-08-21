import { prisma } from "@/lib/prisma";
import React from "react";

interface RecentHirerActivityProps {
  userId: string;
}

export async function RecentHirerActivity({ userId }: RecentHirerActivityProps) {
  // Fetch recent jobs
  const recentJobs = await prisma.jobPosting.findMany({
    where: { hirerId: userId },
    orderBy: { createdAt: "desc" },
    take: 3,
  });
  // Fetch recent events
  const recentEvents = await prisma.event.findMany({
    where: { organizerId: userId },
    orderBy: { startDate: "desc" },
    take: 3,
  });
  return (
    <div className="grid gap-4 md:grid-cols-2">
      <div className="bg-white dark:bg-neutral-900 rounded-lg shadow p-4">
        <h3 className="font-semibold mb-2 text-gray-900 dark:text-white">Recent Jobs Posted</h3>
        {recentJobs.length === 0 ? (
          <div className="text-gray-400 italic">No recent jobs.</div>
        ) : (
          <ul className="space-y-2">
            {recentJobs.map((job, i) => (
              <li key={i} className="flex justify-between items-center">
                <span>{job.title}</span>
                <span className="text-xs text-gray-400">{job.createdAt.toLocaleDateString()}</span>
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
                <span>{event.title}</span>
                <span className="text-xs text-gray-400">{event.startDate.toLocaleDateString()}</span>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
} 