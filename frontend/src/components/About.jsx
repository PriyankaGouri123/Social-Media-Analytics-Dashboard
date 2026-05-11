import { motion } from "framer-motion";
import { FaRocket, FaShieldAlt, FaChartPie, FaCode, FaGithub, FaGlobe } from "react-icons/fa";

export default function About() {
  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2
      }
    }
  };

  const item = {
    hidden: { opacity: 0, y: 30 },
    show: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 100 } }
  };

  return (
    <div className="min-h-screen bg-background py-20 px-6 overflow-hidden">
      <motion.div 
        variants={container}
        initial="hidden"
        animate="show"
        className="max-w-6xl mx-auto space-y-24"
      >
        {/* Hero Section */}
        <div className="text-center space-y-6 relative">
          <motion.div 
            animate={{ 
              scale: [1, 1.1, 1],
              rotate: [0, 5, -5, 0]
            }}
            transition={{ duration: 10, repeat: Infinity }}
            className="absolute -top-20 -left-20 w-64 h-64 bg-primary/5 rounded-full blur-3xl -z-10" 
          />
          
          <motion.h1 variants={item} className="text-5xl md:text-7xl font-black tracking-tight leading-tight">
            The Future of <span className="text-primary">Social Intelligence</span>
          </motion.h1>
          <motion.p variants={item} className="text-xl md:text-2xl text-muted-foreground max-w-3xl mx-auto font-medium leading-relaxed">
            We're building the world's most intuitive analytics command center for creators and brands who demand data-driven success.
          </motion.p>
        </div>

        {/* Feature Grid */}
        <div className="grid md:grid-cols-3 gap-8">
          <FeatureCard 
            icon={<FaRocket />} 
            title="Fast Execution" 
            desc="Get real-time insights across platforms in milliseconds, not minutes."
            variants={item}
          />
          <FeatureCard 
            icon={<FaShieldAlt />} 
            title="Privacy First" 
            desc="We only use public API data, ensuring complete transparency and security."
            variants={item}
          />
          <FeatureCard 
            icon={<FaChartPie />} 
            title="Visual First" 
            desc="Complex data transformed into beautiful, actionable visualizations."
            variants={item}
          />
        </div>

        {/* Story Section */}
        <motion.div 
          variants={item}
          className="bg-card border border-border rounded-[3rem] p-10 md:p-20 relative overflow-hidden shadow-2xl"
        >
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div className="space-y-8">
              <h2 className="text-4xl font-black tracking-tight">Our Mission</h2>
              <p className="text-lg text-muted-foreground leading-relaxed">
                In an era of fragmented attention, understanding your digital footprint shouldn't be a chore. Our mission is to democratize high-level social analytics, making them accessible to everyone from the solo creator to the enterprise agency.
              </p>
              <div className="flex gap-4">
                <button className="bg-primary text-primary-foreground px-8 py-4 rounded-2xl font-bold hover:scale-105 transition-transform shadow-lg shadow-primary/20">
                  Join the Waitlist
                </button>
                <div className="flex items-center gap-2 text-muted-foreground font-bold text-sm">
                  <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
                  Live in Beta v2.4
                </div>
              </div>
            </div>
            
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-4">
                <div className="h-48 bg-muted rounded-3xl animate-pulse" />
                <div className="h-64 bg-primary/10 border border-primary/20 rounded-3xl flex items-center justify-center">
                   <FaGlobe className="text-4xl text-primary opacity-50" />
                </div>
              </div>
              <div className="space-y-4 pt-12">
                <div className="h-64 bg-card border border-border rounded-3xl shadow-xl flex flex-col items-center justify-center p-6 text-center">
                   <h4 className="text-3xl font-black">10M+</h4>
                   <p className="text-xs font-bold text-muted-foreground uppercase">Data Points</p>
                </div>
                <div className="h-48 bg-muted rounded-3xl animate-pulse" />
              </div>
            </div>
          </div>
        </motion.div>

        {/* Tech Stack Section */}
        <motion.div variants={item} className="text-center space-y-12">
           <h3 className="text-sm font-black uppercase tracking-[0.3em] text-muted-foreground">Built with Modern Tech</h3>
           <div className="flex flex-wrap justify-center gap-8 md:gap-16 opacity-50 grayscale hover:grayscale-0 transition-all">
              <TechIcon icon={<FaCode />} label="React 19" />
              <TechIcon icon={<FaRocket />} label="Vite" />
              <TechIcon icon={<FaShieldAlt />} label="Axios" />
              <TechIcon icon={<FaGithub />} label="Open Source" />
           </div>
        </motion.div>

        {/* CTA Footer */}
        <motion.div 
          variants={item}
          className="text-center py-20 border-t border-border"
        >
          <h2 className="text-4xl font-black mb-8 italic">"Data is the new oil, but analytics is the engine."</h2>
          <p className="text-muted-foreground font-bold">© 2026 Social Intelligence Dashboard. All Rights Reserved.</p>
        </motion.div>
      </motion.div>
    </div>
  );
}

function FeatureCard({ icon, title, desc, variants }) {
  return (
    <motion.div 
      variants={variants}
      whileHover={{ y: -10 }}
      className="bg-card border border-border p-10 rounded-[2.5rem] shadow-xl hover:shadow-2xl transition-all group"
    >
      <div className="w-16 h-16 bg-primary/10 text-primary rounded-2xl flex items-center justify-center text-3xl mb-8 group-hover:bg-primary group-hover:text-primary-foreground transition-colors shadow-lg">
        {icon}
      </div>
      <h3 className="text-2xl font-bold mb-4">{title}</h3>
      <p className="text-muted-foreground leading-relaxed">
        {desc}
      </p>
    </motion.div>
  );
}

function TechIcon({ icon, label }) {
  return (
    <div className="flex flex-col items-center gap-2">
      <div className="text-4xl">{icon}</div>
      <span className="text-xs font-bold uppercase tracking-widest">{label}</span>
    </div>
  );
}
