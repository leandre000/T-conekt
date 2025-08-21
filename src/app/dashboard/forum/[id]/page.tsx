import { getServerSession } from "next-auth";
import { redirect, notFound } from "next/navigation";
import { authOptions } from "@/lib/auth";
import { DashboardHeader } from "@/components/dashboard/header";
import { DashboardShell } from "@/components/dashboard/shell";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import * as React from "react";
import { Textarea } from "@/components/ui/textarea";
import { Suspense } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Sparkles, Users, MessageCircle, FileText, Tag } from "lucide-react";

async function fetchThread(id: string) {
  const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL || ""}/api/forum/${id}`);
  if (!res.ok) return null;
  return res.json();
}

function ThreadDetailSkeleton() {
  return (
    <DashboardShell>
      <div className="animate-pulse space-y-6">
        <div className="h-8 w-1/3 bg-gray-200 dark:bg-neutral-800 rounded" />
        <div className="h-40 bg-gray-200 dark:bg-neutral-800 rounded-lg" />
      </div>
    </DashboardShell>
  );
}

export default async function ThreadDetailPage({ params }: { params: { id: string } }) {
  let session;
  try {
    session = await getServerSession(authOptions);
  } catch (e) {
    return <DashboardShell><div className="text-red-500">Failed to load session. Please refresh.</div></DashboardShell>;
  }
  if (!session || !session.user?.id) {
    redirect("/auth/login");
  }
  let thread;
  try {
    thread = await fetchThread(params.id);
  } catch (e) {
    return <DashboardShell><div className="text-red-500">Failed to load thread. Please try again later.</div></DashboardShell>;
  }
  if (!thread) notFound();

  async function addReply(formData: FormData) {
    'use server';
    const content = formData.get("content") as string;
    await fetch(`/api/forum/${params.id}`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ content }),
    });
    redirect(`/dashboard/forum/${params.id}`);
  }

  async function deleteThread() {
    'use server';
    await fetch(`/api/forum/${params.id}`, { method: "DELETE" });
    redirect(`/dashboard/forum`);
  }

  const handleReply = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    await addReply(formData);
  };

  return (
    <Suspense fallback={<ThreadDetailSkeleton />}>
      <DashboardShell>
        {/* Thread Hero Section */}
        <div className="flex flex-col md:flex-row items-center justify-between bg-gradient-to-br from-indigo-100 via-purple-100 to-pink-100 dark:from-neutral-900 dark:via-neutral-800 dark:to-neutral-900 rounded-2xl shadow-lg p-8 mb-8 animate-fade-in">
          <div className="flex-1 mb-6 md:mb-0">
            <h1 className="text-3xl md:text-4xl font-extrabold text-primary mb-2 drop-shadow-sm flex items-center gap-2">
              <MessageCircle className="h-8 w-8 text-indigo-500 animate-bounce" />
              {thread.title}
            </h1>
            <p className="text-lg text-gray-700 dark:text-gray-200 max-w-xl mb-4">By {thread.author?.firstName} {thread.author?.lastName || "Unknown"} • {new Date(thread.createdAt).toLocaleDateString()}</p>
          </div>
          <img
            src="/images/forum-thread-hero.svg"
            alt="Thread Hero Illustration"
            className="w-full md:w-64 h-auto rounded-xl shadow-xl animate-fade-in"
            style={{ minWidth: 180 }}
          />
        </div>
        <div className="bg-gradient-to-br from-white via-indigo-50 to-purple-50 dark:from-neutral-900 dark:via-neutral-800 dark:to-neutral-900 rounded-xl shadow-lg p-8 max-w-2xl mx-auto animate-fade-in">
          <div className="flex items-center gap-3 mb-4">
            <Avatar className="h-12 w-12">
              <AvatarImage src={thread.author?.image || "/images/avatar-placeholder.svg"} alt={`${thread.author?.firstName} ${thread.author?.lastName}` || "U"} />
              <AvatarFallback>{(thread.author?.firstName?.charAt(0) || thread.author?.lastName?.charAt(0) || "U").toUpperCase()}</AvatarFallback>
            </Avatar>
            <div>
              <div className="font-semibold text-primary text-lg">{thread.author?.firstName} {thread.author?.lastName || "Unknown"}</div>
              <div className="text-xs text-gray-400">{new Date(thread.createdAt).toLocaleDateString()}</div>
            </div>
          </div>
          <div className="mb-4 text-gray-700 dark:text-gray-300 whitespace-pre-line text-lg font-medium">{thread.content}</div>
          <div className="flex gap-2 mb-6 flex-wrap">
            {thread.tags?.map((tag: string) => (
              <span key={tag} className="flex items-center gap-1 bg-indigo-100 dark:bg-neutral-800 text-indigo-600 dark:text-indigo-300 px-3 py-1 rounded-full text-xs font-semibold shadow"><Tag className="h-4 w-4" />{tag}</span>
            ))}
          </div>
          {(session.user.id === thread.authorId || session.user.role === "ADMIN") && (
            <form action={deleteThread} className="mb-6">
              <Button type="submit" variant="destructive">Delete Thread</Button>
            </form>
          )}
          <h3 className="font-semibold mb-2 text-lg flex items-center gap-2"><MessageCircle className="h-5 w-5 text-indigo-500" />Replies</h3>
          <ul className="space-y-4 mb-6">
            {thread.replies.length === 0 ? (
              <li className="flex flex-col items-center justify-center p-8">
                <img src="/images/empty-replies.svg" alt="No replies" className="w-24 h-24 mb-2 opacity-80" />
                <div className="text-center text-gray-400">No replies yet</div>
              </li>
            ) : thread.replies.map((r: any) => (
              <li key={r.id} className="bg-white dark:bg-neutral-900 rounded-lg shadow p-4 flex gap-3 items-start animate-fade-in">
                <Avatar className="h-8 w-8 mt-1">
                  <AvatarImage src={r.author?.image || "/images/avatar-placeholder.svg"} alt={`${r.author?.firstName} ${r.author?.lastName}` || "U"} />
                  <AvatarFallback>{(r.author?.firstName?.charAt(0) || r.author?.lastName?.charAt(0) || "U").toUpperCase()}</AvatarFallback>
                </Avatar>
                <div className="flex-1">
                  <div className="text-sm text-gray-900 dark:text-gray-100 font-semibold">{r.author?.firstName} {r.author?.lastName || "Unknown"}</div>
                  <div className="text-xs text-gray-400 mb-1">{new Date(r.createdAt).toLocaleString()}</div>
                  <div className="text-gray-700 dark:text-gray-300 whitespace-pre-line">{r.content}</div>
                </div>
              </li>
            ))}
          </ul>
          <form onSubmit={handleReply} className="flex flex-col gap-2 animate-fade-in" aria-label="Reply to thread">
            <Textarea name="content" required minLength={3} className="border rounded px-2 py-1 w-full min-h-[80px] focus:ring-2 focus:ring-brand transition" placeholder="Write a reply..." aria-required="true" aria-label="Reply content" />
            <Button type="submit" className="w-full transition-transform duration-200 hover:scale-105">Reply</Button>
          </form>
        </div>
      </DashboardShell>
    </Suspense>
  );
} 