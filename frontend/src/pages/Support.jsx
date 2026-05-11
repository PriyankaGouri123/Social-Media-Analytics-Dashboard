import { motion } from "framer-motion";
import { FaGithub, FaEnvelope, FaClock, FaBug } from "react-icons/fa";

const Support = () => {
  const cards = [
    {
      icon: <FaEnvelope className="text-blue-500" />,
      title: "Direct Support",
      detail: "socialanalytics.support@gmail.com",
      desc: "Expect a response within 24-48 hours.",
      link: "https://mail.google.com/mail/?view=cm&fs=1&to=socialanalytics.support@gmail.com&su=Support%20Request%20-%20Social%20Analytics"
    },
    {
      icon: <FaGithub className="text-foreground" />,
      title: "GitHub Repo",
      detail: "social-dashboard",
      desc: "Star us or contribute to the codebase.",
      link: "https://github.com/PriyankaGouri123/Social-Media-Analytics-Dashboard"
    },
    {
      icon: <FaBug className="text-red-500" />,
      title: "Issue Reporting",
      detail: "Bug Tracker",
      desc: "Found a glitch? Report it via GitHub issues.",
      link: "https://github.com/PriyankaGouri123/Social-Media-Analytics-Dashboard/issues"
    },
    {
      icon: <FaClock className="text-green-500" />,
      title: "Response Time",
      detail: "Fast & Reliable",
      desc: "We prioritize critical API-related issues.",
      link: null
    }
  ];

  return (
    <div className="min-h-screen py-20 px-6 bg-background relative overflow-hidden">
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-blue-500/5 via-transparent to-transparent -z-10" />

      <div className="max-w-5xl mx-auto">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="text-center mb-20"
        >
          <span className="px-4 py-1.5 rounded-full bg-blue-500/10 text-blue-500 text-sm font-black uppercase tracking-widest mb-6 inline-block">Help Center</span>
          <h1 className="text-6xl font-black mb-8 tracking-tight">Need a <span className="text-blue-600">Hand?</span></h1>
          <p className="text-muted-foreground text-xl max-w-2xl mx-auto leading-relaxed">
            Our support team is dedicated to ensuring your dashboard experience is seamless and high-performing.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {cards.map((card, i) => {
            const cardContent = (
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                whileHover={card.link ? { y: -10 } : {}}
                className={`bg-card border border-border p-8 rounded-[2.5rem] shadow-2xl flex flex-col items-center text-center group transition-all h-full ${card.link ? 'hover:bg-muted/50 cursor-pointer' : ''}`}
              >
                <div className="w-16 h-16 rounded-2xl bg-muted flex items-center justify-center text-3xl mb-6 shadow-inner group-hover:scale-110 transition-transform">
                  {card.icon}
                </div>
                <h3 className="text-xl font-bold mb-2">{card.title}</h3>
                <p className="text-blue-500 font-black mb-4 text-sm break-all">
                  {card.detail}
                </p>
                <p className="text-muted-foreground text-sm leading-relaxed">
                  {card.desc}
                </p>
              </motion.div>
            );

            return card.link ? (
              <a
                key={i}
                href={card.link}
                target="_blank"
                rel="noopener noreferrer"
                className="block no-underline"
              >
                {cardContent}
              </a>
            ) : (
              <div key={i}>{cardContent}</div>
            );
          })}
        </div>

        <a 
          href="https://mail.google.com/mail/?view=cm&fs=1&to=socialanalytics.support@gmail.com&su=Feature%20Request%20or%20Feedback%20-%20Social%20Analytics"
          target="_blank"
          rel="noopener noreferrer"
          className="block mt-24 no-underline group"
        >
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            whileHover={{ scale: 1.01 }}
            className="p-12 rounded-[3.5rem] bg-gradient-to-br from-blue-600 to-indigo-800 text-white text-center shadow-2xl relative overflow-hidden cursor-pointer transition-all"
          >
            <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
            <h2 className="text-3xl font-black mb-6">Want to request a feature?</h2>
            <p className="mb-8 text-blue-100 max-w-xl mx-auto">
              We are constantly evolving. If you have an idea for a new metric or social platform integration, we'd love to hear it.
            </p>
            <button className="bg-white text-blue-900 px-10 py-4 rounded-2xl font-black hover:bg-blue-50 transition-colors shadow-lg active:scale-95 group-hover:scale-105 transition-transform">
              Submit Feedback
            </button>
          </motion.div>
        </a>
      </div>
    </div>
  );
};

export default Support;
