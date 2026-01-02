import { Brain, Paintbrush, Rocket, MessageSquare, RefreshCw } from "lucide-react";

const capabilities = [
  { icon: Brain, text: "يفهم نشاطك" },
  { icon: Paintbrush, text: "يتخذ قرارات التصميم" },
  { icon: Rocket, text: "ينفّذ مباشرة" },
  { icon: MessageSquare, text: "يعدّل من الحوار" },
  { icon: RefreshCw, text: "ينشر فورًا" },
];

const SolutionSection = () => {
  return (
    <section className="py-24 subtle-gradient">
      <div className="container px-4">
        <div className="max-w-4xl mx-auto text-center">
          {/* Main statement */}
          <div className="mb-16">
            <h2 className="text-3xl md:text-5xl font-bold text-foreground mb-6">
              <span className="hero-gradient bg-clip-text text-transparent">Chat2Site</span>
              {" "}يلغي الوسيط
            </h2>
            <p className="text-xl text-muted-foreground">
              وكيل ذكي يفهم ويقرر وينفذ
            </p>
          </div>
          
          {/* Capabilities */}
          <div className="grid grid-cols-2 md:grid-cols-5 gap-6 mb-16">
            {capabilities.map((cap, index) => (
              <div
                key={index}
                className="flex flex-col items-center gap-3 p-6 rounded-2xl bg-card shadow-card hover:shadow-elevated transition-shadow duration-300 animate-fade-in"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className="w-14 h-14 rounded-xl hero-gradient flex items-center justify-center">
                  <cap.icon className="w-7 h-7 text-primary-foreground" />
                </div>
                <span className="font-medium text-foreground">{cap.text}</span>
              </div>
            ))}
          </div>
          
          {/* Key message */}
          <div className="p-8 rounded-2xl bg-card shadow-elevated">
            <p className="text-2xl md:text-3xl font-bold text-foreground">
              لا تسأله <span className="text-muted-foreground">كيف</span>
              <br />
              أخبره <span className="hero-gradient bg-clip-text text-transparent">ماذا تريد</span>
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default SolutionSection;
