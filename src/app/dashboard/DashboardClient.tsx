"use client";
import { DashboardHeader } from "@/components/dashboard/header";
import { DashboardShell } from "@/components/dashboard/shell";
import { Overview } from "@/components/dashboard/overview";
import { ApplicationsOverTimeChart } from "@/components/dashboard/ApplicationsOverTimeChart";
import { JobStatsChart } from "@/components/dashboard/JobStatsChart";
import { EventParticipationChart } from "@/components/dashboard/EventParticipationChart";
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';
import { Suspense } from "react";

function DashboardSkeleton() {

  
  return (
    <DashboardShell>
      <div className="space-y-6">
        <Skeleton height={32} width="33%" borderRadius={8} />
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          {[...Array(4)].map((_, i) => (
            <Skeleton key={i} height={128} borderRadius={16} />
          ))}
        </div>
        <Skeleton height={24} width="25%" borderRadius={8} style={{ marginTop: 32 }} />
        <Skeleton height={160} borderRadius={16} />
      </div>
    </DashboardShell>
  );
}

export default function DashboardClient({ user, stats }: { user: any, stats: any }) {
  return (
    <Suspense fallback={<DashboardSkeleton />}>
      <DashboardShell>
        {/* Dashboard Hero Section */}
        <div className="flex flex-col md:flex-row items-center justify-between bg-gradient-to-br from-indigo-50 via-purple-50 to-pink-50 dark:from-neutral-900 dark:via-neutral-800 dark:to-neutral-900 rounded-2xl shadow-lg p-8 mb-8 animate-fade-in">
          <div className="flex-1 mb-6 md:mb-0">
            <h1 className="text-3xl md:text-4xl font-extrabold text-primary mb-2 drop-shadow-sm">Welcome back, {user.firstName} {user.lastName}!</h1>
            <p className="text-lg text-gray-700 dark:text-gray-200 max-w-xl mb-4">Your dashboard gives you a quick overview of your activity, stats, and recent updates. Explore jobs, connect with others, and grow your career!</p>
          </div>
          <img
            src="/images/dashboard-hero.svg"
            alt="Dashboard Hero Illustration"
            className="w-full md:w-72 h-auto rounded-xl shadow-xl animate-fade-in"
            style={{ minWidth: 200 }}
          />
        </div>
        <DashboardHeader
          heading={`Welcome back, ${user.firstName} ${user.lastName}!`}
          text="Here's an overview of your activity."
        />
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          <Overview stats={stats} role={user.role} />
        </div>
        <div className="mt-8">
          <h2 className="text-xl font-semibold mb-4 text-gray-900 dark:text-white">Recent Activity</h2>
          {user.role === "TALENT" ? (
            <div>{/* RecentTalentActivity userId={user.id} */}</div>
          ) : (
            <div>{/* RecentHirerActivity userId={user.id} */}</div>
          )}
        </div>
        <ApplicationsOverTimeChart userId={user.id} role={user.role} />
        <JobStatsChart userId={user.id} role={user.role} />
        <EventParticipationChart userId={user.id} />
      </DashboardShell>
    </Suspense>
  );
} 