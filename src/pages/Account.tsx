import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Link } from "react-router-dom";
import { ArrowRight, User, CreditCard, Bell, Shield } from "lucide-react";
import Header from "@/components/landing/Header";

const Account = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="pt-24 pb-16">
        <div className="container px-4">
          {/* Back link */}
          <Link
            to="/dashboard"
            className="inline-flex items-center gap-2 text-muted-foreground hover:text-foreground mb-8 transition-colors"
          >
            <ArrowRight className="w-4 h-4" />
            العودة للوحة التحكم
          </Link>

          <div className="max-w-2xl">
            <h1 className="text-3xl font-bold text-foreground mb-2">حسابي</h1>
            <p className="text-muted-foreground mb-8">إدارة حسابك واشتراكك</p>

            <div className="space-y-8">
              {/* Profile */}
              <section className="bg-card rounded-2xl border border-border p-6">
                <h2 className="text-lg font-bold text-foreground mb-4 flex items-center gap-2">
                  <User className="w-5 h-5 text-primary" />
                  الملف الشخصي
                </h2>
                <div className="space-y-4">
                  <div>
                    <label className="text-sm font-medium text-foreground mb-2 block">
                      الاسم
                    </label>
                    <Input defaultValue="أحمد محمد" className="text-right" />
                  </div>
                  <div>
                    <label className="text-sm font-medium text-foreground mb-2 block">
                      البريد الإلكتروني
                    </label>
                    <Input
                      defaultValue="ahmed@example.com"
                      type="email"
                      className="text-left"
                      dir="ltr"
                    />
                  </div>
                  <Button>حفظ التغييرات</Button>
                </div>
              </section>

              {/* Subscription */}
              <section className="bg-card rounded-2xl border border-border p-6">
                <h2 className="text-lg font-bold text-foreground mb-4 flex items-center gap-2">
                  <CreditCard className="w-5 h-5 text-primary" />
                  الاشتراك
                </h2>
                <div className="p-4 bg-primary/5 rounded-xl border border-primary/20 mb-4">
                  <div className="flex items-center justify-between mb-2">
                    <span className="font-bold text-foreground">الخطة الاحترافية</span>
                    <span className="px-3 py-1 rounded-full bg-primary/10 text-primary text-sm font-medium">
                      نشط
                    </span>
                  </div>
                  <p className="text-sm text-muted-foreground mb-2">
                    49 ر.س / شهريًا • يتجدد في 15 فبراير 2025
                  </p>
                  <p className="text-sm text-muted-foreground">
                    3 من 5 مواقع مستخدمة
                  </p>
                </div>
                <div className="flex gap-3">
                  <Link to="/pricing">
                    <Button variant="outline">تغيير الخطة</Button>
                  </Link>
                  <Button variant="ghost" className="text-destructive hover:text-destructive">
                    إلغاء الاشتراك
                  </Button>
                </div>
              </section>

              {/* Notifications */}
              <section className="bg-card rounded-2xl border border-border p-6">
                <h2 className="text-lg font-bold text-foreground mb-4 flex items-center gap-2">
                  <Bell className="w-5 h-5 text-primary" />
                  الإشعارات
                </h2>
                <div className="space-y-3">
                  <label className="flex items-center gap-3 p-3 bg-muted rounded-lg cursor-pointer">
                    <input type="checkbox" defaultChecked className="rounded" />
                    <span className="text-foreground">تحديثات المنتج والميزات الجديدة</span>
                  </label>
                  <label className="flex items-center gap-3 p-3 bg-muted rounded-lg cursor-pointer">
                    <input type="checkbox" defaultChecked className="rounded" />
                    <span className="text-foreground">تنبيهات الفوترة والدفع</span>
                  </label>
                  <label className="flex items-center gap-3 p-3 bg-muted rounded-lg cursor-pointer">
                    <input type="checkbox" className="rounded" />
                    <span className="text-foreground">نصائح واقتراحات</span>
                  </label>
                </div>
              </section>

              {/* Security */}
              <section className="bg-card rounded-2xl border border-border p-6">
                <h2 className="text-lg font-bold text-foreground mb-4 flex items-center gap-2">
                  <Shield className="w-5 h-5 text-primary" />
                  الأمان
                </h2>
                <div className="space-y-4">
                  <Button variant="outline">تغيير كلمة المرور</Button>
                  <p className="text-sm text-muted-foreground">
                    آخر تسجيل دخول: اليوم، 10:30 صباحًا من الرياض
                  </p>
                </div>
              </section>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Account;
