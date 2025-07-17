import Link from "next/link";

export default function NotAuthorizedPage() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50 dark:bg-neutral-900">
      <div className="bg-white dark:bg-neutral-800 rounded-lg shadow p-8 max-w-md w-full text-center">
        <h1 className="text-3xl font-bold text-red-600 mb-4">Access Denied</h1>
        <p className="text-gray-700 dark:text-gray-300 mb-6">
          You do not have permission to view this page.<br />
          Please contact support if you believe this is a mistake.
        </p>
        <Link href="/dashboard">
          <button className="px-6 py-2 bg-primary text-white rounded hover:bg-primary/90 transition">
            Go to Dashboard
          </button>
        </Link>
      </div>
    </div>
  );
} 