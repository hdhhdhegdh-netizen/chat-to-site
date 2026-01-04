import { motion, AnimatePresence } from "framer-motion";
import { X, Globe, Store, Briefcase, GraduationCap, Utensils, Camera, Stethoscope, Scale, Building, Scissors, Dumbbell, Wrench } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { TEMPLATE_CATEGORIES } from "@/lib/constants";

export interface Template {
  id: string;
  name: string;
  description: string;
  icon: React.ReactNode;
  prompt: string;
  preview: string;
  category: keyof typeof TEMPLATE_CATEGORIES;
}

export const templates: Template[] = [
  {
    id: "business",
    name: "موقع شركة",
    description: "موقع احترافي لشركة أو مؤسسة",
    icon: <Briefcase className="w-6 h-6" />,
    category: "business",
    prompt: "أريد موقع لشركة احترافية يتضمن صفحة رئيسية مع قسم عن الشركة، الخدمات، فريق العمل، وتواصل معنا",
    preview: `<!DOCTYPE html><html lang="ar" dir="rtl"><head><meta charset="UTF-8"><meta name="viewport" content="width=device-width, initial-scale=1.0"><title>شركة النخبة</title><link href="https://fonts.googleapis.com/css2?family=Tajawal:wght@400;500;700&display=swap" rel="stylesheet"><style>*{margin:0;padding:0;box-sizing:border-box}body{font-family:'Tajawal',sans-serif;background:#fff}.hero{background:linear-gradient(135deg,#1a365d 0%,#2563eb 100%);color:#fff;padding:100px 20px;text-align:center}.hero h1{font-size:3rem;margin-bottom:1rem}.hero p{font-size:1.2rem;opacity:0.9}.services{padding:80px 20px;max-width:1200px;margin:0 auto}.services h2{text-align:center;font-size:2rem;margin-bottom:3rem;color:#1a365d}.grid{display:grid;grid-template-columns:repeat(auto-fit,minmax(300px,1fr));gap:2rem}.card{background:#f8fafc;border-radius:16px;padding:2rem;text-align:center;transition:transform 0.3s}.card:hover{transform:translateY(-5px)}.card h3{color:#1a365d;margin:1rem 0}.cta{background:#f1f5f9;padding:60px 20px;text-align:center}.cta h2{color:#1a365d;margin-bottom:1rem}.btn{background:#2563eb;color:#fff;padding:12px 32px;border:none;border-radius:8px;font-size:1rem;cursor:pointer}</style></head><body><section class="hero"><h1>شركة النخبة للحلول التقنية</h1><p>نبني المستقبل الرقمي لأعمالك</p></section><section class="services"><h2>خدماتنا</h2><div class="grid"><div class="card"><h3>تطوير المواقع</h3><p>نصمم ونطور مواقع عصرية تلبي احتياجاتك</p></div><div class="card"><h3>التسويق الرقمي</h3><p>استراتيجيات تسويقية فعالة لنمو أعمالك</p></div><div class="card"><h3>الاستشارات التقنية</h3><p>حلول تقنية مبتكرة لتحدياتك</p></div></div></section><section class="cta"><h2>ابدأ مشروعك معنا اليوم</h2><button class="btn">تواصل معنا</button></section></body></html>`,
  },
  {
    id: "store",
    name: "متجر إلكتروني",
    description: "صفحة هبوط لمتجر أو منتج",
    icon: <Store className="w-6 h-6" />,
    category: "ecommerce",
    prompt: "أريد صفحة هبوط لمتجر إلكتروني مع عرض المنتجات وقسم العروض والمميزات",
    preview: `<!DOCTYPE html><html lang="ar" dir="rtl"><head><meta charset="UTF-8"><meta name="viewport" content="width=device-width, initial-scale=1.0"><title>متجر الأناقة</title><link href="https://fonts.googleapis.com/css2?family=Tajawal:wght@400;500;700&display=swap" rel="stylesheet"><style>*{margin:0;padding:0;box-sizing:border-box}body{font-family:'Tajawal',sans-serif}.hero{background:linear-gradient(135deg,#7c3aed 0%,#ec4899 100%);color:#fff;padding:100px 20px;text-align:center}.hero h1{font-size:3rem;margin-bottom:1rem}.badge{background:rgba(255,255,255,0.2);padding:8px 20px;border-radius:20px;display:inline-block;margin-bottom:1rem}.products{padding:80px 20px;max-width:1200px;margin:0 auto}.products h2{text-align:center;font-size:2rem;margin-bottom:3rem}.grid{display:grid;grid-template-columns:repeat(auto-fit,minmax(280px,1fr));gap:2rem}.product{background:#fff;border-radius:16px;overflow:hidden;box-shadow:0 4px 20px rgba(0,0,0,0.1)}.product-img{height:200px;background:#f3e8ff;display:flex;align-items:center;justify-content:center;font-size:4rem}.product-info{padding:1.5rem}.product-info h3{margin-bottom:0.5rem}.price{color:#7c3aed;font-size:1.25rem;font-weight:700}.btn{background:#7c3aed;color:#fff;padding:10px 24px;border:none;border-radius:8px;width:100%;margin-top:1rem;cursor:pointer}</style></head><body><section class="hero"><span class="badge">🎉 خصم 30% على جميع المنتجات</span><h1>متجر الأناقة</h1><p>اكتشف أحدث صيحات الموضة</p></section><section class="products"><h2>منتجاتنا المميزة</h2><div class="grid"><div class="product"><div class="product-img">👗</div><div class="product-info"><h3>فستان سهرة</h3><p class="price">299 ر.س</p><button class="btn">أضف للسلة</button></div></div><div class="product"><div class="product-img">👜</div><div class="product-info"><h3>حقيبة فاخرة</h3><p class="price">199 ر.س</p><button class="btn">أضف للسلة</button></div></div><div class="product"><div class="product-img">👠</div><div class="product-info"><h3>حذاء أنيق</h3><p class="price">249 ر.س</p><button class="btn">أضف للسلة</button></div></div></div></section></body></html>`,
  },
  {
    id: "portfolio",
    name: "معرض أعمال",
    description: "موقع شخصي لعرض الأعمال والمشاريع",
    icon: <Camera className="w-6 h-6" />,
    category: "creative",
    prompt: "أريد موقع معرض أعمال شخصي يعرض مشاريعي وخبراتي مع قسم تواصل",
    preview: `<!DOCTYPE html><html lang="ar" dir="rtl"><head><meta charset="UTF-8"><meta name="viewport" content="width=device-width, initial-scale=1.0"><title>معرض أعمالي</title><link href="https://fonts.googleapis.com/css2?family=Tajawal:wght@400;500;700&display=swap" rel="stylesheet"><style>*{margin:0;padding:0;box-sizing:border-box}body{font-family:'Tajawal',sans-serif;background:#0f172a;color:#fff}.hero{padding:100px 20px;text-align:center;background:linear-gradient(180deg,#1e293b 0%,#0f172a 100%)}.hero h1{font-size:3rem;margin-bottom:1rem;background:linear-gradient(135deg,#60a5fa,#a78bfa);-webkit-background-clip:text;-webkit-text-fill-color:transparent}.hero p{color:#94a3b8;font-size:1.2rem}.works{padding:80px 20px;max-width:1200px;margin:0 auto}.works h2{text-align:center;font-size:2rem;margin-bottom:3rem}.grid{display:grid;grid-template-columns:repeat(auto-fit,minmax(300px,1fr));gap:2rem}.work{background:#1e293b;border-radius:16px;overflow:hidden;transition:transform 0.3s}.work:hover{transform:scale(1.02)}.work-img{height:200px;background:linear-gradient(135deg,#3b82f6,#8b5cf6);display:flex;align-items:center;justify-content:center;font-size:3rem}.work-info{padding:1.5rem}.work-info h3{margin-bottom:0.5rem}.work-info p{color:#94a3b8}</style></head><body><section class="hero"><h1>أحمد المصمم</h1><p>مصمم UI/UX ومطور واجهات أمامية</p></section><section class="works"><h2>أعمالي</h2><div class="grid"><div class="work"><div class="work-img">🎨</div><div class="work-info"><h3>تطبيق توصيل</h3><p>تصميم واجهة مستخدم كاملة</p></div></div><div class="work"><div class="work-img">🖥️</div><div class="work-info"><h3>منصة تعليمية</h3><p>تطوير موقع تفاعلي</p></div></div><div class="work"><div class="work-img">📱</div><div class="work-info"><h3>تطبيق صحي</h3><p>تصميم وتطوير كامل</p></div></div></div></section></body></html>`,
  },
  {
    id: "restaurant",
    name: "مطعم",
    description: "موقع لمطعم أو مقهى",
    icon: <Utensils className="w-6 h-6" />,
    category: "services",
    prompt: "أريد موقع لمطعم يعرض القائمة والأطباق المميزة مع معلومات الحجز والتواصل",
    preview: `<!DOCTYPE html><html lang="ar" dir="rtl"><head><meta charset="UTF-8"><meta name="viewport" content="width=device-width, initial-scale=1.0"><title>مطعم الذواقة</title><link href="https://fonts.googleapis.com/css2?family=Tajawal:wght@400;500;700&display=swap" rel="stylesheet"><style>*{margin:0;padding:0;box-sizing:border-box}body{font-family:'Tajawal',sans-serif}.hero{background:linear-gradient(135deg,#92400e 0%,#dc2626 100%);color:#fff;padding:120px 20px;text-align:center}.hero h1{font-size:3.5rem;margin-bottom:1rem}.hero p{font-size:1.2rem;opacity:0.9}.menu{padding:80px 20px;max-width:1200px;margin:0 auto}.menu h2{text-align:center;font-size:2rem;margin-bottom:3rem;color:#92400e}.grid{display:grid;grid-template-columns:repeat(auto-fit,minmax(280px,1fr));gap:2rem}.dish{background:#fff;border-radius:16px;overflow:hidden;box-shadow:0 4px 20px rgba(0,0,0,0.1)}.dish-img{height:180px;background:#fef3c7;display:flex;align-items:center;justify-content:center;font-size:4rem}.dish-info{padding:1.5rem}.dish-info h3{color:#92400e;margin-bottom:0.5rem}.price{color:#dc2626;font-size:1.25rem;font-weight:700}.reservation{background:#fef3c7;padding:60px 20px;text-align:center}.reservation h2{color:#92400e;margin-bottom:1rem}.btn{background:#dc2626;color:#fff;padding:14px 40px;border:none;border-radius:8px;font-size:1.1rem;cursor:pointer}</style></head><body><section class="hero"><h1>🍽️ مطعم الذواقة</h1><p>تجربة طعام استثنائية</p></section><section class="menu"><h2>أطباقنا المميزة</h2><div class="grid"><div class="dish"><div class="dish-img">🥩</div><div class="dish-info"><h3>ستيك مشوي</h3><p class="price">89 ر.س</p></div></div><div class="dish"><div class="dish-img">🍝</div><div class="dish-info"><h3>باستا إيطالية</h3><p class="price">59 ر.س</p></div></div><div class="dish"><div class="dish-img">🍰</div><div class="dish-info"><h3>تشيز كيك</h3><p class="price">35 ر.س</p></div></div></div></section><section class="reservation"><h2>احجز طاولتك الآن</h2><button class="btn">احجز الآن</button></section></body></html>`,
  },
  {
    id: "education",
    name: "تعليمي",
    description: "موقع لدورة أو منصة تعليمية",
    icon: <GraduationCap className="w-6 h-6" />,
    category: "education",
    prompt: "أريد موقع لدورة تعليمية أونلاين يعرض محتوى الدورة والمميزات والتسجيل",
    preview: `<!DOCTYPE html><html lang="ar" dir="rtl"><head><meta charset="UTF-8"><meta name="viewport" content="width=device-width, initial-scale=1.0"><title>أكاديمية المستقبل</title><link href="https://fonts.googleapis.com/css2?family=Tajawal:wght@400;500;700&display=swap" rel="stylesheet"><style>*{margin:0;padding:0;box-sizing:border-box}body{font-family:'Tajawal',sans-serif}.hero{background:linear-gradient(135deg,#059669 0%,#0891b2 100%);color:#fff;padding:100px 20px;text-align:center}.hero h1{font-size:3rem;margin-bottom:1rem}.hero p{font-size:1.2rem;opacity:0.9}.features{padding:80px 20px;max-width:1200px;margin:0 auto}.features h2{text-align:center;font-size:2rem;margin-bottom:3rem;color:#059669}.grid{display:grid;grid-template-columns:repeat(auto-fit,minmax(280px,1fr));gap:2rem}.feature{background:#f0fdf4;border-radius:16px;padding:2rem;text-align:center}.feature-icon{font-size:3rem;margin-bottom:1rem}.feature h3{color:#059669;margin-bottom:0.5rem}.cta{background:#ecfdf5;padding:60px 20px;text-align:center}.cta h2{color:#059669;margin-bottom:0.5rem}.cta p{color:#6b7280;margin-bottom:1.5rem}.btn{background:#059669;color:#fff;padding:14px 40px;border:none;border-radius:8px;font-size:1.1rem;cursor:pointer}</style></head><body><section class="hero"><h1>🎓 أكاديمية المستقبل</h1><p>تعلّم البرمجة من الصفر حتى الاحتراف</p></section><section class="features"><h2>لماذا نحن؟</h2><div class="grid"><div class="feature"><div class="feature-icon">📚</div><h3>+50 درس</h3><p>محتوى شامل ومحدث</p></div><div class="feature"><div class="feature-icon">👨‍🏫</div><h3>مدربون خبراء</h3><p>تعلّم من المحترفين</p></div><div class="feature"><div class="feature-icon">📜</div><h3>شهادة معتمدة</h3><p>شهادة إتمام الدورة</p></div></div></section><section class="cta"><h2>ابدأ رحلتك التعليمية</h2><p>سجّل الآن واحصل على خصم 40%</p><button class="btn">سجّل الآن</button></section></body></html>`,
  },
  {
    id: "landing",
    name: "صفحة هبوط",
    description: "صفحة هبوط بسيطة لمنتج أو خدمة",
    icon: <Globe className="w-6 h-6" />,
    category: "business",
    prompt: "أريد صفحة هبوط بسيطة وأنيقة لمنتج تقني مع قسم المميزات والتسعير",
    preview: `<!DOCTYPE html><html lang="ar" dir="rtl"><head><meta charset="UTF-8"><meta name="viewport" content="width=device-width, initial-scale=1.0"><title>منتجنا</title><link href="https://fonts.googleapis.com/css2?family=Tajawal:wght@400;500;700&display=swap" rel="stylesheet"><style>*{margin:0;padding:0;box-sizing:border-box}body{font-family:'Tajawal',sans-serif}.hero{background:linear-gradient(135deg,#4f46e5 0%,#7c3aed 100%);color:#fff;padding:120px 20px;text-align:center}.hero h1{font-size:3.5rem;margin-bottom:1rem}.hero p{font-size:1.3rem;opacity:0.9;margin-bottom:2rem}.btn-white{background:#fff;color:#4f46e5;padding:14px 40px;border:none;border-radius:8px;font-size:1.1rem;cursor:pointer;font-weight:700}.features{padding:80px 20px;max-width:1200px;margin:0 auto;text-align:center}.features h2{font-size:2rem;margin-bottom:3rem;color:#1f2937}.grid{display:grid;grid-template-columns:repeat(3,1fr);gap:2rem}@media(max-width:768px){.grid{grid-template-columns:1fr}}.feature{padding:2rem}.feature-icon{width:60px;height:60px;background:linear-gradient(135deg,#4f46e5,#7c3aed);border-radius:16px;display:flex;align-items:center;justify-content:center;margin:0 auto 1rem;font-size:1.5rem;color:#fff}.feature h3{margin-bottom:0.5rem;color:#1f2937}.feature p{color:#6b7280}.cta{background:#f5f3ff;padding:60px 20px;text-align:center}.cta h2{color:#4f46e5;margin-bottom:1rem}.btn-primary{background:#4f46e5;color:#fff;padding:14px 40px;border:none;border-radius:8px;font-size:1.1rem;cursor:pointer}</style></head><body><section class="hero"><h1>أداة ثورية لإنجاز أعمالك</h1><p>وفّر وقتك وضاعف إنتاجيتك</p><button class="btn-white">ابدأ مجانًا</button></section><section class="features"><h2>المميزات</h2><div class="grid"><div class="feature"><div class="feature-icon">⚡</div><h3>سريع</h3><p>أداء فائق السرعة</p></div><div class="feature"><div class="feature-icon">🔒</div><h3>آمن</h3><p>حماية متقدمة لبياناتك</p></div><div class="feature"><div class="feature-icon">🎯</div><h3>سهل</h3><p>واجهة بسيطة وسهلة</p></div></div></section><section class="cta"><h2>جاهز للبدء؟</h2><button class="btn-primary">جرّب الآن مجانًا</button></section></body></html>`,
  },
  // New templates
  {
    id: "clinic",
    name: "عيادة طبية",
    description: "موقع لعيادة أو مركز طبي",
    icon: <Stethoscope className="w-6 h-6" />,
    category: "services",
    prompt: "أريد موقع لعيادة طبية يعرض الخدمات الطبية والأطباء ومواعيد العمل وحجز المواعيد",
    preview: `<!DOCTYPE html><html lang="ar" dir="rtl"><head><meta charset="UTF-8"><meta name="viewport" content="width=device-width, initial-scale=1.0"><title>عيادة الشفاء</title><link href="https://fonts.googleapis.com/css2?family=Tajawal:wght@400;500;700&display=swap" rel="stylesheet"><style>*{margin:0;padding:0;box-sizing:border-box}body{font-family:'Tajawal',sans-serif}.hero{background:linear-gradient(135deg,#0d9488 0%,#06b6d4 100%);color:#fff;padding:100px 20px;text-align:center}.hero h1{font-size:3rem;margin-bottom:1rem}.hero p{font-size:1.2rem;opacity:0.9}.services{padding:80px 20px;max-width:1200px;margin:0 auto}.services h2{text-align:center;font-size:2rem;margin-bottom:3rem;color:#0d9488}.grid{display:grid;grid-template-columns:repeat(auto-fit,minmax(280px,1fr));gap:2rem}.service{background:#f0fdfa;border-radius:16px;padding:2rem;text-align:center;border:2px solid #99f6e4;transition:all 0.3s}.service:hover{transform:translateY(-5px);box-shadow:0 10px 30px rgba(13,148,136,0.2)}.service-icon{font-size:3rem;margin-bottom:1rem}.service h3{color:#0d9488;margin-bottom:0.5rem}.doctors{padding:60px 20px;background:#f0fdfa;text-align:center}.doctors h2{color:#0d9488;margin-bottom:2rem}.btn{background:#0d9488;color:#fff;padding:14px 40px;border:none;border-radius:8px;font-size:1.1rem;cursor:pointer}</style></head><body><section class="hero"><h1>🏥 عيادة الشفاء</h1><p>رعاية صحية متميزة بأيدي خبراء</p></section><section class="services"><h2>خدماتنا الطبية</h2><div class="grid"><div class="service"><div class="service-icon">🩺</div><h3>طب عام</h3><p>فحوصات شاملة ومتابعة صحية</p></div><div class="service"><div class="service-icon">🦷</div><h3>طب الأسنان</h3><p>علاج وتجميل الأسنان</p></div><div class="service"><div class="service-icon">👁️</div><h3>طب العيون</h3><p>فحص النظر والعلاج</p></div></div></section><section class="doctors"><h2>احجز موعدك الآن</h2><button class="btn">حجز موعد</button></section></body></html>`,
  },
  {
    id: "lawyer",
    name: "مكتب محاماة",
    description: "موقع لمحامي أو مكتب قانوني",
    icon: <Scale className="w-6 h-6" />,
    category: "services",
    prompt: "أريد موقع لمكتب محاماة يعرض الخدمات القانونية والتخصصات وفريق المحامين وطرق التواصل",
    preview: `<!DOCTYPE html><html lang="ar" dir="rtl"><head><meta charset="UTF-8"><meta name="viewport" content="width=device-width, initial-scale=1.0"><title>مكتب العدالة للمحاماة</title><link href="https://fonts.googleapis.com/css2?family=Tajawal:wght@400;500;700&display=swap" rel="stylesheet"><style>*{margin:0;padding:0;box-sizing:border-box}body{font-family:'Tajawal',sans-serif}.hero{background:linear-gradient(135deg,#1e3a5f 0%,#0f172a 100%);color:#fff;padding:120px 20px;text-align:center}.hero h1{font-size:3rem;margin-bottom:1rem}.hero p{font-size:1.2rem;opacity:0.9}.services{padding:80px 20px;max-width:1200px;margin:0 auto}.services h2{text-align:center;font-size:2rem;margin-bottom:3rem;color:#1e3a5f}.grid{display:grid;grid-template-columns:repeat(auto-fit,minmax(300px,1fr));gap:2rem}.service{background:#fff;border-radius:16px;padding:2rem;box-shadow:0 4px 20px rgba(0,0,0,0.1);border-right:4px solid #c9a227}.service h3{color:#1e3a5f;margin-bottom:0.5rem}.service p{color:#6b7280}.contact{padding:60px 20px;background:#f8fafc;text-align:center}.contact h2{color:#1e3a5f;margin-bottom:1rem}.btn{background:#c9a227;color:#1e3a5f;padding:14px 40px;border:none;border-radius:8px;font-size:1.1rem;cursor:pointer;font-weight:700}</style></head><body><section class="hero"><h1>⚖️ مكتب العدالة للمحاماة</h1><p>خبرة قانونية تفوق 20 عامًا</p></section><section class="services"><h2>تخصصاتنا القانونية</h2><div class="grid"><div class="service"><h3>القضايا التجارية</h3><p>تأسيس الشركات والعقود التجارية</p></div><div class="service"><h3>الأحوال الشخصية</h3><p>قضايا الأسرة والميراث</p></div><div class="service"><h3>القضايا العمالية</h3><p>حقوق العمال وعقود العمل</p></div></div></section><section class="contact"><h2>استشارة قانونية مجانية</h2><button class="btn">تواصل معنا</button></section></body></html>`,
  },
  {
    id: "realestate",
    name: "عقارات",
    description: "موقع لمكتب عقاري أو مشروع سكني",
    icon: <Building className="w-6 h-6" />,
    category: "business",
    prompt: "أريد موقع عقاري يعرض العقارات المتاحة والمشاريع السكنية مع صور وأسعار وتواصل",
    preview: `<!DOCTYPE html><html lang="ar" dir="rtl"><head><meta charset="UTF-8"><meta name="viewport" content="width=device-width, initial-scale=1.0"><title>دار الملكية العقارية</title><link href="https://fonts.googleapis.com/css2?family=Tajawal:wght@400;500;700&display=swap" rel="stylesheet"><style>*{margin:0;padding:0;box-sizing:border-box}body{font-family:'Tajawal',sans-serif}.hero{background:linear-gradient(135deg,#854d0e 0%,#a16207 100%);color:#fff;padding:120px 20px;text-align:center}.hero h1{font-size:3rem;margin-bottom:1rem}.hero p{font-size:1.2rem;opacity:0.9}.properties{padding:80px 20px;max-width:1200px;margin:0 auto}.properties h2{text-align:center;font-size:2rem;margin-bottom:3rem;color:#854d0e}.grid{display:grid;grid-template-columns:repeat(auto-fit,minmax(300px,1fr));gap:2rem}.property{background:#fff;border-radius:16px;overflow:hidden;box-shadow:0 4px 20px rgba(0,0,0,0.1)}.property-img{height:200px;background:linear-gradient(135deg,#fef3c7,#fde68a);display:flex;align-items:center;justify-content:center;font-size:4rem}.property-info{padding:1.5rem}.property-info h3{color:#854d0e;margin-bottom:0.5rem}.price{color:#a16207;font-size:1.5rem;font-weight:700}.location{color:#6b7280;font-size:0.9rem}.cta{padding:60px 20px;background:#fef3c7;text-align:center}.btn{background:#854d0e;color:#fff;padding:14px 40px;border:none;border-radius:8px;font-size:1.1rem;cursor:pointer}</style></head><body><section class="hero"><h1>🏠 دار الملكية العقارية</h1><p>عقارك الفاخر بانتظارك</p></section><section class="properties"><h2>عقارات مميزة</h2><div class="grid"><div class="property"><div class="property-img">🏡</div><div class="property-info"><h3>فيلا فاخرة</h3><p class="price">2,500,000 ر.س</p><p class="location">📍 حي النرجس، الرياض</p></div></div><div class="property"><div class="property-img">🏢</div><div class="property-info"><h3>شقة عصرية</h3><p class="price">850,000 ر.س</p><p class="location">📍 حي العليا، الرياض</p></div></div><div class="property"><div class="property-img">🏘️</div><div class="property-info"><h3>دوبلكس</h3><p class="price">1,200,000 ر.س</p><p class="location">📍 حي الياسمين، الرياض</p></div></div></div></section><section class="cta"><button class="btn">تواصل مع مستشار عقاري</button></section></body></html>`,
  },
  {
    id: "salon",
    name: "صالون تجميل",
    description: "موقع لصالون تجميل نسائي أو رجالي",
    icon: <Scissors className="w-6 h-6" />,
    category: "services",
    prompt: "أريد موقع لصالون تجميل يعرض الخدمات والأسعار ومعرض الأعمال وحجز المواعيد",
    preview: `<!DOCTYPE html><html lang="ar" dir="rtl"><head><meta charset="UTF-8"><meta name="viewport" content="width=device-width, initial-scale=1.0"><title>صالون الجمال</title><link href="https://fonts.googleapis.com/css2?family=Tajawal:wght@400;500;700&display=swap" rel="stylesheet"><style>*{margin:0;padding:0;box-sizing:border-box}body{font-family:'Tajawal',sans-serif}.hero{background:linear-gradient(135deg,#be185d 0%,#ec4899 100%);color:#fff;padding:100px 20px;text-align:center}.hero h1{font-size:3rem;margin-bottom:1rem}.hero p{font-size:1.2rem;opacity:0.9}.services{padding:80px 20px;max-width:1200px;margin:0 auto}.services h2{text-align:center;font-size:2rem;margin-bottom:3rem;color:#be185d}.grid{display:grid;grid-template-columns:repeat(auto-fit,minmax(250px,1fr));gap:2rem}.service{background:#fdf2f8;border-radius:16px;padding:2rem;text-align:center;transition:all 0.3s}.service:hover{transform:translateY(-5px);box-shadow:0 10px 30px rgba(190,24,93,0.2)}.service-icon{font-size:3rem;margin-bottom:1rem}.service h3{color:#be185d;margin-bottom:0.5rem}.price{color:#ec4899;font-weight:700}.booking{padding:60px 20px;background:#fdf2f8;text-align:center}.btn{background:linear-gradient(135deg,#be185d,#ec4899);color:#fff;padding:14px 40px;border:none;border-radius:25px;font-size:1.1rem;cursor:pointer}</style></head><body><section class="hero"><h1>💅 صالون الجمال</h1><p>لأنك تستحقين الأفضل</p></section><section class="services"><h2>خدماتنا</h2><div class="grid"><div class="service"><div class="service-icon">💇‍♀️</div><h3>قص وتصفيف</h3><p class="price">من 150 ر.س</p></div><div class="service"><div class="service-icon">💅</div><h3>مناكير وبديكير</h3><p class="price">من 100 ر.س</p></div><div class="service"><div class="service-icon">💄</div><h3>مكياج</h3><p class="price">من 300 ر.س</p></div><div class="service"><div class="service-icon">✨</div><h3>عناية بالبشرة</h3><p class="price">من 200 ر.س</p></div></div></section><section class="booking"><button class="btn">احجزي موعدك الآن</button></section></body></html>`,
  },
  {
    id: "gym",
    name: "نادي رياضي",
    description: "موقع لنادي رياضي أو صالة لياقة",
    icon: <Dumbbell className="w-6 h-6" />,
    category: "services",
    prompt: "أريد موقع لنادي رياضي يعرض البرامج التدريبية والمدربين والاشتراكات والتسجيل",
    preview: `<!DOCTYPE html><html lang="ar" dir="rtl"><head><meta charset="UTF-8"><meta name="viewport" content="width=device-width, initial-scale=1.0"><title>نادي القوة</title><link href="https://fonts.googleapis.com/css2?family=Tajawal:wght@400;500;700&display=swap" rel="stylesheet"><style>*{margin:0;padding:0;box-sizing:border-box}body{font-family:'Tajawal',sans-serif}.hero{background:linear-gradient(135deg,#0f0f0f 0%,#1f1f1f 100%);color:#fff;padding:120px 20px;text-align:center}.hero h1{font-size:3.5rem;margin-bottom:1rem;color:#fbbf24}.hero p{font-size:1.2rem;opacity:0.9}.programs{padding:80px 20px;max-width:1200px;margin:0 auto;background:#0f0f0f}.programs h2{text-align:center;font-size:2rem;margin-bottom:3rem;color:#fbbf24}.grid{display:grid;grid-template-columns:repeat(auto-fit,minmax(280px,1fr));gap:2rem}.program{background:#1f1f1f;border-radius:16px;padding:2rem;text-align:center;border:2px solid #fbbf24;transition:all 0.3s}.program:hover{transform:scale(1.02);box-shadow:0 0 30px rgba(251,191,36,0.3)}.program-icon{font-size:3rem;margin-bottom:1rem}.program h3{color:#fbbf24;margin-bottom:0.5rem}.program p{color:#9ca3af}.pricing{padding:60px 20px;background:#0f0f0f;text-align:center}.pricing h2{color:#fbbf24;margin-bottom:2rem}.btn{background:#fbbf24;color:#0f0f0f;padding:16px 48px;border:none;border-radius:8px;font-size:1.1rem;cursor:pointer;font-weight:700}</style></head><body><section class="hero"><h1>💪 نادي القوة</h1><p>حوّل جسمك. غيّر حياتك.</p></section><section class="programs"><h2>برامجنا التدريبية</h2><div class="grid"><div class="program"><div class="program-icon">🏋️</div><h3>بناء العضلات</h3><p>برنامج متكامل لبناء كتلة عضلية</p></div><div class="program"><div class="program-icon">🏃</div><h3>خسارة الوزن</h3><p>تمارين حرق الدهون المكثفة</p></div><div class="program"><div class="program-icon">🧘</div><h3>يوجا ومرونة</h3><p>تحسين المرونة والتوازن</p></div></div></section><section class="pricing"><h2>سجّل الآن واحصل على خصم 50%</h2><button class="btn">ابدأ رحلتك</button></section></body></html>`,
  },
  {
    id: "contractor",
    name: "مقاولات",
    description: "موقع لشركة مقاولات أو بناء",
    icon: <Wrench className="w-6 h-6" />,
    category: "business",
    prompt: "أريد موقع لشركة مقاولات يعرض المشاريع المنجزة والخدمات وفريق العمل والتواصل",
    preview: `<!DOCTYPE html><html lang="ar" dir="rtl"><head><meta charset="UTF-8"><meta name="viewport" content="width=device-width, initial-scale=1.0"><title>شركة البناء المتميز</title><link href="https://fonts.googleapis.com/css2?family=Tajawal:wght@400;500;700&display=swap" rel="stylesheet"><style>*{margin:0;padding:0;box-sizing:border-box}body{font-family:'Tajawal',sans-serif}.hero{background:linear-gradient(135deg,#f59e0b 0%,#d97706 100%);color:#fff;padding:120px 20px;text-align:center}.hero h1{font-size:3rem;margin-bottom:1rem}.hero p{font-size:1.2rem;opacity:0.9}.services{padding:80px 20px;max-width:1200px;margin:0 auto}.services h2{text-align:center;font-size:2rem;margin-bottom:3rem;color:#d97706}.grid{display:grid;grid-template-columns:repeat(auto-fit,minmax(280px,1fr));gap:2rem}.service{background:#fffbeb;border-radius:16px;padding:2rem;text-align:center;border-bottom:4px solid #f59e0b}.service-icon{font-size:3rem;margin-bottom:1rem}.service h3{color:#d97706;margin-bottom:0.5rem}.projects{padding:60px 20px;background:#fffbeb;text-align:center}.projects h2{color:#d97706;margin-bottom:2rem}.stats{display:flex;justify-content:center;gap:4rem;flex-wrap:wrap}.stat{text-align:center}.stat-number{font-size:3rem;font-weight:700;color:#f59e0b}.stat-label{color:#6b7280}.btn{background:#d97706;color:#fff;padding:14px 40px;border:none;border-radius:8px;font-size:1.1rem;cursor:pointer;margin-top:2rem}</style></head><body><section class="hero"><h1>🏗️ شركة البناء المتميز</h1><p>نبني أحلامك بإتقان</p></section><section class="services"><h2>خدماتنا</h2><div class="grid"><div class="service"><div class="service-icon">🏠</div><h3>بناء الفلل</h3><p>تصميم وتنفيذ فلل سكنية</p></div><div class="service"><div class="service-icon">🏢</div><h3>المباني التجارية</h3><p>مجمعات ومكاتب تجارية</p></div><div class="service"><div class="service-icon">🔧</div><h3>الترميم والصيانة</h3><p>أعمال الترميم والتجديد</p></div></div></section><section class="projects"><h2>إنجازاتنا</h2><div class="stats"><div class="stat"><div class="stat-number">500+</div><div class="stat-label">مشروع منجز</div></div><div class="stat"><div class="stat-number">15+</div><div class="stat-label">سنة خبرة</div></div><div class="stat"><div class="stat-number">100%</div><div class="stat-label">رضا العملاء</div></div></div><button class="btn">اطلب عرض سعر</button></section></body></html>`,
  },
];

interface TemplatesModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectTemplate: (template: Template) => void;
}

const TemplatesModal = ({ isOpen, onClose, onSelectTemplate }: TemplatesModalProps) => {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [previewTemplate, setPreviewTemplate] = useState<Template | null>(null);

  const filteredTemplates = selectedCategory
    ? templates.filter((t) => t.category === selectedCategory)
    : templates;

  const categories = Object.entries(TEMPLATE_CATEGORIES);

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
            className="bg-card rounded-2xl border border-border shadow-elevated max-w-5xl w-full max-h-[85vh] overflow-hidden"
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

            {/* Category filters */}
            <div className="px-6 py-3 border-b border-border overflow-x-auto">
              <div className="flex gap-2">
                <button
                  onClick={() => setSelectedCategory(null)}
                  className={`px-4 py-2 rounded-full text-sm font-medium transition-all whitespace-nowrap ${
                    !selectedCategory
                      ? "bg-primary text-primary-foreground"
                      : "bg-muted text-muted-foreground hover:bg-muted/80"
                  }`}
                >
                  الكل ({templates.length})
                </button>
                {categories.map(([key, label]) => {
                  const count = templates.filter((t) => t.category === key).length;
                  return (
                    <button
                      key={key}
                      onClick={() => setSelectedCategory(key)}
                      className={`px-4 py-2 rounded-full text-sm font-medium transition-all whitespace-nowrap ${
                        selectedCategory === key
                          ? "bg-primary text-primary-foreground"
                          : "bg-muted text-muted-foreground hover:bg-muted/80"
                      }`}
                    >
                      {label} ({count})
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Templates grid */}
            <div className="p-6 overflow-y-auto max-h-[calc(85vh-200px)]">
              <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                <AnimatePresence mode="popLayout">
                  {filteredTemplates.map((template) => (
                    <motion.div
                      key={template.id}
                      layout
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.9 }}
                      className="group relative"
                    >
                      <button
                        onClick={() => onSelectTemplate(template)}
                        className="text-right w-full bg-background rounded-xl border border-border p-4 hover:border-primary hover:shadow-card transition-all"
                      >
                        <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mb-3 group-hover:bg-primary/20 transition-colors text-primary">
                          {template.icon}
                        </div>
                        <h3 className="font-bold text-foreground mb-1">{template.name}</h3>
                        <p className="text-sm text-muted-foreground line-clamp-2">{template.description}</p>
                      </button>
                      {/* Preview button on hover */}
                      <motion.button
                        initial={{ opacity: 0 }}
                        whileHover={{ opacity: 1 }}
                        onClick={(e) => {
                          e.stopPropagation();
                          setPreviewTemplate(template);
                        }}
                        className="absolute top-2 left-2 p-2 bg-card/90 backdrop-blur-sm rounded-lg border border-border opacity-0 group-hover:opacity-100 transition-opacity"
                      >
                        <Globe className="w-4 h-4 text-muted-foreground" />
                      </motion.button>
                    </motion.div>
                  ))}
                </AnimatePresence>
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

          {/* Preview Modal */}
          <AnimatePresence>
            {previewTemplate && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="fixed inset-0 bg-black/70 z-[60] flex items-center justify-center p-4"
                onClick={() => setPreviewTemplate(null)}
              >
                <motion.div
                  initial={{ scale: 0.9 }}
                  animate={{ scale: 1 }}
                  exit={{ scale: 0.9 }}
                  className="bg-card rounded-lg w-full max-w-4xl h-[80vh] overflow-hidden"
                  onClick={(e) => e.stopPropagation()}
                >
                  <div className="h-12 bg-muted flex items-center justify-between px-4 border-b">
                    <span className="font-medium">{previewTemplate.name}</span>
                    <div className="flex gap-2">
                      <Button
                        size="sm"
                        onClick={() => {
                          onSelectTemplate(previewTemplate);
                          setPreviewTemplate(null);
                        }}
                      >
                        استخدم هذا القالب
                      </Button>
                      <button
                        onClick={() => setPreviewTemplate(null)}
                        className="p-1.5 hover:bg-background rounded"
                      >
                        <X className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                  <iframe
                    srcDoc={previewTemplate.preview}
                    className="w-full h-[calc(100%-48px)] bg-white"
                    title={`معاينة ${previewTemplate.name}`}
                  />
                </motion.div>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default TemplatesModal;
