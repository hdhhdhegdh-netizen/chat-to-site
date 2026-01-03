import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { X, Download, Smartphone } from "lucide-react";
import { Link } from "react-router-dom";

const PWAInstallPrompt = () => {
  const [showPrompt, setShowPrompt] = useState(false);
  const [deferredPrompt, setDeferredPrompt] = useState<any>(null);

  useEffect(() => {
    // Check if already installed
    if (window.matchMedia("(display-mode: standalone)").matches) {
      return;
    }

    // Check if dismissed recently (within 7 days)
    const dismissed = localStorage.getItem("pwa-prompt-dismissed");
    if (dismissed) {
      const dismissedDate = new Date(dismissed);
      const daysSinceDismissed = (Date.now() - dismissedDate.getTime()) / (1000 * 60 * 60 * 24);
      if (daysSinceDismissed < 7) {
        return;
      }
    }

    // Show prompt after 30 seconds
    const timer = setTimeout(() => {
      setShowPrompt(true);
    }, 30000);

    // Listen for install prompt
    const handleBeforeInstallPrompt = (e: Event) => {
      e.preventDefault();
      setDeferredPrompt(e);
    };

    window.addEventListener("beforeinstallprompt", handleBeforeInstallPrompt);

    return () => {
      clearTimeout(timer);
      window.removeEventListener("beforeinstallprompt", handleBeforeInstallPrompt);
    };
  }, []);

  const handleDismiss = () => {
    setShowPrompt(false);
    localStorage.setItem("pwa-prompt-dismissed", new Date().toISOString());
  };

  const handleInstall = async () => {
    if (deferredPrompt) {
      deferredPrompt.prompt();
      const { outcome } = await deferredPrompt.userChoice;
      if (outcome === "accepted") {
        setShowPrompt(false);
      }
      setDeferredPrompt(null);
    }
  };

  return (
    <AnimatePresence>
      {showPrompt && (
        <motion.div
          initial={{ y: 100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 100, opacity: 0 }}
          transition={{ type: "spring", damping: 25, stiffness: 300 }}
          className="fixed bottom-4 left-4 right-4 md:left-auto md:right-4 md:w-96 z-50"
        >
          <div className="bg-card/95 backdrop-blur-xl border border-border rounded-2xl shadow-elevated p-4 relative overflow-hidden">
            {/* Gradient accent */}
            <div className="absolute top-0 left-0 right-0 h-1 hero-gradient" />
            
            {/* Close button */}
            <button
              onClick={handleDismiss}
              className="absolute top-3 left-3 p-1 rounded-full hover:bg-muted transition-colors text-muted-foreground"
            >
              <X className="w-4 h-4" />
            </button>

            <div className="flex gap-4">
              <motion.div
                animate={{ 
                  y: [0, -5, 0],
                  rotate: [0, 5, -5, 0]
                }}
                transition={{ duration: 2, repeat: Infinity }}
                className="flex-shrink-0 w-14 h-14 rounded-xl hero-gradient flex items-center justify-center shadow-glow"
              >
                <Smartphone className="w-7 h-7 text-primary-foreground" />
              </motion.div>

              <div className="flex-1 min-w-0">
                <h3 className="font-bold text-foreground mb-1">
                  ثبّت التطبيق 📱
                </h3>
                <p className="text-sm text-muted-foreground mb-3">
                  احصل على وصول أسرع من شاشتك الرئيسية
                </p>

                <div className="flex gap-2">
                  {deferredPrompt ? (
                    <Button
                      size="sm"
                      className="hero-gradient shadow-sm"
                      onClick={handleInstall}
                    >
                      <Download className="w-4 h-4 ml-1" />
                      تثبيت
                    </Button>
                  ) : (
                    <Link to="/install" onClick={handleDismiss}>
                      <Button size="sm" className="hero-gradient shadow-sm">
                        <Download className="w-4 h-4 ml-1" />
                        كيفية التثبيت
                      </Button>
                    </Link>
                  )}
                  <Button
                    size="sm"
                    variant="ghost"
                    onClick={handleDismiss}
                  >
                    لاحقاً
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default PWAInstallPrompt;
