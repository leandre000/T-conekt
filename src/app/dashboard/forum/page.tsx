import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import { authOptions } from "@/lib/auth";
import { DashboardHeader } from "@/components/dashboard/header";
import { DashboardShell } from "@/components/dashboard/shell";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import * as React from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Sparkles, Users, MessageCircle, FileText } from "lucide-react";

async function fetchThreads(page = 1, search = "") {
  let baseUrl = process.env.NEXT_PUBLIC_BASE_URL;
  if (!baseUrl) {
    if (typeof window !== 'undefined') {
      baseUrl = window.location.origin;
    } else {
      baseUrl = 'http://localhost:3000';
    }
  }
  const url = `${baseUrl}/api/forum?page=${page}&search=${encodeURIComponent(search)}`;
  const res = await fetch(url);
  if (!res.ok) return { threads: [], total: 0, page: 1, totalPages: 1 };
  return res.json();
}

export default async function ForumPage(props: { searchParams: { page?: string; search?: string } }) {
  const { searchParams } = props;
  const session = await getServerSession(authOptions);
  if (!session) redirect("/auth/login");
  const params = typeof searchParams.then === 'function' ? await searchParams : searchParams;
  const page = parseInt(params.page || "1");
  const search = params.search || "";
  const { threads, total, totalPages } = await fetchThreads(page, search);
  return (
    <DashboardShell>
      {/* Forum Hero Section */}
      <div className="flex flex-col md:flex-row items-center justify-between bg-gradient-to-br from-indigo-100 via-purple-100 to-pink-100 dark:from-neutral-900 dark:via-neutral-800 dark:to-neutral-900 rounded-2xl shadow-lg p-8 mb-8 animate-fade-in">
        <div className="flex-1 mb-6 md:mb-0">
          <h1 className="text-3xl md:text-4xl font-extrabold text-primary mb-2 drop-shadow-sm flex items-center gap-2">
            <Users className="h-8 w-8 text-purple-500 animate-bounce" />
            Forum
          </h1>
          <p className="text-lg text-gray-700 dark:text-gray-200 max-w-xl mb-4">Ask questions, share knowledge, and discuss topics with the TalentConnect community. Start a new thread or join the conversation!</p>
        </div>
        <img
          src="/images/forum-hero.svg"
          alt="Forum Hero Illustration"
          className="w-full md:w-64 h-auto rounded-xl shadow-xl animate-fade-in"
          style={{ minWidth: 180 }}
        />
      </div>
      <div className="flex justify-between items-center mb-4">
        <form className="flex gap-2" action="/dashboard/forum" method="GET">
          <input name="search" defaultValue={search} placeholder="Search threads..." className="border rounded px-2 py-1" />
          <Button type="submit" variant="outline">Search</Button>
        </form>
        <Button asChild>
          <Link href="/dashboard/forum/new">New Thread</Link>
        </Button>
      </div>
      <ul className="grid gap-4">
        {threads.length === 0 ? (
          <li className="flex flex-col items-center justify-center p-8">
            <img src="/images/empty-forum.svg" alt="No threads" className="w-32 h-32 mb-4 opacity-80" />
            <div className="text-center">
              <h3 className="text-lg font-semibold mb-2">No threads</h3>
              <p className="text-sm text-muted-foreground">Be the first to start a discussion!</p>
            </div>
          </li>
        ) : threads.map((t: any) => (
          <li key={t.id} className="group bg-gradient-to-br from-white via-indigo-50 to-purple-50 dark:from-neutral-900 dark:via-neutral-800 dark:to-neutral-900 rounded-xl shadow-lg p-6 flex flex-col gap-2 hover:scale-105 hover:shadow-2xl transition-all duration-300 focus-within:ring-2 focus-within:ring-primary">
            <div className="flex items-center gap-3 mb-1">
              <Avatar className="h-10 w-10">
                <AvatarImage src={t.author?.image || "/images/avatar-placeholder.svg"} alt={t.author?.name || "U"} />
                <AvatarFallback>{t.author?.name?.charAt(0).toUpperCase() || "U"}</AvatarFallback>
              </Avatar>
              <Link href={`/dashboard/forum/${t.id}`} className="font-semibold text-primary hover:underline text-lg flex-1 line-clamp-1">{t.title}</Link>
            </div>
            <div className="flex items-center gap-2 text-xs text-gray-400">
              <span>By {t.author?.name || "Unknown"}</span>
              <span>• {new Date(t.createdAt).toLocaleDateString()}</span>
              <span>• <MessageCircle className="inline h-4 w-4 text-indigo-500 mr-1" />{t._count.replies} replies</span>
            </div>
            <div className="text-sm text-gray-700 dark:text-gray-300 line-clamp-2">{t.content}</div>
          </li>
        ))}
      </ul>
      <div className="flex justify-between items-center mt-4">
        <Button asChild disabled={page <= 1} variant="outline">
          <Link href={`?page=${page - 1}&search=${encodeURIComponent(search)}`}>Previous</Link>
        </Button>
        <span className="text-sm">Page {page} of {totalPages}</span>
        <Button asChild disabled={page >= totalPages} variant="outline">
          <Link href={`?page=${page + 1}&search=${encodeURIComponent(search)}`}>Next</Link>
        </Button>
      </div>
    </DashboardShell>
  );
} 