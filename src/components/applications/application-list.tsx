import Link from "next/link"
import { Application, JobPosting, User, UserRole } from "@prisma/client"

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
import { FileText } from "lucide-react";

interface ApplicationListProps {
  applications: (Application & {
    job: JobPosting
    talent: User & {
      talentProfile: {
        title: string
      } | null
    }
  })[]
  userRole: UserRole
}

export function ApplicationList({ applications, userRole }: ApplicationListProps) {
  if (applications.length === 0) {
    return (
      <div className="flex min-h-[400px] flex-col items-center justify-center rounded-md border border-dashed p-8 text-center animate-in fade-in-50 bg-gradient-to-br from-indigo-50 via-purple-50 to-pink-50 dark:from-neutral-900 dark:via-neutral-800 dark:to-neutral-900">
        <img src="/images/empty-applications.svg" alt="No applications" className="w-32 h-32 mb-4 opacity-80" />
        <div className="mx-auto flex max-w-[420px] flex-col items-center justify-center text-center">
          <h3 className="mt-4 text-lg font-semibold">No applications</h3>
          <p className="mb-4 mt-2 text-sm text-muted-foreground">
            {userRole === "TALENT"
              ? "You haven't applied to any jobs yet."
              : "You haven't received any applications yet."}
          </p>
          {userRole === "TALENT" && (
            <Button asChild>
              <Link href="/jobs">Browse jobs</Link>
            </Button>
          )}
        </div>
      </div>
    )
  }

  return (
    <div className="grid gap-4">
      {applications.map((application) => (
        <Card key={application.id} className="group hover:shadow-glow hover:scale-105 transition-all duration-300 focus-within:ring-2 focus-within:ring-primary bg-gradient-to-br from-white via-indigo-50 to-purple-50 dark:from-neutral-900 dark:via-neutral-800 dark:to-neutral-900">
          <CardHeader className="flex flex-row items-center gap-2">
            <FileText className="h-6 w-6 text-indigo-500 group-hover:scale-110 group-hover:text-primary transition-transform duration-300 animate-bounce-slow" />
            <CardTitle>
              {userRole === "TALENT"
                ? application.job.title
                : `${application.talent.firstName} ${application.talent.lastName} - ${application.talent.talentProfile?.title}`}
            </CardTitle>
            <CardDescription>
              {userRole === "TALENT"
                ? application.job.location
                : `Applied for ${application.job.title}`}
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex items-center gap-2">
              <Badge
                variant={
                  application.status === "ACCEPTED"
                    ? "default"
                    : application.status === "REJECTED"
                    ? "destructive"
                    : "secondary"
                }
              >
                {application.status}
              </Badge>
              <span className="text-sm text-muted-foreground">
                Applied {new Date(application.createdAt).toLocaleDateString()}
              </span>
            </div>
            <p className="mt-4 text-sm text-muted-foreground">
              {application.coverLetter && application.coverLetter.length > 150
                ? `${application.coverLetter.slice(0, 150)}...`
                : application.coverLetter || "No cover letter provided"}
            </p>
          </CardContent>
          <CardFooter>
            <Button asChild variant="outline">
              <Link href={`/dashboard/applications/${application.id}`}>
                View details
              </Link>
            </Button>
          </CardFooter>
        </Card>
      ))}
    </div>
  )
} 