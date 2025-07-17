import { getServerSession } from "next-auth";
import { redirect, notFound } from "next/navigation";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { DashboardHeader } from "@/components/dashboard/header";
import { DashboardShell } from "@/components/dashboard/shell";
import { JobEditForm } from "@/components/jobs/job-edit-form";
import { Suspense } from "react";

function EditJobSkeleton() {
  return (
    <DashboardShell>
      <div className="animate-pulse space-y-6">
        <div className="h-8 w-1/3 bg-gray-200 dark:bg-neutral-800 rounded" />
        <div className="h-40 bg-gray-200 dark:bg-neutral-800 rounded-lg" />
      </div>
    </DashboardShell>
  );
}

export default async function EditJobPage({ params }: { params: { id: string } }) {
  let session;
  try {
    session = await getServerSession(authOptions);
  } catch (e) {
    return <DashboardShell><div className="text-red-500">Failed to load session. Please refresh.</div></DashboardShell>;
  }
  if (!session || !session.user?.id) {
    redirect("/auth/login");
  }
  let job;
  try {
    job = await prisma.jobPosting.findUnique({ where: { id: params.id } });
  } catch (e) {
    return <DashboardShell><div className="text-red-500">Failed to load job. Please try again later.</div></DashboardShell>;
  }
  if (!job) notFound();
  if (session.user.role !== "HIRER" || job.hirerId !== session.user.id) {
    redirect("/not-authorized");
  }
  return (
    <Suspense fallback={<EditJobSkeleton />}>
      <DashboardShell>
        <DashboardHeader heading="Edit Job" text="Update your job posting." />
        <div className="max-w-2xl mx-auto mt-8">
          <JobEditForm job={job} />
        </div>
      </DashboardShell>
    </Suspense>
  );
} 