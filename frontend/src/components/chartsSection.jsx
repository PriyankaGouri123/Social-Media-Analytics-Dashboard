import { Bar, Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  Title,
  Tooltip,
  Legend,
  BarElement,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
} from "chart.js";

ChartJS.register(
  Title,
  Tooltip,
  Legend,
  BarElement,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement
);

export default function ChartsSection() {
  const isDark = document.documentElement.classList.contains("dark");

  const textColor = isDark ? "#E5E7EB" : "#374151";
  const gridColor = isDark ? "#374151" : "#E5E7EB";

  const barData = {
    labels: ["Instagram", "Twitter", "Facebook", "YouTube"],
    datasets: [
      {
        label: "Followers",
        data: [12000, 8000, 15000, 20000],
        backgroundColor: ["#E1306C", "#1DA1F2", "#1877F2", "#FF0000"],
        borderRadius: 8,
      },
    ],
  };

  const lineData = {
    labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun"],
    datasets: [
      {
        label: "Reach Growth",
        data: [3000, 6000, 9000, 15000, 20000, 25000],
        borderColor: "#6366F1",
        borderWidth: 2,
        tension: 0.4,
        pointRadius: 4,
      },
    ],
  };

  const commonOptions = {
    maintainAspectRatio: false,
    plugins: {
      legend: {
        labels: {
          color: textColor,
        },
      },
      tooltip: {
        backgroundColor: isDark ? "#111827" : "#FFFFFF",
        titleColor: textColor,
        bodyColor: textColor,
        borderColor: gridColor,
        borderWidth: 1,
      },
    },
    scales: {
      x: {
        ticks: { color: textColor },
        grid: { color: gridColor },
      },
      y: {
        ticks: { color: textColor },
        grid: { color: gridColor },
      },
    },
  };

  return (
    <div className="p-4 sm:p-6 grid grid-cols-1 md:grid-cols-2 gap-6">
      {/* Bar Chart */}
      <div className="bg-card border border-border p-4 sm:p-6 rounded-2xl shadow-lg">
        <h2 className="text-lg sm:text-xl font-semibold mb-4">
          Followers Overview
        </h2>
        <div className="w-full h-64 sm:h-80">
          <Bar data={barData} options={commonOptions} />
        </div>
      </div>

      {/* Line Chart */}
      <div className="bg-card border border-border p-4 sm:p-6 rounded-2xl shadow-lg">
        <h2 className="text-lg sm:text-xl font-semibold mb-4">
          Reach Growth
        </h2>
        <div className="w-full h-64 sm:h-80">
          <Line data={lineData} options={commonOptions} />
        </div>
      </div>
    </div>
  );
}
