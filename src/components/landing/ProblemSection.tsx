import { X, AlertTriangle } from "lucide-react";
import { motion } from "framer-motion";

const problems = [
  "التعامل مع مصممين ومطورين",
  "انتظار أيام وأسابيع للتنفيذ",
  "ترجمة أفكارك لمصطلحات تقنية",
  "التعديلات اللانهائية والتكاليف الإضافية",
];

const ProblemSection = () => {
  return (
    <section className="py-24 bg-card relative overflow-hidden">
      {/* Subtle background pattern */}
      <div className="absolute inset-0 opacity-30">
        <div className="absolute inset-0" style={{
          backgroundImage: `radial-gradient(circle at 2px 2px, hsl(var(--destructive)/0.1) 1px, transparent 0)`,
          backgroundSize: '40px 40px',
        }} />
      </div>

      <div className="container px-4 relative z-10">
        <div className="max-w-4xl mx-auto">
          {/* Section header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="text-center mb-16"
          >
            <motion.div
              initial={{ scale: 0 }}
              whileInView={{ scale: 1 }}
              viewport={{ once: true }}
              className="inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-destructive/10 mb-6"
            >
              <AlertTriangle className="w-7 h-7 text-destructive" />
            </motion.div>
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
              الطريقة التقليدية لإنشاء موقع
            </h2>
            <p className="text-lg text-muted-foreground">
              وسطاء، انتظار، وتكاليف لا تنتهي
            </p>
          </motion.div>
          
          {/* Problem cards with gradient borders */}
          <div className="grid md:grid-cols-2 gap-4 mb-12">
            {problems.map((problem, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: index % 2 === 0 ? -30 : 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                whileHover={{ scale: 1.02, y: -2 }}
                className="relative group"
              >
                {/* Gradient border effect */}
                <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-destructive/50 to-destructive/20 opacity-0 group-hover:opacity-100 transition-opacity blur-sm" />
                <div className="relative flex items-center gap-4 p-6 rounded-xl bg-background border border-destructive/20 group-hover:border-destructive/40 transition-colors">
                  <motion.div
                    whileHover={{ rotate: 180 }}
                    transition={{ duration: 0.3 }}
                    className="flex-shrink-0 w-12 h-12 rounded-xl bg-destructive/10 flex items-center justify-center group-hover:bg-destructive/20 transition-colors"
                  >
                    <X className="w-6 h-6 text-destructive" />
                  </motion.div>
                  <span className="text-foreground font-medium text-lg">{problem}</span>
                </div>
              </motion.div>
            ))}
          </div>
          
          {/* The real problem - enhanced */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="relative"
          >
            <motion.div
              className="absolute inset-0 hero-gradient rounded-2xl blur-xl opacity-20"
              animate={{ opacity: [0.1, 0.3, 0.1] }}
              transition={{ duration: 3, repeat: Infinity }}
            />
            <div className="relative text-center p-10 rounded-2xl bg-background/80 backdrop-blur-sm border-2 border-primary/20">
              <p className="text-lg text-muted-foreground mb-3">الحل ليس أداة أخرى</p>
              <p className="text-2xl md:text-3xl font-bold text-foreground">
                الحل هو{" "}
                <motion.span
                  className="hero-gradient bg-clip-text text-transparent inline-block"
                  animate={{ 
                    scale: [1, 1.05, 1],
                  }}
                  transition={{ duration: 2, repeat: Infinity }}
                >
                  وكيل ذكي يعمل بدلاً عنك
                </motion.span>
              </p>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default ProblemSection;
