import { Button } from "@/components/ui/button";
import { MessageSquare, Zap, Bot, Sparkles } from "lucide-react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

const HeroSection = () => {
  return (
    <section className="relative min-h-[90vh] flex items-center justify-center overflow-hidden subtle-gradient">
      {/* Animated background decoration */}
      <div className="absolute inset-0 overflow-hidden">
        <motion.div
          className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/5 rounded-full blur-3xl"
          animate={{
            x: [0, 30, 0],
            y: [0, -20, 0],
            scale: [1, 1.1, 1],
          }}
          transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div
          className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-accent/5 rounded-full blur-3xl"
          animate={{
            x: [0, -30, 0],
            y: [0, 20, 0],
            scale: [1.1, 1, 1.1],
          }}
          transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
        />
      </div>
      
      <div className="container relative z-10 px-4 py-20">
        <div className="max-w-4xl mx-auto text-center">
          {/* Badge */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary mb-8"
          >
            <motion.div
              animate={{ scale: [1, 1.2, 1] }}
              transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
            >
              <Bot className="w-4 h-4" />
            </motion.div>
            <span className="text-sm font-medium">وكيل ذكي مستقل • ليس أداة بناء</span>
          </motion.div>
          
          {/* Main headline */}
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-4xl md:text-6xl lg:text-7xl font-bold text-foreground mb-6 leading-tight"
          >
            وكيلك الرقمي
            <motion.span
              className="block hero-gradient bg-clip-text text-transparent"
              animate={{
                backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"],
              }}
              transition={{ duration: 5, repeat: Infinity }}
              style={{ backgroundSize: "200% 200%" }}
            >
              يبني وينشر بدلاً عنك
            </motion.span>
          </motion.h1>
          
          {/* Subheadline */}
          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-xl md:text-2xl text-muted-foreground mb-10 max-w-2xl mx-auto text-balance"
          >
            لا تحتاج معرفة تقنية. فقط أخبره بما تريد.
            <br />
            <span className="text-foreground font-medium">Chat2Site</span> يفهم، يصمم، يبني، وينشر موقعك — تلقائياً.
          </motion.p>
          
          {/* CTA Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-4"
          >
            <Link to="/app">
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Button variant="hero" size="xl">
                  <Sparkles className="w-5 h-5" />
                  تحدث مع وكيلك
                </Button>
              </motion.div>
            </Link>
            <Link to="/pricing">
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Button variant="heroOutline" size="lg">
                  تعرف على الأسعار
                </Button>
              </motion.div>
            </Link>
          </motion.div>
          
          {/* Trust indicators */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.5 }}
            className="mt-16 flex flex-col items-center gap-4"
          >
            <p className="text-sm text-muted-foreground">لا حاجة لبطاقة ائتمان • ابدأ مجانًا</p>
            <div className="flex items-center gap-6 text-muted-foreground">
              {[
                { label: "وكيل مستقل" },
                { label: "نشر تلقائي" },
                { label: "بدون كود" },
              ].map((item, index) => (
                <motion.div
                  key={item.label}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.6 + index * 0.1 }}
                  className="flex items-center gap-2"
                >
                  <motion.div
                    className="w-2 h-2 rounded-full status-ready"
                    animate={{ scale: [1, 1.2, 1] }}
                    transition={{ duration: 2, delay: index * 0.3, repeat: Infinity }}
                  />
                  <span className="text-sm">{item.label}</span>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
