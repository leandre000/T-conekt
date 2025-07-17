import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import EventsDashboardClient from "./EventsDashboardClient";

export default function EventsPage() {
  return <EventsDashboardClient />;
} 