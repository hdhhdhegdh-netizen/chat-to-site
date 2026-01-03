import { motion } from "framer-motion";
import { Bot, Loader2, Copy, Check } from "lucide-react";
import { useState } from "react";
import { Button } from "@/components/ui/button";

interface Message {
  id: string;
  type: "user" | "agent";
  content: string;
  status?: "building" | "done" | "error";
}

interface ChatMessageProps {
  message: Message;
}

export const ChatMessage = ({ message }: ChatMessageProps) => {
  const [copied, setCopied] = useState(false);

  const copyMessage = async () => {
    await navigator.clipboard.writeText(message.content);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.3 }}
      className={`group ${message.type === "agent" ? "agent-message" : "user-message"}`}
    >
      <div className="flex items-start gap-3">
        {message.type === "agent" && (
          <div className="w-8 h-8 rounded-lg hero-gradient flex items-center justify-center flex-shrink-0">
            {message.status === "building" ? (
              <Loader2 className="w-4 h-4 text-primary-foreground animate-spin" />
            ) : (
              <Bot className="w-4 h-4 text-primary-foreground" />
            )}
          </div>
        )}
        <div className="flex-1">
          <p className="text-foreground leading-relaxed whitespace-pre-wrap text-sm">
            {message.content || (
              <span className="flex gap-1">
                <motion.span 
                  className="w-2 h-2 rounded-full bg-primary/40"
                  animate={{ opacity: [0.3, 1, 0.3] }}
                  transition={{ duration: 1, repeat: Infinity }}
                />
                <motion.span 
                  className="w-2 h-2 rounded-full bg-primary/40"
                  animate={{ opacity: [0.3, 1, 0.3] }}
                  transition={{ duration: 1, delay: 0.2, repeat: Infinity }}
                />
                <motion.span 
                  className="w-2 h-2 rounded-full bg-primary/40"
                  animate={{ opacity: [0.3, 1, 0.3] }}
                  transition={{ duration: 1, delay: 0.4, repeat: Infinity }}
                />
              </span>
            )}
          </p>
          
          <div className="flex items-center justify-between mt-2">
            <div>
              {message.status === "done" && message.type === "agent" && message.content && (
                <motion.div 
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="flex items-center gap-2 text-xs text-muted-foreground"
                >
                  <div className="w-1.5 h-1.5 rounded-full bg-green-500" />
                  تم التنفيذ
                </motion.div>
              )}
              {message.status === "error" && (
                <div className="flex items-center gap-2 text-xs text-destructive">
                  <div className="w-1.5 h-1.5 rounded-full bg-destructive" />
                  فشل في التنفيذ
                </div>
              )}
            </div>
            
            {message.content && (
              <Button
                variant="ghost"
                size="sm"
                onClick={copyMessage}
                className="opacity-0 group-hover:opacity-100 transition-opacity h-6 w-6 p-0"
              >
                {copied ? (
                  <Check className="w-3 h-3 text-green-500" />
                ) : (
                  <Copy className="w-3 h-3 text-muted-foreground" />
                )}
              </Button>
            )}
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default ChatMessage;
