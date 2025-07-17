"use client";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";

export function JobStatsChartClient({ data, role }: { data: { month: string; count: number }[]; role: string }) {
  return (
    <div className="bg-white dark:bg-neutral-900 rounded-lg shadow p-6 mt-8">
      <h3 className="text-lg font-semibold mb-4 text-gray-900 dark:text-white">{role === "HIRER" ? "Jobs Posted Per Month" : "Jobs Applied Per Month"}</h3>
      <ResponsiveContainer width="100%" height={300}>
        <BarChart data={data} margin={{ top: 20, right: 30, left: 0, bottom: 0 }}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="month" stroke="#8884d8" />
          <YAxis allowDecimals={false} stroke="#8884d8" />
          <Tooltip />
          <Bar dataKey="count" fill="#6366f1" barSize={40} />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
} 