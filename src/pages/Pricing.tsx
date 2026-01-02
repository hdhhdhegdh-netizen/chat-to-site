import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Check, Crown, Zap, Building2, MessageCircle, Loader2 } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import Header from "@/components/landing/Header";
import Footer from "@/components/landing/Footer";
import { useSubscription, SubscriptionPlan } from "@/hooks/useSubscription";
import { useAuth } from "@/hooks/useAuth";
import { toast } from "sonner";
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

    // Already on this plan
    if (currentPlan?.id === plan.id) {
      toast.info("أنت مشترك بالفعل في هذه الخطة");
      return;
    }

    setSubscribing(plan.id);

    try {
      if (plan.price === 0) {
        // Free plan
        await subscribeToPlan(plan.id, 'manual');
        toast.success("تم تفعيل الخطة المجانية!");
        navigate("/app");
      } else {
        // Paid plan - show contact dialog
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
    
    // Open WhatsApp with pre-filled message
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
    <div className="min-h-screen bg-background">
      <Header />
      <main className="pt-24 pb-16">
        <div className="container px-4">
          {/* Header */}
          <div className="text-center max-w-2xl mx-auto mb-16">
            <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
              أسعار بسيطة وشفافة
            </h1>
            <p className="text-xl text-muted-foreground">
              اختر الخطة التي تناسب احتياجاتك. ابدأ مجانًا وترقّ متى شئت.
            </p>
            {currentPlan && (
              <div className="mt-4 inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary">
                <Crown className="w-4 h-4" />
                <span>خطتك الحالية: {currentPlan.name_ar}</span>
              </div>
            )}
          </div>

          {/* Pricing cards */}
          <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {plans.map((plan) => {
              const isCurrentPlan = currentPlan?.id === plan.id;
              const isHighlighted = plan.name === 'pro';
              
              return (
                <div
                  key={plan.id}
                  className={`relative rounded-2xl p-8 transition-all duration-300 ${
                    isHighlighted
                      ? "bg-card border-2 border-primary shadow-elevated scale-105"
                      : "bg-card border border-border shadow-card hover:shadow-elevated"
                  } ${isCurrentPlan ? "ring-2 ring-primary ring-offset-2" : ""}`}
                >
                  {isHighlighted && (
                    <div className="absolute -top-4 left-1/2 -translate-x-1/2 px-4 py-1 rounded-full hero-gradient text-primary-foreground text-sm font-medium">
                      الأكثر شيوعًا
                    </div>
                  )}

                  {isCurrentPlan && (
                    <div className="absolute -top-4 right-4 px-3 py-1 rounded-full bg-primary text-primary-foreground text-xs font-medium">
                      خطتك الحالية
                    </div>
                  )}

                  <div className="text-center mb-8">
                    <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mx-auto mb-4 text-primary">
                      {planIcons[plan.name] || <Zap className="w-6 h-6" />}
                    </div>
                    <h3 className="text-xl font-bold text-foreground mb-2">{plan.name_ar}</h3>
                    <div className="flex items-baseline justify-center gap-1">
                      <span className="text-5xl font-bold text-foreground">{plan.price}</span>
                      <span className="text-muted-foreground">ر.س / شهريًا</span>
                    </div>
                  </div>

                  <ul className="space-y-4 mb-8">
                    {plan.features.map((feature, featureIndex) => (
                      <li key={featureIndex} className="flex items-center gap-3">
                        <div className="w-5 h-5 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                          <Check className="w-3 h-3 text-primary" />
                        </div>
                        <span className="text-foreground">{feature}</span>
                      </li>
                    ))}
                  </ul>

                  <Button
                    variant={isHighlighted ? "hero" : "outline"}
                    className="w-full"
                    size="lg"
                    onClick={() => handleSubscribe(plan)}
                    disabled={subscribing === plan.id || isCurrentPlan}
                  >
                    {subscribing === plan.id ? (
                      <Loader2 className="w-4 h-4 animate-spin" />
                    ) : isCurrentPlan ? (
                      "خطتك الحالية"
                    ) : plan.price === 0 ? (
                      "ابدأ مجانًا"
                    ) : (
                      "اشترك الآن"
                    )}
                  </Button>
                </div>
              );
            })}
          </div>

          {/* Features comparison */}
          <div className="mt-20 max-w-4xl mx-auto">
            <h2 className="text-2xl font-bold text-foreground text-center mb-8">
              مقارنة المميزات
            </h2>
            <div className="bg-card rounded-2xl border border-border overflow-hidden">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-border">
                    <th className="text-right p-4 text-foreground font-medium">الميزة</th>
                    {plans.map(plan => (
                      <th key={plan.id} className="p-4 text-center text-foreground font-medium">
                        {plan.name_ar}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  <tr className="border-b border-border">
                    <td className="p-4 text-foreground">عدد المواقع</td>
                    {plans.map(plan => (
                      <td key={plan.id} className="p-4 text-center text-muted-foreground">
                        {plan.max_projects === 999 ? "غير محدود" : plan.max_projects}
                      </td>
                    ))}
                  </tr>
                  <tr className="border-b border-border">
                    <td className="p-4 text-foreground">نطاق مخصص</td>
                    {plans.map(plan => (
                      <td key={plan.id} className="p-4 text-center">
                        {plan.has_custom_domain ? (
                          <Check className="w-5 h-5 text-primary mx-auto" />
                        ) : (
                          <span className="text-muted-foreground">-</span>
                        )}
                      </td>
                    ))}
                  </tr>
                  <tr className="border-b border-border">
                    <td className="p-4 text-foreground">تحليلات</td>
                    {plans.map(plan => (
                      <td key={plan.id} className="p-4 text-center">
                        {plan.has_analytics ? (
                          <Check className="w-5 h-5 text-primary mx-auto" />
                        ) : (
                          <span className="text-muted-foreground">-</span>
                        )}
                      </td>
                    ))}
                  </tr>
                  <tr className="border-b border-border">
                    <td className="p-4 text-foreground">دعم أولوية</td>
                    {plans.map(plan => (
                      <td key={plan.id} className="p-4 text-center">
                        {plan.has_priority_support ? (
                          <Check className="w-5 h-5 text-primary mx-auto" />
                        ) : (
                          <span className="text-muted-foreground">-</span>
                        )}
                      </td>
                    ))}
                  </tr>
                  <tr>
                    <td className="p-4 text-foreground">إزالة العلامة التجارية</td>
                    {plans.map(plan => (
                      <td key={plan.id} className="p-4 text-center">
                        {plan.has_remove_branding ? (
                          <Check className="w-5 h-5 text-primary mx-auto" />
                        ) : (
                          <span className="text-muted-foreground">-</span>
                        )}
                      </td>
                    ))}
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          {/* FAQ teaser */}
          <div className="text-center mt-16">
            <p className="text-muted-foreground">
              لديك أسئلة؟{" "}
              <Link to="/docs" className="text-primary hover:underline">
                اطلع على الأسئلة الشائعة
              </Link>
            </p>
          </div>
        </div>
      </main>
      <Footer />

      {/* Contact Dialog for Manual Payment */}
      <Dialog open={showContactDialog} onOpenChange={setShowContactDialog}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>إتمام الاشتراك</DialogTitle>
            <DialogDescription>
              للاشتراك في خطة {selectedPlan?.name_ar}، تواصل معنا عبر واتساب
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4">
            <div className="bg-muted/50 rounded-lg p-4 text-center">
              <p className="text-2xl font-bold text-foreground">
                {selectedPlan?.price} ر.س
              </p>
              <p className="text-sm text-muted-foreground">شهرياً</p>
            </div>
            <div className="space-y-2 text-sm text-muted-foreground">
              <p>• التحويل البنكي أو STC Pay</p>
              <p>• تفعيل فوري بعد التأكيد</p>
              <p>• دعم فني على مدار الساعة</p>
            </div>
            <Button 
              className="w-full gap-2" 
              variant="hero"
              onClick={handleManualPayment}
            >
              <MessageCircle className="w-5 h-5" />
              تواصل عبر واتساب
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default Pricing;
