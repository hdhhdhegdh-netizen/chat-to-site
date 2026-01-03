import { useLocation, Link } from "react-router-dom";
import { useEffect } from "react";
import { motion } from "framer-motion";
import { Home, ArrowRight, Bot, Sparkles, Search, Rocket } from "lucide-react";
import { Button } from "@/components/ui/button";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error("404 Error: User attempted to access non-existent route:", location.pathname);
  }, [location.pathname]);

  return (
    <div className="min-h-screen relative overflow-hidden flex items-center justify-center">
      {/* Animated gradient background */}
      <div className="fixed inset-0 bg-gradient-to-br from-primary/20 via-accent/10 to-primary/5" />
      
      {/* Animated orbs */}
      <motion.div
        className="fixed top-1/4 right-1/4 w-96 h-96 rounded-full bg-gradient-to-br from-primary/30 to-accent/20 blur-3xl"
        animate={{
          scale: [1, 1.2, 1],
          x: [0, 50, 0],
          y: [0, -30, 0],
        }}
        transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        className="fixed bottom-1/4 left-1/4 w-80 h-80 rounded-full bg-gradient-to-tr from-accent/20 to-primary/30 blur-3xl"
        animate={{
          scale: [1.2, 1, 1.2],
          x: [0, -40, 0],
          y: [0, 40, 0],
        }}
        transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        className="fixed top-1/2 left-1/2 w-64 h-64 rounded-full bg-gradient-to-br from-pink-500/20 to-purple-500/20 blur-3xl"
        animate={{
          scale: [1, 1.3, 1],
          rotate: [0, 180, 360],
        }}
        transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
      />

      {/* Floating particles */}
      {[...Array(20)].map((_, i) => (
        <motion.div
          key={i}
          className="fixed w-2 h-2 rounded-full bg-primary/30"
          style={{
            top: `${Math.random() * 100}%`,
            left: `${Math.random() * 100}%`,
          }}
          animate={{
            y: [0, -30, 0],
            opacity: [0.3, 0.8, 0.3],
          }}
          transition={{
            duration: 3 + Math.random() * 2,
            repeat: Infinity,
            delay: Math.random() * 2,
          }}
        />
      ))}

      {/* Content */}
      <div className="relative z-10 text-center px-6 max-w-2xl mx-auto">
        {/* 404 with animated icon */}
        <motion.div
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
          className="mb-8"
        >
          <div className="relative inline-block">
            <motion.div
              className="w-32 h-32 mx-auto rounded-3xl hero-gradient flex items-center justify-center shadow-glow"
              animate={{
                rotate: [0, 5, -5, 0],
                scale: [1, 1.05, 1],
              }}
              transition={{ duration: 4, repeat: Infinity }}
            >
              <Search className="w-16 h-16 text-primary-foreground" />
            </motion.div>
            
            {/* Floating sparkles around icon */}
            <motion.div
              className="absolute -top-2 -right-2"
              animate={{ y: [-5, 5, -5], rotate: [0, 15, 0] }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              <Sparkles className="w-6 h-6 text-primary" />
            </motion.div>
            <motion.div
              className="absolute -bottom-2 -left-2"
              animate={{ y: [5, -5, 5], rotate: [0, -15, 0] }}
              transition={{ duration: 2.5, repeat: Infinity }}
            >
              <Bot className="w-5 h-5 text-accent" />
            </motion.div>
          </div>
        </motion.div>

        {/* 404 Text */}
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="text-8xl font-bold mb-4 bg-gradient-to-l from-primary via-accent to-primary bg-clip-text text-transparent"
        >
          404
        </motion.h1>

        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="text-2xl font-bold text-foreground mb-4"
        >
          عذراً، الصفحة غير موجودة
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="text-muted-foreground text-lg mb-8 leading-relaxed"
        >
          يبدو أن الصفحة التي تبحث عنها غير موجودة أو تم نقلها.
          <br />
          لا تقلق، يمكنك العودة للصفحة الرئيسية أو البدء بإنشاء موقعك!
        </motion.p>

        {/* Action buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="flex flex-col sm:flex-row gap-4 justify-center items-center"
        >
          <Link to="/">
            <Button
              size="lg"
              className="hero-gradient shadow-glow hover:shadow-xl transition-all group"
            >
              <Home className="w-5 h-5 ml-2 group-hover:-translate-x-1 transition-transform" />
              العودة للرئيسية
            </Button>
          </Link>
          
          <Link to="/app">
            <Button
              size="lg"
              variant="outline"
              className="border-primary/30 hover:border-primary hover:bg-primary/5 group"
            >
              <Rocket className="w-5 h-5 ml-2 group-hover:translate-y-[-2px] transition-transform" />
              ابدأ بناء موقعك
              <ArrowRight className="w-4 h-4 mr-2 group-hover:translate-x-[-4px] transition-transform" />
            </Button>
          </Link>
        </motion.div>

        {/* Path info */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.7 }}
          className="mt-12 p-4 rounded-2xl bg-card/50 backdrop-blur-sm border border-primary/10"
        >
          <p className="text-sm text-muted-foreground">
            المسار المطلوب:{" "}
            <code className="px-2 py-1 rounded bg-muted text-foreground font-mono text-xs" dir="ltr">
              {location.pathname}
            </code>
          </p>
        </motion.div>
      </div>
    </div>
  );
};

export default NotFound;
