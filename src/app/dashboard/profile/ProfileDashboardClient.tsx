"use client";
import { DashboardHeader } from "@/components/dashboard/header";
import { DashboardShell } from "@/components/dashboard/shell";
import { TalentProfileForm } from "@/components/profile/talent-profile-form";
import { HirerProfileForm } from "@/components/profile/hirer-profile-form";
import { User } from "lucide-react";
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';
import { Suspense } from "react";
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";

function ProfileSkeleton() {
  return (
    <DashboardShell>
      <div className="space-y-6">
        <Skeleton height={32} width="33%" borderRadius={8} />
        <Skeleton height={160} borderRadius={16} />
      </div>
    </DashboardShell>
  );
}

export default function ProfileDashboardClient() {
  const { data: session, status } = useSession();
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    if (status === "loading") return;
    if (!session?.user?.id) {
      setUser(null);
      setLoading(false);
      return;
    }
    fetch(`/api/users/${session.user.id}`)
      .then(res => res.json())
      .then(data => {
        setUser(data);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, [session, status]);
  if (status === "loading" || loading) return <ProfileSkeleton />;
  if (!user) return <ProfileSkeleton />;
  return (
    <DashboardShell>
      {/* Profile Hero Section */}
      <div className="flex flex-col md:flex-row items-center justify-between bg-gradient-to-br from-indigo-100 via-purple-100 to-pink-100 dark:from-neutral-900 dark:via-neutral-800 dark:to-neutral-900 rounded-2xl shadow-lg p-8 mb-8 animate-fade-in">
        <div className="flex-1 mb-6 md:mb-0">
          <h1 className="text-3xl md:text-4xl font-extrabold text-primary mb-2 drop-shadow-sm flex items-center gap-2">
            <User className="h-8 w-8 text-blue-500 animate-bounce" />
            Profile
          </h1>
          <p className="text-lg text-gray-700 dark:text-gray-200 max-w-xl mb-4">Manage your profile, skills, and experience. Keep your information up to date to attract the best opportunities!</p>
          <div className="mt-2 text-base text-gray-600 dark:text-gray-300">
            <b>Role:</b> {user.role}<br/>
            <b>Email:</b> {user.email}<br/>
            <b>Username:</b> {user.firstName} {user.lastName}<br/>
            {user.image && <img src={user.image} alt="Profile" className="w-20 h-20 rounded-full mt-2" />}
          </div>
        </div>
        <img
          src="/images/profile-hero.svg"
          alt="Profile Hero Illustration"
          className="w-full md:w-64 h-auto rounded-xl shadow-xl animate-fade-in"
          style={{ minWidth: 180 }}
        />
      </div>
      <DashboardHeader
        heading="Profile"
        text="Manage your profile information and preferences."
      />
      {user.role === "TALENT" ? (
        <TalentProfileForm profile={user.talentProfile} />
      ) : (
        <HirerProfileForm profile={user.hirerProfile} />
      )}
    </DashboardShell>
  );
} 