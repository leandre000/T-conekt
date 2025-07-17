"use client";
import { useRouter } from "next/navigation";
import { useToast } from "@/components/ui/use-toast";
import { Button } from "@/components/ui/button";
import * as React from "react";

export function DeleteJobButton({ jobId }: { jobId: string }) {
  const router = useRouter();
  const { toast } = useToast();
  const [isLoading, setIsLoading] = React.useState(false);

  async function handleDelete() {
    if (!confirm("Are you sure you want to delete this job?")) return;
    setIsLoading(true);
    try {
      const response = await fetch(`/api/job-postings/${jobId}`, {
        method: "DELETE",
      });
      if (!response.ok) {
        const data = await response.json();
        throw new Error(data.error || "Something went wrong");
      }
      toast({ title: "Success", description: "Job deleted successfully." });
      router.push("/dashboard/jobs");
      router.refresh();
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
    <Button type="button" variant="destructive" onClick={handleDelete} disabled={isLoading}>
      {isLoading ? "Deleting..." : "Delete"}
    </Button>
  );
} 