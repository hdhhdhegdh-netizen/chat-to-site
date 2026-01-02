import { useState, useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Send, Globe, Menu, X, Loader2 } from "lucide-react";
import { Link } from "react-router-dom";

interface Message {
  id: string;
  type: "user" | "agent";
  content: string;
  timestamp: Date;
  status?: "building" | "done";
}

const initialMessages: Message[] = [
  {
    id: "1",
    type: "agent",
    content: "مرحبًا. أنا Chat2Site، وكيلك الذكي لبناء المواقع. أخبرني عن مشروعك وسأبدأ البناء فورًا.",
    timestamp: new Date(),
  },
];

const ChatApp = () => {
  const [messages, setMessages] = useState<Message[]>(initialMessages);
  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [publishStatus, setPublishStatus] = useState<"draft" | "building" | "published">("draft");
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSend = async () => {
    if (!input.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      type: "user",
      content: input,
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setInput("");
    setIsTyping(true);
    setPublishStatus("building");

    // Simulate agent response
    setTimeout(() => {
      const responses = [
        "تم إنشاء الصفحة الرئيسية بنجاح.",
        "تم تعديل قسم الخدمات حسب طلبك.",
        "تم تحسين الترتيب البصري للموقع.",
        "تم إضافة نموذج التواصل.",
        "تم تجهيز الموقع للنشر.",
      ];

      const agentMessage: Message = {
        id: (Date.now() + 1).toString(),
        type: "agent",
        content: responses[Math.floor(Math.random() * responses.length)],
        timestamp: new Date(),
        status: "done",
      };

      setMessages((prev) => [...prev, agentMessage]);
      setIsTyping(false);
      setPublishStatus("draft");
    }, 2000);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <div className="h-screen flex bg-background">
      {/* Sidebar */}
      <aside
        className={`${
          sidebarOpen ? "w-64" : "w-0"
        } bg-card border-l border-border transition-all duration-300 overflow-hidden flex flex-col`}
      >
        <div className="p-4 border-b border-border">
          <Link to="/" className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg hero-gradient flex items-center justify-center">
              <span className="text-primary-foreground font-bold text-sm">C2S</span>
            </div>
            <span className="font-bold text-lg text-foreground">Chat2Site</span>
          </Link>
        </div>

        <nav className="flex-1 p-4">
          <div className="space-y-2">
            <Link
              to="/app"
              className="flex items-center gap-3 px-3 py-2 rounded-lg bg-primary/10 text-primary font-medium"
            >
              <div className="w-2 h-2 rounded-full bg-primary" />
              مشروع جديد
            </Link>
          </div>
        </nav>

        <div className="p-4 border-t border-border">
          <Link to="/dashboard">
            <Button variant="ghost" className="w-full justify-start">
              لوحة التحكم
            </Button>
          </Link>
          <Link to="/settings">
            <Button variant="ghost" className="w-full justify-start">
              الإعدادات
            </Button>
          </Link>
        </div>
      </aside>

      {/* Main content */}
      <div className="flex-1 flex flex-col">
        {/* Header */}
        <header className="h-14 border-b border-border flex items-center justify-between px-4 bg-card">
          <div className="flex items-center gap-4">
            <button
              onClick={() => setSidebarOpen(!sidebarOpen)}
              className="p-2 hover:bg-muted rounded-lg transition-colors"
            >
              {sidebarOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
            <div className="flex items-center gap-2">
              <div
                className={`w-2 h-2 rounded-full ${
                  publishStatus === "published"
                    ? "status-ready"
                    : publishStatus === "building"
                    ? "status-building animate-pulse"
                    : "status-draft"
                }`}
              />
              <span className="text-sm text-muted-foreground">
                {publishStatus === "published"
                  ? "منشور"
                  : publishStatus === "building"
                  ? "جاري البناء..."
                  : "مسودة"}
              </span>
            </div>
          </div>

          <Button
            variant={publishStatus === "published" ? "secondary" : "default"}
            size="sm"
            disabled={publishStatus === "building"}
            onClick={() => setPublishStatus("published")}
          >
            <Globe className="w-4 h-4" />
            {publishStatus === "published" ? "تم النشر" : "انشر الآن"}
          </Button>
        </header>

        {/* Chat + Preview split */}
        <div className="flex-1 flex overflow-hidden">
          {/* Chat area */}
          <div className="w-1/2 flex flex-col border-l border-border">
            {/* Messages */}
            <div className="flex-1 overflow-y-auto p-6 space-y-4">
              {messages.map((message) => (
                <div
                  key={message.id}
                  className={`animate-fade-in ${
                    message.type === "agent" ? "agent-message" : "user-message"
                  }`}
                >
                  <div className="flex items-start gap-3">
                    {message.type === "agent" && (
                      <div className="w-8 h-8 rounded-lg hero-gradient flex items-center justify-center flex-shrink-0">
                        <span className="text-primary-foreground font-bold text-xs">AI</span>
                      </div>
                    )}
                    <div className="flex-1">
                      <p className="text-foreground leading-relaxed">{message.content}</p>
                      {message.status === "done" && (
                        <div className="mt-2 flex items-center gap-2 text-xs text-muted-foreground">
                          <div className="w-1.5 h-1.5 rounded-full status-ready" />
                          تم التنفيذ
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              ))}

              {isTyping && (
                <div className="agent-message animate-fade-in">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-lg hero-gradient flex items-center justify-center">
                      <Loader2 className="w-4 h-4 text-primary-foreground animate-spin" />
                    </div>
                    <div className="flex gap-1">
                      <span className="w-2 h-2 rounded-full bg-primary/40 animate-typing" />
                      <span
                        className="w-2 h-2 rounded-full bg-primary/40 animate-typing"
                        style={{ animationDelay: "0.2s" }}
                      />
                      <span
                        className="w-2 h-2 rounded-full bg-primary/40 animate-typing"
                        style={{ animationDelay: "0.4s" }}
                      />
                    </div>
                  </div>
                </div>
              )}

              <div ref={messagesEndRef} />
            </div>

            {/* Input */}
            <div className="p-4 border-t border-border bg-card">
              <div className="flex gap-3">
                <Input
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyPress={handleKeyPress}
                  placeholder="اكتب ما تريد بناءه..."
                  className="flex-1 text-right"
                  disabled={isTyping}
                />
                <Button onClick={handleSend} disabled={!input.trim() || isTyping}>
                  <Send className="w-4 h-4" />
                </Button>
              </div>
            </div>
          </div>

          {/* Preview area */}
          <div className="w-1/2 bg-muted flex flex-col">
            <div className="p-3 border-b border-border bg-card flex items-center justify-between">
              <span className="text-sm font-medium text-foreground">المعاينة المباشرة</span>
              <div className="flex items-center gap-2 text-xs text-muted-foreground">
                <div className="w-3 h-3 rounded-full bg-destructive/20" />
                <div className="w-3 h-3 rounded-full bg-status-building/20" />
                <div className="w-3 h-3 rounded-full bg-status-ready/20" />
              </div>
            </div>
            <div className="flex-1 flex items-center justify-center">
              <div className="text-center p-8">
                <div className="w-20 h-20 rounded-2xl bg-card shadow-card mx-auto mb-4 flex items-center justify-center">
                  <Globe className="w-10 h-10 text-muted-foreground/50" />
                </div>
                <p className="text-muted-foreground">
                  ابدأ المحادثة لرؤية موقعك يُبنى هنا
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChatApp;
