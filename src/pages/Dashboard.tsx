import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Link, useNavigate } from "react-router-dom";
import { Plus, Globe, Settings, ExternalLink, MoreVertical, Trash2, Bot, Copy, Check, Share2, Sparkles, Search, Filter, FolderOpen } from "lucide-react";
import Header from "@/components/landing/Header";
import { useAuth } from "@/hooks/useAuth";
import { useProjects, Project } from "@/hooks/useProjects";
import { useAnalytics } from "@/hooks/useAnalytics";
import { useToast } from "@/hooks/use-toast";
import { motion, AnimatePresence } from "framer-motion";
import { StatsCards } from "@/components/analytics/StatsCards";
import { VisitorsChart } from "@/components/analytics/VisitorsChart";
import { SkeletonPage } from "@/components/ui/skeleton-card";
import SEO from "@/components/SEO";
import DuplicateProject from "@/components/projects/DuplicateProject";
import ShareProject from "@/components/projects/ShareProject";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

type FilterStatus = "all" | "published" | "draft";
type SortBy = "updated" | "created" | "name";

const Dashboard = () => {
  const { user, loading: authLoading } = useAuth();
  const { projects, loading: projectsLoading, deleteProject, refetch } = useProjects();
  const { data: analyticsData, loading: analyticsLoading } = useAnalytics(user?.id);
  const navigate = useNavigate();
  const { toast } = useToast();
  const [copiedId, setCopiedId] = useState<string | null>(null);
  
  // Search and filter state
  const [searchQuery, setSearchQuery] = useState("");
  const [filterStatus, setFilterStatus] = useState<FilterStatus>("all");
  const [sortBy, setSortBy] = useState<SortBy>("updated");

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

  const handleDuplicate = () => {
    refetch();
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

  // Filter and sort projects
  const filteredProjects = projects
    .filter((project) => {
      // Search filter
      const matchesSearch = project.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        (project.description?.toLowerCase().includes(searchQuery.toLowerCase()));
      
      // Status filter
      const matchesStatus = filterStatus === "all" || project.status === filterStatus;
      
      return matchesSearch && matchesStatus;
    })
    .sort((a, b) => {
      switch (sortBy) {
        case "name":
          return a.name.localeCompare(b.name, "ar");
        case "created":
          return new Date(b.created_at).getTime() - new Date(a.created_at).getTime();
        case "updated":
        default:
          return new Date(b.updated_at).getTime() - new Date(a.updated_at).getTime();
      }
    });

  if (authLoading || projectsLoading) {
    return <SkeletonPage />;
  }

  const publishedCount = projects.filter(p => p.status === "published").length;

  return (
    <div className="min-h-screen bg-background relative overflow-hidden">
      <SEO 
        title="لوحة التحكم"
        description="إدارة مشاريعك ومواقعك المنشورة من لوحة تحكم Chat2Site."
        noIndex
      />
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
      <motion.div
        className="fixed bottom-40 right-10 w-80 h-80 bg-gradient-to-br from-accent/10 to-primary/10 rounded-full blur-3xl pointer-events-none"
        animate={{
          x: [0, -20, 0],
          y: [0, -30, 0],
        }}
        transition={{
          duration: 12,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />
      
      <Header />
      <main className="pt-24 pb-16 relative z-10">
        <div className="container px-4">
          {/* Header */}
          <motion.div 
            className="flex items-center justify-between mb-8"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <div>
              <h1 className="text-3xl font-bold text-foreground mb-2">لوحة التحكم</h1>
              <p className="text-muted-foreground">
                مرحباً، {user?.email?.split('@')[0] || 'مستخدم'}
              </p>
            </div>
            <Link to="/app">
              <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                <Button className="hero-gradient text-primary-foreground shadow-lg shadow-primary/25 hover:shadow-xl hover:shadow-primary/30 transition-all">
                  <Plus className="w-5 h-5 ml-2" />
                  مشروع جديد
                </Button>
              </motion.div>
            </Link>
          </motion.div>

          {/* Stats Cards */}
          <motion.div 
            className="mb-8"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
          >
            <StatsCards
              totalProjects={projects.length}
              publishedProjects={publishedCount}
              totalVisits={analyticsData?.totalVisits || 0}
              todayVisits={analyticsData?.todayVisits || 0}
              loading={analyticsLoading}
            />
          </motion.div>

          {/* Visitors Chart */}
          {projects.length > 0 && (
            <motion.div 
              className="mb-8"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
            >
              <VisitorsChart
                data={analyticsData?.visitsPerDay || []}
                loading={analyticsLoading}
              />
            </motion.div>
          )}

          {/* Section Title with Search and Filters */}
          <motion.div 
            className="space-y-4 mb-6"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
          >
            <div className="flex items-center justify-between">
              <h2 className="text-xl font-bold text-foreground">مشاريعي</h2>
              <p className="text-sm text-muted-foreground">
                {filteredProjects.length} من {projects.length} مشروع
              </p>
            </div>
            
            {/* Search and Filters */}
            {projects.length > 0 && (
              <div className="flex flex-col sm:flex-row gap-3">
                <div className="relative flex-1">
                  <Search className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                  <Input
                    placeholder="ابحث في مشاريعك..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="pr-10 bg-background/50"
                  />
                </div>
                <div className="flex gap-2">
                  <Select value={filterStatus} onValueChange={(v: FilterStatus) => setFilterStatus(v)}>
                    <SelectTrigger className="w-32 bg-background/50">
                      <Filter className="w-4 h-4 ml-2" />
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">الكل</SelectItem>
                      <SelectItem value="published">منشور</SelectItem>
                      <SelectItem value="draft">مسودة</SelectItem>
                    </SelectContent>
                  </Select>
                  <Select value={sortBy} onValueChange={(v: SortBy) => setSortBy(v)}>
                    <SelectTrigger className="w-36 bg-background/50">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="updated">الأحدث تعديلاً</SelectItem>
                      <SelectItem value="created">الأحدث إنشاءً</SelectItem>
                      <SelectItem value="name">الاسم</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            )}
          </motion.div>

          {/* Projects grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            <AnimatePresence mode="popLayout">
              {filteredProjects.map((project, index) => (
                <motion.div
                  key={project.id}
                  layout
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  transition={{ delay: 0.1 + index * 0.05 }}
                  whileHover={{ y: -4 }}
                  className="group"
                >
                  <div className="backdrop-blur-sm bg-card/80 rounded-2xl border border-border/50 overflow-hidden shadow-lg hover:shadow-xl hover:border-primary/30 transition-all duration-300 relative">
                    {/* Hover glow effect */}
                    <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-accent/5 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none" />
                    
                    {/* Project preview */}
                    <div className="aspect-video bg-muted relative overflow-hidden">
                      {project.html_content ? (
                        <iframe
                          srcDoc={project.html_content}
                          className="w-full h-full pointer-events-none scale-100"
                          title={project.name}
                        />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-muted to-muted/50">
                          <Globe className="w-12 h-12 text-muted-foreground/30" />
                        </div>
                      )}
                      
                      {/* Status badge */}
                      <div className={`absolute top-3 right-3 px-3 py-1.5 rounded-full text-xs font-medium backdrop-blur-sm ${
                        project.status === "published" 
                          ? "bg-green-500/90 text-white shadow-lg shadow-green-500/30" 
                          : "bg-muted-foreground/90 text-white"
                      }`}>
                        {project.status === "published" ? "منشور ✓" : "مسودة"}
                      </div>
                    </div>

                    {/* Project info */}
                    <div className="p-4 relative">
                      <div className="flex items-start justify-between mb-3">
                        <div>
                          <h3 className="font-bold text-foreground mb-1 group-hover:text-primary transition-colors">{project.name}</h3>
                          <p className="text-sm text-muted-foreground">{formatDate(project.updated_at)}</p>
                        </div>
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <button className="p-2 hover:bg-muted rounded-lg transition-colors">
                              <MoreVertical className="w-4 h-4 text-muted-foreground" />
                            </button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end" className="backdrop-blur-xl bg-popover/90 border-border/50">
                            <DropdownMenuItem asChild>
                              <Link to={`/settings?project=${project.id}`} className="flex items-center">
                                <Settings className="w-4 h-4 ml-2" />
                                الإعدادات
                              </Link>
                            </DropdownMenuItem>
                            <DropdownMenuItem asChild>
                              <div className="w-full">
                                <DuplicateProject
                                  projectId={project.id}
                                  projectName={project.name}
                                  onDuplicate={handleDuplicate}
                                />
                              </div>
                            </DropdownMenuItem>
                            <DropdownMenuSeparator />
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
                        <div className="flex items-center gap-2 p-2.5 bg-muted/50 backdrop-blur-sm rounded-lg mb-3 border border-border/30">
                          <Globe className="w-4 h-4 text-primary flex-shrink-0" />
                          <span className="text-xs text-muted-foreground truncate flex-1 text-left" dir="ltr">
                            {project.published_url.replace('https://', '').substring(0, 35)}...
                          </span>
                          <button
                            onClick={() => copyToClipboard(project.id, project.published_url!)}
                            className="p-1.5 hover:bg-background rounded-md transition-colors"
                          >
                            {copiedId === project.id ? (
                              <Check className="w-3.5 h-3.5 text-green-500" />
                            ) : (
                              <Copy className="w-3.5 h-3.5 text-muted-foreground hover:text-primary transition-colors" />
                            )}
                          </button>
                        </div>
                      )}

                      {/* Actions */}
                      <div className="flex gap-2">
                        <Link to="/app" className="flex-1">
                          <Button variant="default" className="w-full group/btn">
                            <Bot className="w-4 h-4 ml-2 group-hover/btn:rotate-12 transition-transform" />
                            تعديل
                          </Button>
                        </Link>
                        {project.published_url && (
                          <>
                            <Button
                              variant="outline"
                              size="icon"
                              onClick={() => window.open(project.published_url!, '_blank')}
                              className="hover:border-primary hover:text-primary transition-colors"
                            >
                              <ExternalLink className="w-4 h-4" />
                            </Button>
                            <ShareProject projectId={project.id} projectName={project.name} />
                          </>
                        )}
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>

            {/* New project card */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 + filteredProjects.length * 0.05 }}
            >
              <Link
                to="/app"
                className="block h-full"
              >
                <motion.div
                  className="backdrop-blur-sm bg-card/50 rounded-2xl border-2 border-dashed border-border/50 p-6 flex flex-col items-center justify-center min-h-[350px] hover:border-primary hover:bg-primary/5 transition-all group relative overflow-hidden"
                  whileHover={{ scale: 1.02 }}
                >
                  {/* Glow effect on hover */}
                  <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-transparent to-accent/10 opacity-0 group-hover:opacity-100 transition-opacity" />
                  
                  <motion.div 
                    className="w-20 h-20 rounded-2xl bg-gradient-to-br from-primary/20 to-accent/20 flex items-center justify-center mb-4 group-hover:shadow-lg group-hover:shadow-primary/20 transition-all relative"
                    whileHover={{ rotate: 10 }}
                  >
                    <Plus className="w-10 h-10 text-primary" />
                  </motion.div>
                  <p className="font-medium text-foreground mb-2 relative">
                    مشروع جديد
                  </p>
                  <p className="text-sm text-muted-foreground text-center relative flex items-center gap-1">
                    <Sparkles className="w-4 h-4" />
                    تحدث مع وكيلك الذكي لبناء موقعك
                  </p>
                </motion.div>
              </Link>
            </motion.div>
          </div>

          {/* No results message */}
          {filteredProjects.length === 0 && projects.length > 0 && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-center py-12"
            >
              <FolderOpen className="w-16 h-16 text-muted-foreground/30 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-foreground mb-2">لا توجد نتائج</h3>
              <p className="text-muted-foreground mb-4">جرب تغيير معايير البحث أو الفلترة</p>
              <Button
                variant="outline"
                onClick={() => {
                  setSearchQuery("");
                  setFilterStatus("all");
                }}
              >
                إعادة ضبط الفلاتر
              </Button>
            </motion.div>
          )}

          {projects.length === 0 && (
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-center py-16"
            >
              <motion.div
                animate={{ y: [0, -10, 0] }}
                transition={{ duration: 3, repeat: Infinity }}
                className="w-24 h-24 rounded-3xl hero-gradient mx-auto mb-6 flex items-center justify-center shadow-2xl shadow-primary/30 relative"
              >
                <div className="absolute inset-0 rounded-3xl hero-gradient blur-xl opacity-50" />
                <Bot className="w-12 h-12 text-primary-foreground relative z-10" />
              </motion.div>
              <h3 className="text-2xl font-bold text-foreground mb-2">لا توجد مشاريع بعد</h3>
              <p className="text-muted-foreground mb-8">ابدأ بإنشاء مشروعك الأول مع وكيلك الذكي</p>
              <Link to="/app">
                <motion.div
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <Button className="hero-gradient text-primary-foreground shadow-lg shadow-primary/25 hover:shadow-xl hover:shadow-primary/30 transition-all">
                    <Sparkles className="w-5 h-5 ml-2" />
                    ابدأ مشروعك الأول
                  </Button>
                </motion.div>
              </Link>
            </motion.div>
          )}
        </div>
      </main>
    </div>
  );
};

export default Dashboard;
