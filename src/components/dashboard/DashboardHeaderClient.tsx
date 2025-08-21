"use client";
import { DashboardNav } from "./nav";
import { UserNav } from "./user-nav";
import { User } from "next-auth";

export default function DashboardHeaderClient({ user }: { user: User }) {
  return (
    <header className="sticky top-0 z-40 border-b bg-background">
      <div className="container flex h-16 items-center justify-between py-4">
        <DashboardNav />
        <UserNav user={user} />
      </div>
    </header>
  );
} 