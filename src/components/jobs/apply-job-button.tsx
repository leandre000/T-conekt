"use client";
import { useToast } from "@/components/ui/use-toast";
import { Button } from "@/components/ui/button";
import * as React from "react";

export function ApplyJobButton({ jobId, userId, alreadyApplied }: { jobId: string; userId: string; alreadyApplied: boolean }) {
  const { toast } = useToast();
  const [isLoading, setIsLoading] = React.useState(false);
  const [applied, setApplied] = React.useState(alreadyApplied);

  async function handleApply() {
    if (applied) return;
    if (!confirm("Apply to this job?")) return;
    setIsLoading(true);
    try {
      const response = await fetch("/api/applications", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ jobId, talentId: userId }),
      });
      if (!response.ok) {
        const data = await response.json();
        throw new Error(data.error || "Something went wrong");
      }
      toast({ title: "Success", description: "Applied to job successfully." });
      setApplied(true);
    } catch (error) {
      toast({
        title: "Error",
        description: error instanceof Error ? error.message : "Something went wrong",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <Button type="button" variant="default" onClick={handleApply} disabled={isLoading || applied}>
      {applied ? "Applied" : isLoading ? "Applying..." : "Apply"}
    </Button>
  );
} 