import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Check, Crown, Zap, Building2, MessageCircle, Loader2, Sparkles } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import Header from "@/components/landing/Header";
import Footer from "@/components/landing/Footer";
import { useSubscription, SubscriptionPlan } from "@/hooks/useSubscription";
import { useAuth } from "@/hooks/useAuth";
import { toast } from "sonner";
import { motion } from "framer-motion";
import SEO from "@/components/SEO";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

const planIcons: Record<string, React.ReactNode> = {
  free: <Zap className="w-6 h-6" />,
  pro: <Crown className="w-6 h-6" />,
  business: <Building2 className="w-6 h-6" />,
};

const Pricing = () => {
  const { plans, currentPlan, loading, subscribeToPlan } = useSubscription();
  const { user, loading: authLoading } = useAuth();
  const navigate = useNavigate();
  const [subscribing, setSubscribing] = useState<string | null>(null);
  const [showContactDialog, setShowContactDialog] = useState(false);
  const [selectedPlan, setSelectedPlan] = useState<SubscriptionPlan | null>(null);

  const handleSubscribe = async (plan: SubscriptionPlan) => {
    if (!user) {
      toast.info("يجب تسجيل الدخول أولاً");
      navigate("/auth");
      return;
    }

    if (currentPlan?.id === plan.id) {
      toast.info("أنت مشترك بالفعل في هذه الخطة");
      return;
    }

    setSubscribing(plan.id);

    try {
      if (plan.price === 0) {
        await subscribeToPlan(plan.id, 'manual');
        toast.success("تم تفعيل الخطة المجانية!");
        navigate("/app");
      } else {
        setSelectedPlan(plan);
        setShowContactDialog(true);
      }
    } catch (error: any) {
      toast.error(error.message || "حدث خطأ");
    } finally {
      setSubscribing(null);
    }
  };

  const handleManualPayment = async () => {
    if (!selectedPlan) return;
    
    const message = encodeURIComponent(
      `مرحباً، أريد الاشتراك في خطة ${selectedPlan.name_ar} بسعر ${selectedPlan.price} ر.س/شهرياً`
    );
    window.open(`https://wa.me/966500000000?text=${message}`, '_blank');
    setShowContactDialog(false);
  };

  if (loading || authLoading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <Loader2 className="w-8 h-8 animate-spin text-primary" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background relative overflow-hidden">
      <SEO 
        title="الأسعار"
        description="اختر الباقة المناسبة لك. ابدأ مجاناً أو اختر إحدى الباقات المدفوعة للحصول على ميزات متقدمة."
      />
      {/* Background gradient */}
      <div className="fixed inset-0 bg-gradient-to-br from-primary/5 via-background to-accent/5 pointer-events-none" />
      
      {/* Floating orbs */}
      <motion.div
        className="fixed top-20 left-20 w-96 h-96 bg-gradient-to-br from-primary/15 to-accent/15 rounded-full blur-3xl pointer-events-none"
        animate={{
          x: [0, 50, 0],
          y: [0, 30, 0],
          scale: [1, 1.1, 1],
        }}
        transition={{
          duration: 10,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />
      <motion.div
        className="fixed bottom-20 right-20 w-80 h-80 bg-gradient-to-br from-accent/15 to-primary/15 rounded-full blur-3xl pointer-events-none"
        animate={{
          x: [0, -40, 0],
          y: [0, -30, 0],
          scale: [1, 1.2, 1],
        }}
        transition={{
          duration: 12,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />
      
      {/* Floating particles */}
      {[...Array(8)].map((_, i) => (
        <motion.div
          key={i}
          className="fixed w-2 h-2 bg-primary/20 rounded-full pointer-events-none"
          style={{
            top: `${15 + i * 10}%`,
            left: `${5 + i * 12}%`,
          }}
          animate={{
            y: [0, -30, 0],
            opacity: [0.2, 0.6, 0.2],
          }}
          transition={{
            duration: 4 + i * 0.5,
            repeat: Infinity,
            delay: i * 0.4,
          }}
        />
      ))}
      
      <Header />
      <main className="pt-24 pb-16 relative z-10">
        <div className="container px-4">
          {/* Header */}
          <motion.div 
            className="text-center max-w-2xl mx-auto mb-16"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary text-sm font-medium mb-4">
              <Sparkles className="w-4 h-4" />
              أسعار شفافة
            </div>
            <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
              أسعار بسيطة وشفافة
            </h1>
            <p className="text-xl text-muted-foreground">
              اختر الخطة التي تناسب احتياجاتك. ابدأ مجانًا وترقّ متى شئت.
            </p>
            {currentPlan && (
              <motion.div 
                className="mt-6 inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-primary/10 text-primary backdrop-blur-sm border border-primary/20"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.2 }}
              >
                <Crown className="w-4 h-4" />
                <span>خطتك الحالية: {currentPlan.name_ar}</span>
              </motion.div>
            )}
          </motion.div>

          {/* Pricing cards */}
          <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {plans.map((plan, index) => {
              const isCurrentPlan = currentPlan?.id === plan.id;
              const isHighlighted = plan.name === 'pro';
              
              return (
                <motion.div
                  key={plan.id}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1 + index * 0.1 }}
                  whileHover={{ y: -8 }}
                  className={`relative ${isHighlighted ? 'z-10' : ''}`}
                >
                  <div
                    className={`relative rounded-3xl p-8 transition-all duration-500 backdrop-blur-sm h-full ${
                      isHighlighted
                        ? "bg-card/90 border-2 border-primary shadow-2xl shadow-primary/20 scale-105"
                        : "bg-card/80 border border-border/50 shadow-xl hover:shadow-2xl hover:border-primary/30"
                    } ${isCurrentPlan ? "ring-2 ring-primary ring-offset-2 ring-offset-background" : ""}`}
                  >
                    {/* Glow effect for highlighted */}
                    {isHighlighted && (
                      <div className="absolute inset-0 rounded-3xl hero-gradient opacity-5 pointer-events-none" />
                    )}
                    
                    {isHighlighted && (
                      <motion.div 
                        className="absolute -top-4 left-1/2 -translate-x-1/2 px-5 py-1.5 rounded-full hero-gradient text-primary-foreground text-sm font-medium shadow-lg shadow-primary/30"
                        animate={{ y: [0, -3, 0] }}
                        transition={{ duration: 2, repeat: Infinity }}
                      >
                        <span className="flex items-center gap-1.5">
                          <Sparkles className="w-3.5 h-3.5" />
                          الأكثر شيوعًا
                        </span>
                      </motion.div>
                    )}

                    {isCurrentPlan && (
                      <div className="absolute -top-4 right-4 px-4 py-1.5 rounded-full bg-primary text-primary-foreground text-xs font-medium shadow-lg shadow-primary/30">
                        خطتك الحالية
                      </div>
                    )}

                    <div className="text-center mb-8 relative">
                      <motion.div 
                        className={`w-14 h-14 rounded-2xl flex items-center justify-center mx-auto mb-4 ${
                          isHighlighted 
                            ? 'hero-gradient shadow-lg shadow-primary/30' 
                            : 'bg-primary/10'
                        }`}
                        whileHover={{ rotate: 10, scale: 1.1 }}
                      >
                        <div className={isHighlighted ? 'text-primary-foreground' : 'text-primary'}>
                          {planIcons[plan.name] || <Zap className="w-6 h-6" />}
                        </div>
                      </motion.div>
                      <h3 className="text-xl font-bold text-foreground mb-2">{plan.name_ar}</h3>
                      <div className="flex items-baseline justify-center gap-1">
                        <span className="text-5xl font-bold text-foreground">{plan.price}</span>
                        <span className="text-muted-foreground">ر.س / شهريًا</span>
                      </div>
                    </div>

                    <ul className="space-y-4 mb-8">
                      {plan.features.map((feature, featureIndex) => (
                        <motion.li 
                          key={featureIndex} 
                          className="flex items-center gap-3"
                          initial={{ opacity: 0, x: -10 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: 0.2 + featureIndex * 0.05 }}
                        >
                          <div className={`w-5 h-5 rounded-full flex items-center justify-center flex-shrink-0 ${
                            isHighlighted ? 'hero-gradient shadow-sm shadow-primary/30' : 'bg-primary/10'
                          }`}>
                            <Check className={`w-3 h-3 ${isHighlighted ? 'text-primary-foreground' : 'text-primary'}`} />
                          </div>
                          <span className="text-foreground">{feature}</span>
                        </motion.li>
                      ))}
                    </ul>

                    <motion.div
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      <Button
                        variant={isHighlighted ? "hero" : "outline"}
                        className={`w-full relative overflow-hidden group ${
                          isHighlighted ? 'shadow-lg shadow-primary/25 hover:shadow-xl hover:shadow-primary/30' : 'hover:border-primary hover:text-primary'
                        }`}
                        size="lg"
                        onClick={() => handleSubscribe(plan)}
                        disabled={subscribing === plan.id || isCurrentPlan}
                      >
                        {isHighlighted && (
                          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700" />
                        )}
                        <span className="relative">
                          {subscribing === plan.id ? (
                            <Loader2 className="w-4 h-4 animate-spin" />
                          ) : isCurrentPlan ? (
                            "خطتك الحالية"
                          ) : plan.price === 0 ? (
                            "ابدأ مجانًا"
                          ) : (
                            "اشترك الآن"
                          )}
                        </span>
                      </Button>
                    </motion.div>
                  </div>
                </motion.div>
              );
            })}
          </div>

          {/* Features comparison */}
          <motion.div 
            className="mt-24 max-w-4xl mx-auto"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
          >
            <h2 className="text-2xl font-bold text-foreground text-center mb-8">
              مقارنة المميزات
            </h2>
            <div className="backdrop-blur-sm bg-card/80 rounded-2xl border border-border/50 overflow-hidden shadow-xl">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-border/50 bg-muted/30">
                    <th className="text-right p-5 text-foreground font-medium">الميزة</th>
                    {plans.map(plan => (
                      <th key={plan.id} className="p-5 text-center text-foreground font-medium">
                        {plan.name_ar}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  <tr className="border-b border-border/30 hover:bg-muted/20 transition-colors">
                    <td className="p-5 text-foreground">عدد المواقع</td>
                    {plans.map(plan => (
                      <td key={plan.id} className="p-5 text-center text-muted-foreground">
                        {plan.max_projects === 999 ? "غير محدود" : plan.max_projects}
                      </td>
                    ))}
                  </tr>
                  <tr className="border-b border-border/30 hover:bg-muted/20 transition-colors">
                    <td className="p-5 text-foreground">نطاق مخصص</td>
                    {plans.map(plan => (
                      <td key={plan.id} className="p-5 text-center">
                        {plan.has_custom_domain ? (
                          <div className="w-6 h-6 rounded-full hero-gradient mx-auto flex items-center justify-center shadow-sm shadow-primary/30">
                            <Check className="w-3.5 h-3.5 text-primary-foreground" />
                          </div>
                        ) : (
                          <span className="text-muted-foreground">-</span>
                        )}
                      </td>
                    ))}
                  </tr>
                  <tr className="border-b border-border/30 hover:bg-muted/20 transition-colors">
                    <td className="p-5 text-foreground">تحليلات</td>
                    {plans.map(plan => (
                      <td key={plan.id} className="p-5 text-center">
                        {plan.has_analytics ? (
                          <div className="w-6 h-6 rounded-full hero-gradient mx-auto flex items-center justify-center shadow-sm shadow-primary/30">
                            <Check className="w-3.5 h-3.5 text-primary-foreground" />
                          </div>
                        ) : (
                          <span className="text-muted-foreground">-</span>
                        )}
                      </td>
                    ))}
                  </tr>
                  <tr className="border-b border-border/30 hover:bg-muted/20 transition-colors">
                    <td className="p-5 text-foreground">دعم أولوية</td>
                    {plans.map(plan => (
                      <td key={plan.id} className="p-5 text-center">
                        {plan.has_priority_support ? (
                          <div className="w-6 h-6 rounded-full hero-gradient mx-auto flex items-center justify-center shadow-sm shadow-primary/30">
                            <Check className="w-3.5 h-3.5 text-primary-foreground" />
                          </div>
                        ) : (
                          <span className="text-muted-foreground">-</span>
                        )}
                      </td>
                    ))}
                  </tr>
                  <tr className="hover:bg-muted/20 transition-colors">
                    <td className="p-5 text-foreground">إزالة العلامة التجارية</td>
                    {plans.map(plan => (
                      <td key={plan.id} className="p-5 text-center">
                        {plan.has_remove_branding ? (
                          <div className="w-6 h-6 rounded-full hero-gradient mx-auto flex items-center justify-center shadow-sm shadow-primary/30">
                            <Check className="w-3.5 h-3.5 text-primary-foreground" />
                          </div>
                        ) : (
                          <span className="text-muted-foreground">-</span>
                        )}
                      </td>
                    ))}
                  </tr>
                </tbody>
              </table>
            </div>
          </motion.div>

          {/* FAQ teaser */}
          <motion.div 
            className="text-center mt-16"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
          >
            <p className="text-muted-foreground">
              لديك أسئلة؟{" "}
              <Link to="/docs" className="text-primary hover:underline font-medium">
                اطلع على الأسئلة الشائعة
              </Link>
            </p>
          </motion.div>
        </div>
      </main>
      <Footer />

      {/* Contact Dialog for Manual Payment */}
      <Dialog open={showContactDialog} onOpenChange={setShowContactDialog}>
        <DialogContent className="sm:max-w-md backdrop-blur-xl bg-card/95 border-border/50">
          <DialogHeader>
            <DialogTitle>إتمام الاشتراك</DialogTitle>
            <DialogDescription>
              للاشتراك في خطة {selectedPlan?.name_ar}، تواصل معنا عبر واتساب
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4">
            <div className="bg-muted/30 backdrop-blur-sm rounded-xl p-4 text-center border border-border/30">
              <p className="text-3xl font-bold text-foreground">
                {selectedPlan?.price} ر.س
              </p>
              <p className="text-sm text-muted-foreground">شهرياً</p>
            </div>
            <div className="space-y-2 text-sm text-muted-foreground">
              <p className="flex items-center gap-2">
                <Check className="w-4 h-4 text-primary" />
                التحويل البنكي أو STC Pay
              </p>
              <p className="flex items-center gap-2">
                <Check className="w-4 h-4 text-primary" />
                تفعيل فوري بعد التأكيد
              </p>
              <p className="flex items-center gap-2">
                <Check className="w-4 h-4 text-primary" />
                دعم فني على مدار الساعة
              </p>
            </div>
            <motion.div
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <Button 
                className="w-full gap-2 hero-gradient text-primary-foreground shadow-lg shadow-primary/25" 
                onClick={handleManualPayment}
              >
                <MessageCircle className="w-5 h-5" />
                تواصل عبر واتساب
              </Button>
            </motion.div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default Pricing;
