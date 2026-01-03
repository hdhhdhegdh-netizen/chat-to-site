import Header from "@/components/landing/Header";
import Footer from "@/components/landing/Footer";
import { motion } from "framer-motion";
import { Shield, Lock, Eye, Database, UserCheck, Mail } from "lucide-react";
import { ScrollAnimatedSection } from "@/components/ui/scroll-animated-section";

const Privacy = () => {
  const sections = [
    {
      icon: Database,
      title: "البيانات التي نجمعها",
      content: `نجمع المعلومات التالية عند استخدامك لـ Chat2Site:
      • معلومات الحساب: البريد الإلكتروني، الاسم (اختياري)
      • بيانات المشاريع: المواقع التي تنشئها ومحتواها
      • بيانات الاستخدام: كيفية تفاعلك مع المنصة
      • معلومات تقنية: نوع المتصفح، عنوان IP، معلومات الجهاز`,
    },
    {
      icon: Lock,
      title: "كيف نحمي بياناتك",
      content: `نستخدم أحدث معايير الأمان لحماية بياناتك:
      • تشفير SSL/TLS لجميع الاتصالات
      • تخزين آمن مع تشفير البيانات
      • عدم مشاركة بياناتك مع أطراف ثالثة
      • نسخ احتياطية منتظمة للبيانات`,
    },
    {
      icon: Eye,
      title: "كيف نستخدم بياناتك",
      content: `نستخدم بياناتك للأغراض التالية:
      • تشغيل وتحسين خدمات Chat2Site
      • إرسال إشعارات مهمة عن حسابك
      • تحليل الاستخدام لتحسين تجربة المستخدم
      • الرد على استفساراتك ودعمك`,
    },
    {
      icon: UserCheck,
      title: "حقوقك",
      content: `لديك الحقوق التالية فيما يتعلق ببياناتك:
      • الوصول إلى بياناتك الشخصية
      • تصحيح أو تحديث معلوماتك
      • حذف حسابك وبياناتك بالكامل
      • تصدير بياناتك بتنسيق قابل للقراءة`,
    },
    {
      icon: Shield,
      title: "ملفات تعريف الارتباط (Cookies)",
      content: `نستخدم ملفات تعريف الارتباط للأغراض التالية:
      • الحفاظ على جلسة تسجيل الدخول
      • تذكر تفضيلاتك (مثل الوضع الداكن)
      • تحليل استخدام الموقع لتحسين الأداء
      يمكنك تعطيل الكوكيز من إعدادات متصفحك.`,
    },
    {
      icon: Mail,
      title: "التواصل معنا",
      content: `إذا كانت لديك أي أسئلة حول سياسة الخصوصية هذه أو ممارسات البيانات لدينا، يرجى التواصل معنا عبر:
      • البريد الإلكتروني: privacy@chat2site.app
      • صفحة المساعدة في الموقع
      سنرد على استفساراتك في أقرب وقت ممكن.`,
    },
  ];

  return (
    <div className="min-h-screen bg-background">
      {/* Gradient background */}
      <div className="fixed inset-0 -z-10">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-background to-accent/5" />
        <motion.div
          className="absolute top-1/4 right-1/4 w-96 h-96 bg-primary/10 rounded-full blur-3xl"
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
                <Shield className="w-10 h-10 text-primary-foreground" />
              </motion.div>
              <h1 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-l from-primary via-accent to-primary bg-clip-text text-transparent">
                سياسة الخصوصية
              </h1>
              <p className="text-muted-foreground text-lg">
                نحن ملتزمون بحماية خصوصيتك وبياناتك الشخصية
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
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Privacy;
