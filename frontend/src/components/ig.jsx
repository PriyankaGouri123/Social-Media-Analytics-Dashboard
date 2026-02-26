import { useState } from "react";
import axios from "axios";
import { motion } from "framer-motion";

export default function Insta() {
  const [username, setUsername] = useState("");
  const [stats, setStats] = useState(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const fetchStats = async () => {
    try {
      setLoading(true);
      const res = await axios.get(`http://localhost:5000/instagram/${username}`);
      setStats(res.data.data);
    } catch (err) {
      setError("Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  const computeEngagement = (s) => {
    if (!s || !s.followers) return null;
    const followers = Number(s.followers) || 0;
    const baseRate = followers < 10000 ? 5 : followers < 100000 ? 3 : 2;
    const estAvgLikes = Math.round((followers * baseRate) / 100);
    return { engagementRate: baseRate, estAvgLikes };
  };

  const engagement = computeEngagement(stats);
  const instagramUrl = stats
    ? `https://www.instagram.com/${stats.username}/`
    : "";

  return (
    <div className="min-h-screen bg-background text-foreground">
      <div className="p-4 md:p-6 max-w-4xl mx-auto">

        {/* Header */}
        <h2 className="text-2xl md:text-3xl font-bold mb-6 text-center">
          📸 Instagram Dashboard
        </h2>

        {/* Input */}
        <div className="flex flex-col sm:flex-row gap-3 items-center">
          <input
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            placeholder="Enter Instagram username"
            className="border px-4 py-2 rounded-lg bg-background w-full sm:w-80"
          />

          <button
            onClick={fetchStats}
            className="bg-primary text-primary-foreground px-4 py-2 rounded-lg"
          >
            Get Report
          </button>

          <button
            onClick={() => {
              setUsername("");
              setStats(null);
              setError("");
            }}
            className="bg-secondary text-secondary-foreground px-4 py-2 rounded-lg"
          >
            Clear
          </button>
        </div>

        {error && <p className="text-destructive mt-4">{error}</p>}

        {/* Loader */}
        {loading && (
          <div className="mt-8 text-center text-muted-foreground">
            Loading...
          </div>
        )}

        {/* Result Card */}
        {stats && !loading && (
          <div className="mt-12 flex justify-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="w-full max-w-xl bg-card border rounded-3xl shadow-xl p-6"
            >
              {/* Profile */}
              <div className="flex flex-col items-center -mt-16 mb-4">
                <img
                  src={stats.profile_pic_url || "/fallback-avatar.png"}
                  className="w-28 h-28 rounded-full border shadow"
                />

                <a
                  href={instagramUrl}
                  target="_blank"
                  className="text-xl font-semibold mt-3 hover:underline"
                >
                  {stats.full_name}
                </a>

                <span className="text-muted-foreground">
                  @{stats.username}
                </span>
              </div>

              {/* Stats */}
              <div className="grid grid-cols-3 text-center gap-4 mt-6">
                <Stat label="Followers" value={stats.followers} />
                <Stat label="Following" value={stats.following} />
                <Stat label="Posts" value={stats.media_count} />
              </div>

              {/* Insights */}
              <div className="mt-6 border-t pt-4">
                <h3 className="text-sm text-muted-foreground">Insights</h3>

                <div className="grid grid-cols-3 text-center mt-3 gap-2">
                  <InsightBox
                    value={engagement?.engagementRate + "%"}
                    label="Engagement"
                  />
                  <InsightBox
                    value={engagement?.estAvgLikes}
                    label="Avg Likes"
                  />
                  <InsightBox
                    value={Math.round(stats.media_count / 12)}
                    label="Posts / Month"
                  />
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </div>
    </div>
  );
}

function Stat({ label, value }) {
  return (
    <div>
      <h3 className="text-xl font-bold">{value?.toLocaleString()}</h3>
      <p className="text-muted-foreground text-sm">{label}</p>
    </div>
  );
}

function InsightBox({ label, value }) {
  return (
    <div>
      <p className="text-lg font-semibold">{value || "—"}</p>
      <p className="text-muted-foreground text-sm">{label}</p>
    </div>
  );
}
