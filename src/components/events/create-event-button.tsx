"use client";
import * as React from "react";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";
import { useRouter } from "next/navigation";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Input } from "@/components/ui/input";

const formSchema = z.object({
  title: z.string().min(3, { message: "Event title is required." }),
  description: z.string().min(10, { message: "Description is required." }),
  location: z.string().min(2, { message: "Location is required." }),
  startDate: z.string().min(1, { message: "Start date is required." }),
  endDate: z.string().min(1, { message: "End date is required." }),
});

export function CreateEventButton() {
  const [open, setOpen] = React.useState(false);
  const { toast } = useToast();
  const router = useRouter();
  const [isLoading, setIsLoading] = React.useState(false);
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: "",
      description: "",
      location: "",
      startDate: "",
      endDate: "",
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    setIsLoading(true);
    try {
      const response = await fetch("/api/events", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(values),
      });
      if (!response.ok) {
        const data = await response.json();
        throw new Error(data.error || "Something went wrong");
      }
      toast({ title: "Success", description: "Event created successfully." });
      setOpen(false);
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
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="default">Create Event</Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Create Event</DialogTitle>
        </DialogHeader>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
          <div>
            <label className="block mb-1 font-medium">Event Title</label>
            <Input {...form.register("title")}
              placeholder="e.g. Tech Meetup"
              disabled={isLoading}
            />
            <span className="text-xs text-red-500">{form.formState.errors.title?.message}</span>
          </div>
          <div>
            <label className="block mb-1 font-medium">Description</label>
            <Input {...form.register("description")}
              placeholder="Event description"
              disabled={isLoading}
            />
            <span className="text-xs text-red-500">{form.formState.errors.description?.message}</span>
          </div>
          <div>
            <label className="block mb-1 font-medium">Location</label>
            <Input {...form.register("location")}
              placeholder="e.g. Kigali, Remote"
              disabled={isLoading}
            />
            <span className="text-xs text-red-500">{form.formState.errors.location?.message}</span>
          </div>
          <div>
            <label className="block mb-1 font-medium">Start Date</label>
            <Input type="date" {...form.register("startDate")} disabled={isLoading} />
            <span className="text-xs text-red-500">{form.formState.errors.startDate?.message}</span>
          </div>
          <div>
            <label className="block mb-1 font-medium">End Date</label>
            <Input type="date" {...form.register("endDate")} disabled={isLoading} />
            <span className="text-xs text-red-500">{form.formState.errors.endDate?.message}</span>
          </div>
          <Button type="submit" className="w-full" disabled={isLoading}>
            {isLoading ? "Creating..." : "Create Event"}
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
} 