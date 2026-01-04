import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { History, X, RotateCcw, Eye, Trash2, Loader2 } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";

interface Version {
  id: string;
  version_number: number;
  created_at: string;
  description: string | null;
  html_content: string;
}

interface VersionHistoryProps {
  projectId: string;
  currentHtml: string | null;
  onRestore: (html: string) => void;
}

const VersionHistory = ({ projectId, currentHtml, onRestore }: VersionHistoryProps) => {
  const [versions, setVersions] = useState<Version[]>([]);
  const [loading, setLoading] = useState(false);
  const [previewHtml, setPreviewHtml] = useState<string | null>(null);
  const [open, setOpen] = useState(false);
  const { toast } = useToast();

  const fetchVersions = async () => {
    if (!projectId) return;
    
    setLoading(true);
    try {
      const { data, error } = await supabase
        .from("site_versions")
        .select("*")
        .eq("project_id", projectId)
        .order("created_at", { ascending: false })
        .limit(20);

      if (error) throw error;
      setVersions((data as Version[]) || []);
    } catch (error) {
      console.error("Error fetching versions:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (open) {
      fetchVersions();
    }
  }, [open, projectId]);

  const saveVersion = async (description?: string) => {
    if (!projectId || !currentHtml) return;

    try {
      const nextVersion = versions.length > 0 ? versions[0].version_number + 1 : 1;
      
      const { error } = await supabase.from("site_versions").insert({
        project_id: projectId,
        html_content: currentHtml,
        version_number: nextVersion,
        description: description || `نسخة ${nextVersion}`,
      });

      if (error) throw error;
      
      toast({
        title: "تم الحفظ",
        description: "تم حفظ نسخة جديدة من الموقع",
      });
      
      fetchVersions();
    } catch (error) {
      console.error("Error saving version:", error);
      toast({
        title: "خطأ",
        description: "فشل في حفظ النسخة",
        variant: "destructive",
      });
    }
  };

  const handleRestore = (version: Version) => {
    onRestore(version.html_content);
    setOpen(false);
    toast({
      title: "تم الاستعادة",
      description: `تم استعادة النسخة ${version.version_number}`,
    });
  };

  const handleDelete = async (versionId: string) => {
    try {
      const { error } = await supabase
        .from("site_versions")
        .delete()
        .eq("id", versionId);

      if (error) throw error;
      
      setVersions(prev => prev.filter(v => v.id !== versionId));
      toast({
        title: "تم الحذف",
        description: "تم حذف النسخة",
      });
    } catch (error) {
      console.error("Error deleting version:", error);
    }
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("ar-SA", {
      day: "numeric",
      month: "short",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>
        <Button variant="ghost" size="sm" className="gap-2">
          <History className="w-4 h-4" />
          سجل التعديلات
        </Button>
      </SheetTrigger>
      <SheetContent className="w-[400px] sm:w-[540px]">
        <SheetHeader>
          <SheetTitle className="flex items-center gap-2">
            <History className="w-5 h-5" />
            سجل التعديلات
          </SheetTitle>
        </SheetHeader>

        <div className="mt-6 space-y-4">
          {/* Save current version button */}
          <Button
            onClick={() => saveVersion()}
            disabled={!currentHtml}
            className="w-full gap-2"
          >
            حفظ النسخة الحالية
          </Button>

          {/* Version list */}
          <div className="space-y-2 max-h-[60vh] overflow-y-auto">
            {loading ? (
              <div className="flex items-center justify-center py-8">
                <Loader2 className="w-6 h-6 animate-spin text-primary" />
              </div>
            ) : versions.length === 0 ? (
              <div className="text-center py-8 text-muted-foreground">
                لا توجد نسخ محفوظة بعد
              </div>
            ) : (
              <AnimatePresence>
                {versions.map((version, index) => (
                  <motion.div
                    key={version.id}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    transition={{ delay: index * 0.05 }}
                    className="p-4 bg-muted rounded-lg border border-border hover:border-primary/30 transition-colors group"
                  >
                    <div className="flex items-start justify-between">
                      <div>
                        <p className="font-medium text-foreground">
                          نسخة {version.version_number}
                        </p>
                        <p className="text-sm text-muted-foreground">
                          {formatDate(version.created_at)}
                        </p>
                        {version.description && (
                          <p className="text-xs text-muted-foreground mt-1">
                            {version.description}
                          </p>
                        )}
                      </div>
                      <div className="flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                        <Button
                          variant="ghost"
                          size="icon"
                          className="h-8 w-8"
                          onClick={() => setPreviewHtml(version.html_content)}
                        >
                          <Eye className="w-4 h-4" />
                        </Button>
                        <Button
                          variant="ghost"
                          size="icon"
                          className="h-8 w-8"
                          onClick={() => handleRestore(version)}
                        >
                          <RotateCcw className="w-4 h-4" />
                        </Button>
                        <Button
                          variant="ghost"
                          size="icon"
                          className="h-8 w-8 text-destructive"
                          onClick={() => handleDelete(version.id)}
                        >
                          <Trash2 className="w-4 h-4" />
                        </Button>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </AnimatePresence>
            )}
          </div>
        </div>

        {/* Preview modal */}
        <AnimatePresence>
          {previewHtml && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4"
              onClick={() => setPreviewHtml(null)}
            >
              <motion.div
                initial={{ scale: 0.9 }}
                animate={{ scale: 1 }}
                exit={{ scale: 0.9 }}
                className="bg-card rounded-lg w-full max-w-4xl h-[80vh] overflow-hidden"
                onClick={(e) => e.stopPropagation()}
              >
                <div className="h-10 bg-muted flex items-center justify-between px-4 border-b">
                  <span className="text-sm font-medium">معاينة النسخة</span>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="h-6 w-6"
                    onClick={() => setPreviewHtml(null)}
                  >
                    <X className="w-4 h-4" />
                  </Button>
                </div>
                <iframe
                  srcDoc={previewHtml}
                  className="w-full h-[calc(100%-40px)] bg-white"
                  title="معاينة النسخة"
                />
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </SheetContent>
    </Sheet>
  );
};

export default VersionHistory;
