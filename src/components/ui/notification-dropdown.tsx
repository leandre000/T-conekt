import * as React from "react";
import { useEffect, useState } from "react";
import io from "socket.io-client";
import { Bell } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import Link from "next/link";

export function NotificationDropdown({
  notifications: initialNotifications,
  onMarkRead,
  onDelete,
  userId,
}: {
  notifications: Array<{ id: string; message: string; read: boolean; createdAt: string }>;
  onMarkRead: (id: string) => void;
  onDelete: (id: string) => void;
  userId: string;
}) {
  const [notifications, setNotifications] = useState(initialNotifications);
  useEffect(() => {
    setNotifications(initialNotifications);
  }, [initialNotifications]);
  useEffect(() => {
    const socket = io({ path: "/api/socket" });
    socket.emit("join-user", userId);
    socket.on("new-notification", (notification) => {
      setNotifications((prev) => [notification, ...prev]);
    });
    return () => socket.disconnect();
  }, [userId]);
  const unreadCount = notifications.filter((n) => !n.read).length;
  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button variant="ghost" className="relative p-2" aria-label="Notifications">
          <Bell className="h-6 w-6 animate-bounce-slow text-primary" />
          {unreadCount > 0 && (
            <span className="absolute top-1 right-1 inline-flex items-center justify-center px-1.5 py-0.5 text-xs font-bold leading-none text-white bg-red-600 rounded-full shadow-lg animate-pulse">
              {unreadCount}
            </span>
          )}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-80 p-0">
        <div className="p-4 border-b font-semibold">Notifications</div>
        <ul className="max-h-64 overflow-y-auto divide-y">
          {notifications.length === 0 ? (
            <li className="flex flex-col items-center justify-center p-8">
              <img src="/images/empty-notifications.jpg" alt="No notifications" className="w-24 h-24 mb-2 opacity-80" />
              <div className="text-center text-gray-400">No notifications</div>
            </li>
          ) : (
            notifications.slice(0, 8).map((n) => (
              <li key={n.id} className={`flex items-start gap-2 p-3 ${!n.read ? "bg-gray-100 dark:bg-neutral-800" : ""}`}>
                <div className="flex-1">
                  <div className="text-sm">{n.message}</div>
                  <div className="text-xs text-gray-400">{new Date(n.createdAt).toLocaleString()}</div>
                </div>
                {!n.read && (
                  <Button size="icon" variant="ghost" onClick={() => onMarkRead(n.id)} title="Mark as read">
                    ✓
                  </Button>
                )}
                <Button size="icon" variant="ghost" onClick={() => onDelete(n.id)} title="Delete">
                  ×
                </Button>
              </li>
            ))
          )}
        </ul>
        <div className="border-t p-2 text-center">
          <Link href="/dashboard/notifications" className="text-primary hover:underline text-sm">View all</Link>
        </div>
      </PopoverContent>
    </Popover>
  );
} 