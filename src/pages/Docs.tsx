import { Link } from "react-router-dom";
import { ArrowRight, MessageCircle, Zap, Globe, Paintbrush, RefreshCw, HelpCircle, Sparkles } from "lucide-react";
import Header from "@/components/landing/Header";
import Footer from "@/components/landing/Footer";
import { motion } from "framer-motion";
import SEO from "@/components/SEO";

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
    <div className="min-h-screen bg-background relative overflow-hidden">
      <SEO 
        title="كيف يعمل Chat2Site"
        description="تعرف على كيفية استخدام Chat2Site لبناء موقعك. دليل شامل للبدء السريع والتخصيص والنشر."
      />
      {/* Background gradient */}
      <div className="fixed inset-0 bg-gradient-to-br from-primary/3 via-background to-accent/3 pointer-events-none" />
      
      {/* Floating orbs */}
      <motion.div
        className="fixed top-40 left-10 w-64 h-64 bg-gradient-to-br from-primary/10 to-accent/10 rounded-full blur-3xl pointer-events-none"
        animate={{
          x: [0, 30, 0],
          y: [0, 20, 0],
        }}
        transition={{
          duration: 10,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />
      <motion.div
        className="fixed bottom-40 right-10 w-80 h-80 bg-gradient-to-br from-accent/10 to-primary/10 rounded-full blur-3xl pointer-events-none"
        animate={{
          x: [0, -20, 0],
          y: [0, -30, 0],
        }}
        transition={{
          duration: 12,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />
      
      <Header />
      <main className="pt-24 pb-16 relative z-10">
        <div className="container px-4">
          {/* Back link */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
          >
            <Link
              to="/"
              className="inline-flex items-center gap-2 text-muted-foreground hover:text-primary mb-8 transition-colors group"
            >
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              العودة للرئيسية
            </Link>
          </motion.div>

          <div className="max-w-3xl mx-auto">
            <motion.div 
              className="text-center mb-12"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
            >
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary text-sm font-medium mb-4">
                <Sparkles className="w-4 h-4" />
                دليل الاستخدام
              </div>
              <h1 className="text-4xl font-bold text-foreground mb-4">كيف يعمل Chat2Site</h1>
              <p className="text-xl text-muted-foreground">
                كل ما تحتاج معرفته لبناء موقعك
              </p>
            </motion.div>

            <div className="space-y-6">
              {sections.map((section, index) => (
                <motion.section
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  whileHover={{ y: -2 }}
                  className="group"
                >
                  <div className="backdrop-blur-sm bg-card/80 rounded-2xl border border-border/50 p-8 shadow-lg hover:shadow-xl hover:border-primary/30 transition-all duration-300 relative overflow-hidden">
                    {/* Hover glow */}
                    <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-accent/5 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none" />
                    
                    <div className="flex items-center gap-4 mb-4 relative">
                      <motion.div 
                        className="w-12 h-12 rounded-xl hero-gradient flex items-center justify-center shadow-lg shadow-primary/20 relative"
                        whileHover={{ rotate: 5, scale: 1.05 }}
                      >
                        <div className="absolute inset-0 rounded-xl hero-gradient blur-lg opacity-50" />
                        <section.icon className="w-6 h-6 text-primary-foreground relative z-10" />
                      </motion.div>
                      <h2 className="text-xl font-bold text-foreground group-hover:text-primary transition-colors">{section.title}</h2>
                    </div>
                    <div className="prose prose-gray max-w-none relative">
                      {section.content.split("\n\n").map((paragraph, pIndex) => (
                        <p
                          key={pIndex}
                          className="text-muted-foreground leading-relaxed whitespace-pre-line mb-4 last:mb-0"
                        >
                          {paragraph}
                        </p>
                      ))}
                    </div>
                  </div>
                </motion.section>
              ))}
            </div>

            {/* CTA */}
            <motion.div 
              className="mt-12"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 }}
            >
              <div className="relative rounded-2xl overflow-hidden">
                {/* Background glow */}
                <div className="absolute inset-0 hero-gradient opacity-10" />
                <div className="absolute inset-0 backdrop-blur-xl bg-card/80" />
                
                <div className="relative text-center p-10 border border-border/50 rounded-2xl">
                  <motion.div
                    animate={{ y: [0, -5, 0] }}
                    transition={{ duration: 3, repeat: Infinity }}
                    className="w-16 h-16 mx-auto mb-4 rounded-2xl hero-gradient flex items-center justify-center shadow-lg shadow-primary/30"
                  >
                    <Sparkles className="w-8 h-8 text-primary-foreground" />
                  </motion.div>
                  <p className="text-lg text-foreground mb-6">جاهز للبدء؟</p>
                  <Link to="/app">
                    <motion.button 
                      className="hero-gradient text-primary-foreground px-8 py-3 rounded-xl font-medium shadow-lg shadow-primary/25 hover:shadow-xl hover:shadow-primary/30 transition-all relative overflow-hidden group"
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700" />
                      <span className="relative">ابدأ المحادثة الآن</span>
                    </motion.button>
                  </Link>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Docs;
