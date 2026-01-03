import { useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Monitor, Tablet, Smartphone, ExternalLink, LayoutTemplate, Bot, Sparkles, Download } from "lucide-react";
import { Button } from "@/components/ui/button";

type PreviewDevice = "desktop" | "tablet" | "mobile";

interface PreviewPanelProps {
  generatedHTML: string | null;
  isStreaming: boolean;
  publishedUrl: string | null;
  publishStatus: string;
  previewDevice: PreviewDevice;
  onDeviceChange: (device: PreviewDevice) => void;
  onOpenTemplates: () => void;
}

export const PreviewPanel = ({
  generatedHTML,
  isStreaming,
  publishedUrl,
  publishStatus,
  previewDevice,
  onDeviceChange,
  onOpenTemplates,
}: PreviewPanelProps) => {
  const iframeRef = useRef<HTMLIFrameElement>(null);

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

  const getPreviewWidth = () => {
    switch (previewDevice) {
      case "mobile":
        return "w-[375px]";
      case "tablet":
        return "w-[768px]";
      default:
        return "w-full";
    }
  };

  const openPreviewInNewTab = () => {
    if (generatedHTML) {
      const blob = new Blob([generatedHTML], { type: "text/html" });
      const url = URL.createObjectURL(blob);
      window.open(url, "_blank");
    }
  };

  const downloadHTML = () => {
    if (generatedHTML) {
      const blob = new Blob([generatedHTML], { type: "text/html" });
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = "my-website.html";
      a.click();
      URL.revokeObjectURL(url);
    }
  };

  return (
    <div className="w-3/5 preview-area flex flex-col">
      {/* Preview toolbar */}
      <div className="p-2 border-b border-border bg-card flex items-center justify-between">
        <div className="flex items-center gap-2">
          <span className="text-sm font-medium text-foreground">موقعك</span>
          {generatedHTML && (
            <motion.span
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              className={`px-2 py-0.5 rounded-full text-xs ${
                publishStatus === "published"
                  ? "bg-green-500/10 text-green-600"
                  : "bg-yellow-500/10 text-yellow-600"
              }`}
            >
              {publishStatus === "published" ? "منشور" : "جاهز للنشر"}
            </motion.span>
          )}
        </div>

        <div className="flex items-center gap-1">
          {/* Device switcher */}
          <div className="flex items-center bg-muted rounded-lg p-0.5">
            {[
              { device: "desktop" as const, Icon: Monitor },
              { device: "tablet" as const, Icon: Tablet },
              { device: "mobile" as const, Icon: Smartphone },
            ].map(({ device, Icon }) => (
              <button
                key={device}
                onClick={() => onDeviceChange(device)}
                className={`p-1.5 rounded transition-colors ${
                  previewDevice === device ? "bg-card shadow-sm" : ""
                }`}
              >
                <Icon
                  className={`w-4 h-4 ${
                    previewDevice === device ? "text-primary" : "text-muted-foreground"
                  }`}
                />
              </button>
            ))}
          </div>

          {generatedHTML && (
            <>
              <div className="w-px h-6 bg-border mx-1" />
              <button
                onClick={downloadHTML}
                className="p-1.5 rounded hover:bg-muted text-muted-foreground"
                title="تحميل HTML"
              >
                <Download className="w-4 h-4" />
              </button>
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
                  scale: [1, 1.05, 1],
                }}
                transition={{ duration: 2, repeat: Infinity }}
              >
                <Bot className="w-12 h-12 text-primary-foreground" />
              </motion.div>
              <p className="text-foreground font-medium mb-2">الوكيل يبني موقعك...</p>
              <p className="text-muted-foreground text-sm">يتم تنفيذ طلبك الآن تلقائياً</p>
              
              {/* Progress indicator */}
              <div className="mt-6 w-48 h-1.5 rounded-full bg-muted overflow-hidden">
                <motion.div
                  className="h-full hero-gradient"
                  animate={{ x: ["-100%", "100%"] }}
                  transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
                  style={{ width: "50%" }}
                />
              </div>
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
                    <div className="w-3 h-3 rounded-full bg-yellow-500/50" />
                    <div className="w-3 h-3 rounded-full bg-green-500/50" />
                  </div>
                  <div
                    className="flex-1 bg-background rounded px-3 py-1 text-xs text-muted-foreground text-left"
                    dir="ltr"
                  >
                    {publishedUrl || "yoursite.chat2site.app"}
                  </div>
                </div>
                <iframe
                  ref={iframeRef}
                  className="w-full bg-white"
                  style={{ height: "calc(100% - 32px)" }}
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
              <Button variant="outline" size="sm" onClick={onOpenTemplates}>
                <LayoutTemplate className="w-4 h-4 ml-2" />
                أو اختر قالبًا جاهزًا
              </Button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default PreviewPanel;
