import { Card, CardContent } from "./ui/card";
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

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 p-4 sm:p-6 md:p-8">
      {cards.map((card, idx) => (
        <Card
          key={idx}
          className="
            p-4 sm:p-5 rounded-2xl shadow-lg 
            backdrop-blur-md bg-white/10 dark:bg-gray-900/20 border border-white/20 dark:border-gray-700/40
            hover:scale-105 hover:shadow-2xl transition-all duration-300
            cursor-pointer
          "
        >
          <CardContent className="flex flex-col items-center space-y-3 sm:space-y-4">

            {/* Icon */}
            <div
              className={`
                p-3 sm:p-4 rounded-xl bg-gradient-to-br ${card.gradient}
                text-black dark:text-white shadow-lg shadow-black/20
              `}
            >
              {card.icon}
            </div>

            {/* Value */}
            <h2 className="text-2xl sm:text-3xl font-extrabold text-black dark:text-white drop-shadow-md text-center">
              {card.value}
            </h2>

            {/* Title */}
            <p className="text-gray-800 dark:text-gray-300 text-xs sm:text-sm tracking-wide text-center">
              {card.title}
            </p>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
