import { Button } from "@/components/ui/button";
import { Check } from "lucide-react";
import { Link } from "react-router-dom";
import Header from "@/components/landing/Header";
import Footer from "@/components/landing/Footer";

interface PricingTier {
  name: string;
  price: string;
  period: string;
  description: string;
  features: string[];
  highlighted?: boolean;
  cta: string;
}

const tiers: PricingTier[] = [
  {
    name: "مجاني",
    price: "0",
    period: "ر.س / شهريًا",
    description: "ابدأ مجانًا وجرب القوة الكاملة",
    features: [
      "موقع واحد",
      "نطاق فرعي chat2site.app",
      "محادثات غير محدودة",
      "تحديثات أسبوعية",
    ],
    cta: "ابدأ مجانًا",
  },
  {
    name: "احترافي",
    price: "49",
    period: "ر.س / شهريًا",
    description: "للمشاريع الجادة والأعمال",
    features: [
      "5 مواقع",
      "نطاق مخصص",
      "أولوية في البناء",
      "تحليلات متقدمة",
      "دعم فني سريع",
      "إزالة شعار Chat2Site",
    ],
    highlighted: true,
    cta: "اشترك الآن",
  },
  {
    name: "أعمال",
    price: "149",
    period: "ر.س / شهريًا",
    description: "للفرق والشركات",
    features: [
      "مواقع غير محدودة",
      "نطاقات متعددة",
      "API للتكامل",
      "أعضاء فريق متعددين",
      "دعم مخصص",
      "SLA مضمون",
    ],
    cta: "تواصل معنا",
  },
];

const Pricing = () => {
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
          </div>

          {/* Pricing cards */}
          <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {tiers.map((tier, index) => (
              <div
                key={index}
                className={`relative rounded-2xl p-8 ${
                  tier.highlighted
                    ? "bg-card border-2 border-primary shadow-elevated"
                    : "bg-card border border-border shadow-card"
                }`}
              >
                {tier.highlighted && (
                  <div className="absolute -top-4 left-1/2 -translate-x-1/2 px-4 py-1 rounded-full hero-gradient text-primary-foreground text-sm font-medium">
                    الأكثر شيوعًا
                  </div>
                )}

                <div className="text-center mb-8">
                  <h3 className="text-xl font-bold text-foreground mb-2">{tier.name}</h3>
                  <p className="text-sm text-muted-foreground mb-4">{tier.description}</p>
                  <div className="flex items-baseline justify-center gap-1">
                    <span className="text-5xl font-bold text-foreground">{tier.price}</span>
                    <span className="text-muted-foreground">{tier.period}</span>
                  </div>
                </div>

                <ul className="space-y-4 mb-8">
                  {tier.features.map((feature, featureIndex) => (
                    <li key={featureIndex} className="flex items-center gap-3">
                      <div className="w-5 h-5 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                        <Check className="w-3 h-3 text-primary" />
                      </div>
                      <span className="text-foreground">{feature}</span>
                    </li>
                  ))}
                </ul>

                <Link to="/app">
                  <Button
                    variant={tier.highlighted ? "hero" : "outline"}
                    className="w-full"
                    size="lg"
                  >
                    {tier.cta}
                  </Button>
                </Link>
              </div>
            ))}
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
    </div>
  );
};

export default Pricing;
