"use client";
import { DashboardHeader } from "@/components/dashboard/header";
import { DashboardShell } from "@/components/dashboard/shell";
import { ApplicationList } from "@/components/applications/application-list";
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';
import { Suspense } from "react";
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";

function ApplicationsSkeleton() {
  return (
    <DashboardShell>
      <div className="space-y-6">
        <Skeleton height={32} width="33%" borderRadius={8} />
        <Skeleton height={160} borderRadius={16} />
      </div>
    </DashboardShell>
  );
}

export default function ApplicationsDashboardClient() {
  const { data: session, status } = useSession();
  const [user, setUser] = useState<any>(null);
  const [applications, setApplications] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    if (status === "loading") return;
    if (!session?.user?.id) {
      setUser(null);
      setApplications([]);
      setLoading(false);
      return;
    }
    fetch(`/api/users/${session.user.id}`)
      .then(res => res.json())
      .then(data => {
        setUser(data);
        return fetch(`/api/applications?userId=${session.user.id}`);
      })
      .then(res => res?.json?.() ?? [])
      .then(apps => {
        setApplications(apps);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, [session, status]);
  if (status === "loading" || loading) return <ApplicationsSkeleton />;
  if (!session?.user?.id) {
    return (
      <DashboardShell>
        <div className="flex flex-col items-center justify-center min-h-[400px]">
          <h2 className="text-2xl font-bold text-primary mb-2">Applications</h2>
          <p className="text-gray-500">Please log in to view your applications.</p>
        </div>
      </DashboardShell>
    );
  }
  // If logged in, always show the real applications
  if (!user) return <ApplicationsSkeleton />;
  return (
    <DashboardShell>
      <DashboardHeader
        heading="Applications"
        text="Manage your job applications."
      />
      <div className="grid gap-8">
        <ApplicationList
          applications={applications}
          userRole={user.role}
        />
      </div>
    </DashboardShell>
  );
} 