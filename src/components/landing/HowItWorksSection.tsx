import { MessageCircle, Bot, Globe, ArrowLeft } from "lucide-react";
import { motion } from "framer-motion";

const steps = [
  {
    icon: MessageCircle,
    number: "١",
    title: "أخبر وكيلك",
    description: "تحدث بلغتك الطبيعية. اشرح فكرتك كما تشرحها لأي شخص. الوكيل يفهم السياق والنوايا.",
  },
  {
    icon: Bot,
    number: "٢",
    title: "الوكيل يعمل",
    description: "يتخذ قرارات التصميم، يختار الألوان، ينظم المحتوى، ويبني الموقع بالكامل — تلقائياً.",
  },
  {
    icon: Globe,
    number: "٣",
    title: "موقعك منشور",
    description: "ضغطة واحدة ينشر الوكيل موقعك على الإنترنت. جاهز للمشاركة مع العالم.",
  },
];

const HowItWorksSection = () => {
  return (
    <section className="py-24 bg-card relative overflow-hidden">
      {/* Background pattern */}
      <div className="absolute inset-0 opacity-50">
        <div className="absolute inset-0" style={{
          backgroundImage: `radial-gradient(circle at 1px 1px, hsl(var(--primary)/0.05) 1px, transparent 0)`,
          backgroundSize: '32px 32px',
        }} />
      </div>

      <div className="container px-4 relative z-10">
        <div className="max-w-5xl mx-auto">
          {/* Section header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="text-center mb-20"
          >
            <motion.div
              initial={{ scale: 0 }}
              whileInView={{ scale: 1 }}
              viewport={{ once: true }}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 mb-6"
            >
              <span className="text-sm font-medium text-primary">3 خطوات فقط</span>
            </motion.div>
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
              كيف يعمل وكيلك
            </h2>
            <p className="text-lg text-muted-foreground">
              من الفكرة إلى موقع منشور في دقائق
            </p>
          </motion.div>
          
          {/* Steps */}
          <div className="relative">
            {/* Animated connection line */}
            <div className="hidden md:block absolute top-24 right-[16.66%] left-[16.66%]">
              <motion.div
                initial={{ scaleX: 0 }}
                whileInView={{ scaleX: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 1.5, delay: 0.3 }}
                className="h-1 hero-gradient rounded-full origin-right"
              />
              {/* Animated dots on line */}
              {[0, 1, 2].map((i) => (
                <motion.div
                  key={i}
                  className="absolute top-1/2 -translate-y-1/2 w-3 h-3 rounded-full bg-primary"
                  style={{ left: `${i * 50}%` }}
                  initial={{ scale: 0 }}
                  whileInView={{ scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.8 + i * 0.3 }}
                  animate={{
                    boxShadow: [
                      "0 0 0 0 rgba(59, 130, 246, 0.4)",
                      "0 0 0 8px rgba(59, 130, 246, 0)",
                    ],
                  }}
                />
              ))}
            </div>
            
            <div className="grid md:grid-cols-3 gap-8">
              {steps.map((step, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 40 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.2 }}
                  className="relative flex flex-col items-center text-center group"
                >
                  {/* Step icon with enhanced animation */}
                  <motion.div
                    whileHover={{ scale: 1.1, rotate: 5 }}
                    className="relative z-10 mb-6"
                  >
                    {/* Pulse ring animation */}
                    <motion.div
                      className="absolute inset-0 hero-gradient rounded-2xl"
                      animate={{ 
                        boxShadow: [
                          "0 0 0 0 rgba(59, 130, 246, 0)",
                          "0 0 0 15px rgba(59, 130, 246, 0.1)",
                          "0 0 0 0 rgba(59, 130, 246, 0)"
                        ]
                      }}
                      transition={{ duration: 2.5, repeat: Infinity, delay: index * 0.4 }}
                    />
                    <div className="relative w-20 h-20 rounded-2xl hero-gradient flex items-center justify-center shadow-xl">
                      <step.icon className="w-10 h-10 text-primary-foreground" />
                    </div>
                    {/* Step number badge */}
                    <motion.div
                      initial={{ scale: 0 }}
                      whileInView={{ scale: 1 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.3, delay: 0.5 + index * 0.2, type: "spring" }}
                      className="absolute -top-3 -right-3 w-10 h-10 rounded-full bg-background border-2 border-primary flex items-center justify-center shadow-lg"
                    >
                      <span className="text-xl font-bold text-primary">{step.number}</span>
                    </motion.div>
                  </motion.div>
                  
                  {/* Arrow for mobile */}
                  {index < steps.length - 1 && (
                    <motion.div
                      className="md:hidden my-4"
                      animate={{ y: [0, 5, 0] }}
                      transition={{ duration: 1.5, repeat: Infinity }}
                    >
                      <ArrowLeft className="w-6 h-6 text-primary rotate-[-90deg]" />
                    </motion.div>
                  )}
                  
                  {/* Content */}
                  <motion.h3
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.3 + index * 0.2 }}
                    className="text-2xl font-bold text-foreground mb-3 group-hover:text-primary transition-colors"
                  >
                    {step.title}
                  </motion.h3>
                  <motion.p
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.4 + index * 0.2 }}
                    className="text-muted-foreground leading-relaxed"
                  >
                    {step.description}
                  </motion.p>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HowItWorksSection;
