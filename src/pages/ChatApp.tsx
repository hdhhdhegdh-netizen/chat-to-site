import { useRef, useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Send, Globe, Menu, X, Loader2, Trash2 } from "lucide-react";
import { Link } from "react-router-dom";
import { useAIChat } from "@/hooks/useAIChat";
import { useToast } from "@/hooks/use-toast";

const ChatApp = () => {
  const { messages, isStreaming, sendMessage, clearMessages } = useAIChat();
  const [input, setInput] = useState("");
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [publishStatus, setPublishStatus] = useState<"draft" | "building" | "published">("draft");
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const { toast } = useToast();

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  useEffect(() => {
    if (isStreaming) {
      setPublishStatus("building");
    } else if (messages.length > 1) {
      setPublishStatus("draft");
    }
  }, [isStreaming, messages.length]);

  const handleSend = async () => {
    if (!input.trim() || isStreaming) return;
    const message = input;
    setInput("");
    await sendMessage(message);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  const handlePublish = () => {
    setPublishStatus("published");
    toast({
      title: "تم النشر!",
      description: "موقعك الآن متاح على الإنترنت",
    });
  };

  const handleClearChat = () => {
    clearMessages();
    toast({
      title: "تم مسح المحادثة",
      description: "يمكنك البدء من جديد",
    });
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
            <div className="flex items-center gap-3 px-3 py-2 rounded-lg bg-primary/10 text-primary font-medium">
              <div className="w-2 h-2 rounded-full bg-primary animate-pulse" />
              مشروع جديد
            </div>
          </div>
          
          <div className="mt-6">
            <Button 
              variant="ghost" 
              size="sm" 
              onClick={handleClearChat}
              className="w-full justify-start text-muted-foreground hover:text-destructive"
            >
              <Trash2 className="w-4 h-4 ml-2" />
              مسح المحادثة
            </Button>
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
            disabled={publishStatus === "building" || messages.length <= 1}
            onClick={handlePublish}
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
                        {message.status === "building" ? (
                          <Loader2 className="w-4 h-4 text-primary-foreground animate-spin" />
                        ) : (
                          <span className="text-primary-foreground font-bold text-xs">AI</span>
                        )}
                      </div>
                    )}
                    <div className="flex-1">
                      <p className="text-foreground leading-relaxed whitespace-pre-wrap">
                        {message.content || (
                          <span className="flex gap-1">
                            <span className="w-2 h-2 rounded-full bg-primary/40 animate-typing" />
                            <span className="w-2 h-2 rounded-full bg-primary/40 animate-typing" style={{ animationDelay: "0.2s" }} />
                            <span className="w-2 h-2 rounded-full bg-primary/40 animate-typing" style={{ animationDelay: "0.4s" }} />
                          </span>
                        )}
                      </p>
                      {message.status === "done" && message.type === "agent" && message.content && (
                        <div className="mt-2 flex items-center gap-2 text-xs text-muted-foreground">
                          <div className="w-1.5 h-1.5 rounded-full status-ready" />
                          تم التنفيذ
                        </div>
                      )}
                      {message.status === "error" && (
                        <div className="mt-2 flex items-center gap-2 text-xs text-destructive">
                          <div className="w-1.5 h-1.5 rounded-full bg-destructive" />
                          فشل في التنفيذ
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              ))}

              <div ref={messagesEndRef} />
            </div>

            {/* Input */}
            <div className="p-4 border-t border-border bg-card">
              <div className="flex gap-3">
                <Input
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyPress={handleKeyPress}
                  placeholder="اكتب ما تريد بناءه... مثال: موقع لمكتب محاماة في الرياض"
                  className="flex-1 text-right"
                  disabled={isStreaming}
                />
                <Button onClick={handleSend} disabled={!input.trim() || isStreaming}>
                  {isStreaming ? (
                    <Loader2 className="w-4 h-4 animate-spin" />
                  ) : (
                    <Send className="w-4 h-4" />
                  )}
                </Button>
              </div>
              <p className="mt-2 text-xs text-muted-foreground text-center">
                مدعوم بـ Lovable AI • الردود تُولّد بالذكاء الاصطناعي
              </p>
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
              {isStreaming ? (
                <div className="text-center p-8">
                  <div className="w-20 h-20 rounded-2xl hero-gradient mx-auto mb-4 flex items-center justify-center shadow-elevated">
                    <Loader2 className="w-10 h-10 text-primary-foreground animate-spin" />
                  </div>
                  <p className="text-foreground font-medium mb-2">جاري بناء موقعك...</p>
                  <p className="text-muted-foreground text-sm">يتم تنفيذ طلبك الآن</p>
                </div>
              ) : messages.length > 1 ? (
                <div className="text-center p-8">
                  <div className="w-20 h-20 rounded-2xl bg-status-ready/10 mx-auto mb-4 flex items-center justify-center">
                    <Globe className="w-10 h-10 text-status-ready" />
                  </div>
                  <p className="text-foreground font-medium mb-2">موقعك جاهز!</p>
                  <p className="text-muted-foreground text-sm mb-4">اضغط "انشر الآن" لنشره على الإنترنت</p>
                  <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-muted text-sm">
                    <div className="w-2 h-2 rounded-full status-ready" />
                    {messages.length - 1} تعديل تم تنفيذه
                  </div>
                </div>
              ) : (
                <div className="text-center p-8">
                  <div className="w-20 h-20 rounded-2xl bg-card shadow-card mx-auto mb-4 flex items-center justify-center">
                    <Globe className="w-10 h-10 text-muted-foreground/50" />
                  </div>
                  <p className="text-muted-foreground">
                    ابدأ المحادثة لرؤية موقعك يُبنى هنا
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChatApp;
