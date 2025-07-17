"use client";
import { useToast } from "@/components/ui/use-toast";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import * as React from "react";

export function JoinLeaveEventButton({ eventId, isParticipant }: { eventId: string; isParticipant: boolean }) {
  const { toast } = useToast();
  const router = useRouter();
  const [isLoading, setIsLoading] = React.useState(false);

  async function handleAction() {
    setIsLoading(true);
    try {
      const response = await fetch(`/api/events/${eventId}/${isParticipant ? "leave" : "join"}`, {
        method: "POST",
      });
      if (!response.ok) {
        const data = await response.json();
        throw new Error(data.error || "Something went wrong");
      }
      toast({
        title: "Success",
        description: isParticipant ? "You have left the event." : "You have joined the event.",
      });
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
    <Button
      type="button"
      variant={isParticipant ? "outline" : "default"}
      onClick={handleAction}
      disabled={isLoading}
    >
      {isLoading ? (isParticipant ? "Leaving..." : "Joining...") : isParticipant ? "Leave Event" : "Join Event"}
    </Button>
  );
} 