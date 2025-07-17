import { format } from "date-fns"
import Link from "next/link"

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
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { CalendarIcon, MapPinIcon, UsersIcon, Calendar } from "lucide-react"

interface EventListProps {
  events: any[]
}

export function EventList({ events = [] }: EventListProps) {
  if (!Array.isArray(events) || events.length === 0) {
    return (
      <div className="flex min-h-[400px] flex-col items-center justify-center rounded-md border border-dashed p-8 text-center animate-in fade-in-50 bg-gradient-to-br from-indigo-50 via-purple-50 to-pink-50 dark:from-neutral-900 dark:via-neutral-800 dark:to-neutral-900">
        <img src="/images/empty-events.svg" alt="No events" className="w-32 h-32 mb-4 opacity-80" />
        <div className="mx-auto flex max-w-[420px] flex-col items-center justify-center text-center">
          <h3 className="mt-4 text-lg font-semibold">No events</h3>
          <p className="mb-4 mt-2 text-sm text-muted-foreground">
            Get started by creating a new event.
          </p>
        </div>
      </div>
    )
  }

  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
      {events.map((event) => (
        <Card key={event.id} className="group hover:shadow-glow hover:scale-105 transition-all duration-300 focus-within:ring-2 focus-within:ring-primary bg-gradient-to-br from-white via-indigo-50 to-purple-50 dark:from-neutral-900 dark:via-neutral-800 dark:to-neutral-900">
          <CardHeader>
            <div className="flex items-center justify-between gap-2">
              <div className="flex items-center gap-2">
                <Calendar className="h-6 w-6 text-indigo-500 group-hover:scale-110 group-hover:text-primary transition-transform duration-300 animate-bounce-slow" />
                <CardTitle className="line-clamp-1">{event.title}</CardTitle>
              </div>
              <Badge variant={event.type === "WORKSHOP" ? "default" : "secondary"}>
                {event.type}
              </Badge>
            </div>
            <CardDescription className="line-clamp-2">
              {event.description}
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col gap-2">
              <span className="text-sm text-muted-foreground">Location: <span className="font-semibold text-primary group-hover:text-indigo-600 transition-colors duration-300">{event.location}</span></span>
              <span className="text-sm text-muted-foreground">Start: <span className="font-semibold">{new Date(event.startDate).toLocaleDateString()}</span></span>
              <span className="text-sm text-muted-foreground">End: <span className="font-semibold">{new Date(event.endDate).toLocaleDateString()}</span></span>
              <span className="text-sm text-muted-foreground">Organizer: <span className="font-semibold">{event.organizer?.name || '-'}</span></span>
              <span className="text-sm text-muted-foreground">Participants: <span className="font-semibold">{event.participants.length}</span></span>
            </div>
          </CardContent>
          <CardFooter>
            <Button asChild className="w-full">
              <Link href={`/dashboard/events/${event.id}`}>View Details</Link>
            </Button>
          </CardFooter>
        </Card>
      ))}
    </div>
  )
} 