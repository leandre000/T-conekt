import { getServerSession } from "next-auth";
import { redirect, notFound } from "next/navigation";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { DashboardHeader } from "@/components/dashboard/header";
import { DashboardShell } from "@/components/dashboard/shell";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { DeleteJobButton } from "@/components/jobs/delete-job-button";
import { ApplyJobButton } from "@/components/jobs/apply-job-button";
import { Suspense } from "react";
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';

function JobDetailSkeleton() {
  return (
    <DashboardShell>
      <div className="space-y-6">
        <Skeleton height={32} width="33%" borderRadius={8} />
        <Skeleton height={160} borderRadius={16} />
      </div>
    </DashboardShell>
  );
}

export default async function JobDetailsPage({ params }: { params: { id: string } }) {
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
    job = await prisma.jobPosting.findUnique({
      where: { id: params.id },
      include: { applications: true },
    });
  } catch (e) {
    return <DashboardShell><div className="text-red-500">Failed to load job. Please try again later.</div></DashboardShell>;
  }
  if (!job) notFound();

  // Talent view
  if (session.user.role === "TALENT") {
    const alreadyApplied = job.applications.some(a => a.talentId === session.user.id);
    return (
      <Suspense fallback={<JobDetailSkeleton />}>
        <DashboardShell>
          <DashboardHeader heading={job.title} text={job.description} />
          <div className="max-w-2xl mx-auto mt-8 space-y-4">
            <div className="flex flex-col gap-2">
              <div><b>Location:</b> {job.location}</div>
              <div><b>Type:</b> {job.jobType}</div>
              <div><b>Skills:</b> {job.skillsRequired.join(", ")}</div>
              <div><b>Budget:</b> {job.budget}</div>
              <div><b>Deadline:</b> {job.deadline ? job.deadline.toLocaleDateString() : "-"}</div>
              <div><b>Applications:</b> {job.applications.length}</div>
            </div>
            <div className="flex gap-4 mt-6">
              <ApplyJobButton jobId={job.id} userId={session.user.id} alreadyApplied={alreadyApplied} />
            </div>
          </div>
        </DashboardShell>
      </Suspense>
    );
  }

  // Hirer view (must own the job)
  if (session.user.role === "HIRER" && job.hirerId === session.user.id) {
    return (
      <Suspense fallback={<JobDetailSkeleton />}>
        <DashboardShell>
          <DashboardHeader heading={job.title} text={job.description} />
          <div className="max-w-2xl mx-auto mt-8 space-y-4">
            <div className="flex flex-col gap-2">
              <div><b>Location:</b> {job.location}</div>
              <div><b>Type:</b> {job.jobType}</div>
              <div><b>Skills:</b> {job.skillsRequired.join(", ")}</div>
              <div><b>Budget:</b> {job.budget}</div>
              <div><b>Deadline:</b> {job.deadline ? job.deadline.toLocaleDateString() : "-"}</div>
              <div><b>Applications:</b> {job.applications.length}</div>
            </div>
            <div className="flex gap-4 mt-6">
              <Button asChild variant="outline">
                <Link href={`/dashboard/jobs/${job.id}/edit`}>Edit</Link>
              </Button>
              <DeleteJobButton jobId={job.id} />
            </div>
          </div>
        </DashboardShell>
      </Suspense>
    );
  }

  // Not authorized for others
  redirect("/not-authorized");
} 