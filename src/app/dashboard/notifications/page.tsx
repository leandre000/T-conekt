import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import { authOptions } from "@/lib/auth";
import { DashboardHeader } from "@/components/dashboard/header";
import { DashboardShell } from "@/components/dashboard/shell";
import { Button } from "@/components/ui/button";
import Link from "next/link";

async function fetchNotifications(page = 1) {
  let baseUrl = process.env.NEXT_PUBLIC_BASE_URL;
  if (!baseUrl) {
    if (typeof window !== 'undefined') {
      baseUrl = window.location.origin;
    } else {
      baseUrl = 'http://localhost:3000';
    }
  }
  const url = `${baseUrl}/api/notifications?page=${page}`;
  const res = await fetch(url);
  if (!res.ok) return { notifications: [], total: 0, page: 1, totalPages: 1 };
  return res.json();
}

export default async function NotificationsPage(props: { searchParams: { page?: string } }) {
  const { searchParams } = props;
  const session = await getServerSession(authOptions);
  if (!session) redirect("/auth/login");
  // Await searchParams if it's a promise (per Next.js docs)
  const params = typeof searchParams.then === 'function' ? await searchParams : searchParams;
  const page = parseInt(params.page || "1");
  const { notifications, total, totalPages } = await fetchNotifications(page);
  return (
    <DashboardShell>
      <DashboardHeader heading="Notifications" text="All your notifications." />
      <div className="bg-white dark:bg-neutral-900 rounded-lg shadow p-6 bg-gradient-to-br from-white via-indigo-50 to-purple-50 dark:from-neutral-900 dark:via-neutral-800 dark:to-neutral-900">
        <ul className="divide-y">
          {notifications.length === 0 ? (
            <li className="flex flex-col items-center justify-center p-8">
              <img src="/images/empty-notifications.jpg" alt="No notifications" className="w-24 h-24 mb-2 opacity-80" />
              <div className="text-center text-gray-400">No notifications</div>
            </li>
          ) : notifications.map((n: any) => (
            <li key={n.id} className={`flex items-center gap-4 p-4 ${!n.read ? "bg-gray-100 dark:bg-neutral-800" : ""}`}>
              <div className="flex-1">
                <div className="text-sm">{n.message}</div>
                <div className="text-xs text-gray-400">{new Date(n.createdAt).toLocaleString()}</div>
              </div>
              {!n.read && (
                <form action={`/api/notifications`} method="PATCH">
                  <input type="hidden" name="notificationIds" value={n.id} />
                  <Button size="sm" variant="outline">Mark as read</Button>
                </form>
              )}
              <form action={`/api/notifications?notificationId=${n.id}`} method="DELETE">
                <Button size="sm" variant="destructive">Delete</Button>
              </form>
            </li>
          ))}
        </ul>
        <div className="flex justify-between items-center mt-4">
          <Button asChild disabled={page <= 1} variant="outline">
            <Link href={`?page=${page - 1}`}>Previous</Link>
          </Button>
          <span className="text-sm">Page {page} of {totalPages}</span>
          <Button asChild disabled={page >= totalPages} variant="outline">
            <Link href={`?page=${page + 1}`}>Next</Link>
          </Button>
        </div>
      </div>
    </DashboardShell>
  );
} 