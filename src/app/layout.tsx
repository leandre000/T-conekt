import { Inter } from "next/font/google"
import ClientProviders from "@/components/ClientProviders"
import "./globals.css"
import { AppHeaderClient } from "@/components/layout/AppHeaderClient";
import { Toaster } from "@/components/ui/toaster";

const inter = Inter({ subsets: ["latin"] })

export const metadata = {
  title: "TalentConnect",
  description: "Connect with global talent and opportunities",
  icons: {
    icon: '/favicon.ico',
  },
}

function AppFooter() {
  return (
    <footer className="w-full bg-gradient-to-br from-indigo-50 via-purple-50 to-pink-50 dark:from-neutral-900 dark:via-neutral-800 dark:to-neutral-900 border-t border-border py-10 mt-12 animate-fade-in">
      <div className="container mx-auto grid grid-cols-1 md:grid-cols-4 gap-8 text-sm text-gray-600 dark:text-gray-400">
        <div className="flex flex-col gap-2">
          <div className="flex items-center gap-2 mb-2">
            <img src="/images/logo.svg" alt="TalentConnect Logo" className="h-8 w-auto" />
            <span className="font-bold text-gray-700 dark:text-gray-200 text-lg">TalentConnect</span>
          </div>
          <p className="text-xs">Connect with global talent and opportunities. Modern, secure, and vibrant platform for professionals.</p>
          <div className="flex gap-3 mt-2">
            {/* Social links here */}
          </div>
        </div>
        <div>
          <h4 className="font-semibold mb-2 text-gray-900 dark:text-white">Quick Links</h4>
          <ul className="space-y-1">
            <li><a href="/jobs" className="hover:underline focus:underline">Jobs</a></li>
            <li><a href="/forum" className="hover:underline focus:underline">Forum</a></li>
            <li><a href="/dashboard" className="hover:underline focus:underline">Dashboard</a></li>
            <li><a href="/auth/register" className="hover:underline focus:underline">Sign Up</a></li>
          </ul>
        </div>
        <div>
          <h4 className="font-semibold mb-2 text-gray-900 dark:text-white">Contact</h4>
          <ul className="space-y-1">
            <li>Email: <a href="mailto:support@talentconnect.com" className="hover:underline focus:underline">support@talentconnect.com</a></li>
            <li>Phone: <a href="tel:+1234567890" className="hover:underline focus:underline">+1 234 567 890</a></li>
          </ul>
        </div>
        <div>
          <h4 className="font-semibold mb-2 text-gray-900 dark:text-white">Legal</h4>
          <ul className="space-y-1">
            <li><a href="/privacy" className="hover:underline focus:underline">Privacy Policy</a></li>
            <li><a href="/terms" className="hover:underline focus:underline">Terms of Service</a></li>
          </ul>
        </div>
      </div>
      <div className="container mx-auto mt-8 text-center text-xs text-gray-400 dark:text-gray-500">
        &copy; {new Date().getFullYear()} TalentConnect. All rights reserved.
      </div>
    </footer>
  )
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>
        <ClientProviders>
            <AppHeaderClient />
            <main className="min-h-[80vh]">{children}</main>
            <AppFooter />
            <Toaster />
        </ClientProviders>
      </body>
    </html>
  );
} 