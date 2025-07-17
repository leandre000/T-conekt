"use client";
import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

interface ChartWidgetProps {
  title: string;
  labels: string[];
  data: number[];
  color?: string;
}

export default function ChartWidget({ title, labels, data, color = "#6366f1" }: ChartWidgetProps) {
  return (
    <div className="bg-white dark:bg-neutral-900 rounded-lg shadow p-6 mt-8">
      <h3 className="text-lg font-semibold mb-4 text-gray-900 dark:text-white">{title}</h3>
      <Bar
        data={{
          labels,
          datasets: [
            {
              label: title,
              data,
              backgroundColor: color,
              borderRadius: 8,
            },
          ],
        }}
        options={{
          responsive: true,
          plugins: {
            legend: { display: false },
            title: { display: false },
          },
          scales: {
            x: { grid: { display: false } },
            y: { beginAtZero: true, grid: { color: "#eee" } },
          },
        }}
        height={300}
      />
    </div>
  );
} 