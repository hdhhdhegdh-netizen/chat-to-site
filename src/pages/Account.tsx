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
import { motion } from "framer-motion";
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

  const cardData = [
    {
      icon: User,
      title: "الملف الشخصي",
      description: "معلوماتك الأساسية",
    },
    {
      icon: CreditCard,
      title: "الاشتراك",
      description: "إدارة خطة اشتراكك",
    },
    {
      icon: Bell,
      title: "الإشعارات",
      description: "تفضيلات البريد الإلكتروني",
    },
    {
      icon: Lock,
      title: "الأمان",
      description: "إدارة كلمة المرور",
    },
  ];

  return (
    <div className="min-h-screen bg-background relative overflow-hidden">
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
      
      <Header />
      
      <main className="pt-20 pb-12 relative z-10">
        <div className="container px-4 max-w-4xl">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
          >
            <Link 
              to="/dashboard" 
              className="inline-flex items-center gap-2 text-muted-foreground hover:text-primary mb-6 transition-colors group"
            >
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              العودة للوحة التحكم
            </Link>
          </motion.div>

          <motion.h1 
            className="text-3xl font-bold text-foreground mb-8"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            إعدادات الحساب
          </motion.h1>

          <div className="space-y-6">
            {/* Profile Section */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              whileHover={{ y: -2 }}
              className="group"
            >
              <Card className="backdrop-blur-sm bg-card/80 border-border/50 shadow-lg hover:shadow-xl hover:border-primary/30 transition-all duration-300 relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-accent/5 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none" />
                <CardHeader className="relative">
                  <div className="flex items-center gap-3">
                    <motion.div 
                      className="w-12 h-12 rounded-xl hero-gradient flex items-center justify-center shadow-lg shadow-primary/20"
                      whileHover={{ rotate: 5, scale: 1.05 }}
                    >
                      <User className="w-6 h-6 text-primary-foreground" />
                    </motion.div>
                    <div>
                      <CardTitle>الملف الشخصي</CardTitle>
                      <CardDescription>معلوماتك الأساسية</CardDescription>
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="space-y-4 relative">
                  <div className="grid gap-4 md:grid-cols-2">
                    <div className="space-y-2">
                      <Label htmlFor="name">الاسم</Label>
                      <Input 
                        id="name" 
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        placeholder="أدخل اسمك"
                        className="bg-background/50 border-border/50 focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="email">البريد الإلكتروني</Label>
                      <Input 
                        id="email" 
                        type="email" 
                        value={email}
                        disabled
                        className="bg-muted/50"
                      />
                    </div>
                  </div>
                  <Button onClick={handleSaveProfile} disabled={saving} className="hero-gradient text-primary-foreground shadow-lg shadow-primary/20">
                    {saving && <Loader2 className="w-4 h-4 ml-2 animate-spin" />}
                    حفظ التغييرات
                  </Button>
                </CardContent>
              </Card>
            </motion.div>

            {/* Subscription Section */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              whileHover={{ y: -2 }}
              className="group"
            >
              <Card className="backdrop-blur-sm bg-card/80 border-border/50 shadow-lg hover:shadow-xl hover:border-primary/30 transition-all duration-300 relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-accent/5 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none" />
                <CardHeader className="relative">
                  <div className="flex items-center gap-3">
                    <motion.div 
                      className="w-12 h-12 rounded-xl hero-gradient flex items-center justify-center shadow-lg shadow-primary/20"
                      whileHover={{ rotate: 5, scale: 1.05 }}
                    >
                      <CreditCard className="w-6 h-6 text-primary-foreground" />
                    </motion.div>
                    <div>
                      <CardTitle>الاشتراك</CardTitle>
                      <CardDescription>إدارة خطة اشتراكك</CardDescription>
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="relative">
                  {subLoading ? (
                    <div className="space-y-4">
                      <Skeleton className="h-6 w-32" />
                      <Skeleton className="h-4 w-48" />
                    </div>
                  ) : subscription ? (
                    <div className="space-y-4">
                      <div className="flex items-center justify-between p-4 rounded-xl bg-muted/50 backdrop-blur-sm border border-border/30">
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
                          <Button variant="outline" className="hover:border-primary hover:text-primary transition-colors">تغيير الخطة</Button>
                        </Link>
                      </div>
                    </div>
                  ) : (
                    <div className="text-center py-6">
                      <p className="text-muted-foreground mb-4">لا يوجد اشتراك حالي</p>
                      <Link to="/pricing">
                        <Button className="hero-gradient text-primary-foreground">اشترك الآن</Button>
                      </Link>
                    </div>
                  )}
                </CardContent>
              </Card>
            </motion.div>

            {/* Notifications Section */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              whileHover={{ y: -2 }}
              className="group"
            >
              <Card className="backdrop-blur-sm bg-card/80 border-border/50 shadow-lg hover:shadow-xl hover:border-primary/30 transition-all duration-300 relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-accent/5 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none" />
                <CardHeader className="relative">
                  <div className="flex items-center gap-3">
                    <motion.div 
                      className="w-12 h-12 rounded-xl hero-gradient flex items-center justify-center shadow-lg shadow-primary/20"
                      whileHover={{ rotate: 5, scale: 1.05 }}
                    >
                      <Bell className="w-6 h-6 text-primary-foreground" />
                    </motion.div>
                    <div>
                      <CardTitle>الإشعارات</CardTitle>
                      <CardDescription>تفضيلات البريد الإلكتروني</CardDescription>
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="space-y-4 relative">
                  <div className="flex items-center justify-between p-3 rounded-lg hover:bg-muted/30 transition-colors">
                    <Label htmlFor="productUpdates" className="cursor-pointer">تحديثات المنتج</Label>
                    <Checkbox 
                      id="productUpdates" 
                      checked={notifications.productUpdates}
                      onCheckedChange={(checked) => 
                        setNotifications(prev => ({ ...prev, productUpdates: !!checked }))
                      }
                    />
                  </div>
                  <div className="flex items-center justify-between p-3 rounded-lg hover:bg-muted/30 transition-colors">
                    <Label htmlFor="billingAlerts" className="cursor-pointer">تنبيهات الفواتير</Label>
                    <Checkbox 
                      id="billingAlerts" 
                      checked={notifications.billingAlerts}
                      onCheckedChange={(checked) => 
                        setNotifications(prev => ({ ...prev, billingAlerts: !!checked }))
                      }
                    />
                  </div>
                  <div className="flex items-center justify-between p-3 rounded-lg hover:bg-muted/30 transition-colors">
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
            </motion.div>

            {/* Security Section */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              whileHover={{ y: -2 }}
              className="group"
            >
              <Card className="backdrop-blur-sm bg-card/80 border-border/50 shadow-lg hover:shadow-xl hover:border-primary/30 transition-all duration-300 relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-accent/5 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none" />
                <CardHeader className="relative">
                  <div className="flex items-center gap-3">
                    <motion.div 
                      className="w-12 h-12 rounded-xl hero-gradient flex items-center justify-center shadow-lg shadow-primary/20"
                      whileHover={{ rotate: 5, scale: 1.05 }}
                    >
                      <Lock className="w-6 h-6 text-primary-foreground" />
                    </motion.div>
                    <div>
                      <CardTitle>الأمان</CardTitle>
                      <CardDescription>إدارة كلمة المرور</CardDescription>
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="relative">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-medium">كلمة المرور</p>
                      <p className="text-sm text-muted-foreground">
                        آخر تحديث: غير معروف
                      </p>
                    </div>
                    <Dialog open={passwordDialogOpen} onOpenChange={setPasswordDialogOpen}>
                      <DialogTrigger asChild>
                        <Button variant="outline" className="hover:border-primary hover:text-primary transition-colors">تغيير كلمة المرور</Button>
                      </DialogTrigger>
                      <DialogContent className="backdrop-blur-xl bg-card/95 border-border/50">
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
                              className="bg-background/50 border-border/50 focus:border-primary focus:ring-2 focus:ring-primary/20"
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
                              className="bg-background/50 border-border/50 focus:border-primary focus:ring-2 focus:ring-primary/20"
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
                            className="w-full hero-gradient text-primary-foreground"
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
            </motion.div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Account;
