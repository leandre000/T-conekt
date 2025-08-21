"use client";
import { DashboardShell } from "@/components/dashboard/shell";
import { Overview } from "@/components/dashboard/overview";
import { RecentHirerActivity } from "@/components/dashboard/RecentHirerActivity";
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';
import { Briefcase, FileText, Users, Calendar, MessageCircle } from 'lucide-react';
import Link from "next/link";

function HirerDashboardSkeleton() {
  return (
    <DashboardShell>
      <div className="space-y-6">
        <Skeleton height={32} width="33%" borderRadius={8} />
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
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

export default function HirerDashboardClient({ user, stats, userId }: { user: any, stats: any, userId: string }) {
  return (
    <DashboardShell>
      {/* Stats & Recent Activity */}
      <div className="mb-8">
        <Overview stats={stats} role={user.role} />
        <div className="mt-8">
          <h2 className="text-xl font-semibold mb-4 text-gray-900 dark:text-white">Recent Activity</h2>
          <RecentHirerActivity userId={userId} />
        </div>
      </div>
      {/* Hero Section */}
      <div className="flex flex-col md:flex-row items-center justify-between bg-gradient-to-br from-indigo-50 via-purple-50 to-pink-50 dark:from-neutral-900 dark:via-neutral-800 dark:to-neutral-900 rounded-2xl shadow-lg p-8 mb-8 animate-fade-in">
        <div className="flex-1 mb-6 md:mb-0">
          <h1 className="text-3xl md:text-4xl font-extrabold text-primary mb-2 drop-shadow-sm">Welcome, {user.firstName} {user.lastName}!</h1>
          <p className="text-lg text-gray-700 dark:text-gray-200 max-w-xl mb-4">Start posting jobs, reviewing applications, and connecting with top talent. Build your dream team today!</p>
        </div>
        <img
          src="/images/talent-hero-1.jpg"
          alt="Hirer Dashboard Hero"
          className="w-full md:w-72 h-auto rounded-xl shadow-xl animate-fade-in"
          style={{ minWidth: 200 }}
        />
      </div>
      {/* Quick Links Section */}
      <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
        <Link href="/dashboard/jobs" className="group bg-gradient-to-br from-pink-100 via-purple-100 to-indigo-100 dark:from-neutral-900 dark:via-neutral-800 dark:to-neutral-900 rounded-xl shadow-lg p-8 flex flex-col items-center hover:scale-105 hover:shadow-2xl transition-all duration-300 focus-within:ring-2 focus-within:ring-pink-500">
          <Briefcase className="h-12 w-12 text-pink-500 mb-4 group-hover:scale-110 group-hover:text-primary transition-transform duration-300 animate-fade-in" />
          <h3 className="font-bold text-xl mb-2 text-gray-900 dark:text-white">Manage Jobs</h3>
          <p className="text-gray-600 dark:text-gray-300 text-center">Post new jobs and manage your listings.</p>
        </Link>
        <Link href="/dashboard/applications" className="group bg-gradient-to-br from-blue-100 via-indigo-100 to-purple-100 dark:from-neutral-900 dark:via-neutral-800 dark:to-neutral-900 rounded-xl shadow-lg p-8 flex flex-col items-center hover:scale-105 hover:shadow-2xl transition-all duration-300 focus-within:ring-2 focus-within:ring-blue-500">
          <FileText className="h-12 w-12 text-blue-500 mb-4 group-hover:scale-110 group-hover:text-primary transition-transform duration-300 animate-fade-in" />
          <h3 className="font-bold text-xl mb-2 text-gray-900 dark:text-white">Review Applications</h3>
          <p className="text-gray-600 dark:text-gray-300 text-center">View and manage applications for your jobs.</p>
        </Link>
        <Link href="/dashboard/messages" className="group bg-gradient-to-br from-green-100 via-blue-100 to-purple-100 dark:from-neutral-900 dark:via-neutral-800 dark:to-neutral-900 rounded-xl shadow-lg p-8 flex flex-col items-center hover:scale-105 hover:shadow-2xl transition-all duration-300 focus-within:ring-2 focus-within:ring-green-500">
          <MessageCircle className="h-12 w-12 text-green-500 mb-4 group-hover:scale-110 group-hover:text-primary transition-transform duration-300 animate-fade-in" />
          <h3 className="font-bold text-xl mb-2 text-gray-900 dark:text-white">Messages</h3>
          <p className="text-gray-600 dark:text-gray-300 text-center">Chat with talent and manage conversations.</p>
        </Link>
        <Link href="/dashboard/events" className="group bg-gradient-to-br from-yellow-100 via-pink-100 to-indigo-100 dark:from-neutral-900 dark:via-neutral-800 dark:to-neutral-900 rounded-xl shadow-lg p-8 flex flex-col items-center hover:scale-105 hover:shadow-2xl transition-all duration-300 focus-within:ring-2 focus-within:ring-yellow-500">
          <Calendar className="h-12 w-12 text-yellow-500 mb-4 group-hover:scale-110 group-hover:text-primary transition-transform duration-300 animate-fade-in" />
          <h3 className="font-bold text-xl mb-2 text-gray-900 dark:text-white">Events</h3>
          <p className="text-gray-600 dark:text-gray-300 text-center">Host or join professional events and meetups.</p>
        </Link>
      </div>
      {/* Onboarding Tips Section */}
      <div className="mt-12 flex flex-col items-center">
        <h2 className="text-2xl font-bold text-primary mb-2 flex items-center gap-2"><Users className="h-6 w-6 text-purple-500 animate-bounce" />Get Started as a Hirer</h2>
        <ul className="grid gap-4 md:grid-cols-2 lg:grid-cols-4 w-full max-w-4xl">
          <li className="bg-white dark:bg-neutral-900 rounded-xl shadow p-6 flex flex-col items-center">
            <Briefcase className="h-8 w-8 text-pink-500 mb-2" />
            <span className="font-semibold text-lg mb-1">Post Your First Job</span>
            <span className="text-gray-500 text-center">Create a job listing to attract top talent.</span>
          </li>
          <li className="bg-white dark:bg-neutral-900 rounded-xl shadow p-6 flex flex-col items-center">
            <FileText className="h-8 w-8 text-blue-500 mb-2" />
            <span className="font-semibold text-lg mb-1">Review Applications</span>
            <span className="text-gray-500 text-center">Evaluate candidates and shortlist the best.</span>
          </li>
          <li className="bg-white dark:bg-neutral-900 rounded-xl shadow p-6 flex flex-col items-center">
            <MessageCircle className="h-8 w-8 text-green-500 mb-2" />
            <span className="font-semibold text-lg mb-1">Connect & Chat</span>
            <span className="text-gray-500 text-center">Message applicants and schedule interviews.</span>
          </li>
          <li className="bg-white dark:bg-neutral-900 rounded-xl shadow p-6 flex flex-col items-center">
            <Calendar className="h-8 w-8 text-yellow-500 mb-2" />
            <span className="font-semibold text-lg mb-1">Host Events</span>
            <span className="text-gray-500 text-center">Organize webinars, meetups, and more.</span>
          </li>
        </ul>
      </div>
    </DashboardShell>
  );
} 