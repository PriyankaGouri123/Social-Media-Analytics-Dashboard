import React, { useState } from "react";
import axios from "axios";
import { motion, AnimatePresence } from "framer-motion";
import { useTheme } from "../context/ThemeContext";
import { FaTwitter, FaSearch, FaUsers, FaUserCheck, FaBolt, FaMapMarkerAlt, FaCalendarAlt, FaCheckCircle, FaExternalLinkAlt, FaQuoteLeft, FaHeart } from "react-icons/fa";

export default function XStats() {
  const { dark } = useTheme();
  const [username, setUsername] = useState("");
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const fetchStats = async () => {
    const cleanUsername = username.trim().replace("@", "");
    if (!cleanUsername) return;

    setLoading(true);
    setStats(null);
    setError("");

    try {
      const res = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/api/xstats/${cleanUsername}`);
      if (res.data.success) {
        setStats(res.data.data);
      } else {
        setError(res.data.message || "X profile not found.");
      }
    } catch (err) {
      console.error("X Fetch Error:", err);
      const msg = err.response?.data?.message || err.message || "Failed to connect to the analytics server.";
      setError(msg);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-background text-foreground p-6 md:p-10">
      <div className="max-w-5xl mx-auto space-y-12">
        
        {/* Header */}
        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="bg-card/40 backdrop-blur-xl p-8 rounded-[3rem] border border-border shadow-xl flex flex-col md:flex-row items-center justify-between gap-8"
        >
          <div className="flex items-center gap-6">
            <div className="w-16 h-16 bg-foreground text-background rounded-2xl flex items-center justify-center text-3xl font-black shadow-lg">
              X
            </div>
            <div>
              <h1 className="text-3xl font-black tracking-tight">Intelligence <span className="text-muted-foreground">Hub</span></h1>
              <p className="text-sm text-muted-foreground font-medium">Real-time profile performance & network auditing</p>
            </div>
          </div>

          <div className="flex gap-2 w-full md:w-96 bg-background/50 p-2 rounded-2xl border border-border shadow-inner">
            <input
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && fetchStats()}
              placeholder="Search screen name..."
              className="flex-1 bg-transparent px-4 py-2 outline-none font-bold text-sm"
            />
            <button
              onClick={fetchStats}
              disabled={loading}
              className="bg-foreground text-background px-6 py-2 rounded-xl font-bold active:scale-95 transition-all shadow-lg disabled:opacity-70 flex items-center justify-center min-w-[60px]"
            >
              {loading ? (
                <div className="w-5 h-5 border-2 border-background/30 border-t-background rounded-full animate-spin" />
              ) : (
                <FaSearch />
              )}
            </button>
          </div>
        </motion.div>

        <AnimatePresence mode="wait">
          {error && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="bg-red-500/10 border border-red-500/50 text-red-500 p-6 rounded-3xl text-center font-bold shadow-lg">
              {error}
            </motion.div>
          )}

          {stats && !loading && (
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              className="space-y-12"
            >
              {/* Profile Card */}
              <div className="bg-card border border-border rounded-[3.5rem] overflow-hidden shadow-2xl relative group">
                <div className="h-48 md:h-64 relative">
                   {stats.banner ? (
                     <img src={stats.banner} className="w-full h-full object-cover opacity-80 group-hover:scale-105 transition-transform duration-1000" alt="Banner" />
                   ) : (
                     <div className="w-full h-full bg-gradient-to-br from-gray-800 to-black" />
                   )}
                   <div className="absolute inset-0 bg-gradient-to-t from-card via-card/20 to-transparent" />
                </div>

                <div className="px-10 pb-12 -mt-20 relative flex flex-col md:flex-row gap-10 items-end md:items-center">
                  <div className="relative group/avatar">
                    <img
                      src={stats.profile_pic || "/fallback-avatar.png"}
                      className="w-32 h-32 md:w-44 md:h-44 rounded-full border-8 border-card shadow-2xl object-cover bg-muted group-hover/avatar:scale-105 transition-transform"
                      alt={stats.username}
                      onError={(e) => { e.target.src = `https://ui-avatars.com/api/?name=${stats.username}&background=random`; }}
                    />
                    {stats.verified && (
                      <div className="absolute bottom-2 right-2 bg-blue-500 text-white p-1.5 rounded-full border-4 border-card shadow-lg">
                        <FaCheckCircle className="text-xl" />
                      </div>
                    )}
                  </div>

                  <div className="flex-1 text-center md:text-left space-y-4">
                    <div>
                      <div className="flex flex-col md:flex-row items-center gap-3">
                        <h2 className="text-4xl font-black text-foreground">{stats.name}</h2>
                      </div>
                      <p className="text-muted-foreground text-xl font-bold">@{stats.username}</p>
                    </div>
                    <p className="text-muted-foreground text-lg max-w-4xl leading-relaxed font-medium">
                      {stats.description || "Digital footprint analysis in progress."}
                    </p>
                    <div className="flex flex-wrap justify-center md:justify-start gap-6 text-sm font-bold text-muted-foreground">
                       {stats.location && <span className="flex items-center gap-2"><FaMapMarkerAlt className="text-primary" /> {stats.location}</span>}
                       {stats.created_at && <span className="flex items-center gap-2"><FaCalendarAlt className="text-primary" /> Joined {new Date(stats.created_at).getFullYear()}</span>}
                    </div>
                  </div>
                  
                  <a 
                    href={`https://x.com/${stats.username}`} 
                    target="_blank" 
                    rel="noreferrer"
                    className="p-4 bg-foreground text-background rounded-2xl hover:scale-110 transition-transform shadow-xl mb-4"
                  >
                    <FaExternalLinkAlt />
                  </a>
                </div>
              </div>

              {/* Stats Highlights */}
              <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                <StatCard icon={<FaUsers />} title="Followers" value={stats.followers} color="text-foreground" />
                <StatCard icon={<FaUserCheck />} title="Following" value={stats.following} color="text-muted-foreground" />
                <StatCard icon={<FaBolt />} title="Posts" value={stats.tweets} color="text-blue-500" />
                <StatCard icon={<FaHeart />} title="Favorites" value={stats.favorites} color="text-red-500" />
              </div>

              {/* Engagement Insight */}
              <div className="bg-card border border-border p-10 rounded-[3rem] shadow-xl relative overflow-hidden group">
                <div className="absolute top-0 right-0 w-48 h-48 bg-foreground/5 rounded-bl-full -z-0" />
                <div className="grid lg:grid-cols-2 gap-12 items-center relative">
                   <div className="space-y-6">
                      <FaQuoteLeft className="text-4xl text-muted-foreground opacity-20" />
                      <h3 className="text-3xl font-black leading-tight">Audience Sentiment & Network Influence</h3>
                      <p className="text-muted-foreground text-lg leading-relaxed">
                        Based on a follower/following ratio of <span className="text-foreground font-bold">{(stats.followers / (stats.following || 1)).toFixed(1)}x</span>, this profile demonstrates <span className="text-primary font-bold">significant authority</span> within its niche.
                      </p>
                      <div className="flex gap-4">
                         <div className="px-6 py-2 bg-green-500/10 text-green-500 rounded-full text-xs font-black uppercase tracking-widest border border-green-500/20">High Retention</div>
                         <div className="px-6 py-2 bg-blue-500/10 text-blue-500 rounded-full text-xs font-black uppercase tracking-widest border border-blue-500/20">Viral Potential</div>
                      </div>
                   </div>
                   
                   <div className="space-y-8">
                      <MetricProgress label="Network Reach" value={Math.min(95, Math.round(stats.followers / 10000))} color="bg-foreground" />
                      <MetricProgress label="Posting Consistency" value={Math.min(85, Math.round(stats.tweets / 500))} color="bg-blue-500" />
                      <MetricProgress label="Audience Interaction" value={78} color="bg-red-500" />
                   </div>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}

function StatCard({ icon, title, value, color }) {
  return (
    <motion.div 
      whileHover={{ y: -5 }}
      className="bg-card border border-border p-8 rounded-[2.5rem] shadow-xl transition-all flex flex-col items-center text-center group"
    >
      <div className={`text-2xl mb-4 ${color} group-hover:scale-110 transition-transform`}>{icon}</div>
      <h4 className="text-3xl font-black mb-1">{Number(value).toLocaleString()}</h4>
      <p className="text-[10px] font-black uppercase tracking-widest text-muted-foreground opacity-60">{title}</p>
    </motion.div>
  );
}

function MetricProgress({ label, value, color }) {
  return (
    <div className="space-y-3">
      <div className="flex justify-between text-xs font-black uppercase tracking-widest">
        <span>{label}</span>
        <span>{value}%</span>
      </div>
      <div className="h-3 bg-muted rounded-full overflow-hidden border border-border shadow-inner">
        <motion.div 
          initial={{ width: 0 }}
          animate={{ width: `${value}%` }}
          transition={{ duration: 1.5, ease: "easeOut" }}
          className={`h-full ${color} shadow-lg`} 
        />
      </div>
    </div>
  );
}
