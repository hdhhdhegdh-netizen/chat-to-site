import { useRef, useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Send, Globe, Menu, X, Loader2, Trash2, Monitor, Smartphone, Tablet, ExternalLink, Code } from "lucide-react";
import { Link } from "react-router-dom";
import { useAIChat } from "@/hooks/useAIChat";
import { useToast } from "@/hooks/use-toast";
import { motion, AnimatePresence } from "framer-motion";

type PreviewDevice = 'desktop' | 'tablet' | 'mobile';

const ChatApp = () => {
  const { messages, isStreaming, sendMessage, clearMessages, generatedHTML } = useAIChat();
  const [input, setInput] = useState("");
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [publishStatus, setPublishStatus] = useState<"draft" | "building" | "published">("draft");
  const [previewDevice, setPreviewDevice] = useState<PreviewDevice>('desktop');
  const [showCode, setShowCode] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const iframeRef = useRef<HTMLIFrameElement>(null);
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
    } else if (generatedHTML) {
      setPublishStatus("draft");
    }
  }, [isStreaming, generatedHTML]);

  // Update iframe when HTML changes
  useEffect(() => {
    if (iframeRef.current && generatedHTML) {
      const doc = iframeRef.current.contentDocument;
      if (doc) {
        doc.open();
        doc.write(generatedHTML);
        doc.close();
      }
    }
  }, [generatedHTML]);

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

  const getPreviewWidth = () => {
    switch (previewDevice) {
      case 'mobile': return 'w-[375px]';
      case 'tablet': return 'w-[768px]';
      default: return 'w-full';
    }
  };

  const openPreviewInNewTab = () => {
    if (generatedHTML) {
      const blob = new Blob([generatedHTML], { type: 'text/html' });
      const url = URL.createObjectURL(blob);
      window.open(url, '_blank');
    }
  };

  return (
    <div className="h-screen flex bg-background">
      {/* Sidebar */}
      <AnimatePresence>
        {sidebarOpen && (
          <motion.aside
            initial={{ width: 0, opacity: 0 }}
            animate={{ width: 256, opacity: 1 }}
            exit={{ width: 0, opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="bg-card border-l border-border overflow-hidden flex flex-col"
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
                <motion.div 
                  className="flex items-center gap-3 px-3 py-2 rounded-lg bg-primary/10 text-primary font-medium"
                  animate={{ scale: [1, 1.02, 1] }}
                  transition={{ duration: 2, repeat: Infinity }}
                >
                  <div className="w-2 h-2 rounded-full bg-primary" />
                  مشروع جديد
                </motion.div>
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
          </motion.aside>
        )}
      </AnimatePresence>

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
              <motion.div
                className={`w-2 h-2 rounded-full ${
                  publishStatus === "published"
                    ? "status-ready"
                    : publishStatus === "building"
                    ? "status-building"
                    : "status-draft"
                }`}
                animate={publishStatus === "building" ? { scale: [1, 1.5, 1] } : {}}
                transition={{ duration: 0.5, repeat: Infinity }}
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
            disabled={publishStatus === "building" || !generatedHTML}
            onClick={handlePublish}
          >
            <Globe className="w-4 h-4" />
            {publishStatus === "published" ? "تم النشر" : "انشر الآن"}
          </Button>
        </header>

        {/* Chat + Preview split */}
        <div className="flex-1 flex overflow-hidden">
          {/* Chat area */}
          <div className="w-2/5 flex flex-col border-l border-border">
            {/* Messages */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4">
              <AnimatePresence initial={false}>
                {messages.map((message) => (
                  <motion.div
                    key={message.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    transition={{ duration: 0.3 }}
                    className={message.type === "agent" ? "agent-message" : "user-message"}
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
                        {message.status === "done" && message.type === "agent" && message.content && (
                          <motion.div 
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            className="mt-2 flex items-center gap-2 text-xs text-muted-foreground"
                          >
                            <div className="w-1.5 h-1.5 rounded-full status-ready" />
                            تم التنفيذ
                          </motion.div>
                        )}
                        {message.status === "error" && (
                          <div className="mt-2 flex items-center gap-2 text-xs text-destructive">
                            <div className="w-1.5 h-1.5 rounded-full bg-destructive" />
                            فشل في التنفيذ
                          </div>
                        )}
                      </div>
                    </div>
                  </motion.div>
                ))}
              </AnimatePresence>

              <div ref={messagesEndRef} />
            </div>

            {/* Input */}
            <div className="p-4 border-t border-border bg-card">
              <div className="flex gap-3">
                <Input
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyPress={handleKeyPress}
                  placeholder="مثال: موقع لمكتب محاماة في الرياض"
                  className="flex-1 text-right text-sm"
                  disabled={isStreaming}
                />
                <Button onClick={handleSend} disabled={!input.trim() || isStreaming} size="sm">
                  {isStreaming ? (
                    <Loader2 className="w-4 h-4 animate-spin" />
                  ) : (
                    <Send className="w-4 h-4" />
                  )}
                </Button>
              </div>
              <p className="mt-2 text-xs text-muted-foreground text-center">
                مدعوم بـ Lovable AI
              </p>
            </div>
          </div>

          {/* Preview area */}
          <div className="w-3/5 bg-muted/50 flex flex-col">
            {/* Preview toolbar */}
            <div className="p-2 border-b border-border bg-card flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="text-sm font-medium text-foreground">المعاينة</span>
                {generatedHTML && (
                  <motion.span 
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="px-2 py-0.5 rounded-full bg-status-ready/10 text-status-ready text-xs"
                  >
                    جاهز
                  </motion.span>
                )}
              </div>
              
              <div className="flex items-center gap-1">
                {/* Device switcher */}
                <div className="flex items-center bg-muted rounded-lg p-0.5">
                  <button
                    onClick={() => setPreviewDevice('desktop')}
                    className={`p-1.5 rounded ${previewDevice === 'desktop' ? 'bg-card shadow-sm' : ''}`}
                  >
                    <Monitor className={`w-4 h-4 ${previewDevice === 'desktop' ? 'text-primary' : 'text-muted-foreground'}`} />
                  </button>
                  <button
                    onClick={() => setPreviewDevice('tablet')}
                    className={`p-1.5 rounded ${previewDevice === 'tablet' ? 'bg-card shadow-sm' : ''}`}
                  >
                    <Tablet className={`w-4 h-4 ${previewDevice === 'tablet' ? 'text-primary' : 'text-muted-foreground'}`} />
                  </button>
                  <button
                    onClick={() => setPreviewDevice('mobile')}
                    className={`p-1.5 rounded ${previewDevice === 'mobile' ? 'bg-card shadow-sm' : ''}`}
                  >
                    <Smartphone className={`w-4 h-4 ${previewDevice === 'mobile' ? 'text-primary' : 'text-muted-foreground'}`} />
                  </button>
                </div>

                <div className="w-px h-6 bg-border mx-1" />

                <button
                  onClick={() => setShowCode(!showCode)}
                  className={`p-1.5 rounded hover:bg-muted ${showCode ? 'bg-primary/10 text-primary' : 'text-muted-foreground'}`}
                  title="عرض الكود"
                >
                  <Code className="w-4 h-4" />
                </button>

                {generatedHTML && (
                  <button
                    onClick={openPreviewInNewTab}
                    className="p-1.5 rounded hover:bg-muted text-muted-foreground"
                    title="فتح في نافذة جديدة"
                  >
                    <ExternalLink className="w-4 h-4" />
                  </button>
                )}
              </div>
            </div>

            {/* Preview content */}
            <div className="flex-1 overflow-auto p-4 flex justify-center">
              <AnimatePresence mode="wait">
                {showCode && generatedHTML ? (
                  <motion.div
                    key="code"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="w-full h-full overflow-auto bg-foreground rounded-lg p-4"
                  >
                    <pre className="text-xs text-background/90 whitespace-pre-wrap font-mono" dir="ltr">
                      {generatedHTML}
                    </pre>
                  </motion.div>
                ) : isStreaming ? (
                  <motion.div
                    key="loading"
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.9 }}
                    className="text-center flex flex-col items-center justify-center"
                  >
                    <motion.div 
                      className="w-24 h-24 rounded-2xl hero-gradient mb-6 flex items-center justify-center shadow-elevated"
                      animate={{ 
                        rotate: [0, 5, -5, 0],
                        scale: [1, 1.05, 1]
                      }}
                      transition={{ duration: 2, repeat: Infinity }}
                    >
                      <Loader2 className="w-12 h-12 text-primary-foreground animate-spin" />
                    </motion.div>
                    <p className="text-foreground font-medium mb-2">جاري بناء موقعك...</p>
                    <p className="text-muted-foreground text-sm">يتم تنفيذ طلبك الآن</p>
                  </motion.div>
                ) : generatedHTML ? (
                  <motion.div
                    key="preview"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    className={`${getPreviewWidth()} h-full transition-all duration-300`}
                  >
                    <div className="bg-card rounded-lg shadow-elevated overflow-hidden h-full border border-border">
                      {/* Browser chrome */}
                      <div className="h-8 bg-muted flex items-center px-3 gap-2 border-b border-border">
                        <div className="flex gap-1.5">
                          <div className="w-3 h-3 rounded-full bg-destructive/50" />
                          <div className="w-3 h-3 rounded-full bg-status-building/50" />
                          <div className="w-3 h-3 rounded-full bg-status-ready/50" />
                        </div>
                        <div className="flex-1 bg-background rounded px-3 py-1 text-xs text-muted-foreground text-left" dir="ltr">
                          mysite.chat2site.app
                        </div>
                      </div>
                      <iframe
                        ref={iframeRef}
                        className="w-full bg-white"
                        style={{ height: 'calc(100% - 32px)' }}
                        title="معاينة الموقع"
                        sandbox="allow-scripts"
                      />
                    </div>
                  </motion.div>
                ) : (
                  <motion.div
                    key="empty"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="text-center flex flex-col items-center justify-center"
                  >
                    <motion.div 
                      className="w-24 h-24 rounded-2xl bg-card shadow-card mb-6 flex items-center justify-center"
                      animate={{ y: [0, -5, 0] }}
                      transition={{ duration: 3, repeat: Infinity }}
                    >
                      <Globe className="w-12 h-12 text-muted-foreground/30" />
                    </motion.div>
                    <p className="text-foreground font-medium mb-2">ابدأ المحادثة</p>
                    <p className="text-muted-foreground text-sm">
                      سيظهر موقعك هنا فور بنائه
                    </p>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChatApp;
