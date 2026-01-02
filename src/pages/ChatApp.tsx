import { useRef, useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Send, Globe, Menu, X, Loader2, Trash2, Monitor, Smartphone, Tablet, ExternalLink, LayoutTemplate, LogOut, FolderOpen, Bot, Sparkles, Share2 } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { useAIChat } from "@/hooks/useAIChat";
import { useAuth } from "@/hooks/useAuth";
import { useProjects } from "@/hooks/useProjects";
import { useToast } from "@/hooks/use-toast";
import { motion, AnimatePresence } from "framer-motion";
import TemplatesModal, { Template, templates } from "@/components/templates/TemplatesModal";

type PreviewDevice = 'desktop' | 'tablet' | 'mobile';

const ChatApp = () => {
  const { messages, isStreaming, sendMessage, clearMessages, generatedHTML, setGeneratedHTML } = useAIChat();
  const { user, signOut, loading: authLoading } = useAuth();
  const { currentProject, createProject, updateProject, projects } = useProjects();
  const [input, setInput] = useState("");
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [publishStatus, setPublishStatus] = useState<"draft" | "building" | "published">("draft");
  const [previewDevice, setPreviewDevice] = useState<PreviewDevice>('desktop');
  const [showTemplates, setShowTemplates] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const iframeRef = useRef<HTMLIFrameElement>(null);
  const { toast } = useToast();
  const navigate = useNavigate();

  // Show templates modal for new users
  useEffect(() => {
    if (!authLoading && !currentProject && messages.length <= 1) {
      setShowTemplates(true);
    }
  }, [authLoading, currentProject, messages.length]);

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

  // Auto-save project when HTML changes
  useEffect(() => {
    if (generatedHTML && currentProject) {
      updateProject(currentProject.id, { html_content: generatedHTML });
    }
  }, [generatedHTML, currentProject, updateProject]);

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

  const handlePublish = async () => {
    if (!generatedHTML) return;
    
    setPublishStatus("published");
    
    if (currentProject) {
      const publishedUrl = `${currentProject.id}.chat2site.app`;
      await updateProject(currentProject.id, { 
        status: "published",
        published_url: publishedUrl,
        html_content: generatedHTML 
      });
    }
    
    toast({
      title: "تم النشر بنجاح! 🎉",
      description: "موقعك الآن متاح على الإنترنت ويمكنك مشاركته",
    });
  };

  const handleClearChat = () => {
    clearMessages();
    toast({
      title: "تم مسح المحادثة",
      description: "يمكنك البدء من جديد مع وكيلك",
    });
  };

  const handleSelectTemplate = async (template: Template) => {
    setShowTemplates(false);
    
    // Create new project with template
    if (user) {
      await createProject(template.name, template.id, template.preview);
    }
    
    // Set the template preview
    setGeneratedHTML(template.preview);
    
    // Send the template prompt
    await sendMessage(template.prompt);
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

  const handleSignOut = async () => {
    await signOut();
    navigate("/");
  };

  const handleShare = () => {
    if (currentProject?.published_url) {
      navigator.clipboard.writeText(`https://${currentProject.published_url}`);
      toast({
        title: "تم نسخ الرابط!",
        description: "يمكنك الآن مشاركة رابط موقعك",
      });
    }
  };

  return (
    <div className="h-screen flex bg-background">
      {/* Templates Modal */}
      <TemplatesModal
        isOpen={showTemplates}
        onClose={() => setShowTemplates(false)}
        onSelectTemplate={handleSelectTemplate}
      />

      {/* Sidebar */}
      <AnimatePresence>
        {sidebarOpen && (
          <motion.aside
            initial={{ width: 0, opacity: 0 }}
            animate={{ width: 280, opacity: 1 }}
            exit={{ width: 0, opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="bg-card border-l border-border overflow-hidden flex flex-col"
          >
            <div className="p-4 border-b border-border">
              <Link to="/" className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-lg hero-gradient flex items-center justify-center">
                  <Bot className="w-4 h-4 text-primary-foreground" />
                </div>
                <span className="font-bold text-lg text-foreground">Chat2Site</span>
              </Link>
            </div>

            <nav className="flex-1 p-4 overflow-y-auto">
              {/* Agent Status */}
              <div className="mb-6 p-4 rounded-xl bg-primary/5 border border-primary/10">
                <div className="flex items-center gap-3 mb-2">
                  <motion.div
                    animate={{ scale: [1, 1.1, 1] }}
                    transition={{ duration: 2, repeat: Infinity }}
                    className="w-10 h-10 rounded-lg hero-gradient flex items-center justify-center"
                  >
                    <Bot className="w-5 h-5 text-primary-foreground" />
                  </motion.div>
                  <div>
                    <p className="font-bold text-foreground text-sm">وكيلك الذكي</p>
                    <p className="text-xs text-muted-foreground">جاهز للعمل</p>
                  </div>
                </div>
                <motion.div
                  className="w-full h-1 rounded-full bg-primary/20 overflow-hidden"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                >
                  <motion.div
                    className="h-full bg-primary rounded-full"
                    animate={isStreaming ? { x: ["-100%", "100%"] } : { width: "100%" }}
                    transition={isStreaming ? { duration: 1, repeat: Infinity } : { duration: 0.5 }}
                    style={{ width: isStreaming ? "30%" : "100%" }}
                  />
                </motion.div>
              </div>

              {/* Current project */}
              <div className="space-y-2 mb-4">
                <p className="text-xs text-muted-foreground px-3">المشروع الحالي</p>
                <motion.div 
                  className="flex items-center gap-3 px-3 py-2 rounded-lg bg-primary/10 text-primary font-medium"
                >
                  <div className="w-2 h-2 rounded-full bg-primary" />
                  {currentProject?.name || "مشروع جديد"}
                </motion.div>
              </div>
              
              {/* Previous projects */}
              {user && projects.length > 0 && (
                <div className="mb-4">
                  <p className="text-xs text-muted-foreground mb-2 px-3">المشاريع السابقة</p>
                  <div className="space-y-1">
                    {projects.slice(0, 5).map((project) => (
                      <button
                        key={project.id}
                        onClick={() => {
                          if (project.html_content) {
                            setGeneratedHTML(project.html_content);
                          }
                        }}
                        className="w-full text-right flex items-center gap-2 px-3 py-2 rounded-lg hover:bg-muted text-sm text-muted-foreground hover:text-foreground transition-colors"
                      >
                        <FolderOpen className="w-4 h-4" />
                        <span className="truncate">{project.name}</span>
                      </button>
                    ))}
                  </div>
                </div>
              )}
              
              <div className="space-y-1">
                <Button 
                  variant="ghost" 
                  size="sm" 
                  onClick={() => setShowTemplates(true)}
                  className="w-full justify-start"
                >
                  <LayoutTemplate className="w-4 h-4 ml-2" />
                  القوالب الجاهزة
                </Button>
                
                <Button 
                  variant="ghost" 
                  size="sm" 
                  onClick={handleClearChat}
                  className="w-full justify-start text-muted-foreground hover:text-destructive"
                >
                  <Trash2 className="w-4 h-4 ml-2" />
                  محادثة جديدة
                </Button>
              </div>
            </nav>

            <div className="p-4 border-t border-border">
              {user ? (
                <>
                  <div className="flex items-center gap-3 px-3 py-2 mb-2">
                    <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center">
                      <span className="text-primary font-bold text-sm">
                        {user.email?.[0].toUpperCase()}
                      </span>
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium text-foreground truncate">
                        {user.email}
                      </p>
                    </div>
                  </div>
                  <Link to="/dashboard">
                    <Button variant="ghost" className="w-full justify-start">
                      لوحة التحكم
                    </Button>
                  </Link>
                  <Button 
                    variant="ghost" 
                    className="w-full justify-start text-muted-foreground hover:text-destructive"
                    onClick={handleSignOut}
                  >
                    <LogOut className="w-4 h-4 ml-2" />
                    تسجيل الخروج
                  </Button>
                </>
              ) : (
                <Link to="/auth">
                  <Button variant="default" className="w-full">
                    تسجيل الدخول
                  </Button>
                </Link>
              )}
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
                  ? "منشور ✓"
                  : publishStatus === "building"
                  ? "الوكيل يعمل..."
                  : "مسودة"}
              </span>
            </div>
          </div>

          <div className="flex items-center gap-2">
            {publishStatus === "published" && (
              <Button
                variant="outline"
                size="sm"
                onClick={handleShare}
              >
                <Share2 className="w-4 h-4" />
                مشاركة
              </Button>
            )}
            <Button
              variant={publishStatus === "published" ? "secondary" : "default"}
              size="sm"
              disabled={publishStatus === "building" || !generatedHTML}
              onClick={handlePublish}
            >
              <Globe className="w-4 h-4" />
              {publishStatus === "published" ? "تم النشر" : "انشر موقعك"}
            </Button>
          </div>
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
                  placeholder="أخبر وكيلك بما تريد... مثال: أريد موقع لمكتب محاماة"
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
                الوكيل يبني موقعك ويمكنك نشره مباشرة
              </p>
            </div>
          </div>

          {/* Preview area */}
          <div className="w-3/5 bg-muted/50 flex flex-col">
            {/* Preview toolbar */}
            <div className="p-2 border-b border-border bg-card flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="text-sm font-medium text-foreground">موقعك</span>
                {generatedHTML && (
                  <motion.span 
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="px-2 py-0.5 rounded-full bg-status-ready/10 text-status-ready text-xs"
                  >
                    جاهز للنشر
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

                {generatedHTML && (
                  <>
                    <div className="w-px h-6 bg-border mx-1" />
                    <button
                      onClick={openPreviewInNewTab}
                      className="p-1.5 rounded hover:bg-muted text-muted-foreground"
                      title="فتح في نافذة جديدة"
                    >
                      <ExternalLink className="w-4 h-4" />
                    </button>
                  </>
                )}
              </div>
            </div>

            {/* Preview content */}
            <div className="flex-1 overflow-auto p-4 flex justify-center">
              <AnimatePresence mode="wait">
                {isStreaming ? (
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
                      <Bot className="w-12 h-12 text-primary-foreground" />
                    </motion.div>
                    <p className="text-foreground font-medium mb-2">الوكيل يبني موقعك...</p>
                    <p className="text-muted-foreground text-sm">يتم تنفيذ طلبك الآن تلقائياً</p>
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
                          {currentProject?.published_url || "mysite.chat2site.app"}
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
                      <Sparkles className="w-12 h-12 text-muted-foreground/30" />
                    </motion.div>
                    <p className="text-foreground font-medium mb-2">أخبر وكيلك بما تريد</p>
                    <p className="text-muted-foreground text-sm mb-4">
                      سيقوم الوكيل ببناء موقعك هنا تلقائياً
                    </p>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => setShowTemplates(true)}
                    >
                      <LayoutTemplate className="w-4 h-4 ml-2" />
                      أو اختر قالبًا جاهزًا
                    </Button>
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
