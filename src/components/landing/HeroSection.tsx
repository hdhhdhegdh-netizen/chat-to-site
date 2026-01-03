import { Button } from "@/components/ui/button";
import { MessageSquare, Zap, Bot, Sparkles, Star } from "lucide-react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

const HeroSection = () => {
  return (
    <section className="relative min-h-[90vh] flex items-center justify-center overflow-hidden">
      {/* Vibrant animated gradient background */}
      <div className="absolute inset-0">
        <motion.div
          className="absolute inset-0 bg-gradient-to-br from-primary/10 via-accent/5 to-secondary/10"
          animate={{
            background: [
              "linear-gradient(135deg, hsl(var(--primary)/0.1), hsl(var(--accent)/0.05), hsl(var(--secondary)/0.1))",
              "linear-gradient(135deg, hsl(var(--accent)/0.1), hsl(var(--primary)/0.05), hsl(var(--secondary)/0.1))",
              "linear-gradient(135deg, hsl(var(--primary)/0.1), hsl(var(--accent)/0.05), hsl(var(--secondary)/0.1))",
            ],
          }}
          transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
        />
      </div>

      {/* Animated orbs */}
      <div className="absolute inset-0 overflow-hidden">
        <motion.div
          className="absolute top-1/4 left-1/4 w-[500px] h-[500px] bg-gradient-to-br from-primary/20 to-accent/20 rounded-full blur-3xl"
          animate={{
            x: [0, 50, 0],
            y: [0, -30, 0],
            scale: [1, 1.2, 1],
          }}
          transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div
          className="absolute bottom-1/4 right-1/4 w-[400px] h-[400px] bg-gradient-to-br from-accent/20 to-primary/20 rounded-full blur-3xl"
          animate={{
            x: [0, -40, 0],
            y: [0, 30, 0],
            scale: [1.1, 1, 1.1],
          }}
          transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-gradient-to-r from-primary/10 via-transparent to-accent/10 rounded-full blur-3xl"
          animate={{
            rotate: [0, 360],
          }}
          transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
        />
      </div>

      {/* Floating particles */}
      {[...Array(12)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute w-2 h-2 rounded-full bg-primary/40"
          style={{
            left: `${10 + i * 8}%`,
            top: `${20 + (i % 4) * 20}%`,
          }}
          animate={{
            y: [0, -40, 0],
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

      {/* Floating stars */}
      {[...Array(6)].map((_, i) => (
        <motion.div
          key={`star-${i}`}
          className="absolute text-primary/30"
          style={{
            left: `${15 + i * 15}%`,
            top: `${25 + (i % 3) * 25}%`,
          }}
          animate={{
            rotate: [0, 360],
            scale: [1, 1.3, 1],
            opacity: [0.3, 0.7, 0.3],
          }}
          transition={{
            duration: 5 + i,
            repeat: Infinity,
            delay: i * 0.5,
          }}
        >
          <Star className="w-4 h-4 fill-current" />
        </motion.div>
      ))}
      
      <div className="container relative z-10 px-4 py-20">
        <div className="max-w-4xl mx-auto text-center">
          {/* Glassmorphism Badge */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-background/60 backdrop-blur-xl border border-primary/20 shadow-lg mb-8"
          >
            <motion.div
              animate={{ 
                scale: [1, 1.3, 1],
                rotate: [0, 10, -10, 0],
              }}
              transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
              className="w-8 h-8 rounded-full hero-gradient flex items-center justify-center"
            >
              <Bot className="w-4 h-4 text-primary-foreground" />
            </motion.div>
            <span className="text-sm font-medium text-foreground">وكيل ذكي مستقل • ليس أداة بناء</span>
            <motion.div
              animate={{ scale: [1, 1.2, 1] }}
              transition={{ duration: 1.5, repeat: Infinity }}
            >
              <Sparkles className="w-4 h-4 text-primary" />
            </motion.div>
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
              className="block hero-gradient bg-clip-text text-transparent drop-shadow-lg"
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
                className="relative"
              >
                {/* Glow effect behind button */}
                <motion.div
                  className="absolute inset-0 hero-gradient rounded-xl blur-xl opacity-50"
                  animate={{
                    opacity: [0.3, 0.6, 0.3],
                    scale: [1, 1.1, 1],
                  }}
                  transition={{ duration: 2, repeat: Infinity }}
                />
                <Button variant="hero" size="xl" className="relative">
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
                <Button variant="heroOutline" size="lg" className="backdrop-blur-sm">
                  تعرف على الأسعار
                </Button>
              </motion.div>
            </Link>
          </motion.div>
          
          {/* Trust indicators with glassmorphism */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.5 }}
            className="mt-16 flex flex-col items-center gap-6"
          >
            <motion.div
              className="px-6 py-3 rounded-full bg-background/40 backdrop-blur-md border border-border/50"
              whileHover={{ scale: 1.02 }}
            >
              <p className="text-sm text-muted-foreground">لا حاجة لبطاقة ائتمان • ابدأ مجانًا</p>
            </motion.div>
            <div className="flex items-center gap-8 text-muted-foreground">
              {[
                { label: "وكيل مستقل", icon: Bot },
                { label: "نشر تلقائي", icon: Zap },
                { label: "بدون كود", icon: MessageSquare },
              ].map((item, index) => (
                <motion.div
                  key={item.label}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.6 + index * 0.1 }}
                  whileHover={{ scale: 1.05, y: -2 }}
                  className="flex items-center gap-2 px-4 py-2 rounded-full bg-background/30 backdrop-blur-sm border border-border/30"
                >
                  <motion.div
                    className="w-6 h-6 rounded-full bg-primary/20 flex items-center justify-center"
                    animate={{ scale: [1, 1.1, 1] }}
                    transition={{ duration: 2, delay: index * 0.3, repeat: Infinity }}
                  >
                    <item.icon className="w-3 h-3 text-primary" />
                  </motion.div>
                  <span className="text-sm font-medium">{item.label}</span>
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
