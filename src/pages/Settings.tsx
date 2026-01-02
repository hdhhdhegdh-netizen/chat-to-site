import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Textarea } from "@/components/ui/textarea";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import { ArrowRight, Globe, Settings2, Link2, Trash2, Loader2, MessageCircle } from "lucide-react";
import Header from "@/components/landing/Header";
import { useAuth } from "@/hooks/useAuth";
import { useProjects } from "@/hooks/useProjects";
import { useToast } from "@/hooks/use-toast";
import { Skeleton } from "@/components/ui/skeleton";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";

const Settings = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const projectId = searchParams.get('project');
  
  const { user, loading: authLoading } = useAuth();
  const { projects, loadProject, updateProject, deleteProject, loading: projectsLoading } = useProjects();
  const { toast } = useToast();
  
  const [project, setProject] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [deleting, setDeleting] = useState(false);
  
  // Form state
  const [siteName, setSiteName] = useState("");
  const [subdomain, setSubdomain] = useState("");
  const [seoTitle, setSeoTitle] = useState("");
  const [seoDescription, setSeoDescription] = useState("");
  const [whatsappNumber, setWhatsappNumber] = useState("");
  const [isPublished, setIsPublished] = useState(false);

  useEffect(() => {
    if (!authLoading && !user) {
      navigate("/auth");
    }
  }, [authLoading, user, navigate]);

  useEffect(() => {
    const fetchProject = async () => {
      if (projectId) {
        setLoading(true);
        const data = await loadProject(projectId);
        if (data) {
          setProject(data);
          setSiteName(data.name || "");
          setSubdomain(data.subdomain || "");
          setSeoTitle((data as any).seo_title || "");
          setSeoDescription((data as any).seo_description || "");
          setWhatsappNumber((data as any).whatsapp_number || "");
          setIsPublished(data.status === "published");
        }
        setLoading(false);
      } else if (projects.length > 0) {
        // If no project specified, use the first one
        const firstProject = projects[0];
        setProject(firstProject);
        setSiteName(firstProject.name || "");
        setSubdomain(firstProject.subdomain || "");
        setSeoTitle((firstProject as any).seo_title || "");
        setSeoDescription((firstProject as any).seo_description || "");
        setWhatsappNumber((firstProject as any).whatsapp_number || "");
        setIsPublished(firstProject.status === "published");
        setLoading(false);
      } else {
        setLoading(false);
      }
    };

    if (!authLoading && user) {
      fetchProject();
    }
  }, [projectId, authLoading, user, projects, loadProject]);

  const handleSave = async () => {
    if (!project) return;
    
    setSaving(true);
    try {
      await updateProject(project.id, {
        name: siteName,
        subdomain: subdomain || null,
        seo_title: seoTitle || null,
        seo_description: seoDescription || null,
        whatsapp_number: whatsappNumber || null,
        status: isPublished ? "published" : "draft",
      } as any);
      toast({
        title: "تم الحفظ",
        description: "تم حفظ إعدادات المشروع بنجاح",
      });
    } catch (error) {
      toast({
        title: "خطأ",
        description: "فشل في حفظ الإعدادات",
        variant: "destructive",
      });
    }
    setSaving(false);
  };

  const handleDelete = async () => {
    if (!project) return;
    
    setDeleting(true);
    try {
      await deleteProject(project.id);
      toast({
        title: "تم الحذف",
        description: "تم حذف المشروع بنجاح",
      });
      navigate("/dashboard");
    } catch (error) {
      toast({
        title: "خطأ",
        description: "فشل في حذف المشروع",
        variant: "destructive",
      });
      setDeleting(false);
    }
  };

  const isLoading = authLoading || projectsLoading || loading;

  if (isLoading) {
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

  if (!project) {
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
            <div className="text-center py-12">
              <p className="text-muted-foreground mb-4">لم يتم العثور على مشروع</p>
              <Link to="/app">
                <Button>إنشاء مشروع جديد</Button>
              </Link>
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

          <h1 className="text-3xl font-bold text-foreground mb-2">إعدادات المشروع</h1>
          <p className="text-muted-foreground mb-8">{project.name}</p>

          <div className="space-y-6">
            {/* Basic Info */}
            <Card>
              <CardHeader>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                    <Settings2 className="w-5 h-5 text-primary" />
                  </div>
                  <div>
                    <CardTitle>المعلومات الأساسية</CardTitle>
                    <CardDescription>اسم الموقع والنطاق</CardDescription>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="siteName">اسم الموقع</Label>
                  <Input 
                    id="siteName" 
                    value={siteName}
                    onChange={(e) => setSiteName(e.target.value)}
                    placeholder="اسم موقعك"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="subdomain">النطاق الفرعي</Label>
                  <div className="flex items-center gap-2">
                    <Input 
                      id="subdomain" 
                      value={subdomain}
                      onChange={(e) => setSubdomain(e.target.value.toLowerCase().replace(/[^a-z0-9-]/g, ''))}
                      placeholder="mysite"
                      className="flex-1"
                      dir="ltr"
                    />
                    <span className="text-muted-foreground text-sm">.chat2site.app</span>
                  </div>
                  <p className="text-xs text-muted-foreground">
                    أحرف إنجليزية صغيرة وأرقام وشرطات فقط
                  </p>
                </div>
              </CardContent>
            </Card>

            {/* SEO Settings */}
            <Card>
              <CardHeader>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                    <Globe className="w-5 h-5 text-primary" />
                  </div>
                  <div>
                    <CardTitle>إعدادات SEO</CardTitle>
                    <CardDescription>تحسين ظهور موقعك في محركات البحث</CardDescription>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="seoTitle">عنوان الصفحة (Title)</Label>
                  <Input 
                    id="seoTitle" 
                    value={seoTitle}
                    onChange={(e) => setSeoTitle(e.target.value)}
                    placeholder="عنوان يظهر في نتائج البحث"
                    maxLength={60}
                  />
                  <p className="text-xs text-muted-foreground">{seoTitle.length}/60 حرف</p>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="seoDescription">وصف الصفحة (Meta Description)</Label>
                  <Textarea 
                    id="seoDescription" 
                    value={seoDescription}
                    onChange={(e) => setSeoDescription(e.target.value)}
                    placeholder="وصف موجز لموقعك يظهر في نتائج البحث"
                    maxLength={160}
                    rows={3}
                  />
                  <p className="text-xs text-muted-foreground">{seoDescription.length}/160 حرف</p>
                </div>
              </CardContent>
            </Card>

            {/* Integrations */}
            <Card>
              <CardHeader>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                    <Link2 className="w-5 h-5 text-primary" />
                  </div>
                  <div>
                    <CardTitle>التكاملات</CardTitle>
                    <CardDescription>ربط خدمات خارجية</CardDescription>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="whatsapp" className="flex items-center gap-2">
                    <MessageCircle className="w-4 h-4 text-green-600" />
                    رقم WhatsApp
                  </Label>
                  <Input 
                    id="whatsapp" 
                    value={whatsappNumber}
                    onChange={(e) => setWhatsappNumber(e.target.value.replace(/[^0-9+]/g, ''))}
                    placeholder="+966512345678"
                    dir="ltr"
                  />
                  <p className="text-xs text-muted-foreground">
                    سيظهر زر WhatsApp في موقعك المنشور
                  </p>
                </div>
                
                <div className="flex items-center justify-between pt-4 border-t">
                  <div className="space-y-0.5">
                    <Label>نشر الموقع</Label>
                    <p className="text-xs text-muted-foreground">
                      {isPublished ? "موقعك متاح للجميع" : "موقعك مسودة خاصة"}
                    </p>
                  </div>
                  <Switch
                    checked={isPublished}
                    onCheckedChange={setIsPublished}
                  />
                </div>
              </CardContent>
            </Card>

            {/* Save Button */}
            <Button onClick={handleSave} disabled={saving} className="w-full">
              {saving && <Loader2 className="w-4 h-4 ml-2 animate-spin" />}
              حفظ الإعدادات
            </Button>

            {/* Danger Zone */}
            <Card className="border-destructive/50">
              <CardHeader>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-destructive/10 flex items-center justify-center">
                    <Trash2 className="w-5 h-5 text-destructive" />
                  </div>
                  <div>
                    <CardTitle className="text-destructive">منطقة الخطر</CardTitle>
                    <CardDescription>إجراءات لا يمكن التراجع عنها</CardDescription>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <AlertDialog>
                  <AlertDialogTrigger asChild>
                    <Button variant="destructive" disabled={deleting}>
                      {deleting && <Loader2 className="w-4 h-4 ml-2 animate-spin" />}
                      حذف المشروع
                    </Button>
                  </AlertDialogTrigger>
                  <AlertDialogContent>
                    <AlertDialogHeader>
                      <AlertDialogTitle>هل أنت متأكد؟</AlertDialogTitle>
                      <AlertDialogDescription>
                        سيتم حذف المشروع "{project.name}" نهائياً. هذا الإجراء لا يمكن التراجع عنه.
                      </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                      <AlertDialogCancel>إلغاء</AlertDialogCancel>
                      <AlertDialogAction onClick={handleDelete} className="bg-destructive text-destructive-foreground hover:bg-destructive/90">
                        حذف نهائياً
                      </AlertDialogAction>
                    </AlertDialogFooter>
                  </AlertDialogContent>
                </AlertDialog>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Settings;
