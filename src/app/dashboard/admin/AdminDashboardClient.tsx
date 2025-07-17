"use client";
import { useToast } from "@/components/ui/use-toast";
import { useState } from "react";
import { DashboardShell } from "@/components/dashboard/shell";
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';
import { Shield, Users, Briefcase, FileText, Calendar } from "lucide-react";
import { cn } from "@/lib/utils";

function AdminDashboardSkeleton() {
  return (
    <DashboardShell>
      <div className="space-y-6">
        <Skeleton height={32} width="33%" borderRadius={8} />
        <div className="grid grid-cols-2 gap-4 mb-6">
          {[...Array(2)].map((_, i) => (
            <Skeleton key={i} height={96} borderRadius={16} />
          ))}
        </div>
        <Skeleton height={24} width="25%" borderRadius={8} style={{ marginTop: 32 }} />
        <Skeleton height={160} borderRadius={16} />
      </div>
    </DashboardShell>
  );
}

const tabs = [
  { key: "users", label: "Users", icon: Users },
  { key: "jobs", label: "Jobs", icon: Briefcase },
];

function AdminOverview({ stats }: { stats: any }) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 w-full mb-8">
      <div className="bg-white dark:bg-neutral-900 rounded-lg shadow p-6 flex flex-col items-center">
        <Users className="h-8 w-8 text-blue-500 mb-2" />
        <div className="text-2xl font-bold text-primary mb-1">{stats.users}</div>
        <div className="text-sm text-gray-500">Total Users</div>
      </div>
      <div className="bg-white dark:bg-neutral-900 rounded-lg shadow p-6 flex flex-col items-center">
        <Briefcase className="h-8 w-8 text-pink-500 mb-2" />
        <div className="text-2xl font-bold text-primary mb-1">{stats.jobs}</div>
        <div className="text-sm text-gray-500">Total Jobs</div>
      </div>
      <div className="bg-white dark:bg-neutral-900 rounded-lg shadow p-6 flex flex-col items-center">
        <FileText className="h-8 w-8 text-indigo-500 mb-2" />
        <div className="text-2xl font-bold text-primary mb-1">{stats.applications}</div>
        <div className="text-sm text-gray-500">Total Applications</div>
      </div>
      <div className="bg-white dark:bg-neutral-900 rounded-lg shadow p-6 flex flex-col items-center">
        <Calendar className="h-8 w-8 text-yellow-500 mb-2" />
        <div className="text-2xl font-bold text-primary mb-1">{stats.events}</div>
        <div className="text-sm text-gray-500">Total Events</div>
      </div>
    </div>
  );
}

export default function AdminDashboardClient({ session, tab, page, stats }: { session: any, tab: string, page: number, stats: any }) {
  const { toast } = useToast();
  const [activeTab, setActiveTab] = useState(tab || "users");
  // Placeholder for future data loading
  // const [loading, setLoading] = useState(false);

  return (
    <DashboardShell>
      {/* Stats Overview */}
      <AdminOverview stats={stats} />
      {/* Hero Section */}
      <div className="flex flex-col md:flex-row items-center justify-between bg-gradient-to-br from-gray-100 via-indigo-100 to-pink-100 dark:from-neutral-900 dark:via-neutral-800 dark:to-neutral-900 rounded-2xl shadow-lg p-8 mb-8 animate-fade-in">
        <div className="flex-1 mb-6 md:mb-0">
          <h1 className="text-3xl md:text-4xl font-extrabold text-primary mb-2 drop-shadow-sm flex items-center gap-2">
            <Shield className="h-8 w-8 text-gray-700 animate-bounce" />
            Admin Dashboard
          </h1>
          <p className="text-lg text-gray-700 dark:text-gray-200 max-w-xl mb-4">Manage users, jobs, and platform activity. This dashboard gives you full control over TalentConnect's ecosystem.</p>
        </div>
        <img
          src="/images/talent-hero-3.jpg"
          alt="Admin Dashboard Hero"
          className="w-full md:w-72 h-auto rounded-xl shadow-xl animate-fade-in"
          style={{ minWidth: 200 }}
        />
      </div>
      {/* Tab Navigation */}
      <div className="flex space-x-4 mb-8">
        {tabs.map(({ key, label, icon: Icon }) => (
          <button
            key={key}
            onClick={() => setActiveTab(key)}
            className={cn(
              "flex items-center gap-2 px-4 py-2 rounded-lg font-semibold transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-primary",
              activeTab === key
                ? "bg-gradient-to-r from-indigo-400 via-purple-400 to-pink-400 text-white shadow-lg scale-105 ring-2 ring-primary"
                : "text-foreground/70 hover:bg-gradient-to-r hover:from-primary/10 hover:via-primary/5 hover:to-primary/0 hover:text-primary"
            )}
            aria-current={activeTab === key ? "page" : undefined}
          >
            <Icon className="h-5 w-5" />
            <span>{label}</span>
          </button>
        ))}
      </div>
      {/* Tab Content Placeholder */}
      <div className="bg-white dark:bg-neutral-900 rounded-xl shadow p-8 min-h-[300px] flex flex-col items-center justify-center">
        {activeTab === "users" ? (
          <>
            <h2 className="text-xl font-bold mb-4 flex items-center gap-2"><Users className="h-6 w-6 text-blue-500" />Users Management</h2>
            <p className="text-gray-500 mb-2">User management table coming soon.</p>
            <Skeleton height={48} width="80%" borderRadius={8} />
          </>
        ) : (
          <>
            <h2 className="text-xl font-bold mb-4 flex items-center gap-2"><Briefcase className="h-6 w-6 text-pink-500" />Jobs Management</h2>
            <p className="text-gray-500 mb-2">Job management table coming soon.</p>
            <Skeleton height={48} width="80%" borderRadius={8} />
          </>
        )}
      </div>
    </DashboardShell>
  );
} 