import { Brain, Target, Zap, MessageSquare, Globe, Palette, Shield, Clock } from "lucide-react";
import { motion } from "framer-motion";

const capabilities = [
  { icon: Brain, text: "يفهم احتياجاتك", description: "من خلال المحادثة الطبيعية" },
  { icon: Palette, text: "يصمم تلقائياً", description: "قرارات تصميم ذكية" },
  { icon: Zap, text: "ينفذ فوراً", description: "بناء في الوقت الحقيقي" },
  { icon: Globe, text: "ينشر مباشرة", description: "موقعك على الإنترنت" },
];

const agentFeatures = [
  { icon: Target, text: "يتخذ القرارات بنفسه" },
  { icon: Clock, text: "يعمل على مدار الساعة" },
  { icon: Shield, text: "آمن وموثوق" },
  { icon: MessageSquare, text: "يستجيب للتعديلات" },
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
        <div className="max-w-5xl mx-auto">
          {/* Main statement */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-5xl font-bold text-foreground mb-6">
              ليس مجرد أداة بناء مواقع
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              <motion.span
                className="hero-gradient bg-clip-text text-transparent font-bold inline-block"
                whileHover={{ scale: 1.05 }}
              >
                Chat2Site
              </motion.span>
              {" "}وكيل ذكي يعمل بالنيابة عنك — يفهم، يقرر، ينفذ، وينشر
            </p>
          </motion.div>
          
          {/* Capabilities */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="grid md:grid-cols-4 gap-6 mb-16"
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
                <span className="font-bold text-foreground">{cap.text}</span>
                <span className="text-sm text-muted-foreground text-center">{cap.description}</span>
              </motion.div>
            ))}
          </motion.div>

          {/* Agent features */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="flex flex-wrap justify-center gap-4 mb-16"
          >
            {agentFeatures.map((feature, index) => (
              <motion.div
                key={index}
                whileHover={{ scale: 1.05 }}
                className="flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary"
              >
                <feature.icon className="w-4 h-4" />
                <span className="text-sm font-medium">{feature.text}</span>
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
            className="p-8 rounded-2xl bg-card shadow-elevated text-center"
          >
            <p className="text-2xl md:text-3xl font-bold text-foreground mb-4">
              أنت <span className="text-muted-foreground">لا تبني</span> — أنت{" "}
              <motion.span
                className="hero-gradient bg-clip-text text-transparent inline-block"
                animate={{ scale: [1, 1.05, 1] }}
                transition={{ duration: 2, repeat: Infinity }}
              >
                توجّه
              </motion.span>
            </p>
            <p className="text-muted-foreground">
              الوكيل يتولى كل التفاصيل التقنية والتصميمية. أنت فقط تخبره بما تريد.
            </p>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default SolutionSection;
