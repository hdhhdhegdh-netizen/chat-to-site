import { Check, Code, Settings, FileStack, Layers, Globe } from "lucide-react";
import { motion } from "framer-motion";

const features = [
  { icon: Code, text: "بدون كود", description: "لا حاجة لأي معرفة تقنية" },
  { icon: Settings, text: "بدون إعدادات", description: "كل شيء جاهز للاستخدام" },
  { icon: FileStack, text: "بدون ملفات", description: "لا رفع ولا تحميل" },
  { icon: Layers, text: "بدون تعقيد", description: "واجهة محادثة بسيطة" },
  { icon: Globe, text: "موقع حقيقي", description: "قابل للنشر والاستخدام" },
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
    <section className="py-24 subtle-gradient">
      <div className="container px-4">
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
              لماذا Chat2Site
            </h2>
            <p className="text-lg text-muted-foreground">
              أنت لا "تبني" — أنت{" "}
              <motion.span
                className="font-bold text-primary inline-block"
                animate={{ scale: [1, 1.1, 1] }}
                transition={{ duration: 1.5, repeat: Infinity }}
              >
                توجّه
              </motion.span>
            </p>
          </motion.div>
          
          {/* Features grid */}
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
                className="group p-6 rounded-2xl bg-card shadow-card hover:shadow-elevated transition-all duration-300 border border-transparent hover:border-primary/20"
              >
                <div className="flex items-start gap-4">
                  <motion.div
                    whileHover={{ rotate: 360, scale: 1.1 }}
                    transition={{ duration: 0.5 }}
                    className="flex-shrink-0 w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center group-hover:bg-primary transition-all duration-300"
                  >
                    <feature.icon className="w-6 h-6 text-primary group-hover:text-primary-foreground transition-colors" />
                  </motion.div>
                  <div>
                    <h3 className="text-lg font-bold text-foreground mb-1">{feature.text}</h3>
                    <p className="text-muted-foreground text-sm">{feature.description}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
          
          {/* Bottom emphasis */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.5 }}
            className="mt-16 text-center"
          >
            <motion.div
              whileHover={{ scale: 1.05 }}
              className="inline-flex items-center gap-3 px-6 py-3 rounded-full bg-primary/10"
            >
              <motion.div
                animate={{ scale: [1, 1.2, 1] }}
                transition={{ duration: 1, repeat: Infinity }}
              >
                <Check className="w-5 h-5 text-primary" />
              </motion.div>
              <span className="font-medium text-foreground">
                موقع كامل من محادثة واحدة
              </span>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default WhySection;
