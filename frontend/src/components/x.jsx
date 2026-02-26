import React, { useState } from "react";
import axios from "axios";

export default function XStats() {
  const [username, setUsername] = useState("");
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(false);

  const fetchStats = async () => {
    if (!username.trim()) {
      alert("Please enter a username!");
      return;
    }

    setLoading(true);
    setStats(null);

    try {
      const res = await axios.get(
        `http://localhost:5000/api/xstats/${username}`
      );
      console.log("RAW RESPONSE:", res.data);

      if (!res.data.success) {
        alert("User not found!");
        setLoading(false);
        return;
      }

      const metrics = res.data.data;

      setStats({
        followers: metrics.followers,
        tweets: metrics.tweets,
        following: metrics.following,
        listed: metrics.listed || 0,
        likes: metrics.likes || 0,
        media: metrics.media || 0,
      });
    } catch (error) {
      console.error("❌ Frontend Error:", error);
      alert("Failed to fetch data. Try another username!");
    }

    setLoading(false);
  };

  return (
    <div className="p-6 max-w-3xl mx-auto text-gray-900 dark:text-gray-100">
      {/* Title */}
      <h1 className="text-3xl font-bold mb-6 text-center">
        X (Twitter) Analytics
      </h1>

      {/* Input */}
      <div className="flex flex-col sm:flex-row gap-3 mb-4">
        <input
          type="text"
          className="border p-2 rounded w-full sm:flex-1 bg-white dark:bg-gray-800 dark:border-gray-700 dark:text-gray-100"
          placeholder="Enter username e.g. elonmusk"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />

        <button
          onClick={fetchStats}
          className="bg-black hover:bg-gray-900 text-white px-5 py-2 rounded w-full sm:w-auto"
        >
          Search
        </button>
      </div>

      {/* Loader */}
      {loading && (
        <p className="text-center text-gray-500 dark:text-gray-400 mt-4 animate-pulse">
          Fetching data…
        </p>
      )}

      {/* Stats */}
      {stats && (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-6">
          <StatBox label="Followers" value={stats.followers} />
          <StatBox label="Tweets" value={stats.tweets} />
          <StatBox label="Following" value={stats.following} />
          <StatBox label="Listed Count" value={stats.listed} />
          <StatBox label="Likes" value={stats.likes} />
          <StatBox label="Media Posts" value={stats.media} />
        </div>
      )}
    </div>
  );
}

function StatBox({ label, value }) {
  return (
    <div className="p-4 bg-gray-100 dark:bg-gray-800 rounded-lg shadow text-center">
      <h2 className="font-semibold text-gray-700 dark:text-gray-300">{label}</h2>
      <p className="text-2xl font-bold mt-1">{value?.toLocaleString()}</p>
    </div>
  );
}
