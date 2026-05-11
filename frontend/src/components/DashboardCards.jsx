import { motion } from "framer-motion";
import { TrendingUp, Users, Eye, Video } from "lucide-react";

export default function DashboardCards() {
  const cards = [
    {
      title: "Total Reach",
      value: "245K",
      icon: <TrendingUp className="w-6 h-6 sm:w-7 sm:h-7" />,
      gradient: "from-purple-500 to-pink-500",
    },
    {
      title: "Subscribers",
      value: "12.4K",
      icon: <Users className="w-6 h-6 sm:w-7 sm:h-7" />,
      gradient: "from-blue-500 to-cyan-400",
    },
    {
      title: "Total Views",
      value: "1.8M",
      icon: <Eye className="w-6 h-6 sm:w-7 sm:h-7" />,
      gradient: "from-orange-500 to-yellow-400",
    },
    {
      title: "Videos",
      value: "182",
      icon: <Video className="w-6 h-6 sm:w-7 sm:h-7" />,
      gradient: "from-green-500 to-emerald-400",
    },
  ];

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const item = {
    hidden: { y: 20, opacity: 0 },
    show: { y: 0, opacity: 1 }
  };

  return (
    <motion.div 
      variants={container}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true }}
      className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 p-4 sm:p-6 md:p-8"
    >
      {cards.map((card, idx) => (
        <motion.div
          key={idx}
          variants={item}
          whileHover={{ y: -5, scale: 1.02 }}
          className="
            p-6 rounded-2xl shadow-lg 
            bg-card border border-border
            hover:shadow-2xl transition-all duration-300
            cursor-pointer group
          "
        >
          <div className="flex flex-col items-center space-y-4">
            {/* Icon */}
            <div
              className={`
                p-4 rounded-2xl bg-gradient-to-br ${card.gradient}
                text-white shadow-lg shadow-black/10 group-hover:shadow-black/20
                transition-shadow
              `}
            >
              {card.icon}
            </div>

            <div className="text-center">
              {/* Value */}
              <h2 className="text-3xl font-extrabold text-foreground drop-shadow-sm">
                {card.value}
              </h2>

              {/* Title */}
              <p className="text-muted-foreground text-sm font-medium tracking-wide mt-1">
                {card.title}
              </p>
            </div>
          </div>
        </motion.div>
      ))}
    </motion.div>
  );
}
