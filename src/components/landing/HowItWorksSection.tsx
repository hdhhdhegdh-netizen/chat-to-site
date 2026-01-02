import { MessageCircle, Eye, Globe } from "lucide-react";

const steps = [
  {
    icon: MessageCircle,
    number: "١",
    title: "تحدث",
    description: "اشرح مشروعك بلغتك الطبيعية. لا حاجة لمصطلحات تقنية أو خطوات معقدة.",
  },
  {
    icon: Eye,
    number: "٢",
    title: "شاهد التنفيذ",
    description: "الموقع يُبنى ويتغير مباشرة أمامك. كل تعديل تطلبه يظهر فورًا.",
  },
  {
    icon: Globe,
    number: "٣",
    title: "انشر",
    description: "ضغطة واحدة. موقعك على الإنترنت. انتهى.",
  },
];

const HowItWorksSection = () => {
  return (
    <section className="py-24 bg-card">
      <div className="container px-4">
        <div className="max-w-5xl mx-auto">
          {/* Section header */}
          <div className="text-center mb-20">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
              كيف يعمل
            </h2>
            <p className="text-lg text-muted-foreground">
              ثلاث خطوات فقط، بدون تعقيد
            </p>
          </div>
          
          {/* Steps */}
          <div className="relative">
            {/* Connection line */}
            <div className="hidden md:block absolute top-24 right-[16.66%] left-[16.66%] h-0.5 bg-gradient-to-l from-primary/20 via-primary to-primary/20" />
            
            <div className="grid md:grid-cols-3 gap-8">
              {steps.map((step, index) => (
                <div
                  key={index}
                  className="relative flex flex-col items-center text-center animate-slide-up"
                  style={{ animationDelay: `${index * 0.15}s` }}
                >
                  {/* Step number */}
                  <div className="relative z-10 mb-6">
                    <div className="w-20 h-20 rounded-2xl hero-gradient flex items-center justify-center shadow-elevated">
                      <step.icon className="w-10 h-10 text-primary-foreground" />
                    </div>
                    <div className="absolute -top-2 -right-2 w-8 h-8 rounded-full bg-card border-2 border-primary flex items-center justify-center">
                      <span className="text-lg font-bold text-primary">{step.number}</span>
                    </div>
                  </div>
                  
                  {/* Content */}
                  <h3 className="text-2xl font-bold text-foreground mb-3">
                    {step.title}
                  </h3>
                  <p className="text-muted-foreground leading-relaxed">
                    {step.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HowItWorksSection;
