import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import { authOptions } from "@/lib/auth";
import { JobCreateForm } from "@/components/jobs/job-create-form";
import { DashboardHeader } from "@/components/dashboard/header";
import { DashboardShell } from "@/components/dashboard/shell";

export default async function NewJobPage() {
  const session = await getServerSession(authOptions);
  if (!session) {
    redirect("/auth/login");
  }
  if (session.user.role !== "HIRER") {
    redirect("/not-authorized");
  }
  return (
    <DashboardShell>
      <DashboardHeader heading="Create Job" text="Post a new job opportunity." />
      <div className="max-w-2xl mx-auto mt-8">
        <JobCreateForm hirerId={session.user.id} />
      </div>
    </DashboardShell>
  );
} 