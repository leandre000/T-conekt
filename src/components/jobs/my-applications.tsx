import { prisma } from "@/lib/prisma";
import Link from "next/link";

export async function MyApplications({ userId }: { userId: string }) {
  const applications = await prisma.application.findMany({
    where: { talentId: userId },
    include: { job: true },
    orderBy: { createdAt: "desc" },
    take: 5,
  });
  return (
    <div className="mt-8">
      <h2 className="text-lg font-semibold mb-2 text-gray-900 dark:text-white">My Applications</h2>
      {applications.length === 0 ? (
        <div className="text-gray-400 italic">You haven't applied to any jobs yet.</div>
      ) : (
        <ul className="space-y-2">
          {applications.map((app) => (
            <li key={app.id} className="flex justify-between items-center bg-white dark:bg-neutral-900 rounded p-3 shadow">
              <div>
                <Link href={`/dashboard/jobs/${app.job.id}`} className="font-medium hover:underline">
                  {app.job.title}
                </Link>
                <span className="ml-2 text-xs text-gray-500">{app.job.location}</span>
              </div>
              <span className="text-xs text-gray-400">{app.createdAt.toLocaleDateString()}</span>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
} 