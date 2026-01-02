import { Link } from "react-router-dom";
import { ArrowRight, MessageCircle, Zap, Globe, Paintbrush, RefreshCw, HelpCircle } from "lucide-react";
import Header from "@/components/landing/Header";
import Footer from "@/components/landing/Footer";

const sections = [
  {
    icon: MessageCircle,
    title: "كيف يعمل Chat2Site",
    content: `Chat2Site هو وكيل ذكاء اصطناعي متخصص في بناء المواقع. على عكس أدوات بناء المواقع التقليدية، أنت لا تحتاج لاختيار قوالب أو سحب وإفلات عناصر.

فقط تحدث.

اشرح مشروعك كما تشرحه لشخص يفهمك. Chat2Site يفهم السياق، يتخذ قرارات التصميم، وينفذ مباشرة. كل ما عليك فعله هو التوجيه.`,
  },
  {
    icon: Zap,
    title: "البدء السريع",
    content: `1. سجّل حسابًا مجانيًا
2. ابدأ محادثة جديدة
3. اشرح فكرة موقعك (مثال: "أحتاج موقع لمكتب محاماة في الرياض")
4. شاهد الموقع يُبنى أمامك
5. عدّل بالمحادثة حتى تصل للنتيجة المطلوبة
6. انشر بضغطة واحدة`,
  },
  {
    icon: Paintbrush,
    title: "التعديل والتخصيص",
    content: `لا حاجة لمعرفة تقنية. كل تعديل يتم عبر المحادثة:

• "غيّر اللون الرئيسي للأزرق"
• "أضف قسم للخدمات مع 4 بطاقات"
• "حرّك الشعار للجهة اليمنى"
• "أزل الصورة الخلفية"

Chat2Site يفهم ما تريد ويطبقه فورًا.`,
  },
  {
    icon: Globe,
    title: "النشر والنطاقات",
    content: `كل موقع يحصل على نطاق فرعي مجاني:
yoursite.chat2site.app

للخطط المدفوعة، يمكنك ربط نطاقك الخاص:
1. اذهب لإعدادات المشروع
2. أدخل نطاقك المخصص
3. أضف سجلات DNS المطلوبة
4. فعّل SSL تلقائيًا`,
  },
  {
    icon: RefreshCw,
    title: "التحديثات والصيانة",
    content: `موقعك يبقى قابلاً للتعديل دائمًا:

• عد للمحادثة متى شئت لإجراء تغييرات
• جميع التعديلات تُحفظ تلقائيًا
• يمكنك التراجع عن أي تغيير
• الموقع يتحدث مباشرة عند النشر`,
  },
  {
    icon: HelpCircle,
    title: "الأسئلة الشائعة",
    content: `**هل أحتاج خبرة تقنية؟**
لا. فقط تحدث بلغتك الطبيعية.

**ماذا لو لم يفهم طلبي؟**
أعد الصياغة بطريقة مختلفة أو أضف تفاصيل.

**هل يمكنني تصدير الكود؟**
نعم، في الخطط المدفوعة يمكنك تحميل كود الموقع كاملاً.

**هل المواقع متوافقة مع الجوال؟**
نعم، جميع المواقع متجاوبة تلقائيًا.`,
  },
];

const Docs = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="pt-24 pb-16">
        <div className="container px-4">
          {/* Back link */}
          <Link
            to="/"
            className="inline-flex items-center gap-2 text-muted-foreground hover:text-foreground mb-8 transition-colors"
          >
            <ArrowRight className="w-4 h-4" />
            العودة للرئيسية
          </Link>

          <div className="max-w-3xl mx-auto">
            <div className="text-center mb-12">
              <h1 className="text-4xl font-bold text-foreground mb-4">كيف يعمل Chat2Site</h1>
              <p className="text-xl text-muted-foreground">
                كل ما تحتاج معرفته لبناء موقعك
              </p>
            </div>

            <div className="space-y-8">
              {sections.map((section, index) => (
                <section
                  key={index}
                  className="bg-card rounded-2xl border border-border p-8 shadow-card"
                >
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-10 h-10 rounded-xl hero-gradient flex items-center justify-center">
                      <section.icon className="w-5 h-5 text-primary-foreground" />
                    </div>
                    <h2 className="text-xl font-bold text-foreground">{section.title}</h2>
                  </div>
                  <div className="prose prose-gray max-w-none">
                    {section.content.split("\n\n").map((paragraph, pIndex) => (
                      <p
                        key={pIndex}
                        className="text-muted-foreground leading-relaxed whitespace-pre-line mb-4 last:mb-0"
                      >
                        {paragraph}
                      </p>
                    ))}
                  </div>
                </section>
              ))}
            </div>

            {/* CTA */}
            <div className="mt-12 text-center p-8 bg-card rounded-2xl border border-border">
              <p className="text-lg text-foreground mb-4">جاهز للبدء؟</p>
              <Link to="/app">
                <button className="hero-gradient text-primary-foreground px-8 py-3 rounded-xl font-medium hover:opacity-90 transition-opacity">
                  ابدأ المحادثة الآن
                </button>
              </Link>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Docs;
