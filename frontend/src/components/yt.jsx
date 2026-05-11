import { useState } from "react";
import axios from "axios";
import { useTheme } from "../context/ThemeContext";
import { motion, AnimatePresence } from "framer-motion";
import { Bar, Doughnut, Line } from "react-chartjs-2";
import { FaYoutube, FaSearch, FaGlobe, FaCalendarAlt, FaLayerGroup, FaPlayCircle, FaExternalLinkAlt, FaChartBar, FaChartPie } from "react-icons/fa";
import {
  Chart as ChartJS,
  BarElement,
  ArcElement,
  CategoryScale,
  LinearScale,
  Tooltip,
  Legend,
  PointElement,
  LineElement,
  Filler
} from "chart.js";

ChartJS.register(
  BarElement,
  ArcElement,
  CategoryScale,
  LinearScale,
  Tooltip,
  Legend,
  PointElement,
  LineElement,
  Filler
);

export default function YouTubeDashboard() {
  const { dark } = useTheme();
  const [query, setQuery] = useState("");
  const [yt, setYt] = useState(null);
  const [videos, setVideos] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchYT = async () => {
    if (!query) return;
    setLoading(true);
    setError(null);
    try {
      const res = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/api/youtube/${query}`);
      if (res.data.success) {
        setYt(res.data.data);
        setVideos(res.data.videos || []);
      } else {
        setError("Channel not found");
      }
    } catch (err) {
      setError("Failed to fetch YouTube data. Please check the channel name.");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const commonOptions = {
    responsive: true,
    maintainAspectRatio: false,
    animation: {
      duration: 2000,
      easing: 'easeInOutQuart'
    },
    plugins: {
      legend: {
        position: 'bottom',
        labels: { 
          color: dark ? "#e5e7eb" : "#1e293b",
          font: { family: 'Inter', size: 12, weight: '600' },
          padding: 20
        },
      },
      tooltip: {
        backgroundColor: dark ? "rgba(15, 23, 42, 0.9)" : "rgba(255, 255, 255, 0.9)",
        titleColor: dark ? "#fff" : "#000",
        bodyColor: dark ? "#cbd5e1" : "#475569",
        borderColor: dark ? "#334155" : "#e2e8f0",
        borderWidth: 1,
        padding: 12,
        boxPadding: 6,
        usePointStyle: true,
      }
    },
    scales: {
      x: {
        ticks: { color: dark ? "#94a3b8" : "#64748b" },
        grid: { display: false },
      },
      y: {
        ticks: { 
          color: dark ? "#94a3b8" : "#64748b",
          callback: (value) => {
            if (value >= 1000000) return (value / 1000000).toFixed(1) + 'M';
            if (value >= 1000) return (value / 1000).toFixed(1) + 'K';
            return value;
          }
        },
        grid: { color: dark ? "rgba(30, 41, 59, 0.5)" : "rgba(226, 232, 240, 0.5)" },
      },
    },
  };

  return (
    <div className="min-h-screen bg-background text-foreground p-6 md:p-10 transition-colors duration-500">
      <div className="max-w-7xl mx-auto space-y-12">
        
        {/* Header Section */}
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex flex-col lg:flex-row lg:items-center justify-between gap-8 bg-card/50 backdrop-blur-xl p-8 rounded-[3rem] border border-border/50 shadow-2xl shadow-red-500/5"
        >
          <div className="space-y-2">
            <h1 className="text-4xl md:text-5xl font-black flex items-center gap-4">
              <div className="p-3 bg-red-600 rounded-2xl shadow-lg shadow-red-600/30">
                <FaYoutube className="text-white text-3xl" />
              </div>
              YouTube <span className="text-muted-foreground font-light">Analytics</span>
            </h1>
            <p className="text-muted-foreground font-medium flex items-center gap-2">
               <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
               Real-time data visualization and content insights
            </p>
          </div>

          <div className="relative group w-full lg:w-[400px]">
            <input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && fetchYT()}
              placeholder="Search channel username..."
              className="w-full bg-card border-2 border-border focus:border-red-500 px-6 py-4 rounded-2xl outline-none transition-all shadow-lg group-hover:shadow-red-500/10 font-medium"
            />
            <button
              onClick={fetchYT}
              disabled={loading}
              className="absolute right-2 top-2 bottom-2 bg-red-600 hover:bg-red-700 disabled:bg-red-800 text-white px-6 rounded-xl transition-all shadow-lg shadow-red-600/20 flex items-center justify-center"
            >
              {loading ? (
                <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
              ) : (
                <FaSearch className="text-lg" />
              )}
            </button>
          </div>
        </motion.div>

        <AnimatePresence mode="wait">
          {error && (
            <motion.div 
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="bg-red-500/10 border border-red-500/50 text-red-500 p-8 rounded-3xl flex items-center gap-6 shadow-xl"
            >
              <div className="w-14 h-14 bg-red-500 rounded-2xl flex items-center justify-center text-white text-2xl shadow-lg shadow-red-500/30">!</div>
              <div>
                <p className="text-xl font-black">Search Failed</p>
                <p className="font-medium opacity-80">{error}</p>
              </div>
            </motion.div>
          )}

          {yt && !loading && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="space-y-12"
            >
              {/* Profile Card */}
              <div className="bg-card border border-border rounded-[3.5rem] overflow-hidden shadow-2xl relative group">
                <div className="relative h-64 md:h-80 overflow-hidden">
                  {yt.banner ? (
                    <img src={yt.banner} className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110" alt="Banner" />
                  ) : (
                    <div className="w-full h-full bg-gradient-to-br from-red-600 via-rose-500 to-purple-600" />
                  )}
                  <div className="absolute inset-0 bg-gradient-to-t from-background via-background/20 to-transparent" />
                </div>

                <div className="px-10 pb-12 -mt-24 relative flex flex-col md:flex-row gap-10 items-end md:items-center">
                  <a 
                    href={`https://www.youtube.com/${yt.handle}`} 
                    target="_blank" 
                    rel="noreferrer"
                    className="relative group/avatar"
                  >
                    <motion.img
                      initial={{ scale: 0.8, opacity: 0 }}
                      animate={{ scale: 1, opacity: 1 }}
                      transition={{ delay: 0.2 }}
                      src={yt.thumbnails?.high?.url}
                      className="w-40 h-40 md:w-52 md:h-52 rounded-[2.5rem] border-8 border-card shadow-2xl object-cover bg-muted group-hover/avatar:scale-105 transition-transform duration-500"
                      alt={yt.title}
                    />
                    <div className="absolute inset-0 rounded-[2.5rem] bg-black/40 opacity-0 group-hover/avatar:opacity-100 transition-opacity flex items-center justify-center">
                       <FaExternalLinkAlt className="text-white text-3xl" />
                    </div>
                  </a>
                  <div className="flex-1 text-center md:text-left space-y-4">
                    <div>
                      <h2 className="text-4xl md:text-5xl font-black text-foreground">{yt.title}</h2>
                      <p className="text-red-600 text-xl font-bold mt-1">{yt.handle}</p>
                    </div>
                    <p className="text-muted-foreground max-w-4xl text-lg leading-relaxed line-clamp-3">
                      {yt.description || "The creator hasn't set a channel description yet."}
                    </p>
                  </div>
                </div>
              </div>

              {/* Top Video Spotlight */}
              {videos.length > 0 && (
                <motion.div 
                  initial={{ x: -20, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  className="bg-gradient-to-r from-red-600 to-rose-600 p-10 rounded-[3.5rem] text-white shadow-2xl shadow-red-600/20 relative overflow-hidden group"
                >
                  <div className="absolute top-0 right-0 w-1/3 h-full bg-white/10 -skew-x-12 translate-x-1/2 group-hover:translate-x-0 transition-transform duration-700" />
                  <div className="flex flex-col lg:flex-row items-center gap-10 relative z-10">
                    <div className="w-full lg:w-1/2 relative aspect-video rounded-3xl overflow-hidden shadow-2xl">
                       <img src={videos[0].thumbnail} className="w-full h-full object-cover" alt="Most Viewed" />
                       <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity cursor-pointer">
                          <FaPlayCircle className="text-7xl" />
                       </div>
                       <div className="absolute top-4 left-4 bg-red-600 px-4 py-2 rounded-xl text-sm font-black shadow-lg">MOST VIEWED</div>
                    </div>
                    <div className="flex-1 space-y-6">
                       <h3 className="text-sm font-black tracking-[0.3em] uppercase opacity-80">Video Spotlight</h3>
                       <h4 className="text-3xl md:text-4xl font-black leading-tight line-clamp-2">{videos[0].title}</h4>
                       <p className="text-lg opacity-90 font-medium">Published: {new Date(videos[0].publishedAt).toLocaleDateString(undefined, { year: 'numeric', month: 'long' })}</p>
                       <a 
                         href={`https://www.youtube.com/watch?v=${videos[0].id}`} 
                         target="_blank" 
                         rel="noreferrer"
                         className="inline-flex items-center gap-3 bg-white text-red-600 px-8 py-4 rounded-2xl font-black hover:scale-105 transition-transform shadow-xl"
                       >
                         <FaPlayCircle /> Watch Now
                       </a>
                    </div>
                  </div>
                </motion.div>
              )}

              {/* Stats & Charts Grid */}
              <div className="grid lg:grid-cols-3 gap-8">
                <div className="lg:col-span-1 space-y-8">
                  <StatCard icon={<FaYoutube />} title="Subscribers" value={yt.subscribers} color="red" />
                  <StatCard icon={<FaPlayCircle />} title="Lifetime Views" value={yt.views} color="orange" />
                  <StatCard icon={<FaChartBar />} title="Total Content" value={yt.videos} color="purple" />
                </div>

                <div className="lg:col-span-2 grid md:grid-cols-2 gap-8">
                   <ChartCard title="Audience Reach" icon={<FaChartBar className="text-red-600" />}>
                      <Bar
                        data={{
                          labels: ["Subs", "Views", "Videos"],
                          datasets: [{
                            label: 'Channel Data',
                            data: [yt.subscribers, yt.views, yt.videos],
                            backgroundColor: ["#ef4444", "#f97316", "#8b5cf6"],
                            borderRadius: 15,
                            hoverBackgroundColor: ["#dc2626", "#ea580c", "#7c3aed"],
                          }]
                        }}
                        options={commonOptions}
                      />
                   </ChartCard>

                   <ChartCard title="Engagement Split" icon={<FaChartPie className="text-orange-500" />}>
                      <Doughnut
                        data={{
                          labels: ["Subscribers", "Views"],
                          datasets: [{
                            data: [yt.subscribers, yt.views],
                            backgroundColor: ["#ef4444", "#f97316"],
                            borderWidth: 0,
                            hoverOffset: 30,
                            borderRadius: 10,
                          }]
                        }}
                        options={{
                          ...commonOptions,
                          cutout: '75%',
                          plugins: {
                            ...commonOptions.plugins,
                            legend: { ...commonOptions.plugins.legend, position: 'right' }
                          }
                        }}
                      />
                   </ChartCard>
                </div>
              </div>

              {/* Extra Info & Top Videos */}
              <div className="grid lg:grid-cols-3 gap-8">
                <div className="lg:col-span-1 bg-card border border-border p-10 rounded-[3rem] shadow-xl space-y-8 relative overflow-hidden">
                  <div className="absolute top-0 left-0 w-full h-2 bg-red-600" />
                  <h3 className="text-2xl font-black flex items-center gap-3">
                    <FaLayerGroup className="text-red-600" />
                    Channel Details
                  </h3>
                  
                  <div className="space-y-8">
                    <InfoRow icon={<FaGlobe />} label="Location" value={yt.country || "International"} />
                    <InfoRow icon={<FaCalendarAlt />} label="Established" value={new Date(yt.publishedAt).toLocaleDateString(undefined, { year: 'numeric', month: 'long' })} />
                    
                    <div className="space-y-4">
                      <p className="text-xs font-black uppercase tracking-[0.2em] text-muted-foreground">Channel Keywords</p>
                      <div className="flex flex-wrap gap-2">
                        {(yt.keywords || "").split(',').slice(0, 8).map((k, i) => k.trim() && (
                          <span key={i} className="bg-muted px-4 py-2 rounded-xl text-sm font-bold border border-border">
                            {k.trim()}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>

                <div className="lg:col-span-2 bg-card border border-border p-10 rounded-[3rem] shadow-xl">
                  <h3 className="text-2xl font-black mb-8 flex items-center gap-3">
                    <FaPlayCircle className="text-red-600" />
                    Top Performing Videos
                  </h3>
                  <div className="grid sm:grid-cols-2 gap-6">
                    {videos.slice(1, 5).map((v, i) => (
                      <motion.a 
                        key={i}
                        href={`https://www.youtube.com/watch?v=${v.id}`}
                        target="_blank"
                        rel="noreferrer"
                        whileHover={{ scale: 1.02, y: -5 }}
                        className="flex items-center gap-4 p-4 bg-muted/30 rounded-2xl border border-border hover:border-red-500/50 transition-all group"
                      >
                        <div className="w-24 h-14 shrink-0 rounded-lg overflow-hidden relative shadow-lg">
                           <img src={v.thumbnail} className="w-full h-full object-cover" alt="Video" />
                           <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                              <FaPlayCircle className="text-white text-lg" />
                           </div>
                        </div>
                        <div className="flex-1 overflow-hidden">
                           <h5 className="font-bold text-sm line-clamp-2 leading-snug group-hover:text-red-600 transition-colors">{v.title}</h5>
                           <p className="text-[10px] font-black text-muted-foreground uppercase tracking-widest mt-1">Trending Video</p>
                        </div>
                      </motion.a>
                    ))}
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
  const colorMap = {
    red: "text-red-600 bg-red-600/10 shadow-red-600/10 border-red-500/20",
    orange: "text-orange-500 bg-orange-500/10 shadow-orange-500/10 border-orange-500/20",
    purple: "text-purple-600 bg-purple-600/10 shadow-purple-600/10 border-purple-500/20"
  };

  return (
    <motion.div 
      whileHover={{ y: -5, scale: 1.02 }}
      className={`bg-card border p-8 rounded-[2.5rem] shadow-xl flex items-center justify-between group transition-all`}
    >
      <div className="space-y-1">
        <p className="text-muted-foreground font-bold text-xs uppercase tracking-widest">{title}</p>
        <h4 className="text-3xl font-black">{Number(value).toLocaleString()}</h4>
      </div>
      <div className={`w-14 h-14 rounded-2xl flex items-center justify-center text-2xl ${colorMap[color]} shadow-lg transition-transform group-hover:rotate-12`}>
        {icon}
      </div>
    </motion.div>
  );
}

function ChartCard({ title, icon, children }) {
  return (
    <div className="bg-card border border-border p-10 rounded-[3rem] shadow-xl hover:shadow-2xl transition-all relative overflow-hidden group">
      <div className="flex items-center justify-between mb-8">
        <h3 className="text-xl font-black flex items-center gap-3">
          {icon}
          {title}
        </h3>
        <div className="w-8 h-8 rounded-full bg-muted flex items-center justify-center text-xs opacity-0 group-hover:opacity-100 transition-opacity">i</div>
      </div>
      <div className="h-80 relative z-10">
        {children}
      </div>
    </div>
  );
}

function InfoRow({ icon, label, value }) {
  return (
    <div className="flex items-center gap-5 group">
      <div className="w-14 h-14 bg-muted rounded-2xl flex items-center justify-center text-xl text-muted-foreground group-hover:bg-red-600 group-hover:text-white transition-all shadow-sm group-hover:shadow-red-600/30 group-hover:scale-110">
        {icon}
      </div>
      <div>
        <p className="text-[10px] font-black uppercase tracking-[0.2em] text-muted-foreground">{label}</p>
        <p className="text-lg font-black text-foreground">{value}</p>
      </div>
    </div>
  );
}
