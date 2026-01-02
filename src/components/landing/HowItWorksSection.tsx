import { MessageCircle, Bot, Globe } from "lucide-react";
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
    <section className="py-24 bg-card overflow-hidden">
      <div className="container px-4">
        <div className="max-w-5xl mx-auto">
          {/* Section header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="text-center mb-20"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
              كيف يعمل وكيلك
            </h2>
            <p className="text-lg text-muted-foreground">
              من الفكرة إلى موقع منشور في دقائق
            </p>
          </motion.div>
          
          {/* Steps */}
          <div className="relative">
            {/* Connection line */}
            <motion.div
              initial={{ scaleX: 0 }}
              whileInView={{ scaleX: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 1, delay: 0.5 }}
              className="hidden md:block absolute top-24 right-[16.66%] left-[16.66%] h-0.5 bg-gradient-to-l from-primary/20 via-primary to-primary/20 origin-right"
            />
            
            <div className="grid md:grid-cols-3 gap-8">
              {steps.map((step, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 40 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.2 }}
                  className="relative flex flex-col items-center text-center"
                >
                  {/* Step number */}
                  <motion.div
                    whileHover={{ scale: 1.1, rotate: 5 }}
                    className="relative z-10 mb-6"
                  >
                    <motion.div
                      animate={{ 
                        boxShadow: [
                          "0 0 0 0 rgba(59, 130, 246, 0)",
                          "0 0 0 10px rgba(59, 130, 246, 0.1)",
                          "0 0 0 0 rgba(59, 130, 246, 0)"
                        ]
                      }}
                      transition={{ duration: 2, repeat: Infinity, delay: index * 0.3 }}
                      className="w-20 h-20 rounded-2xl hero-gradient flex items-center justify-center shadow-elevated"
                    >
                      <step.icon className="w-10 h-10 text-primary-foreground" />
                    </motion.div>
                    <motion.div
                      initial={{ scale: 0 }}
                      whileInView={{ scale: 1 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.3, delay: 0.5 + index * 0.2 }}
                      className="absolute -top-2 -right-2 w-8 h-8 rounded-full bg-card border-2 border-primary flex items-center justify-center"
                    >
                      <span className="text-lg font-bold text-primary">{step.number}</span>
                    </motion.div>
                  </motion.div>
                  
                  {/* Content */}
                  <motion.h3
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.3 + index * 0.2 }}
                    className="text-2xl font-bold text-foreground mb-3"
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
