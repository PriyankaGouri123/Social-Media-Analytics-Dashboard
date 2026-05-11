import { motion } from "framer-motion";
import DashboardCards from "./DashboardCards";
import { FaArrowRight, FaChartLine, FaShieldAlt, FaBolt, FaShareAlt, FaSearchPlus, FaCloudDownloadAlt } from "react-icons/fa";
import { Link } from "react-router-dom";

export default function Home() {
  const features = [
    {
      icon: <FaChartLine className="text-blue-500" />,
      title: "Real-time Auditing",
      desc: "Instant access to live follower counts and engagement metrics across all social platforms."
    },
    {
      icon: <FaShieldAlt className="text-green-500" />,
      title: "Privacy Protected",
      desc: "We only use public API data. No login required, ensuring your account remains 100% secure."
    },
    {
      icon: <FaBolt className="text-yellow-500" />,
      title: "Engagement Scoring",
      desc: "Our proprietary algorithm calculates real-world engagement rates to identify high-value creators."
    },
    {
      icon: <FaSearchPlus className="text-purple-500" />,
      title: "Deep Insights",
      desc: "Go beyond likes and followers with channel keywords, join dates, and content spotlights."
    },
    {
      icon: <FaShareAlt className="text-pink-500" />,
      title: "Viral Predictions",
      desc: "Track content performance velocity to predict which posts are likely to trend or go viral."
    },
    {
      icon: <FaCloudDownloadAlt className="text-cyan-500" />,
      title: "Exportable Reports",
      desc: "Generate professional analytics summaries that you can share with brands and partners."
    }
  ];

  return (
    <div className="flex flex-col space-y-12 pb-20 overflow-hidden">
      {/* Hero Section */}
      <section className="relative pt-20 pb-12 px-6">
        {/* Background Decorations */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full -z-10 opacity-30 pointer-events-none">
          <div className="absolute top-0 left-1/4 w-[500px] h-[500px] bg-purple-500/20 rounded-full blur-[120px] animate-pulse" />
          <div className="absolute bottom-0 right-1/4 w-[500px] h-[500px] bg-blue-500/20 rounded-full blur-[120px]" />
        </div>

        <div className="max-w-5xl mx-auto text-center space-y-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary text-xs font-black uppercase tracking-widest mb-6 border border-primary/20">
              <span className="w-2 h-2 bg-primary rounded-full animate-ping" />
              Intelligence v2.4 Live
            </div>
            <h1 className="text-5xl md:text-7xl font-black tracking-tight leading-tight">
              Unleash Your <br />
              <span className="bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent italic">Social Influence</span>
            </h1>
            <p className="mt-8 text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
              The command center for digital creators. Unified analytics for YouTube, Instagram, and X in one stunning, real-time dashboard.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.4, duration: 0.5 }}
            className="flex flex-wrap justify-center gap-4"
          >
            <Link to="/youtube">
              <button className="bg-primary text-primary-foreground px-10 py-4 rounded-2xl font-black shadow-2xl shadow-primary/30 hover:scale-105 transition-all flex items-center gap-3">
                Analyze Now <FaArrowRight />
              </button>
            </Link>
            <Link to="/about">
              <button className="bg-card border border-border px-10 py-4 rounded-2xl font-black hover:bg-muted transition-all">
                The Mission
              </button>
            </Link>
          </motion.div>
        </div>
      </section>

      {/* Metrics Section */}
      <motion.section
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        className="px-4"
      >
        <div className="max-w-7xl mx-auto bg-card/30 backdrop-blur-xl border border-border/50 rounded-[3rem] p-8 md:p-12 shadow-2xl">
          <div className="flex flex-col md:flex-row items-center justify-between mb-12">
            <div className="text-center md:text-left">
              <h2 className="text-3xl font-black">Performance Pulse</h2>
              <p className="text-muted-foreground mt-1">Cross-platform metrics at a glance</p>
            </div>
            <div className="h-1 w-24 bg-gradient-to-r from-purple-600 to-transparent rounded-full mt-4 md:mt-0" />
          </div>
          <DashboardCards />
        </div>
      </motion.section>

      {/* Features Section (Replaced Charts) */}
      <section className="px-6 py-12">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16 space-y-4">
            <h2 className="text-4xl font-black tracking-tight">Advanced Capabilities</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">Go beyond basic numbers with our suite of creator-first intelligence tools.</p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                whileHover={{ y: -5 }}
                className="bg-card border border-border p-10 rounded-[2.5rem] shadow-xl hover:shadow-2xl transition-all group"
              >
                <div className="w-14 h-14 rounded-2xl bg-muted flex items-center justify-center text-2xl mb-6 group-hover:scale-110 transition-transform">
                  {feature.icon}
                </div>
                <h3 className="text-xl font-bold mb-3">{feature.title}</h3>
                <p className="text-muted-foreground leading-relaxed text-sm">
                  {feature.desc}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="px-6 py-20">
        <motion.div
          whileHover={{ scale: 1.01 }}
          className="max-w-7xl mx-auto bg-gradient-to-br from-purple-600 to-blue-700 rounded-[3.5rem] p-12 md:p-24 text-center text-white relative overflow-hidden shadow-2xl"
        >
          <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
          <h2 className="text-4xl md:text-6xl font-black mb-8 relative z-10">Ready to audit <br /> your impact?</h2>
          <Link to="/youtube">
            <button className="bg-black text-white hover:bg-gray-100 hover:text-black px-12 py-5 rounded-[2rem] font-black text-lg shadow-xl transition-colors">
              Launch Dashboard
            </button>
          </Link>
        </motion.div>
      </section>
    </div>
  );
}
