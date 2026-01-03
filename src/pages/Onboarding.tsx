import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Link, useNavigate } from "react-router-dom";
import SEO from "@/components/SEO";
import {
  MessageSquare,
  Sparkles,
  Globe,
  Palette,
  Rocket,
  ChevronLeft,
  ChevronRight,
  Bot,
  Zap,
  Check,
} from "lucide-react";

interface Step {
  id: number;
  icon: React.ReactNode;
  title: string;
  description: string;
  tip: string;
  image?: string;
}

const steps: Step[] = [
  {
    id: 1,
    icon: <MessageSquare className="w-8 h-8" />,
    title: "تحدث بالعربية",
    description: "أخبر وكيلك الذكي بما تريد بكلماتك الخاصة. لا حاجة لمصطلحات تقنية!",
    tip: "مثال: \"أريد موقع لمطعم فاخر مع قائمة طعام وصور\"",
  },
  {
    id: 2,
    icon: <Sparkles className="w-8 h-8" />,
    title: "شاهد السحر يحدث",
    description: "الوكيل يفهم طلبك ويبني موقعك في ثوانٍ أمام عينيك مباشرة",
    tip: "يمكنك مشاهدة التغييرات فوراً في نافذة المعاينة",
  },
  {
    id: 3,
    icon: <Palette className="w-8 h-8" />,
    title: "عدّل كما تشاء",
    description: "غيّر الألوان، النصوص، الصور... كل شيء بمجرد طلبك",
    tip: "قل: \"غيّر اللون الرئيسي للأزرق\" أو \"أضف قسم للتواصل\"",
  },
  {
    id: 4,
    icon: <Globe className="w-8 h-8" />,
    title: "انشر للعالم",
    description: "بضغطة زر، موقعك يصبح متاحاً للجميع على الإنترنت",
    tip: "ستحصل على رابط مخصص لمشاركته مع الجميع",
  },
  {
    id: 5,
    icon: <Rocket className="w-8 h-8" />,
    title: "أنت جاهز!",
    description: "ابدأ الآن في بناء موقعك الأول. الوكيل ينتظرك!",
    tip: "جرب أحد القوالب الجاهزة لبداية سريعة",
  },
];

const Onboarding = () => {
  const [currentStep, setCurrentStep] = useState(0);
  const navigate = useNavigate();

  const nextStep = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1);
    } else {
      completeOnboarding();
    }
  };

  const prevStep = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  const completeOnboarding = () => {
    localStorage.setItem("onboarding-completed", "true");
    navigate("/app");
  };

  const skipOnboarding = () => {
    localStorage.setItem("onboarding-completed", "true");
    navigate("/app");
  };

  const step = steps[currentStep];
  const isLastStep = currentStep === steps.length - 1;

  return (
    <>
      <SEO
        title="كيف يعمل Chat2Site - دليلك للبدء"
        description="تعلم كيف تبني موقعك في دقائق مع Chat2Site"
        noIndex
      />

      <div className="min-h-screen bg-gradient-to-br from-background via-background to-primary/5 flex flex-col relative overflow-hidden">
        {/* Background effects */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <motion.div
            className="absolute top-1/4 right-1/4 w-[500px] h-[500px] bg-primary/10 rounded-full blur-3xl"
            animate={{ 
              scale: [1, 1.2, 1],
              x: [0, 50, 0],
              y: [0, -30, 0]
            }}
            transition={{ duration: 10, repeat: Infinity }}
          />
          <motion.div
            className="absolute bottom-1/4 left-1/4 w-[400px] h-[400px] bg-accent/10 rounded-full blur-3xl"
            animate={{ 
              scale: [1.2, 1, 1.2],
              x: [0, -30, 0],
              y: [0, 50, 0]
            }}
            transition={{ duration: 10, repeat: Infinity, delay: 2 }}
          />
        </div>

        {/* Skip button */}
        <div className="absolute top-4 left-4 z-20">
          <Button variant="ghost" onClick={skipOnboarding}>
            تخطي
          </Button>
        </div>

        {/* Progress bar */}
        <div className="absolute top-4 right-4 left-20 z-20">
          <div className="flex items-center gap-2">
            {steps.map((_, index) => (
              <motion.div
                key={index}
                className={`h-1.5 rounded-full flex-1 ${
                  index <= currentStep ? "hero-gradient" : "bg-muted"
                }`}
                initial={{ scaleX: 0 }}
                animate={{ scaleX: index <= currentStep ? 1 : 0.3 }}
                transition={{ duration: 0.3 }}
              />
            ))}
          </div>
          <p className="text-xs text-muted-foreground mt-2 text-left" dir="ltr">
            {currentStep + 1} / {steps.length}
          </p>
        </div>

        {/* Main content */}
        <div className="flex-1 flex items-center justify-center px-4 py-20 relative z-10">
          <div className="max-w-lg w-full">
            <AnimatePresence mode="wait">
              <motion.div
                key={currentStep}
                initial={{ opacity: 0, x: 50 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -50 }}
                transition={{ duration: 0.3 }}
                className="text-center"
              >
                {/* Icon */}
                <motion.div
                  className="w-24 h-24 mx-auto mb-8 rounded-3xl hero-gradient flex items-center justify-center shadow-glow"
                  animate={{ 
                    scale: [1, 1.05, 1],
                    rotate: [0, 5, -5, 0]
                  }}
                  transition={{ duration: 3, repeat: Infinity }}
                >
                  <span className="text-primary-foreground">{step.icon}</span>
                </motion.div>

                {/* Step number */}
                <motion.div
                  className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-primary/10 text-primary text-sm font-medium mb-6"
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ delay: 0.2 }}
                >
                  <Zap className="w-4 h-4" />
                  الخطوة {step.id}
                </motion.div>

                {/* Title */}
                <h1 className="text-3xl md:text-4xl font-bold mb-4 bg-gradient-to-l from-primary to-accent bg-clip-text text-transparent">
                  {step.title}
                </h1>

                {/* Description */}
                <p className="text-lg text-muted-foreground mb-8 leading-relaxed">
                  {step.description}
                </p>

                {/* Tip card */}
                <motion.div
                  className="bg-card/50 backdrop-blur-sm border border-border rounded-2xl p-5 mb-8"
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.3 }}
                >
                  <div className="flex items-start gap-3">
                    <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
                      <Bot className="w-4 h-4 text-primary" />
                    </div>
                    <div className="text-right">
                      <p className="text-xs text-muted-foreground mb-1">💡 نصيحة</p>
                      <p className="text-sm text-foreground">{step.tip}</p>
                    </div>
                  </div>
                </motion.div>

                {/* Features for last step */}
                {isLastStep && (
                  <motion.div
                    className="grid grid-cols-2 gap-3 mb-8"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.4 }}
                  >
                    {[
                      "بدون كود",
                      "بدون خبرة تقنية",
                      "نشر فوري",
                      "دعم عربي كامل",
                    ].map((feature, index) => (
                      <div
                        key={index}
                        className="flex items-center gap-2 p-3 rounded-xl bg-green-500/10 border border-green-500/20"
                      >
                        <Check className="w-4 h-4 text-green-500" />
                        <span className="text-sm font-medium text-green-600">
                          {feature}
                        </span>
                      </div>
                    ))}
                  </motion.div>
                )}
              </motion.div>
            </AnimatePresence>
          </div>
        </div>

        {/* Navigation */}
        <div className="p-6 relative z-10">
          <div className="max-w-lg mx-auto flex items-center justify-between gap-4">
            <Button
              variant="outline"
              size="lg"
              onClick={prevStep}
              disabled={currentStep === 0}
              className="gap-2"
            >
              <ChevronRight className="w-4 h-4" />
              السابق
            </Button>

            <Button
              size="lg"
              onClick={nextStep}
              className="hero-gradient shadow-glow gap-2 flex-1 max-w-[200px]"
            >
              {isLastStep ? (
                <>
                  <Sparkles className="w-4 h-4" />
                  ابدأ الآن
                </>
              ) : (
                <>
                  التالي
                  <ChevronLeft className="w-4 h-4" />
                </>
              )}
            </Button>
          </div>
        </div>

        {/* Floating decoration */}
        <div className="absolute bottom-20 right-10 pointer-events-none">
          <motion.div
            animate={{ y: [0, -20, 0], rotate: [0, 10, 0] }}
            transition={{ duration: 4, repeat: Infinity }}
            className="text-6xl opacity-20"
          >
            ✨
          </motion.div>
        </div>
        <div className="absolute top-40 left-10 pointer-events-none">
          <motion.div
            animate={{ y: [0, 15, 0], rotate: [0, -10, 0] }}
            transition={{ duration: 5, repeat: Infinity, delay: 1 }}
            className="text-5xl opacity-20"
          >
            🚀
          </motion.div>
        </div>
      </div>
    </>
  );
};

export default Onboarding;
