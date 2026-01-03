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
    <section className="py-24 relative overflow-hidden">
      {/* Gradient background */}
      <div className="absolute inset-0 bg-gradient-to-b from-background via-primary/5 to-background" />
      
      {/* Animated accent orbs */}
      <motion.div
        className="absolute top-20 right-10 w-72 h-72 bg-primary/10 rounded-full blur-3xl"
        animate={{ x: [0, 30, 0], y: [0, -20, 0] }}
        transition={{ duration: 8, repeat: Infinity }}
      />
      <motion.div
        className="absolute bottom-20 left-10 w-72 h-72 bg-accent/10 rounded-full blur-3xl"
        animate={{ x: [0, -30, 0], y: [0, 20, 0] }}
        transition={{ duration: 10, repeat: Infinity }}
      />

      <div className="container px-4 relative z-10">
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
          
          {/* Capabilities with glassmorphism */}
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
                  y: -8,
                }}
                className="relative group"
              >
                {/* Glow effect on hover */}
                <motion.div
                  className="absolute inset-0 hero-gradient rounded-2xl blur-xl opacity-0 group-hover:opacity-30 transition-opacity"
                />
                <div className="relative flex flex-col items-center gap-3 p-6 rounded-2xl bg-background/60 backdrop-blur-sm border border-border/50 group-hover:border-primary/30 transition-all duration-300">
                  <motion.div
                    whileHover={{ rotate: 360, scale: 1.1 }}
                    transition={{ duration: 0.5 }}
                    className="w-16 h-16 rounded-xl hero-gradient flex items-center justify-center shadow-lg"
                  >
                    <cap.icon className="w-8 h-8 text-primary-foreground" />
                  </motion.div>
                  <span className="font-bold text-foreground text-lg">{cap.text}</span>
                  <span className="text-sm text-muted-foreground text-center">{cap.description}</span>
                </div>
              </motion.div>
            ))}
          </motion.div>

          {/* Agent features with gradient tags */}
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
                whileHover={{ scale: 1.08, y: -3 }}
                className="flex items-center gap-2 px-5 py-2.5 rounded-full bg-background/80 backdrop-blur-sm border border-primary/20 shadow-sm hover:shadow-md hover:border-primary/40 transition-all"
              >
                <div className="w-6 h-6 rounded-full bg-primary/10 flex items-center justify-center">
                  <feature.icon className="w-3.5 h-3.5 text-primary" />
                </div>
                <span className="text-sm font-medium text-foreground">{feature.text}</span>
              </motion.div>
            ))}
          </motion.div>
          
          {/* Key message with enhanced design */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="relative"
          >
            <motion.div
              className="absolute inset-0 hero-gradient rounded-2xl blur-2xl opacity-20"
              animate={{ opacity: [0.15, 0.25, 0.15] }}
              transition={{ duration: 4, repeat: Infinity }}
            />
            <motion.div
              whileHover={{ scale: 1.01 }}
              className="relative p-10 rounded-2xl bg-background/70 backdrop-blur-md border border-primary/20 shadow-xl text-center"
            >
              <p className="text-2xl md:text-3xl font-bold text-foreground mb-4">
                أنت <span className="text-muted-foreground line-through decoration-2">لا تبني</span> — أنت{" "}
                <motion.span
                  className="hero-gradient bg-clip-text text-transparent inline-block"
                  animate={{ scale: [1, 1.08, 1] }}
                  transition={{ duration: 2, repeat: Infinity }}
                >
                  توجّه
                </motion.span>
              </p>
              <p className="text-muted-foreground text-lg">
                الوكيل يتولى كل التفاصيل التقنية والتصميمية. أنت فقط تخبره بما تريد.
              </p>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default SolutionSection;
