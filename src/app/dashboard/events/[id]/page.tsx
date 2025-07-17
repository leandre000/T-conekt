import { getServerSession } from "next-auth";
import { redirect, notFound } from "next/navigation";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { DashboardHeader } from "@/components/dashboard/header";
import { DashboardShell } from "@/components/dashboard/shell";
import { Button } from "@/components/ui/button";
import { JoinLeaveEventButton } from "@/components/events/join-leave-event-button";
import { Suspense } from "react";
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';

function EventDetailSkeleton() {
  return (
    <DashboardShell>
      <div className="space-y-6">
        <Skeleton height={32} width="33%" borderRadius={8} />
        <Skeleton height={160} borderRadius={16} />
      </div>
    </DashboardShell>
  );
}

export default async function EventDetailsPage({ params }: { params: { id: string } }) {
  let session;
  try {
    session = await getServerSession(authOptions);
  } catch (e) {
    return <DashboardShell><div className="text-red-500">Failed to load session. Please refresh.</div></DashboardShell>;
  }
  if (!session || !session.user?.id) {
    redirect("/auth/login");
  }
  let event;
  try {
    event = await prisma.event.findUnique({
      where: { id: params.id },
      include: {
        organizer: true,
        participants: true,
      },
    });
  } catch (e) {
    return <DashboardShell><div className="text-red-500">Failed to load event. Please try again later.</div></DashboardShell>;
  }
  if (!event) notFound();
  const isParticipant = event.participants.some((p) => p.id === session.user.id);
  return (
    <Suspense fallback={<EventDetailSkeleton />}>
      <DashboardShell>
        <DashboardHeader heading={event.name} text={event.description} />
        <div className="max-w-2xl mx-auto mt-8 space-y-4">
          <div className="flex flex-col gap-2">
            <div><b>Location:</b> {event.location}</div>
            <div><b>Start:</b> {event.startDate.toLocaleDateString()}</div>
            <div><b>End:</b> {event.endDate.toLocaleDateString()}</div>
            <div><b>Organizer:</b> {event.organizer?.name || "-"}</div>
          </div>
          <div className="mt-6">
            <JoinLeaveEventButton eventId={event.id} isParticipant={isParticipant} />
          </div>
          <div className="mt-8">
            <h3 className="font-semibold mb-2 text-gray-900 dark:text-white">Participants ({event.participants.length})</h3>
            <ul className="space-y-1">
              {event.participants.map((p) => (
                <li key={p.id} className="text-gray-700 dark:text-gray-300">{p.name || p.email}</li>
              ))}
            </ul>
          </div>
        </div>
      </DashboardShell>
    </Suspense>
  );
} 