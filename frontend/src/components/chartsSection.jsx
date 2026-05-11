import { Bar, Line } from "react-chartjs-2";
import { useTheme } from "../context/ThemeContext";
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
  const { dark } = useTheme();

  const textColor = dark ? "#E5E7EB" : "#374151";
  const gridColor = dark ? "#374151" : "#E5E7EB";

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
        backgroundColor: "rgba(99, 102, 241, 0.1)",
        borderWidth: 3,
        tension: 0.4,
        pointRadius: 6,
        pointBackgroundColor: "#6366F1",
        fill: true,
      },
    ],
  };

  const commonOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: "top",
        labels: {
          color: textColor,
          font: { family: "Inter, sans-serif", size: 12 }
        },
      },
      tooltip: {
        backgroundColor: dark ? "#1f2937" : "#FFFFFF",
        titleColor: textColor,
        bodyColor: textColor,
        borderColor: gridColor,
        borderWidth: 1,
        padding: 12,
        cornerRadius: 8,
      },
    },
    scales: {
      x: {
        ticks: { color: textColor },
        grid: { color: gridColor, drawBorder: false },
      },
      y: {
        ticks: { color: textColor },
        grid: { color: gridColor, drawBorder: false },
      },
    },
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
      {/* Bar Chart */}
      <div className="bg-card border border-border p-6 rounded-3xl shadow-xl hover:shadow-2xl transition-all duration-300">
        <h2 className="text-xl font-bold mb-6 flex items-center gap-2">
          <span className="w-2 h-6 bg-purple-500 rounded-full" />
          Followers Overview
        </h2>
        <div className="w-full h-80">
          <Bar data={barData} options={commonOptions} />
        </div>
      </div>

      {/* Line Chart */}
      <div className="bg-card border border-border p-6 rounded-3xl shadow-xl hover:shadow-2xl transition-all duration-300">
        <h2 className="text-xl font-bold mb-6 flex items-center gap-2">
          <span className="w-2 h-6 bg-blue-500 rounded-full" />
          Reach Growth
        </h2>
        <div className="w-full h-80">
          <Line data={lineData} options={commonOptions} />
        </div>
      </div>
    </div>
  );
}
