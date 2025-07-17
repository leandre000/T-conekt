"use client";

import Link from "next/link"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"
import { Home, User, Briefcase, FileText, MessageCircle, Calendar, Users, Settings, Shield, Bell } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";

const navConfig = [
  {
    title: "Overview",
    href: "/dashboard",
    icon: Home,
    color: "from-indigo-400 via-purple-400 to-pink-400",
    iconColor: "text-indigo-500",
  },
  {
    title: "Profile",
    href: "/dashboard/profile",
    icon: User,
    color: "from-blue-400 via-indigo-400 to-purple-400",
    iconColor: "text-blue-500",
  },
  {
    title: "Jobs",
    href: "/dashboard/jobs",
    icon: Briefcase,
    color: "from-pink-400 via-purple-400 to-indigo-400",
    iconColor: "text-pink-500",
  },
  {
    title: "Applications",
    href: "/dashboard/applications",
    icon: FileText,
    color: "from-pink-400 via-indigo-400 to-purple-400",
    iconColor: "text-pink-500",
  },
  {
    title: "Messages",
    href: "/dashboard/messages",
    icon: MessageCircle,
    color: "from-green-400 via-blue-400 to-purple-400",
    iconColor: "text-green-500",
  },
  {
    title: "Events",
    href: "/dashboard/events",
    icon: Calendar,
    color: "from-yellow-400 via-pink-400 to-indigo-400",
    iconColor: "text-yellow-500",
  },
  {
    title: "Forum",
    href: "/dashboard/forum",
    icon: Users,
    color: "from-purple-400 via-blue-400 to-pink-400",
    iconColor: "text-purple-500",
  },
  {
    title: "Admin",
    href: "/dashboard/admin",
    icon: Shield,
    color: "from-gray-700 via-gray-500 to-gray-400",
    iconColor: "text-gray-700",
  },
  {
    title: "Settings",
    href: "/dashboard/settings",
    icon: Settings,
    color: "from-gray-400 via-blue-400 to-pink-400",
    iconColor: "text-gray-500",
  },
  {
    title: "Notifications",
    href: "/dashboard/notifications",
    icon: Bell,
    color: "from-indigo-400 via-pink-400 to-yellow-400",
    iconColor: "text-indigo-500",
  },
];

export function DashboardNav() {
  const pathname = usePathname();
  const router = useRouter();
  const [loadingTab, setLoadingTab] = useState<string | null>(null);
  return (
    <nav className="flex items-center space-x-2 lg:space-x-4" aria-label="Dashboard Navigation">
      {navConfig.map((item) => {
        const Icon = item.icon;
        const isActive = pathname === item.href;
        return (
          <button
            key={item.href}
            aria-label={item.title}
            tabIndex={0}
            onClick={() => {
              setLoadingTab(item.href);
              router.push(item.href);
            }}
            className={cn(
              "group flex items-center gap-2 px-3 py-2 rounded-lg text-sm font-semibold transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-primary",
              isActive
                ? `bg-gradient-to-r ${item.color} text-white shadow-lg scale-105 ring-2 ring-primary`
                : "text-foreground/70 hover:bg-gradient-to-r hover:from-primary/10 hover:via-primary/5 hover:to-primary/0 hover:text-primary",
              loadingTab === item.href && !isActive ? "opacity-60 pointer-events-none" : ""
            )}
            disabled={loadingTab === item.href && !isActive}
          >
            <span className={cn("flex items-center justify-center h-8 w-8 rounded-full transition-all duration-300", isActive ? item.iconColor : "text-gray-400 group-hover:text-primary")}
              aria-hidden="true"
            >
              {loadingTab === item.href && !isActive ? (
                <svg className="animate-spin h-5 w-5 text-primary" viewBox="0 0 24 24"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none"/><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z"/></svg>
              ) : (
                <Icon className={cn("h-5 w-5 transition-transform duration-300 group-hover:scale-125", isActive ? "animate-bounce" : "")}/>
              )}
            </span>
            <span className="hidden md:inline">{item.title}</span>
            {isActive && <span className="sr-only">(current)</span>}
          </button>
        );
      })}
    </nav>
  );
} 