import { X } from "lucide-react";
import { motion } from "framer-motion";

const problems = [
  "شرح فكرتك أكثر من مرة",
  "انتظار، مراجعات، تعديلات لا نهاية لها",
  "مصطلحات تقنية لا تهمك",
  "نتيجة لا تشبه ما تخيلته",
];

const ProblemSection = () => {
  return (
    <section className="py-24 bg-card">
      <div className="container px-4">
        <div className="max-w-4xl mx-auto">
          {/* Section header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
              إنشاء موقع اليوم يعني...
            </h2>
            <p className="text-lg text-muted-foreground">
              تجربة مرهقة لا يجب أن تتكرر
            </p>
          </motion.div>
          
          {/* Problem cards */}
          <div className="grid md:grid-cols-2 gap-4 mb-12">
            {problems.map((problem, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: index % 2 === 0 ? -20 : 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                whileHover={{ scale: 1.02 }}
                className="flex items-center gap-4 p-6 rounded-xl bg-destructive/5 border border-destructive/10"
              >
                <motion.div
                  initial={{ rotate: 0 }}
                  whileHover={{ rotate: 90 }}
                  transition={{ duration: 0.2 }}
                  className="flex-shrink-0 w-10 h-10 rounded-full bg-destructive/10 flex items-center justify-center"
                >
                  <X className="w-5 h-5 text-destructive" />
                </motion.div>
                <span className="text-foreground font-medium">{problem}</span>
              </motion.div>
            ))}
          </div>
          
          {/* The real problem */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="text-center p-8 rounded-2xl border-2 border-dashed border-muted"
          >
            <p className="text-lg text-muted-foreground mb-2">المشكلة ليست في الأدوات</p>
            <p className="text-2xl font-bold text-foreground">
              المشكلة في <motion.span
                className="text-destructive inline-block"
                animate={{ scale: [1, 1.1, 1] }}
                transition={{ duration: 2, repeat: Infinity }}
              >
                الوسيط البشري
              </motion.span>
            </p>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default ProblemSection;
