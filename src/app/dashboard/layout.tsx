import { redirect } from "next/navigation"
import { getServerSession } from "next-auth"
import { authOptions } from "@/lib/auth"
import DashboardHeaderClient from "@/components/dashboard/DashboardHeaderClient"
import { User } from "next-auth"

function ClientBoundary({ user }: { user: User }) {
  "use client";
  return <DashboardHeaderClient user={user} />;
}

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const session = await getServerSession(authOptions)

  if (!session) {
    redirect("/auth/login")
  }

  return (
    <div className="flex min-h-screen flex-col space-y-6">
      <ClientBoundary user={session.user} />
      <div className="container grid flex-1 gap-12">
        <main className="flex w-full flex-1 flex-col overflow-hidden">
          {children}
        </main>
      </div>
    </div>
  )
} 