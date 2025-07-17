import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import MessagesDashboardClient from "./MessagesDashboardClient";

export default function MessagesPage() {
  return <MessagesDashboardClient />;
} 