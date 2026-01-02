import { Brain, Paintbrush, Rocket, MessageSquare, RefreshCw } from "lucide-react";
import { motion } from "framer-motion";

const capabilities = [
  { icon: Brain, text: "يفهم نشاطك" },
  { icon: Paintbrush, text: "يتخذ قرارات التصميم" },
  { icon: Rocket, text: "ينفّذ مباشرة" },
  { icon: MessageSquare, text: "يعدّل من الحوار" },
  { icon: RefreshCw, text: "ينشر فورًا" },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 },
};

const SolutionSection = () => {
  return (
    <section className="py-24 subtle-gradient overflow-hidden">
      <div className="container px-4">
        <div className="max-w-4xl mx-auto text-center">
          {/* Main statement */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="mb-16"
          >
            <h2 className="text-3xl md:text-5xl font-bold text-foreground mb-6">
              <motion.span
                className="hero-gradient bg-clip-text text-transparent inline-block"
                whileHover={{ scale: 1.05 }}
              >
                Chat2Site
              </motion.span>
              {" "}يلغي الوسيط
            </h2>
            <p className="text-xl text-muted-foreground">
              وكيل ذكي يفهم ويقرر وينفذ
            </p>
          </motion.div>
          
          {/* Capabilities */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="grid grid-cols-2 md:grid-cols-5 gap-6 mb-16"
          >
            {capabilities.map((cap, index) => (
              <motion.div
                key={index}
                variants={itemVariants}
                whileHover={{ 
                  scale: 1.05,
                  y: -5,
                }}
                className="flex flex-col items-center gap-3 p-6 rounded-2xl bg-card shadow-card hover:shadow-elevated transition-shadow duration-300"
              >
                <motion.div
                  whileHover={{ rotate: 360 }}
                  transition={{ duration: 0.5 }}
                  className="w-14 h-14 rounded-xl hero-gradient flex items-center justify-center"
                >
                  <cap.icon className="w-7 h-7 text-primary-foreground" />
                </motion.div>
                <span className="font-medium text-foreground">{cap.text}</span>
              </motion.div>
            ))}
          </motion.div>
          
          {/* Key message */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            whileHover={{ scale: 1.02 }}
            className="p-8 rounded-2xl bg-card shadow-elevated"
          >
            <p className="text-2xl md:text-3xl font-bold text-foreground">
              لا تسأله <span className="text-muted-foreground">كيف</span>
              <br />
              أخبره <motion.span
                className="hero-gradient bg-clip-text text-transparent inline-block"
                animate={{ scale: [1, 1.05, 1] }}
                transition={{ duration: 2, repeat: Infinity }}
              >
                ماذا تريد
              </motion.span>
            </p>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default SolutionSection;
