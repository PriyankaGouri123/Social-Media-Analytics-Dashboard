import { useState } from "react";
import axios from "axios";
import { motion, AnimatePresence } from "framer-motion";
import { useTheme } from "../context/ThemeContext";
import { Bar, Pie } from "react-chartjs-2";
import { FaInstagram, FaSearch, FaHeart, FaComment, FaUsers, FaChartLine, FaCheckCircle, FaGlobe, FaLink, FaEye, FaBolt, FaVideo, FaPlay } from "react-icons/fa";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement
} from 'chart.js';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement
);

export default function Insta() {
  const { dark } = useTheme();
  const [username, setUsername] = useState("");
  const [stats, setStats] = useState(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const fetchStats = async () => {
    if (!username.trim()) return;
    try {
      setLoading(true);
      setError("");
      const res = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/api/instagram/${username}`);
      if (res.data.success) {
        setStats(res.data.data);
      } else {
        setError("User not found or profile is highly restricted.");
      }
    } catch (err) {
      setError("Failed to fetch Instagram stats. Please check the username.");
    } finally {
      setLoading(false);
    }
  };

  const computeEngagement = (s) => {
    if (!s || !s.followers) return { engagementRate: 0, estAvgLikes: 0, estAvgComments: 0, estReach: 0 };
    const followers = Number(s.followers) || 0;
    const baseRate = followers < 10000 ? 5.2 : followers < 100000 ? 3.8 : 2.1;
    const estAvgLikes = Math.round((followers * baseRate) / 100);
    const estAvgComments = Math.round(estAvgLikes * 0.05);
    const estReach = Math.round(followers * (baseRate * 3) / 100);
    return { engagementRate: baseRate, estAvgLikes, estAvgComments, estReach };
  };

  const e = computeEngagement(stats);

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'bottom',
        labels: { 
          color: dark ? "#e5e7eb" : "#1e293b",
          font: { family: 'Inter', size: 11, weight: '600' }
        },
      },
    }
  };

  return (
    <div className="min-h-screen bg-background text-foreground p-6 md:p-10">
      <div className="max-w-6xl mx-auto space-y-12">
        
        {/* Header */}
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex flex-col md:flex-row items-center justify-between gap-8 bg-card/40 backdrop-blur-xl p-8 rounded-[3rem] border border-border shadow-xl"
        >
          <div className="flex items-center gap-6">
            <div className="p-4 bg-gradient-to-tr from-yellow-400 via-red-500 to-purple-600 rounded-3xl shadow-lg">
              <FaInstagram className="text-white text-3xl" />
            </div>
            <div>
              <h1 className="text-3xl font-black">Insta<span className="text-purple-500">Auditor</span></h1>
              <p className="text-sm text-muted-foreground font-medium">Real-time profile & engagement metrics</p>
            </div>
          </div>

          <div className="flex gap-2 w-full md:w-96 bg-background/50 p-1.5 rounded-2xl border border-border">
            <input
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && fetchStats()}
              placeholder="Username..."
              className="flex-1 bg-transparent px-4 py-2 outline-none text-sm font-bold"
            />
            <button
              onClick={fetchStats}
              disabled={loading}
              className="bg-primary text-primary-foreground px-5 py-2 rounded-xl font-bold active:scale-95 transition-all shadow-lg disabled:opacity-70 flex items-center justify-center min-w-[60px]"
            >
              {loading ? (
                <div className="w-5 h-5 border-2 border-primary-foreground/30 border-t-primary-foreground rounded-full animate-spin" />
              ) : (
                <FaSearch />
              )}
            </button>
          </div>
        </motion.div>

        <AnimatePresence mode="wait">
          {error && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="bg-red-500/10 border border-red-500/50 text-red-500 p-6 rounded-3xl text-center font-bold">
              {error}
            </motion.div>
          )}

          {stats && !loading && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-10">
              
              {/* Profile Card */}
              <div className="bg-card border border-border rounded-[3rem] p-8 md:p-12 shadow-2xl relative overflow-hidden group">
                <div className="absolute top-0 left-0 w-full h-24 bg-gradient-to-r from-yellow-400/10 via-red-500/10 to-purple-600/10" />
                <a 
                  href={`https://www.instagram.com/${stats.username}/`}
                  target="_blank"
                  rel="noreferrer"
                  className="px-10 pb-12 pt-16 relative flex flex-col md:flex-row gap-10 items-center md:items-end group/link"
                >
                  <div className="relative group/avatar">
                    <img
                      src={`https://images.weserv.nl/?url=${encodeURIComponent(stats.profile_pic || "")}&w=300&h=300&fit=cover&mask=circle`}
                      referrerPolicy="no-referrer"
                      className="w-32 h-32 md:w-44 md:h-44 rounded-full mx-auto border-8 border-white dark:border-slate-800 shadow-2xl object-cover bg-muted group-hover/avatar:scale-105 transition-transform"
                      alt={stats.username}
                      onError={(e) => { 
                        if (!e.target.src.includes('ui-avatars')) {
                          e.target.src = `https://ui-avatars.com/api/?name=${stats.username}&background=random&size=256`;
                        }
                      }}
                    />
                    {stats.is_verified && <FaCheckCircle className="absolute bottom-2 right-2 text-blue-500 text-3xl bg-card rounded-full p-1" />}
                  </div>

                  <div className="flex-1 text-center md:text-left space-y-4">
                    <div>
                      <h2 className="text-4xl font-black text-foreground group-hover/link:text-purple-500 transition-colors">{stats.full_name}</h2>
                      <p className="text-purple-500 text-xl font-bold">@{stats.username}</p>
                    </div>
                    <p className="text-muted-foreground text-lg max-w-3xl leading-relaxed italic">
                      {stats.biography || "No biography available."}
                    </p>
                  </div>
                </a>
              </div>

              {/* Engagement Metrics (The important ones) */}
              <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                <HighlightCard icon={<FaUsers />} title="Followers" value={stats.followers} color="purple" />
                <HighlightCard icon={<FaBolt />} title="Eng. Rate" value={`${e.engagementRate}%`} color="red" />
                <HighlightCard icon={<FaHeart />} title="Avg. Likes" value={e.estAvgLikes} color="orange" />
                <HighlightCard icon={<FaEye />} title="Est. Reach" value={e.estReach} color="blue" />
              </div>

              {/* Viral Reels Section */}
              {stats.recent_posts?.filter(p => p.is_video).length > 0 && (
                <div className="space-y-10">
                   <div className="flex items-center justify-between px-4">
                      <div className="flex items-center gap-4">
                         <div className="p-3 bg-red-500/10 rounded-2xl">
                            <FaVideo className="text-red-500 text-2xl" />
                         </div>
                         <div>
                            <h3 className="text-3xl font-black tracking-tight">Viral <span className="text-muted-foreground">Reels</span></h3>
                            <p className="text-sm text-muted-foreground font-medium">Top performing video content</p>
                         </div>
                      </div>
                      <div className="hidden md:block h-px flex-1 mx-10 bg-gradient-to-r from-red-500/20 to-transparent" />
                      <div className="px-4 py-2 bg-red-500/10 text-red-500 rounded-xl text-[10px] font-black uppercase tracking-widest border border-red-500/20">
                         Real-time Trends
                      </div>
                   </div>

                   <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 px-2">
                      {stats.recent_posts
                        .filter(p => p.is_video)
                        .sort((a, b) => (b.video_view_count || b.likes) - (a.video_view_count || a.likes))
                        .slice(0, 4)
                        .map((reel, i) => (
                          <motion.a 
                            key={i}
                            href={`https://instagram.com/p/${reel.shortcode}`}
                            target="_blank"
                            rel="noreferrer"
                            whileHover={{ y: -12, scale: 1.02 }}
                            className="group relative aspect-[9/16] rounded-[2.5rem] overflow-hidden shadow-2xl border border-border bg-card"
                          >
                             <img src={reel.thumbnail} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" alt="Reel" />
                             <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent opacity-80 group-hover:opacity-100 transition-opacity" />
                             
                             <div className="absolute inset-0 flex items-center justify-center">
                                <div className="w-16 h-16 bg-white/20 backdrop-blur-xl rounded-full flex items-center justify-center text-white text-2xl opacity-0 group-hover:opacity-100 transition-all scale-75 group-hover:scale-100 border border-white/30 shadow-2xl">
                                   <FaPlay className="ml-1" />
                                </div>
                             </div>

                             <div className="absolute bottom-8 left-8 right-8 text-white space-y-3">
                                <div className="flex items-center gap-2 bg-black/40 backdrop-blur-md w-fit px-3 py-1 rounded-full border border-white/10">
                                   <FaEye className="text-xs text-red-400" />
                                   <span className="text-lg font-black tracking-tight">
                                      {reel.video_view_count > 0 ? reel.video_view_count.toLocaleString() : reel.likes.toLocaleString()}
                                   </span>
                                </div>
                                <p className="text-[11px] font-bold leading-relaxed opacity-90 line-clamp-2">
                                   {reel.caption || "View on Instagram"}
                                </p>
                             </div>
                          </motion.a>
                        ))}
                   </div>
                </div>
              )}

              <div className="grid lg:grid-cols-2 gap-8">
                 {/* Visual Charts */}
                 <div className="bg-card border border-border p-8 rounded-[2.5rem] shadow-xl h-[400px]">
                    <h3 className="text-xl font-bold mb-6 flex items-center gap-2"><FaChartLine className="text-purple-500" /> Metrics Overview</h3>
                    <div className="h-64">
                       <Bar 
                          data={{
                             labels: ["Followers", "Following", "Posts"],
                             datasets: [{
                                label: 'Counts',
                                data: [stats.followers, stats.following, stats.media_count],
                                backgroundColor: ["#a855f7", "#ef4444", "#eab308"],
                                borderRadius: 12
                             }]
                          }}
                          options={chartOptions}
                       />
                    </div>
                 </div>

                 <div className="bg-card border border-border p-8 rounded-[2.5rem] shadow-xl h-[400px]">
                    <h3 className="text-xl font-bold mb-6 flex items-center gap-2"><FaChartLine className="text-red-500" /> Engagement Split</h3>
                    <div className="h-64">
                       <Pie 
                          data={{
                             labels: ["Likes", "Comments"],
                             datasets: [{
                                data: [e.estAvgLikes, e.estAvgComments],
                                backgroundColor: ["#ef4444", "#3b82f6"],
                                borderWidth: 0
                             }]
                          }}
                          options={chartOptions}
                       />
                    </div>
                 </div>
              </div>

              {/* Recent Content Spotlight (Only if exists) */}
              {stats.recent_posts?.length > 0 && stats.media_count > 0 && (
                <div className="bg-card border border-border p-10 rounded-[3rem] shadow-xl">
                   <h3 className="text-2xl font-black mb-8 flex items-center gap-3"><FaBolt className="text-yellow-500" /> Recent Content Analysis</h3>
                   <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                      {stats.recent_posts.slice(0, 4).map((post, i) => (
                        <a key={i} href={`https://instagram.com/p/${post.shortcode}`} target="_blank" rel="noreferrer" className="group relative aspect-square rounded-2xl overflow-hidden shadow-lg border border-border">
                           <img src={post.thumbnail} className="w-full h-full object-cover transition-transform group-hover:scale-110" alt="Post" />
                           <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-4 text-white font-bold text-sm">
                              <span className="flex items-center gap-1"><FaHeart className="text-red-500" /> {post.likes}</span>
                              <span className="flex items-center gap-1"><FaComment className="text-blue-400" /> {post.comments}</span>
                           </div>
                        </a>
                      ))}
                   </div>
                </div>
              )}

              {/* Profile Intelligence */}
              <div className="bg-card border border-border p-10 rounded-[3.5rem] shadow-xl grid md:grid-cols-3 gap-8 text-center">
                 <div className="space-y-1">
                    <p className="text-xs font-black uppercase tracking-widest text-muted-foreground">Account Type</p>
                    <p className="text-xl font-bold">{stats.is_verified ? "Verified Brand" : "Creator Profile"}</p>
                 </div>
                 <div className="space-y-1">
                    <p className="text-xs font-black uppercase tracking-widest text-muted-foreground">Visibility</p>
                    <p className="text-xl font-bold">{stats.is_private ? "Private Account" : "Open Network"}</p>
                 </div>
                 <div className="space-y-1">
                    <p className="text-xs font-black uppercase tracking-widest text-muted-foreground">Est. Value / Post</p>
                    <p className="text-xl font-bold text-green-500">${Math.round(stats.followers * 0.002 + 50)}</p>
                 </div>
              </div>

            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}

function HighlightCard({ icon, title, value, color }) {
  const colors = {
    purple: "text-purple-500 bg-purple-500/10",
    red: "text-red-500 bg-red-500/10",
    orange: "text-orange-500 bg-orange-500/10",
    blue: "text-blue-500 bg-blue-500/10"
  };
  return (
    <div className="bg-card border border-border p-6 rounded-[2rem] shadow-lg flex items-center gap-4 group hover:shadow-xl transition-all">
       <div className={`w-12 h-12 rounded-xl flex items-center justify-center text-xl ${colors[color]}`}>{icon}</div>
       <div>
          <p className="text-[10px] font-black uppercase tracking-widest text-muted-foreground">{title}</p>
          <p className="text-xl font-black">{value.toLocaleString()}</p>
       </div>
    </div>
  );
}
