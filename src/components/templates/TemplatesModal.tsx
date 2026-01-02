import { motion, AnimatePresence } from "framer-motion";
import { X, Globe, Store, Briefcase, GraduationCap, Utensils, Camera } from "lucide-react";
import { Button } from "@/components/ui/button";

export interface Template {
  id: string;
  name: string;
  description: string;
  icon: React.ReactNode;
  prompt: string;
  preview: string;
}

export const templates: Template[] = [
  {
    id: "business",
    name: "موقع شركة",
    description: "موقع احترافي لشركة أو مؤسسة",
    icon: <Briefcase className="w-6 h-6" />,
    prompt: "أريد موقع لشركة احترافية يتضمن صفحة رئيسية مع قسم عن الشركة، الخدمات، فريق العمل، وتواصل معنا",
    preview: `<!DOCTYPE html><html lang="ar" dir="rtl"><head><meta charset="UTF-8"><meta name="viewport" content="width=device-width, initial-scale=1.0"><title>شركة النخبة</title><link href="https://fonts.googleapis.com/css2?family=Tajawal:wght@400;500;700&display=swap" rel="stylesheet"><style>*{margin:0;padding:0;box-sizing:border-box}body{font-family:'Tajawal',sans-serif;background:#fff}.hero{background:linear-gradient(135deg,#1a365d 0%,#2563eb 100%);color:#fff;padding:100px 20px;text-align:center}.hero h1{font-size:3rem;margin-bottom:1rem}.hero p{font-size:1.2rem;opacity:0.9}.services{padding:80px 20px;max-width:1200px;margin:0 auto}.services h2{text-align:center;font-size:2rem;margin-bottom:3rem;color:#1a365d}.grid{display:grid;grid-template-columns:repeat(auto-fit,minmax(300px,1fr));gap:2rem}.card{background:#f8fafc;border-radius:16px;padding:2rem;text-align:center;transition:transform 0.3s}.card:hover{transform:translateY(-5px)}.card h3{color:#1a365d;margin:1rem 0}.cta{background:#f1f5f9;padding:60px 20px;text-align:center}.cta h2{color:#1a365d;margin-bottom:1rem}.btn{background:#2563eb;color:#fff;padding:12px 32px;border:none;border-radius:8px;font-size:1rem;cursor:pointer}</style></head><body><section class="hero"><h1>شركة النخبة للحلول التقنية</h1><p>نبني المستقبل الرقمي لأعمالك</p></section><section class="services"><h2>خدماتنا</h2><div class="grid"><div class="card"><h3>تطوير المواقع</h3><p>نصمم ونطور مواقع عصرية تلبي احتياجاتك</p></div><div class="card"><h3>التسويق الرقمي</h3><p>استراتيجيات تسويقية فعالة لنمو أعمالك</p></div><div class="card"><h3>الاستشارات التقنية</h3><p>حلول تقنية مبتكرة لتحدياتك</p></div></div></section><section class="cta"><h2>ابدأ مشروعك معنا اليوم</h2><button class="btn">تواصل معنا</button></section></body></html>`,
  },
  {
    id: "store",
    name: "متجر إلكتروني",
    description: "صفحة هبوط لمتجر أو منتج",
    icon: <Store className="w-6 h-6" />,
    prompt: "أريد صفحة هبوط لمتجر إلكتروني مع عرض المنتجات وقسم العروض والمميزات",
    preview: `<!DOCTYPE html><html lang="ar" dir="rtl"><head><meta charset="UTF-8"><meta name="viewport" content="width=device-width, initial-scale=1.0"><title>متجر الأناقة</title><link href="https://fonts.googleapis.com/css2?family=Tajawal:wght@400;500;700&display=swap" rel="stylesheet"><style>*{margin:0;padding:0;box-sizing:border-box}body{font-family:'Tajawal',sans-serif}.hero{background:linear-gradient(135deg,#7c3aed 0%,#ec4899 100%);color:#fff;padding:100px 20px;text-align:center}.hero h1{font-size:3rem;margin-bottom:1rem}.badge{background:rgba(255,255,255,0.2);padding:8px 20px;border-radius:20px;display:inline-block;margin-bottom:1rem}.products{padding:80px 20px;max-width:1200px;margin:0 auto}.products h2{text-align:center;font-size:2rem;margin-bottom:3rem}.grid{display:grid;grid-template-columns:repeat(auto-fit,minmax(280px,1fr));gap:2rem}.product{background:#fff;border-radius:16px;overflow:hidden;box-shadow:0 4px 20px rgba(0,0,0,0.1)}.product-img{height:200px;background:#f3e8ff;display:flex;align-items:center;justify-content:center;font-size:4rem}.product-info{padding:1.5rem}.product-info h3{margin-bottom:0.5rem}.price{color:#7c3aed;font-size:1.25rem;font-weight:700}.btn{background:#7c3aed;color:#fff;padding:10px 24px;border:none;border-radius:8px;width:100%;margin-top:1rem;cursor:pointer}</style></head><body><section class="hero"><span class="badge">🎉 خصم 30% على جميع المنتجات</span><h1>متجر الأناقة</h1><p>اكتشف أحدث صيحات الموضة</p></section><section class="products"><h2>منتجاتنا المميزة</h2><div class="grid"><div class="product"><div class="product-img">👗</div><div class="product-info"><h3>فستان سهرة</h3><p class="price">299 ر.س</p><button class="btn">أضف للسلة</button></div></div><div class="product"><div class="product-img">👜</div><div class="product-info"><h3>حقيبة فاخرة</h3><p class="price">199 ر.س</p><button class="btn">أضف للسلة</button></div></div><div class="product"><div class="product-img">👠</div><div class="product-info"><h3>حذاء أنيق</h3><p class="price">249 ر.س</p><button class="btn">أضف للسلة</button></div></div></div></section></body></html>`,
  },
  {
    id: "portfolio",
    name: "معرض أعمال",
    description: "موقع شخصي لعرض الأعمال والمشاريع",
    icon: <Camera className="w-6 h-6" />,
    prompt: "أريد موقع معرض أعمال شخصي يعرض مشاريعي وخبراتي مع قسم تواصل",
    preview: `<!DOCTYPE html><html lang="ar" dir="rtl"><head><meta charset="UTF-8"><meta name="viewport" content="width=device-width, initial-scale=1.0"><title>معرض أعمالي</title><link href="https://fonts.googleapis.com/css2?family=Tajawal:wght@400;500;700&display=swap" rel="stylesheet"><style>*{margin:0;padding:0;box-sizing:border-box}body{font-family:'Tajawal',sans-serif;background:#0f172a;color:#fff}.hero{padding:100px 20px;text-align:center;background:linear-gradient(180deg,#1e293b 0%,#0f172a 100%)}.hero h1{font-size:3rem;margin-bottom:1rem;background:linear-gradient(135deg,#60a5fa,#a78bfa);-webkit-background-clip:text;-webkit-text-fill-color:transparent}.hero p{color:#94a3b8;font-size:1.2rem}.works{padding:80px 20px;max-width:1200px;margin:0 auto}.works h2{text-align:center;font-size:2rem;margin-bottom:3rem}.grid{display:grid;grid-template-columns:repeat(auto-fit,minmax(300px,1fr));gap:2rem}.work{background:#1e293b;border-radius:16px;overflow:hidden;transition:transform 0.3s}.work:hover{transform:scale(1.02)}.work-img{height:200px;background:linear-gradient(135deg,#3b82f6,#8b5cf6);display:flex;align-items:center;justify-content:center;font-size:3rem}.work-info{padding:1.5rem}.work-info h3{margin-bottom:0.5rem}.work-info p{color:#94a3b8}</style></head><body><section class="hero"><h1>أحمد المصمم</h1><p>مصمم UI/UX ومطور واجهات أمامية</p></section><section class="works"><h2>أعمالي</h2><div class="grid"><div class="work"><div class="work-img">🎨</div><div class="work-info"><h3>تطبيق توصيل</h3><p>تصميم واجهة مستخدم كاملة</p></div></div><div class="work"><div class="work-img">🖥️</div><div class="work-info"><h3>منصة تعليمية</h3><p>تطوير موقع تفاعلي</p></div></div><div class="work"><div class="work-img">📱</div><div class="work-info"><h3>تطبيق صحي</h3><p>تصميم وتطوير كامل</p></div></div></div></section></body></html>`,
  },
  {
    id: "restaurant",
    name: "مطعم",
    description: "موقع لمطعم أو مقهى",
    icon: <Utensils className="w-6 h-6" />,
    prompt: "أريد موقع لمطعم يعرض القائمة والأطباق المميزة مع معلومات الحجز والتواصل",
    preview: `<!DOCTYPE html><html lang="ar" dir="rtl"><head><meta charset="UTF-8"><meta name="viewport" content="width=device-width, initial-scale=1.0"><title>مطعم الذواقة</title><link href="https://fonts.googleapis.com/css2?family=Tajawal:wght@400;500;700&display=swap" rel="stylesheet"><style>*{margin:0;padding:0;box-sizing:border-box}body{font-family:'Tajawal',sans-serif}.hero{background:linear-gradient(135deg,#92400e 0%,#dc2626 100%);color:#fff;padding:120px 20px;text-align:center}.hero h1{font-size:3.5rem;margin-bottom:1rem}.hero p{font-size:1.2rem;opacity:0.9}.menu{padding:80px 20px;max-width:1200px;margin:0 auto}.menu h2{text-align:center;font-size:2rem;margin-bottom:3rem;color:#92400e}.grid{display:grid;grid-template-columns:repeat(auto-fit,minmax(280px,1fr));gap:2rem}.dish{background:#fff;border-radius:16px;overflow:hidden;box-shadow:0 4px 20px rgba(0,0,0,0.1)}.dish-img{height:180px;background:#fef3c7;display:flex;align-items:center;justify-content:center;font-size:4rem}.dish-info{padding:1.5rem}.dish-info h3{color:#92400e;margin-bottom:0.5rem}.price{color:#dc2626;font-size:1.25rem;font-weight:700}.reservation{background:#fef3c7;padding:60px 20px;text-align:center}.reservation h2{color:#92400e;margin-bottom:1rem}.btn{background:#dc2626;color:#fff;padding:14px 40px;border:none;border-radius:8px;font-size:1.1rem;cursor:pointer}</style></head><body><section class="hero"><h1>🍽️ مطعم الذواقة</h1><p>تجربة طعام استثنائية</p></section><section class="menu"><h2>أطباقنا المميزة</h2><div class="grid"><div class="dish"><div class="dish-img">🥩</div><div class="dish-info"><h3>ستيك مشوي</h3><p class="price">89 ر.س</p></div></div><div class="dish"><div class="dish-img">🍝</div><div class="dish-info"><h3>باستا إيطالية</h3><p class="price">59 ر.س</p></div></div><div class="dish"><div class="dish-img">🍰</div><div class="dish-info"><h3>تشيز كيك</h3><p class="price">35 ر.س</p></div></div></div></section><section class="reservation"><h2>احجز طاولتك الآن</h2><button class="btn">احجز الآن</button></section></body></html>`,
  },
  {
    id: "education",
    name: "تعليمي",
    description: "موقع لدورة أو منصة تعليمية",
    icon: <GraduationCap className="w-6 h-6" />,
    prompt: "أريد موقع لدورة تعليمية أونلاين يعرض محتوى الدورة والمميزات والتسجيل",
    preview: `<!DOCTYPE html><html lang="ar" dir="rtl"><head><meta charset="UTF-8"><meta name="viewport" content="width=device-width, initial-scale=1.0"><title>أكاديمية المستقبل</title><link href="https://fonts.googleapis.com/css2?family=Tajawal:wght@400;500;700&display=swap" rel="stylesheet"><style>*{margin:0;padding:0;box-sizing:border-box}body{font-family:'Tajawal',sans-serif}.hero{background:linear-gradient(135deg,#059669 0%,#0891b2 100%);color:#fff;padding:100px 20px;text-align:center}.hero h1{font-size:3rem;margin-bottom:1rem}.hero p{font-size:1.2rem;opacity:0.9}.features{padding:80px 20px;max-width:1200px;margin:0 auto}.features h2{text-align:center;font-size:2rem;margin-bottom:3rem;color:#059669}.grid{display:grid;grid-template-columns:repeat(auto-fit,minmax(280px,1fr));gap:2rem}.feature{background:#f0fdf4;border-radius:16px;padding:2rem;text-align:center}.feature-icon{font-size:3rem;margin-bottom:1rem}.feature h3{color:#059669;margin-bottom:0.5rem}.cta{background:#ecfdf5;padding:60px 20px;text-align:center}.cta h2{color:#059669;margin-bottom:0.5rem}.cta p{color:#6b7280;margin-bottom:1.5rem}.btn{background:#059669;color:#fff;padding:14px 40px;border:none;border-radius:8px;font-size:1.1rem;cursor:pointer}</style></head><body><section class="hero"><h1>🎓 أكاديمية المستقبل</h1><p>تعلّم البرمجة من الصفر حتى الاحتراف</p></section><section class="features"><h2>لماذا نحن؟</h2><div class="grid"><div class="feature"><div class="feature-icon">📚</div><h3>+50 درس</h3><p>محتوى شامل ومحدث</p></div><div class="feature"><div class="feature-icon">👨‍🏫</div><h3>مدربون خبراء</h3><p>تعلّم من المحترفين</p></div><div class="feature"><div class="feature-icon">📜</div><h3>شهادة معتمدة</h3><p>شهادة إتمام الدورة</p></div></div></section><section class="cta"><h2>ابدأ رحلتك التعليمية</h2><p>سجّل الآن واحصل على خصم 40%</p><button class="btn">سجّل الآن</button></section></body></html>`,
  },
  {
    id: "landing",
    name: "صفحة هبوط",
    description: "صفحة هبوط بسيطة لمنتج أو خدمة",
    icon: <Globe className="w-6 h-6" />,
    prompt: "أريد صفحة هبوط بسيطة وأنيقة لمنتج تقني مع قسم المميزات والتسعير",
    preview: `<!DOCTYPE html><html lang="ar" dir="rtl"><head><meta charset="UTF-8"><meta name="viewport" content="width=device-width, initial-scale=1.0"><title>منتجنا</title><link href="https://fonts.googleapis.com/css2?family=Tajawal:wght@400;500;700&display=swap" rel="stylesheet"><style>*{margin:0;padding:0;box-sizing:border-box}body{font-family:'Tajawal',sans-serif}.hero{background:linear-gradient(135deg,#4f46e5 0%,#7c3aed 100%);color:#fff;padding:120px 20px;text-align:center}.hero h1{font-size:3.5rem;margin-bottom:1rem}.hero p{font-size:1.3rem;opacity:0.9;margin-bottom:2rem}.btn-white{background:#fff;color:#4f46e5;padding:14px 40px;border:none;border-radius:8px;font-size:1.1rem;cursor:pointer;font-weight:700}.features{padding:80px 20px;max-width:1200px;margin:0 auto;text-align:center}.features h2{font-size:2rem;margin-bottom:3rem;color:#1f2937}.grid{display:grid;grid-template-columns:repeat(3,1fr);gap:2rem}@media(max-width:768px){.grid{grid-template-columns:1fr}}.feature{padding:2rem}.feature-icon{width:60px;height:60px;background:linear-gradient(135deg,#4f46e5,#7c3aed);border-radius:16px;display:flex;align-items:center;justify-content:center;margin:0 auto 1rem;font-size:1.5rem;color:#fff}.feature h3{margin-bottom:0.5rem;color:#1f2937}.feature p{color:#6b7280}.cta{background:#f5f3ff;padding:60px 20px;text-align:center}.cta h2{color:#4f46e5;margin-bottom:1rem}.btn-primary{background:#4f46e5;color:#fff;padding:14px 40px;border:none;border-radius:8px;font-size:1.1rem;cursor:pointer}</style></head><body><section class="hero"><h1>أداة ثورية لإنجاز أعمالك</h1><p>وفّر وقتك وضاعف إنتاجيتك</p><button class="btn-white">ابدأ مجانًا</button></section><section class="features"><h2>المميزات</h2><div class="grid"><div class="feature"><div class="feature-icon">⚡</div><h3>سريع</h3><p>أداء فائق السرعة</p></div><div class="feature"><div class="feature-icon">🔒</div><h3>آمن</h3><p>حماية متقدمة لبياناتك</p></div><div class="feature"><div class="feature-icon">🎯</div><h3>سهل</h3><p>واجهة بسيطة وسهلة</p></div></div></section><section class="cta"><h2>جاهز للبدء؟</h2><button class="btn-primary">جرّب الآن مجانًا</button></section></body></html>`,
  },
];

interface TemplatesModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectTemplate: (template: Template) => void;
}

const TemplatesModal = ({ isOpen, onClose, onSelectTemplate }: TemplatesModalProps) => {
  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4"
          onClick={onClose}
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            className="bg-card rounded-2xl border border-border shadow-elevated max-w-4xl w-full max-h-[80vh] overflow-hidden"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header */}
            <div className="flex items-center justify-between p-6 border-b border-border">
              <div>
                <h2 className="text-xl font-bold text-foreground">اختر قالبًا</h2>
                <p className="text-muted-foreground text-sm mt-1">
                  ابدأ بقالب جاهز وخصّصه حسب احتياجاتك
                </p>
              </div>
              <button
                onClick={onClose}
                className="p-2 hover:bg-muted rounded-lg transition-colors"
              >
                <X className="w-5 h-5 text-muted-foreground" />
              </button>
            </div>

            {/* Templates grid */}
            <div className="p-6 overflow-y-auto max-h-[calc(80vh-100px)]">
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
                {templates.map((template) => (
                  <motion.button
                    key={template.id}
                    onClick={() => onSelectTemplate(template)}
                    className="text-right bg-background rounded-xl border border-border p-4 hover:border-primary hover:shadow-card transition-all group"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mb-3 group-hover:bg-primary/20 transition-colors text-primary">
                      {template.icon}
                    </div>
                    <h3 className="font-bold text-foreground mb-1">{template.name}</h3>
                    <p className="text-sm text-muted-foreground">{template.description}</p>
                  </motion.button>
                ))}
              </div>

              {/* Start from scratch option */}
              <div className="mt-6 pt-6 border-t border-border">
                <Button
                  variant="outline"
                  className="w-full"
                  onClick={onClose}
                >
                  ابدأ من الصفر بدون قالب
                </Button>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default TemplatesModal;
