import { useEffect, useState } from "react";
import { useSearchParams, Link } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { Loader2, Bot, ExternalLink, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";

const ViewSite = () => {
  const [searchParams] = useSearchParams();
  const subdomain = searchParams.get("s");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [htmlContent, setHtmlContent] = useState<string | null>(null);

  useEffect(() => {
    const fetchSite = async () => {
      if (!subdomain) {
        setError("لم يتم تحديد عنوان الموقع");
        setLoading(false);
        return;
      }

      try {
        // Try to find by subdomain first
        let { data: project, error: err } = await supabase
          .from("projects")
          .select("id, name, html_content, status, subdomain")
          .eq("subdomain", subdomain)
          .eq("status", "published")
          .maybeSingle();

        // If not found, try by ID
        if (!project) {
          const result = await supabase
            .from("projects")
            .select("id, name, html_content, status, subdomain")
            .eq("id", subdomain)
            .eq("status", "published")
            .maybeSingle();
          
          project = result.data;
          err = result.error;
        }

        if (err) throw err;

        if (!project || !project.html_content) {
          setError("الموقع غير موجود أو لم يتم نشره بعد");
          setLoading(false);
          return;
        }

        setHtmlContent(project.html_content);
      } catch (err) {
        console.error("Error fetching site:", err);
        setError("حدث خطأ أثناء تحميل الموقع");
      } finally {
        setLoading(false);
      }
    };

    fetchSite();
  }, [subdomain]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-primary/10 to-background">
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
            <Loader2 className="w-8 h-8 text-primary-foreground animate-spin" />
          </motion.div>
          <p className="text-muted-foreground">جاري تحميل الموقع...</p>
        </motion.div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-primary/10 to-background p-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="max-w-md text-center"
        >
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ type: "spring", delay: 0.2 }}
            className="w-20 h-20 rounded-2xl hero-gradient mx-auto mb-6 flex items-center justify-center"
          >
            <Bot className="w-10 h-10 text-primary-foreground" />
          </motion.div>
          
          <h1 className="text-2xl font-bold text-foreground mb-4">{error}</h1>
          <p className="text-muted-foreground mb-8">
            هل تريد بناء موقعك الخاص؟ جرب Chat2Site الآن!
          </p>
          
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Link to="/app">
              <Button size="lg" className="gap-2">
                <Bot className="w-4 h-4" />
                ابدأ مع وكيلك
              </Button>
            </Link>
            <Link to="/">
              <Button variant="outline" size="lg" className="gap-2">
                <ArrowRight className="w-4 h-4" />
                الصفحة الرئيسية
              </Button>
            </Link>
          </div>
          
          <p className="mt-8 text-xs text-muted-foreground">
            مدعوم بواسطة Chat2Site - وكيلك الذكي لبناء المواقع
          </p>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen">
      {/* Site content */}
      <iframe
        srcDoc={htmlContent || ""}
        className="w-full h-screen border-0"
        title="الموقع المنشور"
        sandbox="allow-scripts allow-same-origin"
      />
      
      {/* Powered by badge */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1 }}
        className="fixed bottom-4 left-4 z-50"
      >
        <Link
          to="/"
          target="_blank"
          className="flex items-center gap-2 px-3 py-2 bg-card/90 backdrop-blur rounded-full shadow-lg border border-border hover:bg-card transition-colors text-xs"
        >
          <div className="w-5 h-5 rounded hero-gradient flex items-center justify-center">
            <Bot className="w-3 h-3 text-primary-foreground" />
          </div>
          <span className="text-muted-foreground">مبني بـ</span>
          <span className="font-bold text-foreground">Chat2Site</span>
          <ExternalLink className="w-3 h-3 text-muted-foreground" />
        </Link>
      </motion.div>
    </div>
  );
};

export default ViewSite;
