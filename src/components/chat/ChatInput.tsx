import { useState, useRef, useEffect } from "react";
import { motion } from "framer-motion";
import { Send, Loader2, Mic, Paperclip, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";

interface ChatInputProps {
  onSend: (message: string) => void;
  isStreaming: boolean;
  placeholder?: string;
}

export const ChatInput = ({ onSend, isStreaming, placeholder }: ChatInputProps) => {
  const [input, setInput] = useState("");
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const handleSend = () => {
    if (!input.trim() || isStreaming) return;
    onSend(input);
    setInput("");
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  // Auto-resize textarea
  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = "auto";
      textareaRef.current.style.height = Math.min(textareaRef.current.scrollHeight, 120) + "px";
    }
  }, [input]);

  const suggestions = [
    "أريد موقع لمطعم",
    "موقع لشركة محاماة",
    "متجر إلكتروني بسيط",
    "معرض أعمال شخصي",
  ];

  return (
    <div className="p-4 border-t border-primary/10 bg-gradient-to-t from-card to-transparent backdrop-blur-sm">
      {/* Quick suggestions */}
      {!input && (
        <motion.div 
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex flex-wrap gap-2 mb-3"
        >
          {suggestions.map((suggestion, i) => (
            <motion.button
              key={suggestion}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: i * 0.05 }}
              onClick={() => setInput(suggestion)}
              className="px-3 py-1.5 text-xs rounded-full bg-primary/5 hover:bg-primary/10 text-muted-foreground hover:text-foreground border border-primary/10 hover:border-primary/20 transition-all"
            >
              <Sparkles className="w-3 h-3 inline ml-1" />
              {suggestion}
            </motion.button>
          ))}
        </motion.div>
      )}

      <div className="flex gap-3 items-end">
        {/* Additional actions */}
        <div className="flex gap-1">
          <Button
            variant="ghost"
            size="icon"
            className="h-10 w-10 rounded-xl text-muted-foreground hover:text-foreground"
            disabled
            title="قريباً - إرفاق ملفات"
          >
            <Paperclip className="w-4 h-4" />
          </Button>
          <Button
            variant="ghost"
            size="icon"
            className="h-10 w-10 rounded-xl text-muted-foreground hover:text-foreground"
            disabled
            title="قريباً - تسجيل صوتي"
          >
            <Mic className="w-4 h-4" />
          </Button>
        </div>

        {/* Input area */}
        <div className="flex-1 relative">
          <Textarea
            ref={textareaRef}
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder={placeholder || "أخبر وكيلك بما تريد... مثال: أريد موقع لمكتب محاماة"}
            className="min-h-[44px] max-h-[120px] text-right text-sm border-primary/20 focus:border-primary/40 bg-background/80 resize-none pr-4 pl-4 py-3 rounded-xl"
            disabled={isStreaming}
            rows={1}
          />
        </div>

        {/* Send button */}
        <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
          <Button 
            onClick={handleSend} 
            disabled={!input.trim() || isStreaming} 
            className="hero-gradient shadow-glow h-10 w-10 rounded-xl p-0"
          >
            {isStreaming ? (
              <Loader2 className="w-4 h-4 animate-spin" />
            ) : (
              <Send className="w-4 h-4" />
            )}
          </Button>
        </motion.div>
      </div>

      <p className="mt-2 text-xs text-muted-foreground text-center">
        ✨ الوكيل يبني موقعك ويمكنك نشره مباشرة
      </p>
    </div>
  );
};

export default ChatInput;
