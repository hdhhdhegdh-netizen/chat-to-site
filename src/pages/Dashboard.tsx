import { useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Link, useNavigate } from "react-router-dom";
import { Plus, Globe, Settings, ExternalLink, MoreVertical, Trash2, Loader2 } from "lucide-react";
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
  const { projects, loading: projectsLoading, deleteProject, refetch } = useProjects();
  const navigate = useNavigate();
  const { toast } = useToast();

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
        <Loader2 className="w-8 h-8 animate-spin text-primary" />
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
              <p className="text-muted-foreground">إدارة ومتابعة جميع مواقعك</p>
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
                className="bg-card rounded-2xl border border-border p-6 shadow-card hover:shadow-elevated transition-shadow group"
              >
                {/* Project preview placeholder */}
                <div className="aspect-video bg-muted rounded-xl mb-4 flex items-center justify-center overflow-hidden">
                  {project.html_content ? (
                    <iframe
                      srcDoc={project.html_content}
                      className="w-full h-full pointer-events-none"
                      title={project.name}
                    />
                  ) : (
                    <Globe className="w-12 h-12 text-muted-foreground/30" />
                  )}
                </div>

                {/* Project info */}
                <div className="flex items-start justify-between mb-3">
                  <div>
                    <h3 className="font-bold text-foreground mb-1">{project.name}</h3>
                    <p className="text-sm text-muted-foreground">{formatDate(project.updated_at)}</p>
                  </div>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <button className="p-2 hover:bg-muted rounded-lg transition-colors opacity-0 group-hover:opacity-100">
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

                {/* Status */}
                <div className="flex items-center gap-2 mb-4">
                  <div
                    className={`w-2 h-2 rounded-full ${
                      project.status === "published" ? "status-ready" : "status-draft"
                    }`}
                  />
                  <span className="text-sm text-muted-foreground">
                    {project.status === "published" ? "منشور" : "مسودة"}
                  </span>
                  {project.published_url && (
                    <a
                      href={`https://${project.published_url}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-sm text-primary hover:underline flex items-center gap-1 mr-auto"
                    >
                      {project.published_url}
                      <ExternalLink className="w-3 h-3" />
                    </a>
                  )}
                </div>

                {/* Actions */}
                <div className="flex gap-2">
                  <Link to="/app" className="flex-1">
                    <Button variant="default" className="w-full">
                      تعديل
                    </Button>
                  </Link>
                  <Link to="/settings">
                    <Button variant="outline" size="icon">
                      <Settings className="w-4 h-4" />
                    </Button>
                  </Link>
                </div>
              </motion.div>
            ))}

            {/* New project card */}
            <Link
              to="/app"
              className="bg-card rounded-2xl border-2 border-dashed border-border p-6 flex flex-col items-center justify-center min-h-[300px] hover:border-primary hover:bg-primary/5 transition-all group"
            >
              <div className="w-16 h-16 rounded-2xl bg-muted flex items-center justify-center mb-4 group-hover:bg-primary/10 transition-colors">
                <Plus className="w-8 h-8 text-muted-foreground group-hover:text-primary transition-colors" />
              </div>
              <p className="font-medium text-muted-foreground group-hover:text-foreground transition-colors">
                إنشاء مشروع جديد
              </p>
            </Link>
          </div>

          {projects.length === 0 && (
            <div className="text-center py-16">
              <Globe className="w-16 h-16 text-muted-foreground/30 mx-auto mb-4" />
              <h3 className="text-xl font-bold text-foreground mb-2">لا توجد مشاريع بعد</h3>
              <p className="text-muted-foreground mb-6">ابدأ بإنشاء مشروعك الأول الآن</p>
              <Link to="/app">
                <Button variant="hero">
                  <Plus className="w-5 h-5" />
                  مشروع جديد
                </Button>
              </Link>
            </div>
          )}
        </div>
      </main>
    </div>
  );
};

export default Dashboard;
