import { X } from "lucide-react";

const problems = [
  "شرح فكرتك أكثر من مرة",
  "انتظار، مراجعات، تعديلات لا نهاية لها",
  "مصطلحات تقنية لا تهمك",
  "نتيجة لا تشبه ما تخيلته",
];

const ProblemSection = () => {
  return (
    <section className="py-24 bg-card">
      <div className="container px-4">
        <div className="max-w-4xl mx-auto">
          {/* Section header */}
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
              إنشاء موقع اليوم يعني...
            </h2>
            <p className="text-lg text-muted-foreground">
              تجربة مرهقة لا يجب أن تتكرر
            </p>
          </div>
          
          {/* Problem cards */}
          <div className="grid md:grid-cols-2 gap-4 mb-12">
            {problems.map((problem, index) => (
              <div
                key={index}
                className="flex items-center gap-4 p-6 rounded-xl bg-destructive/5 border border-destructive/10 animate-fade-in"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className="flex-shrink-0 w-10 h-10 rounded-full bg-destructive/10 flex items-center justify-center">
                  <X className="w-5 h-5 text-destructive" />
                </div>
                <span className="text-foreground font-medium">{problem}</span>
              </div>
            ))}
          </div>
          
          {/* The real problem */}
          <div className="text-center p-8 rounded-2xl border-2 border-dashed border-muted">
            <p className="text-lg text-muted-foreground mb-2">المشكلة ليست في الأدوات</p>
            <p className="text-2xl font-bold text-foreground">
              المشكلة في <span className="text-destructive">الوسيط البشري</span>
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProblemSection;
