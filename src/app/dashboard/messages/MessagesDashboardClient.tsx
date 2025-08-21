"use client";
import { DashboardHeader } from "@/components/dashboard/header";
import { DashboardShell } from "@/components/dashboard/shell";
import { ConversationList } from "@/components/messages/conversation-list";
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';
import { Suspense } from "react";
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import { ActiveUsersList } from "@/components/messages/active-users-list";

function MessagesSkeleton() {
  return (
    <DashboardShell>
      <div className="space-y-6">
        <Skeleton height={32} width="33%" borderRadius={8} />
        <Skeleton height={160} borderRadius={16} />
      </div>
    </DashboardShell>
  );
}

export default function MessagesDashboardClient() {
  const { data: session, status } = useSession();
  const [conversations, setConversations] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeConversation, setActiveConversation] = useState<any>(null);

  useEffect(() => {
    if (!session?.user?.id) {
      setConversations([]);
      setLoading(false);
      return;
    }
    fetch(`/api/messages?userId=${session.user.id}`)
      .then(res => res.json())
      .then(data => {
        setConversations(Array.isArray(data) ? data : []);
        setActiveConversation(Array.isArray(data) && data.length > 0 ? data[0] : null);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, [session]);

  const handleStartConversation = async (user: any) => {
    if (!session?.user?.id) return;
    // Check if conversation already exists
    const existing = conversations.find((conv: any) =>
      conv.participants.some((p: any) => p.id === session.user.id)
    );
    if (existing) {
      setActiveConversation(existing);
      return;
    }
    // Create new conversation via API
    const res = await fetch('/api/messages', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ participantId: user.id }),
    });
    if (res.ok) {
      const newConv = await res.json();
      setConversations([newConv, ...conversations]);
      setActiveConversation(newConv);
    }
  };

  if (status === "loading" || loading) return <MessagesSkeleton />;
  // Always render the page, even if not logged in
  return (
    <DashboardShell>
      <DashboardHeader
        heading="Messages"
        text="Manage your conversations."
      />
      <div className="grid gap-8 md:grid-cols-4">
        <div className="md:col-span-1">
          <ActiveUsersList onStartConversation={handleStartConversation} currentUserId={session?.user?.id} />
        </div>
        <div className="md:col-span-3">
          <ConversationList
            conversations={conversations}
            userId={session?.user?.id || ""}
            activeConversation={activeConversation}
            setActiveConversation={setActiveConversation}
          />
        </div>
      </div>
    </DashboardShell>
  );
} 