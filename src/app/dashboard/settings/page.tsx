"use client";

import { DashboardHeader } from "@/components/dashboard/header";
import { DashboardShell } from "@/components/dashboard/shell";
import { ThemeToggle } from "@/components/settings/theme-toggle";
import { Bell, User, Trash2 } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { signOut } from "next-auth/react";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { useSession } from "next-auth/react";
import { useToast } from "@/components/ui/use-toast";

export default function SettingsPage() {
  const { data: session } = useSession();
  const { toast } = useToast();
  const [email, setEmail] = useState(session?.user?.email || "");
  const [name, setName] = useState((session?.user?.firstName || "") + " " + (session?.user?.lastName || "") || "");
  const [avatar, setAvatar] = useState<string | null>(session?.user?.image || null);
  const [avatarFile, setAvatarFile] = useState<File | null>(null);
  const [deleting, setDeleting] = useState(false);
  const [saving, setSaving] = useState(false);

  function handleAvatarChange(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (file) {
      setAvatarFile(file);
      const reader = new FileReader();
      reader.onload = (ev) => {
        setAvatar(ev.target?.result as string);
      };
      reader.readAsDataURL(file);
    }
  }

  async function handleSaveProfile(e: React.FormEvent) {
    e.preventDefault();
    setSaving(true);
    // Simulate API call to save profile image and account info
    setTimeout(() => {
      setSaving(false);
      toast({ title: "Profile updated!", description: "Your profile info was saved." });
    }, 1200);
  }

  async function handleDeleteAccount() {
    if (!window.confirm("Are you sure you want to delete your account? This action cannot be undone.")) return;
    setDeleting(true);
    // Simulate API call
    setTimeout(() => {
      setDeleting(false);
      toast({ title: "Account deleted", description: "Your account has been deleted." });
      window.location.href = "/";
    }, 1200);
  }

  function handleLogout() {
    signOut();
  }
  return (
    <DashboardShell>
      <DashboardHeader
        heading="Settings"
        text="Manage your preferences, theme, notifications, and account settings."
      />
      <div className="grid gap-8 max-w-2xl mx-auto py-8 animate-fade-in">
        {/* Profile Picture Section */}
        <section className="bg-white dark:bg-neutral-900 rounded-lg shadow p-6 flex flex-col md:flex-row items-center justify-between gap-4 transition-all duration-300 hover:shadow-lg focus-within:ring-2 focus-within:ring-blue-500" tabIndex={0} aria-label="Profile picture settings">
          <div>
            <h2 className="text-xl font-semibold mb-1 text-gray-900 dark:text-white flex items-center gap-2">Profile Picture</h2>
            <p className="text-gray-600 dark:text-gray-400">Update your profile picture.</p>
          </div>
          <form className="flex flex-col items-center gap-2" onSubmit={handleSaveProfile}>
            <Avatar className="h-20 w-20">
              {avatar ? (
                <AvatarImage src={avatar} alt={name} />
              ) : (
                <AvatarFallback>{name.charAt(0).toUpperCase()}</AvatarFallback>
              )}
            </Avatar>
            <input type="file" accept="image/*" onChange={handleAvatarChange} className="mt-2" />
            {avatarFile && <span className="text-xs text-gray-500">{avatarFile.name}</span>}
            <Button type="submit" className="mt-2" disabled={saving}>{saving ? "Saving..." : "Save"}</Button>
          </form>
        </section>
        {/* Theme Section */}
        <section className="bg-white dark:bg-neutral-900 rounded-lg shadow p-6 flex flex-col md:flex-row items-center justify-between gap-4 transition-all duration-300 hover:shadow-lg focus-within:ring-2 focus-within:ring-brand" tabIndex={0} aria-label="Theme settings">
          <div>
            <h2 className="text-xl font-semibold mb-1 text-gray-900 dark:text-white flex items-center gap-2"><span className="inline-block"><Bell className="h-6 w-6 text-indigo-500" /></span>Theme</h2>
            <p className="text-gray-600 dark:text-gray-400">Switch between light and dark mode.</p>
          </div>
          <ThemeToggle />
        </section>
        {/* Notification Preferences */}
        <section className="bg-white dark:bg-neutral-900 rounded-lg shadow p-6 transition-all duration-300 hover:shadow-lg focus-within:ring-2 focus-within:ring-indigo-500" tabIndex={0} aria-label="Notification settings">
          <h2 className="text-xl font-semibold mb-1 text-gray-900 dark:text-white flex items-center gap-2"><Bell className="h-6 w-6 text-indigo-500" />Notifications</h2>
          <p className="text-gray-600 dark:text-gray-400 mb-2">Manage your notification preferences.</p>
          <div className="flex flex-col gap-3">
            <label className="flex items-center gap-2">
              <input type="checkbox" className="accent-indigo-500 h-5 w-5" defaultChecked />
              <span className="text-gray-700 dark:text-gray-200">Email notifications</span>
            </label>
            <label className="flex items-center gap-2">
              <input type="checkbox" className="accent-indigo-500 h-5 w-5" defaultChecked />
              <span className="text-gray-700 dark:text-gray-200">Push notifications</span>
            </label>
            <label className="flex items-center gap-2">
              <input type="checkbox" className="accent-indigo-500 h-5 w-5" />
              <span className="text-gray-700 dark:text-gray-200">SMS notifications</span>
            </label>
          </div>
        </section>
        {/* Account Section */}
        <section className="bg-white dark:bg-neutral-900 rounded-lg shadow p-6 transition-all duration-300 hover:shadow-lg focus-within:ring-2 focus-within:ring-pink-500" tabIndex={0} aria-label="Account settings">
          <h2 className="text-xl font-semibold mb-1 text-gray-900 dark:text-white flex items-center gap-2"><User className="h-6 w-6 text-pink-500" />Account</h2>
          <p className="text-gray-600 dark:text-gray-400 mb-2">Update your account information or delete your account.</p>
          <form className="flex flex-col gap-4 max-w-md" onSubmit={handleSaveProfile}>
            <label className="flex flex-col gap-1">
              <span className="text-sm font-medium text-gray-700 dark:text-gray-200">Name</span>
              <Input value={name} onChange={e => setName(e.target.value)} className="bg-gray-50 dark:bg-neutral-800" />
            </label>
            <label className="flex flex-col gap-1">
              <span className="text-sm font-medium text-gray-700 dark:text-gray-200">Email</span>
              <Input value={email} onChange={e => setEmail(e.target.value)} className="bg-gray-50 dark:bg-neutral-800" />
            </label>
            <Button type="submit" className="w-fit bg-gradient-to-r from-pink-500 via-purple-500 to-indigo-500 text-white shadow-lg hover:scale-105 focus:scale-105 focus:outline-none focus:ring-2 focus:ring-primary transition-all duration-200" disabled={saving}>{saving ? "Saving..." : "Save"}</Button>
          </form>
          <div className="mt-6 flex flex-col gap-2">
            <span className="text-sm text-gray-500">Danger zone</span>
            <Button type="button" variant="destructive" className="flex items-center gap-2 w-fit" disabled={deleting} onClick={handleDeleteAccount}>
              <Trash2 className="h-5 w-5" /> {deleting ? "Deleting..." : "Delete Account"}
            </Button>
          </div>
          <div className="mt-6 flex flex-col gap-2">
            <Button type="button" variant="outline" className="flex items-center gap-2 w-fit" onClick={handleLogout}>
              Logout
            </Button>
          </div>
        </section>
      </div>
    </DashboardShell>
  );
} 