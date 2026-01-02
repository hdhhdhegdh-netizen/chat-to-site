import { Check, Code, Settings, FileStack, Layers, Globe } from "lucide-react";

const features = [
  { icon: Code, text: "بدون كود", description: "لا حاجة لأي معرفة تقنية" },
  { icon: Settings, text: "بدون إعدادات", description: "كل شيء جاهز للاستخدام" },
  { icon: FileStack, text: "بدون ملفات", description: "لا رفع ولا تحميل" },
  { icon: Layers, text: "بدون تعقيد", description: "واجهة محادثة بسيطة" },
  { icon: Globe, text: "موقع حقيقي", description: "قابل للنشر والاستخدام" },
];

const WhySection = () => {
  return (
    <section className="py-24 subtle-gradient">
      <div className="container px-4">
        <div className="max-w-5xl mx-auto">
          {/* Section header */}
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
              لماذا Chat2Site
            </h2>
            <p className="text-lg text-muted-foreground">
              أنت لا "تبني" — أنت <span className="font-bold text-primary">توجّه</span>
            </p>
          </div>
          
          {/* Features grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {features.map((feature, index) => (
              <div
                key={index}
                className="group p-6 rounded-2xl bg-card shadow-card hover:shadow-elevated transition-all duration-300 border border-transparent hover:border-primary/20 animate-fade-in"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className="flex items-start gap-4">
                  <div className="flex-shrink-0 w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center group-hover:bg-primary group-hover:scale-110 transition-all duration-300">
                    <feature.icon className="w-6 h-6 text-primary group-hover:text-primary-foreground transition-colors" />
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-foreground mb-1">{feature.text}</h3>
                    <p className="text-muted-foreground text-sm">{feature.description}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
          
          {/* Bottom emphasis */}
          <div className="mt-16 text-center">
            <div className="inline-flex items-center gap-3 px-6 py-3 rounded-full bg-primary/10">
              <Check className="w-5 h-5 text-primary" />
              <span className="font-medium text-foreground">
                موقع كامل من محادثة واحدة
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default WhySection;
