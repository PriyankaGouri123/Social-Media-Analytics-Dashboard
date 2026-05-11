import { motion } from "framer-motion";

const Terms = () => {
  const terms = [
    {
      title: "Educational & Portfolio Usage",
      content: "This platform is developed as a showcase project. All analytics and data visualizations are provided for informational purposes only."
    },
    {
      title: "API Dependency Disclaimer",
      content: "Service availability depends on third-party APIs (YouTube, X, Instagram). We are not responsible for downtime or data inaccuracies caused by these external providers."
    },
    {
      title: "Service Availability",
      content: "We strive for 100% uptime, but we do not guarantee uninterrupted access to the dashboard. Maintenance or API rate limits may temporarily affect functionality."
    },
    {
      title: "No Misuse Policy",
      content: "Users agree not to use this tool for any illegal activities, data harvesting, or any actions that violate the terms of service of the respective social media platforms."
    },
    {
      title: "Intellectual Property",
      content: "The dashboard design, custom logic, and branding are the property of the project maintainer. Third-party logos are property of their respective owners."
    },
    {
      title: "Limitation of Liability",
      content: "In no event shall the maintainers be liable for any direct, indirect, or incidental damages arising out of the use or inability to use this service."
    },
    {
      title: "Modification Rights",
      content: "We reserve the right to modify these terms or the functionality of the dashboard at any time without prior notice."
    }
  ];

  return (
    <div className="min-h-screen py-20 px-6 bg-background relative overflow-hidden">
      {/* Background Decorations */}
      <div className="absolute top-0 right-1/4 w-96 h-96 bg-red-500/10 rounded-full blur-[120px] -z-10" />
      <div className="absolute bottom-0 left-1/4 w-96 h-96 bg-purple-500/10 rounded-full blur-[120px] -z-10" />

      <div className="max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-16"
        >
          <h1 className="text-5xl font-black mb-6 tracking-tight">Terms of <span className="text-red-600">Service</span></h1>
          <p className="text-muted-foreground text-lg italic">Effective Date: May 2026</p>
        </motion.div>

        <div className="grid gap-6">
          {terms.map((term, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="group p-8 rounded-3xl bg-card border border-border/50 hover:border-red-500/30 transition-all shadow-lg"
            >
              <h2 className="text-xl font-bold mb-3 flex items-center gap-3">
                <span className="w-8 h-8 rounded-full bg-red-500/10 text-red-600 flex items-center justify-center text-sm font-black">
                  {index + 1}
                </span>
                {term.title}
              </h2>
              <p className="text-muted-foreground leading-relaxed pl-11">
                {term.content}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Terms;
