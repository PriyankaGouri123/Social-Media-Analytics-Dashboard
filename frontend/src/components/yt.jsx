import { useState } from "react";
import axios from "axios";
import { Bar, Doughnut } from "react-chartjs-2";
import {
  Chart as ChartJS,
  BarElement,
  ArcElement,
  CategoryScale,
  LinearScale,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(
  BarElement,
  ArcElement,
  CategoryScale,
  LinearScale,
  Tooltip,
  Legend
);

export default function YouTubeDashboard() {
  const [query, setQuery] = useState("");
  const [yt, setYt] = useState(null);

  const fetchYT = async () => {
    const res = await axios.get(
      `http://localhost:5000/api/youtube/${query}`
    );
    setYt(res.data.data);
  };

  const chartOptions = {
    plugins: {
      legend: {
        labels: { color: "#e5e7eb" },
      },
    },
    scales: {
      x: {
        ticks: { color: "#94a3b8" },
        grid: { color: "#1e293b" },
      },
      y: {
        ticks: { color: "#94a3b8" },
        grid: { color: "#1e293b" },
      },
    },
  };

  return (
    <div className="min-h-screen bg-slate-900 text-slate-100 p-6">
      <div className="max-w-7xl mx-auto">

        <h1 className="text-3xl font-bold mb-8">
          YouTube Channel Analytics
        </h1>

        {/* SEARCH */}
        <div className="flex gap-3 mb-10">
          <input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Enter channel name"
            className="flex-1 bg-slate-950 border border-slate-800
                       text-slate-100 placeholder-slate-500
                       px-4 py-3 rounded-lg
                       focus:outline-none focus:ring-2 focus:ring-red-500"
          />
          <button
            onClick={fetchYT}
            className="bg-red-600 hover:bg-red-700
                       text-white px-6 rounded-lg font-medium"
          >
            Search
          </button>
        </div>

        {yt && (
          <>
            {/* PROFILE */}
            <div className="bg-slate-950 border border-slate-800 rounded-xl overflow-hidden mb-10">
              {yt.banner && (
                <div className="relative">
                  <img
                    src={yt.banner}
                    className="w-full h-52 object-cover"
                  />
                  <div className="absolute inset-0 bg-black/50" />
                </div>
              )}

              <div className="p-6 flex gap-6 items-center">
                <img
                  src={yt.thumbnails.high.url}
                  className="w-28 h-28 rounded-full border-2 border-slate-700"
                />
                <div>
                  <h2 className="text-2xl font-semibold text-white">
                    {yt.title}
                  </h2>
                  <p className="text-slate-400">{yt.handle}</p>
                  <p className="mt-2 text-slate-300 max-w-2xl">
                    {yt.description.slice(0, 200)}...
                  </p>
                </div>
              </div>
            </div>

            {/* STATS */}
            <div className="grid md:grid-cols-3 gap-6 mb-12">
              <Stat title="Subscribers" value={yt.subscribers} />
              <Stat title="Total Views" value={yt.views} />
              <Stat title="Videos" value={yt.videos} />
            </div>

            {/* CHARTS */}
            <div className="grid md:grid-cols-2 gap-8">
              <Card title="Growth Comparison">
                <Bar
                  data={{
                    labels: ["Subscribers", "Views", "Videos"],
                    datasets: [
                      {
                        label: "Channel Stats",
                        data: [
                          yt.subscribers,
                          yt.views,
                          yt.videos,
                        ],
                        backgroundColor: "#ef4444",
                      },
                    ],
                  }}
                  options={chartOptions}
                />
              </Card>

              <Card title="Audience Distribution">
                <Doughnut
                  data={{
                    labels: ["Subscribers", "Views"],
                    datasets: [
                      {
                        data: [yt.subscribers, yt.views],
                        backgroundColor: ["#ef4444", "#f97316"],
                      },
                    ],
                  }}
                  options={{
                    plugins: {
                      legend: {
                        labels: { color: "#e5e7eb" },
                      },
                    },
                  }}
                />
              </Card>
            </div>

            {/* EXTRA INFO */}
            <div className="bg-slate-950 border border-slate-800
                            mt-12 p-6 rounded-xl">
              <h3 className="text-xl font-semibold mb-4">
                Channel Insights
              </h3>
              <p><b className="text-slate-400">Country:</b> {yt.country}</p>
              <p><b className="text-slate-400">Created:</b> {new Date(yt.publishedAt).toDateString()}</p>

              <p className="mt-4 font-semibold">Topics</p>
              <ul className="list-disc ml-6 text-slate-300">
                {yt.topics.map((t, i) => (
                  <li key={i}>{t}</li>
                ))}
              </ul>
            </div>
          </>
        )}
      </div>
    </div>
  );
}

/* ---------- REUSABLE UI ---------- */

function Stat({ title, value }) {
  return (
    <div className="bg-slate-950 border border-slate-800
                    p-6 rounded-xl text-center">
      <p className="text-slate-400 text-sm">{title}</p>
      <p className="text-3xl font-bold text-white mt-2">
        {Number(value).toLocaleString()}
      </p>
    </div>
  );
}

function Card({ title, children }) {
  return (
    <div className="bg-slate-950 border border-slate-800
                    p-6 rounded-xl">
      <h3 className="font-semibold mb-4 text-white">
        {title}
      </h3>
      {children}
    </div>
  );
}
