"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ThemeToggle } from "@/components/settings/theme-toggle";
import { Menu } from "lucide-react";
import { useSession } from "next-auth/react";

export function AppHeaderClient() {
  const pathname = usePathname();
  const { data: session } = useSession();
  return (
    <header className="w-full bg-white/90 dark:bg-neutral-900/90 shadow-lg sticky top-0 z-50 backdrop-blur-md border-b border-border">
      <nav className="container mx-auto flex items-center justify-between py-4 px-2">
        <div className="flex items-center gap-4">
          <Link href="/" className="flex items-center gap-3 group focus:outline-none focus:ring-2 focus:ring-primary" aria-label="Tale-Connect Home">
            <span className="inline-flex items-center justify-center h-12 w-12 rounded-full bg-white shadow border-2 border-primary/30 dark:bg-neutral-800 dark:border-primary/40 overflow-hidden">
              <img src="/images/logo.svg" alt="Tale-Connect Logo" className="h-10 w-10 object-contain" />
            </span>
            <span className="font-extrabold text-2xl md:text-3xl text-primary dark:text-white tracking-tight drop-shadow-sm group-hover:text-indigo-600 transition-colors duration-300 select-none">Tale-Connect</span>
          </Link>
        </div>
        <div className="hidden md:flex gap-8 items-center">
          <Link href="/" className={`px-5 py-2 rounded-lg font-semibold text-base transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-primary ${pathname === "/" ? "bg-primary/10 text-primary shadow-md" : "text-gray-700 dark:text-gray-200 hover:bg-primary/5 hover:text-primary"}`}>Home</Link>
          {!session ? (
            <>
              <Link href="/auth/login" className={`px-5 py-2 rounded-lg font-semibold text-base transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-primary ${pathname === "/auth/login" ? "bg-primary/10 text-primary shadow-md" : "text-gray-700 dark:text-gray-200 hover:bg-primary/5 hover:text-primary"}`}>Login</Link>
              <Link href="/auth/register" className={`px-5 py-2 rounded-lg font-semibold text-base bg-gradient-to-r from-pink-500 via-purple-500 to-indigo-500 text-white shadow-lg hover:scale-105 focus:scale-105 focus:outline-none focus:ring-2 focus:ring-primary transition-all duration-200 ${pathname === "/auth/register" ? "ring-2 ring-primary" : ""}`}>Sign Up</Link>
            </>
          ) : (
            <Link href="/dashboard" className={`px-5 py-2 rounded-lg font-semibold text-base transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-primary ${pathname.startsWith("/dashboard") ? "bg-primary/10 text-primary shadow-md" : "text-gray-700 dark:text-gray-200 hover:bg-primary/5 hover:text-primary"}`}>Dashboard</Link>
          )}
          <ThemeToggle />
        </div>
        {/* Mobile menu */}
        <div className="md:hidden flex items-center gap-2">
          <ThemeToggle />
          <button aria-label="Open menu" className="focus:outline-none focus:ring-2 focus:ring-primary">
            <Menu className="h-6 w-6" />
          </button>
        </div>
      </nav>
    </header>
  );
} 