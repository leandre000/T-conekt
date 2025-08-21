"use client";
import { DashboardShell } from "@/components/dashboard/shell";
import { Overview } from "@/components/dashboard/overview";
import { RecentTalentActivity } from "@/components/dashboard/RecentTalentActivity";
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';
import { Sparkles, Users, Settings as SettingsIcon, Bell, FileText, MessageCircle, Calendar, User, Briefcase } from 'lucide-react';
import Link from "next/link";

function TalentDashboardSkeleton() {
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

export default function TalentDashboardClient({ user, stats, userId }: { user: any, stats: any, userId: string }) {
  const heroSlides = [
    {
      img: "/images/talent-hero-1.jpg",
      title: "Welcome to TalentConnect!",
      desc: "Start exploring jobs, updating your profile, and connecting with top employers. Your next big opportunity is just a click away!",
    },
    {
      img: "/images/talent-hero-2.jpg",
      title: "Showcase Your Skills",
      desc: "Keep your profile up to date to attract the best opportunities and stand out to employers.",
    },
    {
      img: "/images/talent-hero-3.jpg",
      title: "Engage with the Community",
      desc: "Join events, participate in the forum, and grow your professional network.",
    },
  ];
  return (
    <DashboardShell>
      {/* Stats & Recent Activity */}
      <div className="mb-8">
        <Overview stats={stats} role={user.role} />
        <div className="mt-8">
          <h2 className="text-xl font-semibold mb-4 text-gray-900 dark:text-white">Recent Activity</h2>
          <RecentTalentActivity userId={userId} />
        </div>
      </div>
      {/* Hero Section */}
      <div className="flex flex-col md:flex-row items-center justify-between bg-gradient-to-br from-indigo-50 via-purple-50 to-pink-50 dark:from-neutral-900 dark:via-neutral-800 dark:to-neutral-900 rounded-2xl shadow-lg p-8 mb-8 animate-fade-in">
        <div className="flex-1 mb-6 md:mb-0">
          <h1 className="text-3xl md:text-4xl font-extrabold text-primary mb-2 drop-shadow-sm flex items-center gap-2">
            <Sparkles className="h-8 w-8 text-pink-500 animate-bounce" />
            Welcome, {user.firstName} {user.lastName}!
          </h1>
          <p className="text-lg text-gray-700 dark:text-gray-200 max-w-xl mb-4">Your dashboard gives you a quick overview of your activity, stats, and recent updates. Explore jobs, connect with others, and grow your career!</p>
        </div>
        <img
          src={heroSlides[0].img}
          alt="Talent Dashboard Hero"
          className="w-full md:w-72 h-auto rounded-xl shadow-xl animate-fade-in"
          style={{ minWidth: 200 }}
        />
      </div>
      {/* Quick Links Section */}
      <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
        <Link href="/dashboard/profile" className="group bg-gradient-to-br from-blue-100 via-indigo-100 to-purple-100 dark:from-neutral-900 dark:via-neutral-800 dark:to-neutral-900 rounded-xl shadow-lg p-8 flex flex-col items-center hover:scale-105 hover:shadow-2xl transition-all duration-300 focus-within:ring-2 focus-within:ring-primary">
          <User className="h-12 w-12 text-blue-500 mb-4 group-hover:scale-110 group-hover:text-primary transition-transform duration-300 animate-fade-in" />
          <h3 className="font-bold text-xl mb-2 text-gray-900 dark:text-white">Profile</h3>
          <p className="text-gray-600 dark:text-gray-300 text-center">View and update your profile, skills, and experience.</p>
        </Link>
        <Link href="/dashboard/applications" className="group bg-gradient-to-br from-pink-100 via-purple-100 to-indigo-100 dark:from-neutral-900 dark:via-neutral-800 dark:to-neutral-900 rounded-xl shadow-lg p-8 flex flex-col items-center hover:scale-105 hover:shadow-2xl transition-all duration-300 focus-within:ring-2 focus-within:ring-pink-500">
          <FileText className="h-12 w-12 text-pink-500 mb-4 group-hover:scale-110 group-hover:text-primary transition-transform duration-300 animate-fade-in" />
          <h3 className="font-bold text-xl mb-2 text-gray-900 dark:text-white">Applications</h3>
          <p className="text-gray-600 dark:text-gray-300 text-center">Track your job applications and their status.</p>
        </Link>
        <Link href="/dashboard/messages" className="group bg-gradient-to-br from-green-100 via-blue-100 to-purple-100 dark:from-neutral-900 dark:via-neutral-800 dark:to-neutral-900 rounded-xl shadow-lg p-8 flex flex-col items-center hover:scale-105 hover:shadow-2xl transition-all duration-300 focus-within:ring-2 focus-within:ring-green-500">
          <MessageCircle className="h-12 w-12 text-green-500 mb-4 group-hover:scale-110 group-hover:text-primary transition-transform duration-300 animate-fade-in" />
          <h3 className="font-bold text-xl mb-2 text-gray-900 dark:text-white">Messages</h3>
          <p className="text-gray-600 dark:text-gray-300 text-center">Chat with employers and manage your conversations.</p>
        </Link>
        <Link href="/dashboard/events" className="group bg-gradient-to-br from-yellow-100 via-pink-100 to-indigo-100 dark:from-neutral-900 dark:via-neutral-800 dark:to-neutral-900 rounded-xl shadow-lg p-8 flex flex-col items-center hover:scale-105 hover:shadow-2xl transition-all duration-300 focus-within:ring-2 focus-within:ring-yellow-500">
          <Calendar className="h-12 w-12 text-yellow-500 mb-4 group-hover:scale-110 group-hover:text-primary transition-transform duration-300 animate-fade-in" />
          <h3 className="font-bold text-xl mb-2 text-gray-900 dark:text-white">Events</h3>
          <p className="text-gray-600 dark:text-gray-300 text-center">Discover and join professional events and meetups.</p>
        </Link>
        <Link href="/dashboard/forum" className="group bg-gradient-to-br from-purple-100 via-blue-100 to-pink-100 dark:from-neutral-900 dark:via-neutral-800 dark:to-neutral-900 rounded-xl shadow-lg p-8 flex flex-col items-center hover:scale-105 hover:shadow-2xl transition-all duration-300 focus-within:ring-2 focus-within:ring-purple-500">
          <Users className="h-12 w-12 text-purple-500 mb-4 group-hover:scale-110 group-hover:text-primary transition-transform duration-300 animate-fade-in" />
          <h3 className="font-bold text-xl mb-2 text-gray-900 dark:text-white">Forum</h3>
          <p className="text-gray-600 dark:text-gray-300 text-center">Engage with the community and share insights.</p>
        </Link>
        <Link href="/dashboard/settings" className="group bg-gradient-to-br from-gray-100 via-blue-100 to-pink-100 dark:from-neutral-900 dark:via-neutral-800 dark:to-neutral-900 rounded-xl shadow-lg p-8 flex flex-col items-center hover:scale-105 hover:shadow-2xl transition-all duration-300 focus-within:ring-2 focus-within:ring-gray-500">
          <SettingsIcon className="h-12 w-12 text-gray-500 mb-4 group-hover:scale-110 group-hover:text-primary transition-transform duration-300 animate-fade-in" />
          <h3 className="font-bold text-xl mb-2 text-gray-900 dark:text-white">Settings</h3>
          <p className="text-gray-600 dark:text-gray-300 text-center">Manage your preferences and account settings.</p>
        </Link>
        <Link href="/dashboard/notifications" className="group bg-gradient-to-br from-indigo-100 via-pink-100 to-yellow-100 dark:from-neutral-900 dark:via-neutral-800 dark:to-neutral-900 rounded-xl shadow-lg p-8 flex flex-col items-center hover:scale-105 hover:shadow-2xl transition-all duration-300 focus-within:ring-2 focus-within:ring-indigo-500">
          <Bell className="h-12 w-12 text-indigo-500 mb-4 group-hover:scale-110 group-hover:text-primary transition-transform duration-300 animate-fade-in" />
          <h3 className="font-bold text-xl mb-2 text-gray-900 dark:text-white">Notifications</h3>
          <p className="text-gray-600 dark:text-gray-300 text-center">Manage your notification preferences.</p>
        </Link>
      </div>
      {/* Onboarding Tips Section */}
      <div className="mt-12 flex flex-col items-center">
        <h2 className="text-2xl font-bold text-primary mb-2 flex items-center gap-2"><Sparkles className="h-6 w-6 text-pink-500 animate-bounce" />Get Started with TalentConnect</h2>
        <ul className="grid gap-4 md:grid-cols-2 lg:grid-cols-3 w-full max-w-4xl">
          <li className="bg-white dark:bg-neutral-900 rounded-xl shadow p-6 flex flex-col items-center">
            <User className="h-8 w-8 text-blue-500 mb-2" />
            <span className="font-semibold text-lg mb-1">Complete Your Profile</span>
            <span className="text-gray-500 text-center">Add your skills, experience, and a great photo to stand out.</span>
          </li>
          <li className="bg-white dark:bg-neutral-900 rounded-xl shadow p-6 flex flex-col items-center">
            <Briefcase className="h-8 w-8 text-pink-500 mb-2" />
            <span className="font-semibold text-lg mb-1">Apply for Jobs</span>
            <span className="text-gray-500 text-center">Browse and apply to jobs that match your interests and skills.</span>
          </li>
          <li className="bg-white dark:bg-neutral-900 rounded-xl shadow p-6 flex flex-col items-center">
            <MessageCircle className="h-8 w-8 text-green-500 mb-2" />
            <span className="font-semibold text-lg mb-1">Connect & Chat</span>
            <span className="text-gray-500 text-center">Message employers and grow your professional network.</span>
          </li>
          <li className="bg-white dark:bg-neutral-900 rounded-xl shadow p-6 flex flex-col items-center">
            <Calendar className="h-8 w-8 text-yellow-500 mb-2" />
            <span className="font-semibold text-lg mb-1">Join Events</span>
            <span className="text-gray-500 text-center">Participate in meetups, webinars, and networking events.</span>
          </li>
          <li className="bg-white dark:bg-neutral-900 rounded-xl shadow p-6 flex flex-col items-center">
            <Users className="h-8 w-8 text-purple-500 mb-2" />
            <span className="font-semibold text-lg mb-1">Engage in the Forum</span>
            <span className="text-gray-500 text-center">Share insights, ask questions, and help others in the community.</span>
          </li>
          <li className="bg-white dark:bg-neutral-900 rounded-xl shadow p-6 flex flex-col items-center">
            <SettingsIcon className="h-8 w-8 text-gray-500 mb-2" />
            <span className="font-semibold text-lg mb-1">Personalize Your Experience</span>
            <span className="text-gray-500 text-center">Adjust your settings and notification preferences anytime.</span>
          </li>
        </ul>
      </div>
    </DashboardShell>
  );
} 