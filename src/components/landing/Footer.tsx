import { Link } from "react-router-dom";
import { Bot, Heart, Sparkles } from "lucide-react";
import { motion } from "framer-motion";

const Footer = () => {
  return (
    <footer className="relative overflow-hidden">
      {/* Gradient background */}
      <div className="absolute inset-0 bg-gradient-to-b from-foreground to-foreground/95" />
      
      {/* Subtle animated orb */}
      <motion.div
        className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[300px] bg-primary/10 rounded-full blur-3xl"
        animate={{ opacity: [0.1, 0.2, 0.1] }}
        transition={{ duration: 5, repeat: Infinity }}
      />

      <div className="container px-4 relative z-10">
        {/* Main footer content */}
        <div className="py-12 flex flex-col md:flex-row items-center justify-between gap-8">
          {/* Logo with glow */}
          <motion.div
            whileHover={{ scale: 1.05 }}
            className="flex items-center gap-3"
          >
            <div className="relative">
              <motion.div
                className="absolute inset-0 bg-primary rounded-lg blur-md opacity-50"
                animate={{ opacity: [0.3, 0.6, 0.3] }}
                transition={{ duration: 2, repeat: Infinity }}
              />
              <div className="relative w-10 h-10 rounded-lg bg-background flex items-center justify-center">
                <Bot className="w-5 h-5 text-foreground" />
              </div>
            </div>
            <span className="font-bold text-2xl text-background">Chat2Site</span>
          </motion.div>
          
          {/* Navigation */}
          <nav className="flex items-center gap-6 flex-wrap justify-center">
            {[
              { to: "/", label: "الرئيسية" },
              { to: "/pricing", label: "الأسعار" },
              { to: "/docs", label: "المساعدة" },
              { to: "/privacy", label: "الخصوصية" },
              { to: "/terms", label: "الشروط" },
            ].map((link) => (
              <Link
                key={link.to}
                to={link.to}
                className="text-background/70 hover:text-background transition-colors relative group"
              >
                {link.label}
                <motion.span
                  className="absolute -bottom-1 left-0 right-0 h-0.5 bg-primary origin-right"
                  initial={{ scaleX: 0 }}
                  whileHover={{ scaleX: 1 }}
                  transition={{ duration: 0.3 }}
                />
              </Link>
            ))}
          </nav>
          
          {/* Copyright */}
          <p className="text-sm text-background/50 flex items-center gap-1">
            © {new Date().getFullYear()} Chat2Site. جميع الحقوق محفوظة.
          </p>
        </div>
        
        {/* Divider with gradient */}
        <div className="h-px bg-gradient-to-r from-transparent via-background/20 to-transparent" />
        
        {/* Bottom section - positioning statement */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="py-8 text-center"
        >
          <div className="inline-flex items-center gap-3 px-6 py-3 rounded-full bg-background/10 backdrop-blur-sm border border-background/10">
            <Sparkles className="w-4 h-4 text-primary" />
            <p className="text-background/80 text-sm">
              Chat2Site ليس أداة بناء مواقع — هو{" "}
              <span className="text-background font-semibold">وكيلك الذكي</span>{" "}
              الذي يبني وينشر بدلاً عنك
            </p>
          </div>
          
          <motion.p
            className="mt-6 text-background/40 text-xs flex items-center justify-center gap-1"
            animate={{ opacity: [0.4, 0.6, 0.4] }}
            transition={{ duration: 3, repeat: Infinity }}
          >
            صُنع بـ <Heart className="w-3 h-3 text-red-400 fill-red-400" /> للمبدعين العرب
          </motion.p>
        </motion.div>
      </div>
    </footer>
  );
};

export default Footer;
