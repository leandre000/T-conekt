import * as React from "react";

interface DashboardHeaderProps {
  heading: string;
  text?: string;
  children?: React.ReactNode;
}

export function DashboardHeader({ heading, text, children }: DashboardHeaderProps) {
  return (
    <div className="mb-6">
      <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-1">{heading}</h1>
      {text && <p className="text-gray-600 dark:text-gray-400 mb-4">{text}</p>}
      {children}
    </div>
  );
} 