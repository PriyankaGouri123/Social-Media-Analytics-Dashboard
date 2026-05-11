import { motion } from "framer-motion";

const PrivacyPolicy = () => {
  const sections = [
    {
      title: "Data Collection",
      content: "We do not collect or store any personal data. Our dashboard operates as a client-side analytics tool that processes publicly available data in real-time."
    },
    {
      title: "Public API Usage",
      content: "Our application utilizes the YouTube Data API, X (Twitter) API via RapidAPI, and Instagram Scraping services. All data displayed is fetched directly from these public endpoints."
    },
    {
      title: "Third-Party Services",
      content: "We use RapidAPI and Google Cloud Console to facilitate data requests. These services may have their own privacy policies regarding how they handle request metadata."
    },
    {
      title: "Security",
      content: "All API keys and sensitive configurations are managed through secure server-side environment variables. We do not expose credentials on the frontend."
    },
    {
      title: "Cookies",
      content: "This application does not use persistent tracking cookies. Any local state is stored only for the duration of your session to enhance your browsing experience."
    },
    {
      title: "Disclaimer",
      content: "This tool is for educational and analytical purposes only. We are not affiliated with YouTube, Instagram, or X (Twitter)."
    },
    {
      title: "Contact Information",
      content: "For privacy-related inquiries, please reach out via our Support page or through the official GitHub repository."
    }
  ];

  return (
    <div className="min-h-screen py-20 px-6 bg-background relative overflow-hidden">
      {/* Background Decorations */}
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-purple-500/10 rounded-full blur-[120px] -z-10" />
      <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-blue-500/10 rounded-full blur-[120px] -z-10" />

      <div className="max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-16"
        >
          <h1 className="text-5xl font-black mb-6 tracking-tight">Privacy <span className="text-purple-600">Policy</span></h1>
          <p className="text-muted-foreground text-lg italic">Last Updated: May 2026</p>
        </motion.div>

        <div className="space-y-8">
          {sections.map((section, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="bg-card border border-border/50 p-8 rounded-[2rem] shadow-xl backdrop-blur-sm"
            >
              <h2 className="text-2xl font-bold mb-4 text-foreground">{section.title}</h2>
              <p className="text-muted-foreground leading-relaxed">
                {section.content}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default PrivacyPolicy;
