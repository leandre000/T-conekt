"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "@/components/ui/use-toast";

export function BrowseJobsButton() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  async function handleClick() {
    setLoading(true);
    try {
      const res = await fetch("/api/auth/session");
      const session = await res.json();
      if (!session || !session.user) {
        toast({
          title: "Please login or sign up",
          description: "You need to be logged in to browse jobs. Please login or create an account.",
        });
        setLoading(false);
        return;
      }
      router.push("/dashboard/jobs");
    } catch (e) {
      toast({
        title: "Error",
        description: "Could not check login status. Please try again.",
        variant: "destructive",
      });
      setLoading(false);
    }
  }

  return (
    <button
      type="button"
      onClick={handleClick}
      disabled={loading}
      className="px-8 py-3 rounded border border-primary text-primary font-semibold text-lg shadow hover:bg-primary hover:text-white hover:scale-105 hover:shadow-2xl focus:outline-none focus:ring-2 focus:ring-primary transition-all duration-300 animate-fade-in"
    >
      {loading ? "Checking..." : "Browse Jobs"}
    </button>
  );
} 