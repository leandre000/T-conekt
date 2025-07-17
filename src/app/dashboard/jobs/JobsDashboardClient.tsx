"use client";
import { DashboardHeader } from "@/components/dashboard/header";
import { DashboardShell } from "@/components/dashboard/shell";
import { JobList } from "@/components/jobs/job-list";
import { CreateJobButton } from "@/components/jobs/create-job-button";
import { MyApplications } from "@/components/jobs/my-applications";
import { Briefcase } from "lucide-react";
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';
import { Suspense } from "react";

function JobsSkeleton() {
  return (
    <DashboardShell>
      <div className="space-y-6">
        <Skeleton height={32} width="33%" borderRadius={8} />
        <Skeleton height={160} borderRadius={16} />
      </div>
    </DashboardShell>
  );
}

export default function JobsDashboardClient({ user, jobs }: { user: any, jobs: any[] }) {
  return (
    <Suspense fallback={<JobsSkeleton />}>
      <DashboardShell>
        {/* Jobs Hero Section */}
        <div className="flex flex-col md:flex-row items-center justify-between bg-gradient-to-br from-indigo-100 via-purple-100 to-pink-100 dark:from-neutral-900 dark:via-neutral-800 dark:to-neutral-900 rounded-2xl shadow-lg p-8 mb-8 animate-fade-in">
          <div className="flex-1 mb-6 md:mb-0">
            <h1 className="text-3xl md:text-4xl font-extrabold text-primary mb-2 drop-shadow-sm flex items-center gap-2">
              <Briefcase className="h-8 w-8 text-pink-500 animate-bounce" />
              Jobs
            </h1>
            <p className="text-lg text-gray-700 dark:text-gray-200 max-w-xl mb-4">Browse, apply, and manage jobs. Find your next opportunity or post a new job to attract top talent!</p>
          </div>
          <img
            src="/images/jobs-hero.svg"
            alt="Jobs Hero Illustration"
            className="w-full md:w-64 h-auto rounded-xl shadow-xl animate-fade-in"
            style={{ minWidth: 180 }}
          />
        </div>
        <DashboardHeader
          heading="Jobs"
          text={user.role === "HIRER" ? "Manage your job postings and applications." : "Browse and apply to jobs."}
        >
          {user.role === "HIRER" && <CreateJobButton />}
        </DashboardHeader>
        <div className="grid gap-8">
          <JobList jobs={jobs} showApplyButton={user.role === "TALENT"} userId={user.id} />
          {user.role === "TALENT" && <MyApplications userId={user.id} />}
        </div>
      </DashboardShell>
    </Suspense>
  );
} 