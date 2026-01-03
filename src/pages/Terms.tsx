import Header from "@/components/landing/Header";
import Footer from "@/components/landing/Footer";
import { motion } from "framer-motion";
import { FileText, CheckCircle, XCircle, AlertTriangle, Scale, RefreshCw } from "lucide-react";
import { ScrollAnimatedSection } from "@/components/ui/scroll-animated-section";

const Terms = () => {
  const sections = [
    {
      icon: CheckCircle,
      title: "قبول الشروط",
      content: `باستخدام Chat2Site، فإنك توافق على الالتزام بهذه الشروط والأحكام. إذا كنت لا توافق على أي جزء من هذه الشروط، يرجى عدم استخدام خدماتنا.
      
      يحق لنا تعديل هذه الشروط في أي وقت، وسنقوم بإخطارك بأي تغييرات جوهرية عبر البريد الإلكتروني أو إشعار في الموقع.`,
    },
    {
      icon: FileText,
      title: "وصف الخدمة",
      content: `Chat2Site هي منصة لبناء المواقع باستخدام الذكاء الاصطناعي. نوفر لك:
      • أداة محادثة ذكية لإنشاء مواقع ويب
      • استضافة مجانية للمواقع المنشورة
      • قوالب جاهزة للاستخدام
      • أدوات تحرير وتخصيص
      
      نحتفظ بالحق في تعديل أو إيقاف أي ميزة في أي وقت.`,
    },
    {
      icon: AlertTriangle,
      title: "الاستخدام المقبول",
      content: `يجب عليك الالتزام بالآتي عند استخدام Chat2Site:
      • عدم نشر محتوى غير قانوني أو ضار أو مسيء
      • عدم انتهاك حقوق الملكية الفكرية للآخرين
      • عدم محاولة اختراق أو تعطيل الخدمة
      • عدم استخدام الخدمة لأغراض احتيالية
      • الالتزام بقوانين بلدك المحلية`,
    },
    {
      icon: XCircle,
      title: "المحتوى المحظور",
      content: `يُمنع نشر المحتوى التالي على Chat2Site:
      • المواد الإباحية أو المحتوى الموجه للبالغين
      • خطاب الكراهية أو التحريض على العنف
      • البرامج الضارة أو الفيروسات
      • المحتوى المنتحل أو المسروق
      • الإعلانات المضللة أو الاحتيالية
      
      نحتفظ بالحق في إزالة أي محتوى ينتهك هذه الشروط.`,
    },
    {
      icon: Scale,
      title: "الملكية الفكرية",
      content: `• المحتوى الذي تنشئه: أنت تحتفظ بملكية المحتوى الذي تنشئه باستخدام Chat2Site
      • علامتنا التجارية: Chat2Site وشعارها هي علامات تجارية مسجلة لنا
      • الترخيص: نمنحك ترخيصًا محدودًا لاستخدام الخدمة
      • القوالب: قوالبنا مرخصة للاستخدام ضمن المنصة فقط`,
    },
    {
      icon: RefreshCw,
      title: "الإلغاء والإنهاء",
      content: `• يمكنك إلغاء حسابك في أي وقت من إعدادات الحساب
      • نحتفظ بالحق في إنهاء أو تعليق حسابك في حالة انتهاك الشروط
      • عند الإلغاء، ستفقد الوصول إلى مشاريعك ومواقعك المنشورة
      • بعض البيانات قد يتم الاحتفاظ بها لأغراض قانونية أو أمنية`,
    },
  ];

  return (
    <div className="min-h-screen bg-background">
      {/* Gradient background */}
      <div className="fixed inset-0 -z-10">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-background to-accent/5" />
        <motion.div
          className="absolute bottom-1/4 left-1/4 w-96 h-96 bg-accent/10 rounded-full blur-3xl"
          animate={{ opacity: [0.3, 0.5, 0.3], scale: [1, 1.1, 1] }}
          transition={{ duration: 8, repeat: Infinity }}
        />
      </div>

      <Header />

      <main className="pt-24 pb-16">
        <div className="container max-w-4xl">
          <ScrollAnimatedSection animation="fadeUp">
            <div className="text-center mb-12">
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                className="w-20 h-20 rounded-2xl hero-gradient mx-auto mb-6 flex items-center justify-center shadow-glow"
              >
                <FileText className="w-10 h-10 text-primary-foreground" />
              </motion.div>
              <h1 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-l from-primary via-accent to-primary bg-clip-text text-transparent">
                شروط الاستخدام
              </h1>
              <p className="text-muted-foreground text-lg">
                يرجى قراءة هذه الشروط بعناية قبل استخدام Chat2Site
              </p>
              <p className="text-sm text-muted-foreground mt-2">
                آخر تحديث: {new Date().toLocaleDateString('ar-SA')}
              </p>
            </div>
          </ScrollAnimatedSection>

          <div className="space-y-6">
            {sections.map((section, index) => (
              <ScrollAnimatedSection key={index} animation="fadeUp" delay={index * 0.1}>
                <motion.div
                  whileHover={{ scale: 1.01 }}
                  className="p-6 rounded-2xl bg-card/80 backdrop-blur-sm border border-primary/10 shadow-soft"
                >
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center flex-shrink-0">
                      <section.icon className="w-6 h-6 text-primary" />
                    </div>
                    <div className="flex-1">
                      <h2 className="text-xl font-bold text-foreground mb-3">
                        {section.title}
                      </h2>
                      <p className="text-muted-foreground whitespace-pre-line leading-relaxed">
                        {section.content}
                      </p>
                    </div>
                  </div>
                </motion.div>
              </ScrollAnimatedSection>
            ))}
          </div>

          {/* Disclaimer */}
          <ScrollAnimatedSection animation="fadeUp" delay={0.6}>
            <div className="mt-12 p-6 rounded-2xl bg-muted/50 border border-border text-center">
              <p className="text-sm text-muted-foreground">
                باستخدام Chat2Site، فإنك تقر بأنك قرأت وفهمت هذه الشروط وتوافق على الالتزام بها.
                <br />
                إذا كانت لديك أي أسئلة، يرجى التواصل معنا عبر{" "}
                <a href="mailto:support@chat2site.app" className="text-primary hover:underline">
                  support@chat2site.app
                </a>
              </p>
            </div>
          </ScrollAnimatedSection>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Terms;
