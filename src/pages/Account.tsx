import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { Link, useNavigate } from "react-router-dom";
import { ArrowRight, User, CreditCard, Bell, Lock, Loader2 } from "lucide-react";
import Header from "@/components/landing/Header";
import { useAuth } from "@/hooks/useAuth";
import { useProfile } from "@/hooks/useProfile";
import { useSubscription } from "@/hooks/useSubscription";
import { Skeleton } from "@/components/ui/skeleton";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

const Account = () => {
  const navigate = useNavigate();
  const { user, loading: authLoading } = useAuth();
  const { profile, loading: profileLoading, updateProfile, changePassword } = useProfile(user?.id);
  const { subscription, currentPlan, loading: subLoading } = useSubscription();
  
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [saving, setSaving] = useState(false);
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [changingPassword, setChangingPassword] = useState(false);
  const [passwordDialogOpen, setPasswordDialogOpen] = useState(false);

  // Notification preferences (stored in localStorage for now)
  const [notifications, setNotifications] = useState({
    productUpdates: true,
    billingAlerts: true,
    tips: false,
  });

  useEffect(() => {
    if (!authLoading && !user) {
      navigate("/auth");
    }
  }, [authLoading, user, navigate]);

  useEffect(() => {
    if (profile) {
      setName(profile.full_name || "");
      setEmail(profile.email || user?.email || "");
    }
  }, [profile, user]);

  const handleSaveProfile = async () => {
    setSaving(true);
    await updateProfile({ full_name: name });
    setSaving(false);
  };

  const handleChangePassword = async () => {
    if (newPassword !== confirmPassword) {
      return;
    }
    if (newPassword.length < 6) {
      return;
    }
    
    setChangingPassword(true);
    const result = await changePassword(newPassword);
    setChangingPassword(false);
    
    if (!result.error) {
      setNewPassword("");
      setConfirmPassword("");
      setPasswordDialogOpen(false);
    }
  };

  const loading = authLoading || profileLoading;

  if (loading) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <main className="pt-20 pb-12">
          <div className="container px-4 max-w-4xl">
            <Skeleton className="h-10 w-48 mb-8" />
            <div className="space-y-6">
              {[1, 2, 3, 4].map((i) => (
                <Skeleton key={i} className="h-48 w-full" />
              ))}
            </div>
          </div>
        </main>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main className="pt-20 pb-12">
        <div className="container px-4 max-w-4xl">
          <Link 
            to="/dashboard" 
            className="inline-flex items-center gap-2 text-muted-foreground hover:text-foreground mb-6 transition-colors"
          >
            <ArrowRight className="w-4 h-4" />
            العودة للوحة التحكم
          </Link>

          <h1 className="text-3xl font-bold text-foreground mb-8">إعدادات الحساب</h1>

          <div className="space-y-6">
            {/* Profile Section */}
            <Card>
              <CardHeader>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                    <User className="w-5 h-5 text-primary" />
                  </div>
                  <div>
                    <CardTitle>الملف الشخصي</CardTitle>
                    <CardDescription>معلوماتك الأساسية</CardDescription>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid gap-4 md:grid-cols-2">
                  <div className="space-y-2">
                    <Label htmlFor="name">الاسم</Label>
                    <Input 
                      id="name" 
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder="أدخل اسمك"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="email">البريد الإلكتروني</Label>
                    <Input 
                      id="email" 
                      type="email" 
                      value={email}
                      disabled
                      className="bg-muted"
                    />
                  </div>
                </div>
                <Button onClick={handleSaveProfile} disabled={saving}>
                  {saving && <Loader2 className="w-4 h-4 ml-2 animate-spin" />}
                  حفظ التغييرات
                </Button>
              </CardContent>
            </Card>

            {/* Subscription Section */}
            <Card>
              <CardHeader>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                    <CreditCard className="w-5 h-5 text-primary" />
                  </div>
                  <div>
                    <CardTitle>الاشتراك</CardTitle>
                    <CardDescription>إدارة خطة اشتراكك</CardDescription>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                {subLoading ? (
                  <div className="space-y-4">
                    <Skeleton className="h-6 w-32" />
                    <Skeleton className="h-4 w-48" />
                  </div>
                ) : subscription ? (
                  <div className="space-y-4">
                    <div className="flex items-center justify-between p-4 rounded-lg bg-muted">
                      <div>
                        <p className="font-medium">
                          الخطة الحالية: <span className="text-primary">{currentPlan?.name_ar || 'مجانية'}</span>
                        </p>
                        <p className="text-sm text-muted-foreground">
                          الحالة: {subscription.status === 'active' ? 'نشط' : 'غير نشط'}
                        </p>
                        {subscription.current_period_end && (
                          <p className="text-sm text-muted-foreground">
                            التجديد: {new Date(subscription.current_period_end).toLocaleDateString('ar-SA')}
                          </p>
                        )}
                      </div>
                      <Link to="/pricing">
                        <Button variant="outline">تغيير الخطة</Button>
                      </Link>
                    </div>
                  </div>
                ) : (
                  <div className="text-center py-6">
                    <p className="text-muted-foreground mb-4">لا يوجد اشتراك حالي</p>
                    <Link to="/pricing">
                      <Button>اشترك الآن</Button>
                    </Link>
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Notifications Section */}
            <Card>
              <CardHeader>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                    <Bell className="w-5 h-5 text-primary" />
                  </div>
                  <div>
                    <CardTitle>الإشعارات</CardTitle>
                    <CardDescription>تفضيلات البريد الإلكتروني</CardDescription>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <Label htmlFor="productUpdates" className="cursor-pointer">تحديثات المنتج</Label>
                  <Checkbox 
                    id="productUpdates" 
                    checked={notifications.productUpdates}
                    onCheckedChange={(checked) => 
                      setNotifications(prev => ({ ...prev, productUpdates: !!checked }))
                    }
                  />
                </div>
                <div className="flex items-center justify-between">
                  <Label htmlFor="billingAlerts" className="cursor-pointer">تنبيهات الفواتير</Label>
                  <Checkbox 
                    id="billingAlerts" 
                    checked={notifications.billingAlerts}
                    onCheckedChange={(checked) => 
                      setNotifications(prev => ({ ...prev, billingAlerts: !!checked }))
                    }
                  />
                </div>
                <div className="flex items-center justify-between">
                  <Label htmlFor="tips" className="cursor-pointer">نصائح ومقترحات</Label>
                  <Checkbox 
                    id="tips" 
                    checked={notifications.tips}
                    onCheckedChange={(checked) => 
                      setNotifications(prev => ({ ...prev, tips: !!checked }))
                    }
                  />
                </div>
              </CardContent>
            </Card>

            {/* Security Section */}
            <Card>
              <CardHeader>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                    <Lock className="w-5 h-5 text-primary" />
                  </div>
                  <div>
                    <CardTitle>الأمان</CardTitle>
                    <CardDescription>إدارة كلمة المرور</CardDescription>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium">كلمة المرور</p>
                    <p className="text-sm text-muted-foreground">
                      آخر تحديث: غير معروف
                    </p>
                  </div>
                  <Dialog open={passwordDialogOpen} onOpenChange={setPasswordDialogOpen}>
                    <DialogTrigger asChild>
                      <Button variant="outline">تغيير كلمة المرور</Button>
                    </DialogTrigger>
                    <DialogContent>
                      <DialogHeader>
                        <DialogTitle>تغيير كلمة المرور</DialogTitle>
                        <DialogDescription>
                          أدخل كلمة المرور الجديدة
                        </DialogDescription>
                      </DialogHeader>
                      <div className="space-y-4 py-4">
                        <div className="space-y-2">
                          <Label htmlFor="newPassword">كلمة المرور الجديدة</Label>
                          <Input
                            id="newPassword"
                            type="password"
                            value={newPassword}
                            onChange={(e) => setNewPassword(e.target.value)}
                            placeholder="أدخل كلمة المرور الجديدة"
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="confirmPassword">تأكيد كلمة المرور</Label>
                          <Input
                            id="confirmPassword"
                            type="password"
                            value={confirmPassword}
                            onChange={(e) => setConfirmPassword(e.target.value)}
                            placeholder="أعد إدخال كلمة المرور"
                          />
                        </div>
                        {newPassword && confirmPassword && newPassword !== confirmPassword && (
                          <p className="text-sm text-destructive">كلمات المرور غير متطابقة</p>
                        )}
                        {newPassword && newPassword.length < 6 && (
                          <p className="text-sm text-destructive">كلمة المرور قصيرة جداً (6 أحرف على الأقل)</p>
                        )}
                        <Button 
                          onClick={handleChangePassword}
                          disabled={changingPassword || newPassword !== confirmPassword || newPassword.length < 6}
                          className="w-full"
                        >
                          {changingPassword && <Loader2 className="w-4 h-4 ml-2 animate-spin" />}
                          تغيير كلمة المرور
                        </Button>
                      </div>
                    </DialogContent>
                  </Dialog>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Account;
