"use client";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { DashboardHeader } from "@/components/dashboard/header";
import { DashboardShell } from "@/components/dashboard/shell";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/components/ui/use-toast";
import { useRouter } from "next/navigation";
import * as React from "react";

const formSchema = z.object({
  title: z.string().min(3, { message: "Title is required." }),
  content: z.string().min(10, { message: "Content is required." }),
  tags: z.string().optional(),
});

export default function NewThreadPage() {
  const { toast } = useToast();
  const router = useRouter();
  const [isLoading, setIsLoading] = React.useState(false);
  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: { title: "", content: "", tags: "" },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    setIsLoading(true);
    try {
      const res = await fetch("/api/forum", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          title: values.title,
          content: values.content,
          tags: values.tags ? values.tags.split(",").map((t) => t.trim()).filter(Boolean) : [],
        }),
      });
      if (res.ok) {
        const thread = await res.json();
        toast({ title: "Thread created!", description: "Your thread was posted." });
        router.push(`/dashboard/forum/${thread.id}`);
      } else {
        const data = await res.json();
        throw new Error(data.error || "Something went wrong");
      }
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : "An unknown error occurred";
      toast({ title: "Error", description: errorMessage, variant: "destructive" });
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <DashboardShell>
      <DashboardHeader heading="New Thread" text="Start a new discussion." />
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="bg-white dark:bg-neutral-900 rounded-lg shadow p-6 max-w-xl mx-auto flex flex-col gap-4 animate-fade-in"
        aria-label="Create new forum thread"
      >
        <div>
          <label htmlFor="title" className="block mb-1 font-medium">Title</label>
          <Input id="title" {...form.register("title")} placeholder="Thread title" disabled={isLoading} aria-required="true" aria-invalid={!!form.formState.errors.title} />
          <span className="text-xs text-red-500">{form.formState.errors.title?.message}</span>
        </div>
        <div>
          <label htmlFor="content" className="block mb-1 font-medium">Content</label>
          <Textarea id="content" {...form.register("content")} placeholder="Write your question or topic..." disabled={isLoading} aria-required="true" aria-invalid={!!form.formState.errors.content} />
          <span className="text-xs text-red-500">{form.formState.errors.content?.message}</span>
        </div>
        <div>
          <label htmlFor="tags" className="block mb-1 font-medium">Tags (comma separated)</label>
          <Input id="tags" {...form.register("tags")} placeholder="e.g. React, Hiring, Freelance" disabled={isLoading} />
        </div>
        <Button type="submit" className="w-full transition-transform duration-200 hover:scale-105" disabled={isLoading} aria-busy={isLoading}>
          {isLoading ? "Creating..." : "Create Thread"}
        </Button>
      </form>
    </DashboardShell>
  );
} 