import { Check, Bot, Zap, Shield, Clock, Users, Award } from "lucide-react";
import { motion } from "framer-motion";

const features = [
  { icon: Bot, text: "وكيل مستقل", description: "يتخذ القرارات ويعمل بدون إشراف" },
  { icon: Zap, text: "تنفيذ فوري", description: "من الفكرة إلى موقع في دقائق" },
  { icon: Shield, text: "نشر آمن", description: "موقعك على سيرفرات موثوقة" },
  { icon: Clock, text: "متاح دائماً", description: "يعمل على مدار الساعة" },
  { icon: Users, text: "يفهم العربية", description: "محادثة طبيعية بلغتك" },
  { icon: Award, text: "نتائج احترافية", description: "مواقع بجودة عالية" },
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
  hidden: { opacity: 0, y: 20, scale: 0.95 },
  visible: { 
    opacity: 1, 
    y: 0, 
    scale: 1,
    transition: { duration: 0.4 }
  },
};

const WhySection = () => {
  return (
    <section className="py-24 relative overflow-hidden">
      {/* Gradient background */}
      <div className="absolute inset-0 bg-gradient-to-b from-card via-background to-card" />
      
      {/* Floating orbs */}
      <motion.div
        className="absolute top-1/4 left-10 w-64 h-64 bg-primary/5 rounded-full blur-3xl"
        animate={{ y: [0, -30, 0] }}
        transition={{ duration: 8, repeat: Infinity }}
      />
      <motion.div
        className="absolute bottom-1/4 right-10 w-64 h-64 bg-accent/5 rounded-full blur-3xl"
        animate={{ y: [0, 30, 0] }}
        transition={{ duration: 10, repeat: Infinity }}
      />

      <div className="container px-4 relative z-10">
        <div className="max-w-5xl mx-auto">
          {/* Section header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
              لماذا وكيل Chat2Site
            </h2>
            <p className="text-lg text-muted-foreground">
              وكيل ذكي يعمل{" "}
              <motion.span
                className="font-bold hero-gradient bg-clip-text text-transparent inline-block"
                animate={{ scale: [1, 1.1, 1] }}
                transition={{ duration: 1.5, repeat: Infinity }}
              >
                بالنيابة عنك
              </motion.span>
              {" "}— ليس مجرد أداة
            </p>
          </motion.div>
          
          {/* Features grid with glassmorphism */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="grid md:grid-cols-2 lg:grid-cols-3 gap-6"
          >
            {features.map((feature, index) => (
              <motion.div
                key={index}
                variants={itemVariants}
                whileHover={{ 
                  y: -8,
                  transition: { duration: 0.2 }
                }}
                className="group relative"
              >
                {/* Gradient border on hover */}
                <motion.div
                  className="absolute inset-0 rounded-2xl hero-gradient opacity-0 group-hover:opacity-100 transition-opacity duration-300 blur-sm"
                />
                <div className="relative p-6 rounded-2xl bg-background/80 backdrop-blur-sm border border-border/50 group-hover:border-transparent transition-all duration-300 h-full">
                  <div className="flex items-start gap-4">
                    <motion.div
                      whileHover={{ rotate: 360, scale: 1.1 }}
                      transition={{ duration: 0.5 }}
                      className="flex-shrink-0 w-14 h-14 rounded-xl bg-primary/10 flex items-center justify-center group-hover:hero-gradient transition-all duration-300"
                    >
                      <feature.icon className="w-7 h-7 text-primary group-hover:text-primary-foreground transition-colors" />
                    </motion.div>
                    <div>
                      <h3 className="text-lg font-bold text-foreground mb-1 group-hover:text-primary transition-colors">{feature.text}</h3>
                      <p className="text-muted-foreground text-sm">{feature.description}</p>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
          
          {/* Bottom emphasis with glow */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.5 }}
            className="mt-16 text-center"
          >
            <motion.div
              whileHover={{ scale: 1.05 }}
              className="relative inline-block"
            >
              <motion.div
                className="absolute inset-0 hero-gradient rounded-full blur-lg opacity-30"
                animate={{ opacity: [0.2, 0.4, 0.2] }}
                transition={{ duration: 2, repeat: Infinity }}
              />
              <div className="relative flex items-center gap-3 px-8 py-4 rounded-full bg-background/80 backdrop-blur-sm border border-primary/20">
                <motion.div
                  animate={{ scale: [1, 1.3, 1] }}
                  transition={{ duration: 1, repeat: Infinity }}
                  className="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center"
                >
                  <Check className="w-5 h-5 text-primary" />
                </motion.div>
                <span className="font-medium text-foreground text-lg">
                  موقع كامل ومنشور من محادثة واحدة
                </span>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default WhySection;
