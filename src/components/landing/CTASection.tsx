import { Button } from "@/components/ui/button";
import { Bot, ArrowLeft, Sparkles, Zap } from "lucide-react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

const CTASection = () => {
  return (
    <section className="py-24 relative overflow-hidden">
      {/* Vibrant animated gradient background */}
      <div className="absolute inset-0">
        <motion.div
          className="absolute inset-0"
          animate={{
            background: [
              "linear-gradient(135deg, hsl(var(--primary)/0.15) 0%, hsl(var(--accent)/0.1) 50%, hsl(var(--primary)/0.15) 100%)",
              "linear-gradient(135deg, hsl(var(--accent)/0.15) 0%, hsl(var(--primary)/0.1) 50%, hsl(var(--accent)/0.15) 100%)",
              "linear-gradient(135deg, hsl(var(--primary)/0.15) 0%, hsl(var(--accent)/0.1) 50%, hsl(var(--primary)/0.15) 100%)",
            ],
          }}
          transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
        />
      </div>

      {/* Animated large orbs */}
      <motion.div
        animate={{
          scale: [1, 1.3, 1],
          opacity: [0.3, 0.5, 0.3],
          x: [0, 50, 0],
        }}
        transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
        className="absolute top-0 left-1/4 w-[600px] h-[600px] bg-primary/10 rounded-full blur-3xl"
      />
      <motion.div
        animate={{
          scale: [1.2, 1, 1.2],
          opacity: [0.3, 0.5, 0.3],
          x: [0, -50, 0],
        }}
        transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
        className="absolute bottom-0 right-1/4 w-[500px] h-[500px] bg-accent/10 rounded-full blur-3xl"
      />
      
      {/* Floating particles */}
      {[...Array(12)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute w-3 h-3 rounded-full bg-primary/40"
          style={{
            left: `${10 + i * 8}%`,
            top: `${20 + (i % 4) * 20}%`,
          }}
          animate={{
            y: [0, -50, 0],
            opacity: [0.2, 0.8, 0.2],
            scale: [1, 1.5, 1],
          }}
          transition={{
            duration: 4 + i * 0.5,
            repeat: Infinity,
            delay: i * 0.3,
          }}
        />
      ))}

      {/* Sparkle icons */}
      {[...Array(6)].map((_, i) => (
        <motion.div
          key={`sparkle-${i}`}
          className="absolute text-primary/30"
          style={{
            left: `${15 + i * 15}%`,
            top: `${15 + (i % 3) * 30}%`,
          }}
          animate={{
            rotate: [0, 180, 360],
            scale: [1, 1.5, 1],
            opacity: [0.2, 0.6, 0.2],
          }}
          transition={{
            duration: 5 + i,
            repeat: Infinity,
            delay: i * 0.5,
          }}
        >
          <Zap className="w-5 h-5" />
        </motion.div>
      ))}
      
      <div className="container relative z-10 px-4">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="max-w-3xl mx-auto text-center"
        >
          {/* Icon with glow */}
          <motion.div
            initial={{ scale: 0 }}
            whileInView={{ scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, type: "spring" }}
            className="relative inline-flex items-center justify-center mb-8"
          >
            <motion.div
              className="absolute inset-0 hero-gradient rounded-2xl blur-xl"
              animate={{ 
                opacity: [0.5, 0.8, 0.5],
                scale: [1, 1.2, 1],
              }}
              transition={{ duration: 2, repeat: Infinity }}
            />
            <div className="relative w-20 h-20 rounded-2xl hero-gradient flex items-center justify-center shadow-2xl">
              <Bot className="w-10 h-10 text-primary-foreground" />
            </div>
          </motion.div>
          
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="text-3xl md:text-5xl font-bold text-foreground mb-6"
          >
            جاهز لتفعيل وكيلك؟
          </motion.h2>
          
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="text-xl text-muted-foreground mb-10"
          >
            أخبره بما تريد واتركه يعمل. موقعك سيكون جاهزاً ومنشوراً.
          </motion.p>
          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-4"
          >
            <Link to="/app">
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="relative"
              >
                {/* Animated glow behind button */}
                <motion.div
                  className="absolute inset-0 hero-gradient rounded-xl blur-xl"
                  animate={{
                    opacity: [0.4, 0.7, 0.4],
                    scale: [1, 1.15, 1],
                  }}
                  transition={{ duration: 2, repeat: Infinity }}
                />
                <Button variant="hero" size="xl" className="relative group">
                  <Sparkles className="w-5 h-5" />
                  ابدأ مع وكيلك الآن
                  <motion.div
                    animate={{ x: [0, -8, 0] }}
                    transition={{ duration: 1.2, repeat: Infinity }}
                  >
                    <ArrowLeft className="w-5 h-5" />
                  </motion.div>
                </Button>
              </motion.div>
            </Link>
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.6 }}
            className="mt-10"
          >
            <div className="inline-flex items-center gap-4 px-6 py-3 rounded-full bg-background/60 backdrop-blur-md border border-border/50">
              <div className="flex items-center gap-2">
                <motion.div
                  className="w-2 h-2 rounded-full bg-green-500"
                  animate={{ scale: [1, 1.3, 1] }}
                  transition={{ duration: 1, repeat: Infinity }}
                />
                <span className="text-sm text-muted-foreground">مجاني للبدء</span>
              </div>
              <div className="w-px h-4 bg-border" />
              <span className="text-sm text-muted-foreground">لا بطاقة ائتمان مطلوبة</span>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default CTASection;
