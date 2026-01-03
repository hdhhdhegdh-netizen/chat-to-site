import { Moon, Sun } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useTheme } from "@/hooks/useTheme";
import { motion } from "framer-motion";

export function ThemeToggle() {
  const { theme, toggleTheme } = useTheme();

  return (
    <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
      <Button
        variant="ghost"
        size="icon"
        onClick={toggleTheme}
        className="relative w-9 h-9 rounded-full bg-primary/10 hover:bg-primary/20 border border-primary/20"
      >
        <motion.div
          initial={false}
          animate={{ 
            rotate: theme === 'dark' ? 0 : 180,
            scale: theme === 'dark' ? 1 : 0
          }}
          transition={{ duration: 0.3, ease: "easeInOut" }}
          className="absolute"
        >
          <Moon className="h-4 w-4 text-primary" />
        </motion.div>
        <motion.div
          initial={false}
          animate={{ 
            rotate: theme === 'light' ? 0 : -180,
            scale: theme === 'light' ? 1 : 0
          }}
          transition={{ duration: 0.3, ease: "easeInOut" }}
          className="absolute"
        >
          <Sun className="h-4 w-4 text-primary" />
        </motion.div>
        <span className="sr-only">تبديل الوضع</span>
      </Button>
    </motion.div>
  );
}
