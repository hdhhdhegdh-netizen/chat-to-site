import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { Plus, Globe, Settings, ExternalLink, MoreVertical } from "lucide-react";
import Header from "@/components/landing/Header";

interface Project {
  id: string;
  name: string;
  status: "draft" | "published";
  lastEdited: string;
  url?: string;
}

const projects: Project[] = [
  {
    id: "1",
    name: "موقع شركة التقنية",
    status: "published",
    lastEdited: "منذ ساعتين",
    url: "tech-company.chat2site.app",
  },
  {
    id: "2",
    name: "متجر الحرف اليدوية",
    status: "draft",
    lastEdited: "منذ يوم",
  },
];

const Dashboard = () => {
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
            {projects.map((project) => (
              <div
                key={project.id}
                className="bg-card rounded-2xl border border-border p-6 shadow-card hover:shadow-elevated transition-shadow group"
              >
                {/* Project preview placeholder */}
                <div className="aspect-video bg-muted rounded-xl mb-4 flex items-center justify-center overflow-hidden">
                  <Globe className="w-12 h-12 text-muted-foreground/30" />
                </div>

                {/* Project info */}
                <div className="flex items-start justify-between mb-3">
                  <div>
                    <h3 className="font-bold text-foreground mb-1">{project.name}</h3>
                    <p className="text-sm text-muted-foreground">{project.lastEdited}</p>
                  </div>
                  <button className="p-2 hover:bg-muted rounded-lg transition-colors opacity-0 group-hover:opacity-100">
                    <MoreVertical className="w-4 h-4 text-muted-foreground" />
                  </button>
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
                  {project.url && (
                    <a
                      href={`https://${project.url}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-sm text-primary hover:underline flex items-center gap-1 mr-auto"
                    >
                      {project.url}
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
              </div>
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
        </div>
      </main>
    </div>
  );
};

export default Dashboard;
