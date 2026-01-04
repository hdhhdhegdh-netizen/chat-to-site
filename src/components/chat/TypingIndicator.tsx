import { motion } from "framer-motion";
import { Bot } from "lucide-react";

interface TypingIndicatorProps {
  message?: string;
}

const TypingIndicator = ({ message = "الوكيل يكتب..." }: TypingIndicatorProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -10 }}
      className="flex items-start gap-3"
    >
      <motion.div
        className="w-8 h-8 rounded-lg hero-gradient flex items-center justify-center flex-shrink-0"
        animate={{ scale: [1, 1.1, 1] }}
        transition={{ duration: 1.5, repeat: Infinity }}
      >
        <Bot className="w-4 h-4 text-primary-foreground" />
      </motion.div>
      <div className="bg-muted rounded-2xl rounded-tr-sm px-4 py-3">
        <div className="flex items-center gap-2">
          <span className="text-sm text-muted-foreground">{message}</span>
          <div className="flex gap-1">
            {[0, 1, 2].map((i) => (
              <motion.div
                key={i}
                className="w-1.5 h-1.5 rounded-full bg-primary"
                animate={{ opacity: [0.3, 1, 0.3], scale: [0.8, 1, 0.8] }}
                transition={{
                  duration: 1,
                  repeat: Infinity,
                  delay: i * 0.2,
                }}
              />
            ))}
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default TypingIndicator;
