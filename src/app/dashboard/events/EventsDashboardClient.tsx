"use client";
import { DashboardHeader } from "@/components/dashboard/header";
import { DashboardShell } from "@/components/dashboard/shell";
import { EventList } from "@/components/events/event-list";
import { CreateEventButton } from "@/components/events/create-event-button";
import { Calendar } from "lucide-react";
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';
import { Suspense } from "react";
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";

function EventsSkeleton() {
  return (
    <DashboardShell>
      <div className="space-y-6">
        <Skeleton height={32} width="33%" borderRadius={8} />
        <Skeleton height={160} borderRadius={16} />
      </div>
    </DashboardShell>
  );
}

export default function EventsDashboardClient() {
  const { data: session, status } = useSession();
  const [events, setEvents] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    fetch('/api/events')
      .then(res => res.json())
      .then(data => {
        setEvents(Array.isArray(data) ? data : []);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);
  if (status === "loading" || loading) return <EventsSkeleton />;
  // Always render the page, even if not logged in
  return (
    <DashboardShell>
      {/* Events Hero Section */}
      <div className="flex flex-col md:flex-row items-center justify-between bg-gradient-to-br from-indigo-100 via-purple-100 to-pink-100 dark:from-neutral-900 dark:via-neutral-800 dark:to-neutral-900 rounded-2xl shadow-lg p-8 mb-8 animate-fade-in">
        <div className="flex-1 mb-6 md:mb-0">
          <h1 className="text-3xl md:text-4xl font-extrabold text-primary mb-2 drop-shadow-sm flex items-center gap-2">
            <Calendar className="h-8 w-8 text-indigo-500 animate-bounce" />
            Events
          </h1>
          <p className="text-lg text-gray-700 dark:text-gray-200 max-w-xl mb-4">Discover, join, and create professional events and meetups. Connect with the community and grow your network!</p>
        </div>
        <img
          src="/images/events-hero.svg"
          alt="Events Hero Illustration"
          className="w-full md:w-64 h-auto rounded-xl shadow-xl animate-fade-in"
          style={{ minWidth: 180 }}
        />
      </div>
      <DashboardHeader
        heading="Events"
        text="Discover and manage community events."
      >
        <CreateEventButton />
      </DashboardHeader>
      <div className="grid gap-8">
        <EventList events={events} />
      </div>
    </DashboardShell>
  );
} 