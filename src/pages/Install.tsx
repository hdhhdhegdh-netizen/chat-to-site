import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import SEO from "@/components/SEO";
import { Link } from "react-router-dom";
import {
  Smartphone,
  Monitor,
  Download,
  Share,
  MoreVertical,
  Plus,
  Home,
  CheckCircle2,
  ArrowLeft,
  Sparkles,
  Apple,
  Chrome,
} from "lucide-react";

type OS = "ios" | "android" | "desktop" | "unknown";

const Install = () => {
  const [detectedOS, setDetectedOS] = useState<OS>("unknown");
  const [deferredPrompt, setDeferredPrompt] = useState<any>(null);
  const [isInstalled, setIsInstalled] = useState(false);

  useEffect(() => {
    // Detect OS
    const userAgent = navigator.userAgent.toLowerCase();
    if (/iphone|ipad|ipod/.test(userAgent)) {
      setDetectedOS("ios");
    } else if (/android/.test(userAgent)) {
      setDetectedOS("android");
    } else {
      setDetectedOS("desktop");
    }

    // Check if already installed
    if (window.matchMedia("(display-mode: standalone)").matches) {
      setIsInstalled(true);
    }

    // Listen for install prompt
    const handleBeforeInstallPrompt = (e: Event) => {
      e.preventDefault();
      setDeferredPrompt(e);
    };

    window.addEventListener("beforeinstallprompt", handleBeforeInstallPrompt);
    return () => {
      window.removeEventListener("beforeinstallprompt", handleBeforeInstallPrompt);
    };
  }, []);

  const handleInstallClick = async () => {
    if (deferredPrompt) {
      deferredPrompt.prompt();
      const { outcome } = await deferredPrompt.userChoice;
      if (outcome === "accepted") {
        setIsInstalled(true);
      }
      setDeferredPrompt(null);
    }
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1 },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
  };

  const iosSteps = [
    {
      icon: <Share className="w-5 h-5" />,
      title: "اضغط على زر المشاركة",
      description: "في أسفل الشاشة (Safari) أو أعلاها",
    },
    {
      icon: <Plus className="w-5 h-5" />,
      title: 'اختر "إضافة إلى الشاشة الرئيسية"',
      description: "مرر لأسفل في القائمة للعثور عليه",
    },
    {
      icon: <Home className="w-5 h-5" />,
      title: 'اضغط "إضافة"',
      description: "سيظهر التطبيق على شاشتك الرئيسية",
    },
  ];

  const androidSteps = [
    {
      icon: <MoreVertical className="w-5 h-5" />,
      title: "اضغط على قائمة المتصفح",
      description: "النقاط الثلاث في أعلى الشاشة",
    },
    {
      icon: <Download className="w-5 h-5" />,
      title: 'اختر "تثبيت التطبيق"',
      description: 'أو "إضافة إلى الشاشة الرئيسية"',
    },
    {
      icon: <CheckCircle2 className="w-5 h-5" />,
      title: "أكّد التثبيت",
      description: "سيظهر التطبيق مع تطبيقاتك",
    },
  ];

  const desktopSteps = [
    {
      icon: <Chrome className="w-5 h-5" />,
      title: "افتح Chrome أو Edge",
      description: "تأكد أنك على هذا الموقع",
    },
    {
      icon: <Download className="w-5 h-5" />,
      title: "اضغط على أيقونة التثبيت",
      description: "في شريط العنوان (أو من القائمة)",
    },
    {
      icon: <Monitor className="w-5 h-5" />,
      title: 'اختر "تثبيت"',
      description: "سيفتح التطبيق في نافذة مستقلة",
    },
  ];

  const getSteps = () => {
    switch (detectedOS) {
      case "ios":
        return iosSteps;
      case "android":
        return androidSteps;
      default:
        return desktopSteps;
    }
  };

  const getOSIcon = () => {
    switch (detectedOS) {
      case "ios":
        return <Apple className="w-8 h-8" />;
      case "android":
        return <Smartphone className="w-8 h-8" />;
      default:
        return <Monitor className="w-8 h-8" />;
    }
  };

  const getOSName = () => {
    switch (detectedOS) {
      case "ios":
        return "iPhone / iPad";
      case "android":
        return "Android";
      default:
        return "سطح المكتب";
    }
  };

  return (
    <>
      <SEO
        title="تثبيت التطبيق - Chat2Site"
        description="ثبّت تطبيق Chat2Site على جهازك للوصول السريع وتجربة أفضل"
        noIndex
      />

      <div className="min-h-screen bg-gradient-to-br from-background via-background to-primary/5 relative overflow-hidden">
        {/* Background decorations */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <motion.div
            className="absolute top-20 right-20 w-96 h-96 bg-primary/10 rounded-full blur-3xl"
            animate={{ scale: [1, 1.2, 1], opacity: [0.3, 0.5, 0.3] }}
            transition={{ duration: 8, repeat: Infinity }}
          />
          <motion.div
            className="absolute bottom-20 left-20 w-80 h-80 bg-accent/10 rounded-full blur-3xl"
            animate={{ scale: [1.2, 1, 1.2], opacity: [0.3, 0.5, 0.3] }}
            transition={{ duration: 8, repeat: Infinity, delay: 2 }}
          />
        </div>

        <div className="container mx-auto px-4 py-8 relative z-10">
          {/* Back button */}
          <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }}>
            <Link to="/">
              <Button variant="ghost" className="mb-6">
                <ArrowLeft className="w-4 h-4 ml-2" />
                العودة للرئيسية
              </Button>
            </Link>
          </motion.div>

          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="max-w-2xl mx-auto"
          >
            {/* Header */}
            <motion.div variants={itemVariants} className="text-center mb-10">
              <motion.div
                className="w-20 h-20 mx-auto mb-6 rounded-2xl hero-gradient flex items-center justify-center shadow-glow"
                whileHover={{ scale: 1.05, rotate: 5 }}
              >
                <Download className="w-10 h-10 text-primary-foreground" />
              </motion.div>
              <h1 className="text-3xl md:text-4xl font-bold mb-4 bg-gradient-to-l from-primary to-accent bg-clip-text text-transparent">
                ثبّت Chat2Site على جهازك
              </h1>
              <p className="text-muted-foreground text-lg">
                احصل على وصول سريع وتجربة أفضل بتثبيت التطبيق
              </p>
            </motion.div>

            {/* Already installed message */}
            {isInstalled && (
              <motion.div
                variants={itemVariants}
                className="mb-8 p-6 rounded-2xl bg-green-500/10 border border-green-500/20 text-center"
              >
                <CheckCircle2 className="w-12 h-12 text-green-500 mx-auto mb-3" />
                <h3 className="text-xl font-bold text-green-600 mb-2">
                  التطبيق مثبت بالفعل! 🎉
                </h3>
                <p className="text-muted-foreground">
                  يمكنك فتح Chat2Site من شاشتك الرئيسية
                </p>
              </motion.div>
            )}

            {/* Detected OS */}
            <motion.div variants={itemVariants}>
              <Card className="mb-8 border-primary/20 bg-card/50 backdrop-blur-sm overflow-hidden">
                <CardContent className="p-6">
                  <div className="flex items-center gap-4 mb-4">
                    <div className="w-14 h-14 rounded-xl bg-primary/10 flex items-center justify-center text-primary">
                      {getOSIcon()}
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">نظامك الحالي</p>
                      <p className="text-xl font-bold">{getOSName()}</p>
                    </div>
                  </div>

                  {/* Native install button for supported browsers */}
                  {deferredPrompt && !isInstalled && (
                    <Button
                      size="lg"
                      className="w-full hero-gradient shadow-glow"
                      onClick={handleInstallClick}
                    >
                      <Download className="w-5 h-5 ml-2" />
                      تثبيت التطبيق الآن
                    </Button>
                  )}
                </CardContent>
              </Card>
            </motion.div>

            {/* Installation steps */}
            {!isInstalled && (
              <motion.div variants={itemVariants}>
                <h2 className="text-xl font-bold mb-6 flex items-center gap-2">
                  <Sparkles className="w-5 h-5 text-primary" />
                  خطوات التثبيت
                </h2>

                <div className="space-y-4">
                  {getSteps().map((step, index) => (
                    <motion.div
                      key={index}
                      variants={itemVariants}
                      whileHover={{ scale: 1.02, x: -5 }}
                      className="flex gap-4 p-4 rounded-xl bg-card/50 backdrop-blur-sm border border-border hover:border-primary/30 transition-colors"
                    >
                      <div className="flex-shrink-0">
                        <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center text-primary relative">
                          {step.icon}
                          <span className="absolute -top-2 -right-2 w-6 h-6 rounded-full bg-primary text-primary-foreground text-xs font-bold flex items-center justify-center">
                            {index + 1}
                          </span>
                        </div>
                      </div>
                      <div>
                        <h3 className="font-bold mb-1">{step.title}</h3>
                        <p className="text-sm text-muted-foreground">{step.description}</p>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            )}

            {/* Other platforms */}
            <motion.div variants={itemVariants} className="mt-10">
              <h2 className="text-lg font-bold mb-4 text-muted-foreground">
                تعليمات لأنظمة أخرى
              </h2>
              <div className="grid grid-cols-3 gap-3">
                {[
                  { os: "ios" as OS, icon: <Apple className="w-5 h-5" />, name: "iOS" },
                  { os: "android" as OS, icon: <Smartphone className="w-5 h-5" />, name: "Android" },
                  { os: "desktop" as OS, icon: <Monitor className="w-5 h-5" />, name: "سطح المكتب" },
                ].map((item) => (
                  <button
                    key={item.os}
                    onClick={() => setDetectedOS(item.os)}
                    className={`p-3 rounded-xl border transition-all ${
                      detectedOS === item.os
                        ? "bg-primary/10 border-primary text-primary"
                        : "bg-card/50 border-border hover:border-primary/30"
                    }`}
                  >
                    <div className="flex flex-col items-center gap-2">
                      {item.icon}
                      <span className="text-sm font-medium">{item.name}</span>
                    </div>
                  </button>
                ))}
              </div>
            </motion.div>

            {/* Benefits */}
            <motion.div variants={itemVariants} className="mt-10">
              <h2 className="text-lg font-bold mb-4">مميزات التطبيق المثبت</h2>
              <div className="grid grid-cols-2 gap-4">
                {[
                  { icon: "⚡", title: "أسرع", desc: "تحميل فوري" },
                  { icon: "📱", title: "وصول سريع", desc: "من الشاشة الرئيسية" },
                  { icon: "🔔", title: "إشعارات", desc: "تحديثات مباشرة" },
                  { icon: "🌐", title: "يعمل أوفلاين", desc: "بدون إنترنت" },
                ].map((benefit, index) => (
                  <div
                    key={index}
                    className="p-4 rounded-xl bg-card/50 backdrop-blur-sm border border-border text-center"
                  >
                    <span className="text-2xl mb-2 block">{benefit.icon}</span>
                    <h3 className="font-bold text-sm">{benefit.title}</h3>
                    <p className="text-xs text-muted-foreground">{benefit.desc}</p>
                  </div>
                ))}
              </div>
            </motion.div>

            {/* CTA */}
            <motion.div variants={itemVariants} className="mt-10 text-center">
              <Link to="/app">
                <Button size="lg" className="hero-gradient shadow-glow">
                  <Sparkles className="w-5 h-5 ml-2" />
                  ابدأ ببناء موقعك الآن
                </Button>
              </Link>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </>
  );
};

export default Install;
