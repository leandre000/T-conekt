import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { UserRole } from "@prisma/client"
import { Briefcase, FileText, MessageCircle, Calendar } from "lucide-react";

interface OverviewProps {
  stats: {
    applications: number
    jobs: number
    messages: number
    events: number
  }
  role: UserRole
}

export function Overview({ stats, role }: OverviewProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 w-full">
      {role === "TALENT" ? (
        <>
          <Card className="group hover:shadow-glow hover:scale-105 transition-all duration-300 focus-within:ring-2 focus-within:ring-primary">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium flex items-center gap-2">
                <FileText className="h-6 w-6 text-indigo-500 group-hover:scale-110 group-hover:text-primary transition-transform duration-300" />
                Applications
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-primary group-hover:text-indigo-600 transition-colors duration-300">{stats.applications}</div>
              <p className="text-xs text-muted-foreground">Total applications submitted</p>
            </CardContent>
          </Card>
          <Card className="group hover:shadow-glow hover:scale-105 transition-all duration-300 focus-within:ring-2 focus-within:ring-primary">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium flex items-center gap-2">
                <MessageCircle className="h-6 w-6 text-indigo-500 group-hover:scale-110 group-hover:text-primary transition-transform duration-300" />
                Messages
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-primary group-hover:text-indigo-600 transition-colors duration-300">{stats.messages}</div>
              <p className="text-xs text-muted-foreground">Total messages sent and received</p>
            </CardContent>
          </Card>
          <Card className="group hover:shadow-glow hover:scale-105 transition-all duration-300 focus-within:ring-2 focus-within:ring-primary">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium flex items-center gap-2">
                <Calendar className="h-6 w-6 text-indigo-500 group-hover:scale-110 group-hover:text-primary transition-transform duration-300" />
                Events
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-primary group-hover:text-indigo-600 transition-colors duration-300">{stats.events}</div>
              <p className="text-xs text-muted-foreground">Events registered</p>
            </CardContent>
          </Card>
        </>
      ) : (
        <>
          <Card className="group hover:shadow-glow hover:scale-105 transition-all duration-300 focus-within:ring-2 focus-within:ring-primary">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium flex items-center gap-2">
                <Briefcase className="h-6 w-6 text-indigo-500 group-hover:scale-110 group-hover:text-primary transition-transform duration-300" />
                Jobs Posted
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-primary group-hover:text-indigo-600 transition-colors duration-300">{stats.jobs}</div>
              <p className="text-xs text-muted-foreground">Total jobs posted</p>
            </CardContent>
          </Card>
          <Card className="group hover:shadow-glow hover:scale-105 transition-all duration-300 focus-within:ring-2 focus-within:ring-primary">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium flex items-center gap-2">
                <FileText className="h-6 w-6 text-indigo-500 group-hover:scale-110 group-hover:text-primary transition-transform duration-300" />
                Applications
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-primary group-hover:text-indigo-600 transition-colors duration-300">{stats.applications}</div>
              <p className="text-xs text-muted-foreground">Total applications received</p>
            </CardContent>
          </Card>
          <Card className="group hover:shadow-glow hover:scale-105 transition-all duration-300 focus-within:ring-2 focus-within:ring-primary">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium flex items-center gap-2">
                <MessageCircle className="h-6 w-6 text-indigo-500 group-hover:scale-110 group-hover:text-primary transition-transform duration-300" />
                Messages
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-primary group-hover:text-indigo-600 transition-colors duration-300">{stats.messages}</div>
              <p className="text-xs text-muted-foreground">Total messages sent and received</p>
            </CardContent>
          </Card>
          <Card className="group hover:shadow-glow hover:scale-105 transition-all duration-300 focus-within:ring-2 focus-within:ring-primary">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium flex items-center gap-2">
                <Calendar className="h-6 w-6 text-indigo-500 group-hover:scale-110 group-hover:text-primary transition-transform duration-300" />
                Events
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-primary group-hover:text-indigo-600 transition-colors duration-300">{stats.events}</div>
              <p className="text-xs text-muted-foreground">Events created</p>
            </CardContent>
          </Card>
        </>
      )}
    </div>
  )
} 