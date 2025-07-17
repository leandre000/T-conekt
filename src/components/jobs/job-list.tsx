import Link from "next/link"
import { JobPosting } from "@prisma/client"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { ApplyJobButton } from "@/components/jobs/apply-job-button"
import { Briefcase } from "lucide-react";

interface JobListProps {
  jobs: (JobPosting & {
    applications: { id: string; talentId?: string }[]
  })[]
  showApplyButton?: boolean
  userId?: string
}

export function JobList({ jobs, showApplyButton, userId }: JobListProps) {
  if (jobs.length === 0) {
    return (
      <div className="flex min-h-[400px] flex-col items-center justify-center rounded-md border border-dashed p-8 text-center animate-in fade-in-50 bg-gradient-to-br from-indigo-50 via-purple-50 to-pink-50 dark:from-neutral-900 dark:via-neutral-800 dark:to-neutral-900">
        <img src="/images/empty-jobs.svg" alt="No jobs" className="w-32 h-32 mb-4 opacity-80" />
        <div className="mx-auto flex max-w-[420px] flex-col items-center justify-center text-center">
          <h3 className="mt-4 text-lg font-semibold">No jobs found</h3>
          <p className="mb-4 mt-2 text-sm text-muted-foreground">
            {showApplyButton
              ? "No jobs are currently available."
              : "You haven't posted any jobs yet. Start by creating a new job posting."}
          </p>
          {!showApplyButton && (
            <Button asChild>
              <Link href="/dashboard/jobs/new">Create job</Link>
            </Button>
          )}
        </div>
      </div>
    )
  }

  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
      {jobs.map((job) => (
        <Card key={job.id} className="group hover:shadow-glow hover:scale-105 transition-all duration-300 focus-within:ring-2 focus-within:ring-primary bg-gradient-to-br from-white via-indigo-50 to-purple-50 dark:from-neutral-900 dark:via-neutral-800 dark:to-neutral-900">
          <CardHeader className="flex flex-row items-center justify-between">
            <div className="flex items-center gap-2">
              <Briefcase className="h-6 w-6 text-indigo-500 group-hover:scale-110 group-hover:text-primary transition-transform duration-300 animate-bounce-slow" />
              <CardTitle>{job.title}</CardTitle>
            </div>
            <CardDescription>
              {job.location} • {job.jobType}
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex flex-wrap gap-2">
              {job.skillsRequired.map((skill) => (
                <Badge key={skill} variant="secondary">
                  {skill}
                </Badge>
              ))}
            </div>
            <p className="mt-4 text-sm text-muted-foreground">
              {job.description.length > 150
                ? `${job.description.slice(0, 150)}...`
                : job.description}
            </p>
            {job.budget && (
              <div className="mt-4 text-lg font-bold text-primary group-hover:text-indigo-600 transition-colors duration-300">
                {typeof job.budget === 'number' ? `$${job.budget.toLocaleString()}` : job.budget}
              </div>
            )}
          </CardContent>
          <CardFooter className="flex justify-between gap-2">
            <div className="text-sm text-muted-foreground">
              {job.applications.length} applications
            </div>
            {showApplyButton && userId ? (
              <ApplyJobButton jobId={job.id} userId={userId} alreadyApplied={job.applications.some(a => a.talentId === userId)} />
            ) : (
              <Button asChild variant="outline">
                <Link href={`/dashboard/jobs/${job.id}`}>View details</Link>
              </Button>
            )}
          </CardFooter>
        </Card>
      ))}
    </div>
  )
} 