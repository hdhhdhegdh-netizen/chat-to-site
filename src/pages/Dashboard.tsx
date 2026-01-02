import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Link, useNavigate } from "react-router-dom";
import { Plus, Globe, Settings, ExternalLink, MoreVertical, Trash2, Loader2, Bot, Copy, Check, Share2 } from "lucide-react";
import Header from "@/components/landing/Header";
import { useAuth } from "@/hooks/useAuth";
import { useProjects } from "@/hooks/useProjects";
import { useToast } from "@/hooks/use-toast";
import { motion } from "framer-motion";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

const Dashboard = () => {
  const { user, loading: authLoading } = useAuth();
  const { projects, loading: projectsLoading, deleteProject } = useProjects();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [copiedId, setCopiedId] = useState<string | null>(null);

  useEffect(() => {
    if (!authLoading && !user) {
      navigate("/auth");
    }
  }, [authLoading, user, navigate]);

  const handleDeleteProject = async (projectId: string, projectName: string) => {
    const success = await deleteProject(projectId);
    if (success) {
      toast({
        title: "تم الحذف",
        description: `تم حذف مشروع "${projectName}" بنجاح`,
      });
    } else {
      toast({
        title: "خطأ",
        description: "فشل في حذف المشروع",
        variant: "destructive",
      });
    }
  };

  const copyToClipboard = async (projectId: string, url: string) => {
    await navigator.clipboard.writeText(url);
    setCopiedId(projectId);
    setTimeout(() => setCopiedId(null), 2000);
    toast({
      title: "تم النسخ!",
      description: "تم نسخ رابط الموقع إلى الحافظة",
    });
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    const now = new Date();
    const diff = now.getTime() - date.getTime();
    const hours = Math.floor(diff / (1000 * 60 * 60));
    const days = Math.floor(hours / 24);

    if (hours < 1) return "منذ دقائق";
    if (hours < 24) return `منذ ${hours} ساعة`;
    if (days < 7) return `منذ ${days} يوم`;
    return date.toLocaleDateString("ar-SA");
  };

  if (authLoading || projectsLoading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="text-center"
        >
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
            className="w-16 h-16 rounded-2xl hero-gradient mx-auto mb-4 flex items-center justify-center"
          >
            <Bot className="w-8 h-8 text-primary-foreground" />
          </motion.div>
          <p className="text-muted-foreground">جاري التحميل...</p>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="pt-24 pb-16">
        <div className="container px-4">
          {/* Header */}
          <div className="flex items-center justify-between mb-8">
            <div>
              <h1 className="text-3xl font-bold text-foreground mb-2">مشاريعي</h1>
              <p className="text-muted-foreground">
                {projects.length} مشروع • {projects.filter(p => p.status === "published").length} منشور
              </p>
            </div>
            <Link to="/app">
              <Button variant="hero" size="lg">
                <Plus className="w-5 h-5" />
                مشروع جديد
              </Button>
            </Link>
          </div>

          {/* Projects grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {projects.map((project, index) => (
              <motion.div
                key={project.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="bg-card rounded-2xl border border-border overflow-hidden shadow-card hover:shadow-elevated transition-shadow group"
              >
                {/* Project preview */}
                <div className="aspect-video bg-muted relative overflow-hidden">
                  {project.html_content ? (
                    <iframe
                      srcDoc={project.html_content}
                      className="w-full h-full pointer-events-none scale-100"
                      title={project.name}
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center">
                      <Globe className="w-12 h-12 text-muted-foreground/30" />
                    </div>
                  )}
                  
                  {/* Status badge */}
                  <div className={`absolute top-3 right-3 px-2 py-1 rounded-full text-xs font-medium ${
                    project.status === "published" 
                      ? "bg-green-500/90 text-white" 
                      : "bg-gray-500/90 text-white"
                  }`}>
                    {project.status === "published" ? "منشور ✓" : "مسودة"}
                  </div>
                </div>

                {/* Project info */}
                <div className="p-4">
                  <div className="flex items-start justify-between mb-3">
                    <div>
                      <h3 className="font-bold text-foreground mb-1">{project.name}</h3>
                      <p className="text-sm text-muted-foreground">{formatDate(project.updated_at)}</p>
                    </div>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <button className="p-2 hover:bg-muted rounded-lg transition-colors">
                          <MoreVertical className="w-4 h-4 text-muted-foreground" />
                        </button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem
                          className="text-destructive"
                          onClick={() => handleDeleteProject(project.id, project.name)}
                        >
                          <Trash2 className="w-4 h-4 ml-2" />
                          حذف المشروع
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </div>

                  {/* Published URL */}
                  {project.published_url && (
                    <div className="flex items-center gap-2 p-2 bg-muted rounded-lg mb-3">
                      <Globe className="w-4 h-4 text-muted-foreground flex-shrink-0" />
                      <span className="text-xs text-muted-foreground truncate flex-1 text-left" dir="ltr">
                        {project.published_url.replace('https://', '').substring(0, 40)}...
                      </span>
                      <button
                        onClick={() => copyToClipboard(project.id, project.published_url!)}
                        className="p-1 hover:bg-background rounded transition-colors"
                      >
                        {copiedId === project.id ? (
                          <Check className="w-3.5 h-3.5 text-green-500" />
                        ) : (
                          <Copy className="w-3.5 h-3.5 text-muted-foreground" />
                        )}
                      </button>
                    </div>
                  )}

                  {/* Actions */}
                  <div className="flex gap-2">
                    <Link to="/app" className="flex-1">
                      <Button variant="default" className="w-full">
                        <Bot className="w-4 h-4 ml-2" />
                        تعديل
                      </Button>
                    </Link>
                    {project.published_url && (
                      <Button
                        variant="outline"
                        size="icon"
                        onClick={() => window.open(project.published_url!, '_blank')}
                      >
                        <ExternalLink className="w-4 h-4" />
                      </Button>
                    )}
                    {project.published_url && (
                      <Button
                        variant="outline"
                        size="icon"
                        onClick={() => {
                          if (navigator.share) {
                            navigator.share({
                              title: project.name,
                              url: project.published_url!
                            });
                          } else {
                            copyToClipboard(project.id, project.published_url!);
                          }
                        }}
                      >
                        <Share2 className="w-4 h-4" />
                      </Button>
                    )}
                  </div>
                </div>
              </motion.div>
            ))}

            {/* New project card */}
            <Link
              to="/app"
              className="bg-card rounded-2xl border-2 border-dashed border-border p-6 flex flex-col items-center justify-center min-h-[350px] hover:border-primary hover:bg-primary/5 transition-all group"
            >
              <motion.div 
                className="w-16 h-16 rounded-2xl bg-muted flex items-center justify-center mb-4 group-hover:bg-primary/10 transition-colors"
                whileHover={{ scale: 1.1, rotate: 5 }}
              >
                <Plus className="w-8 h-8 text-muted-foreground group-hover:text-primary transition-colors" />
              </motion.div>
              <p className="font-medium text-muted-foreground group-hover:text-foreground transition-colors mb-2">
                مشروع جديد
              </p>
              <p className="text-sm text-muted-foreground text-center">
                تحدث مع وكيلك الذكي لبناء موقعك
              </p>
            </Link>
          </div>

          {projects.length === 0 && (
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-center py-16"
            >
              <motion.div
                animate={{ y: [0, -10, 0] }}
                transition={{ duration: 3, repeat: Infinity }}
                className="w-20 h-20 rounded-2xl hero-gradient mx-auto mb-6 flex items-center justify-center"
              >
                <Bot className="w-10 h-10 text-primary-foreground" />
              </motion.div>
              <h3 className="text-xl font-bold text-foreground mb-2">لا توجد مشاريع بعد</h3>
              <p className="text-muted-foreground mb-6">ابدأ بإنشاء مشروعك الأول مع وكيلك الذكي</p>
              <Link to="/app">
                <Button variant="hero" size="lg">
                  <Plus className="w-5 h-5" />
                  ابدأ مشروعك الأول
                </Button>
              </Link>
            </motion.div>
          )}
        </div>
      </main>
    </div>
  );
};

export default Dashboard;
