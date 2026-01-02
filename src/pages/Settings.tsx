import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Switch } from "@/components/ui/switch";
import { Link } from "react-router-dom";
import { ArrowRight, Globe, MessageCircle, CreditCard, Link2 } from "lucide-react";
import Header from "@/components/landing/Header";

const Settings = () => {
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
            <h1 className="text-3xl font-bold text-foreground mb-2">إعدادات المشروع</h1>
            <p className="text-muted-foreground mb-8">إدارة إعدادات موقعك ونشره</p>

            {/* Settings sections */}
            <div className="space-y-8">
              {/* Basic info */}
              <section className="bg-card rounded-2xl border border-border p-6">
                <h2 className="text-lg font-bold text-foreground mb-4 flex items-center gap-2">
                  <Globe className="w-5 h-5 text-primary" />
                  معلومات الموقع
                </h2>
                <div className="space-y-4">
                  <div>
                    <label className="text-sm font-medium text-foreground mb-2 block">
                      اسم الموقع
                    </label>
                    <Input defaultValue="موقع شركة التقنية" className="text-right" />
                  </div>
                  <div>
                    <label className="text-sm font-medium text-foreground mb-2 block">
                      النطاق
                    </label>
                    <div className="flex gap-2">
                      <Input
                        defaultValue="tech-company"
                        className="text-left"
                        dir="ltr"
                      />
                      <span className="flex items-center px-3 bg-muted rounded-lg text-sm text-muted-foreground">
                        .chat2site.app
                      </span>
                    </div>
                  </div>
                </div>
              </section>

              {/* Publish settings */}
              <section className="bg-card rounded-2xl border border-border p-6">
                <h2 className="text-lg font-bold text-foreground mb-4 flex items-center gap-2">
                  <Globe className="w-5 h-5 text-primary" />
                  إعدادات النشر
                </h2>
                <div className="space-y-4">
                  <div className="flex items-center justify-between p-4 bg-muted rounded-xl">
                    <div>
                      <p className="font-medium text-foreground">نشر الموقع</p>
                      <p className="text-sm text-muted-foreground">
                        اجعل موقعك متاحًا للجميع على الإنترنت
                      </p>
                    </div>
                    <Switch defaultChecked />
                  </div>
                  <div className="flex items-center justify-between p-4 bg-muted rounded-xl">
                    <div>
                      <p className="font-medium text-foreground">فهرسة محركات البحث</p>
                      <p className="text-sm text-muted-foreground">
                        السماح لجوجل بإظهار موقعك في نتائج البحث
                      </p>
                    </div>
                    <Switch defaultChecked />
                  </div>
                </div>
              </section>

              {/* Integrations */}
              <section className="bg-card rounded-2xl border border-border p-6">
                <h2 className="text-lg font-bold text-foreground mb-4 flex items-center gap-2">
                  <Link2 className="w-5 h-5 text-primary" />
                  التكاملات
                </h2>
                <div className="space-y-3">
                  <div className="flex items-center justify-between p-4 border border-border rounded-xl">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-lg bg-green-500/10 flex items-center justify-center">
                        <MessageCircle className="w-5 h-5 text-green-600" />
                      </div>
                      <div>
                        <p className="font-medium text-foreground">واتساب</p>
                        <p className="text-sm text-muted-foreground">ربط زر المحادثة</p>
                      </div>
                    </div>
                    <Button variant="outline" size="sm">
                      ربط
                    </Button>
                  </div>
                  <div className="flex items-center justify-between p-4 border border-border rounded-xl">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-lg bg-purple-500/10 flex items-center justify-center">
                        <CreditCard className="w-5 h-5 text-purple-600" />
                      </div>
                      <div>
                        <p className="font-medium text-foreground">المدفوعات</p>
                        <p className="text-sm text-muted-foreground">استقبال المدفوعات</p>
                      </div>
                    </div>
                    <Button variant="outline" size="sm">
                      ربط
                    </Button>
                  </div>
                </div>
              </section>

              {/* Danger zone */}
              <section className="bg-destructive/5 rounded-2xl border border-destructive/20 p-6">
                <h2 className="text-lg font-bold text-destructive mb-4">منطقة الخطر</h2>
                <p className="text-sm text-muted-foreground mb-4">
                  حذف المشروع نهائيًا. هذا الإجراء لا يمكن التراجع عنه.
                </p>
                <Button variant="destructive">حذف المشروع</Button>
              </section>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Settings;
