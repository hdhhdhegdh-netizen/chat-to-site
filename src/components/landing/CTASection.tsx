import { Button } from "@/components/ui/button";
import { MessageSquare, ArrowLeft } from "lucide-react";
import { Link } from "react-router-dom";

const CTASection = () => {
  return (
    <section className="py-24 bg-card relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[800px] bg-primary/5 rounded-full blur-3xl" />
      </div>
      
      <div className="container relative z-10 px-4">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-3xl md:text-5xl font-bold text-foreground mb-6">
            جاهز لبناء موقعك؟
          </h2>
          <p className="text-xl text-muted-foreground mb-10">
            لا حاجة لخبرة تقنية. تحدث فقط.
          </p>
          
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link to="/app">
              <Button variant="hero" size="xl" className="group">
                <MessageSquare className="w-5 h-5" />
                ابدأ المحادثة الآن
                <ArrowLeft className="w-5 h-5 transition-transform group-hover:-translate-x-1" />
              </Button>
            </Link>
          </div>
          
          <p className="mt-8 text-sm text-muted-foreground">
            مجاني للبدء • لا بطاقة ائتمان مطلوبة
          </p>
        </div>
      </div>
    </section>
  );
};

export default CTASection;
