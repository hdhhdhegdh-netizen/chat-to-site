import { Button } from "@/components/ui/button";
import { MessageSquare, Zap } from "lucide-react";
import { Link } from "react-router-dom";

const HeroSection = () => {
  return (
    <section className="relative min-h-[90vh] flex items-center justify-center overflow-hidden subtle-gradient">
      {/* Background decoration */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/5 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-accent/5 rounded-full blur-3xl" />
      </div>
      
      <div className="container relative z-10 px-4 py-20">
        <div className="max-w-4xl mx-auto text-center">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary mb-8 animate-fade-in">
            <Zap className="w-4 h-4" />
            <span className="text-sm font-medium">وكيل ذكي • ليس أداة</span>
          </div>
          
          {/* Main headline */}
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold text-foreground mb-6 animate-slide-up leading-tight">
            ابنِ موقعك عبر
            <span className="block hero-gradient bg-clip-text text-transparent">
              محادثة واحدة
            </span>
          </h1>
          
          {/* Subheadline */}
          <p className="text-xl md:text-2xl text-muted-foreground mb-10 max-w-2xl mx-auto animate-slide-up text-balance" style={{ animationDelay: '0.1s' }}>
            تحدث كما تشرح فكرتك لشخص يفهمك.
            <br />
            <span className="text-foreground font-medium">Chat2Site</span> يحوّل كلامك إلى موقع حي، ثم ينشره فورًا.
          </p>
          
          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 animate-slide-up" style={{ animationDelay: '0.2s' }}>
            <Link to="/app">
              <Button variant="hero" size="xl">
                <MessageSquare className="w-5 h-5" />
                ابدأ المحادثة
              </Button>
            </Link>
            <Link to="/pricing">
              <Button variant="heroOutline" size="lg">
                تعرف على الأسعار
              </Button>
            </Link>
          </div>
          
          {/* Trust indicators */}
          <div className="mt-16 flex flex-col items-center gap-4 animate-fade-in" style={{ animationDelay: '0.4s' }}>
            <p className="text-sm text-muted-foreground">لا حاجة لبطاقة ائتمان • ابدأ مجانًا</p>
            <div className="flex items-center gap-6 text-muted-foreground">
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 rounded-full status-ready" />
                <span className="text-sm">بدون كود</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 rounded-full status-ready" />
                <span className="text-sm">نشر فوري</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 rounded-full status-ready" />
                <span className="text-sm">عربي بالكامل</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
