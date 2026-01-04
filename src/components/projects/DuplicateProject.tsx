import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Copy, Loader2 } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import { useAuth } from "@/hooks/useAuth";

interface DuplicateProjectProps {
  projectId: string;
  projectName: string;
  onDuplicate?: (newProjectId: string) => void;
}

const DuplicateProject = ({ projectId, projectName, onDuplicate }: DuplicateProjectProps) => {
  const [duplicating, setDuplicating] = useState(false);
  const { toast } = useToast();
  const { user } = useAuth();

  const handleDuplicate = async () => {
    if (!user || !projectId) return;

    setDuplicating(true);
    try {
      // Fetch original project
      const { data: originalProject, error: fetchError } = await supabase
        .from("projects")
        .select("*")
        .eq("id", projectId)
        .single();

      if (fetchError) throw fetchError;

      // Create duplicate
      const { data: newProject, error: insertError } = await supabase
        .from("projects")
        .insert({
          user_id: user.id,
          name: `${originalProject.name} (نسخة)`,
          description: originalProject.description,
          html_content: originalProject.html_content,
          template_id: originalProject.template_id,
          status: "draft",
          // Reset published-related fields
          published_url: null,
          subdomain: null,
        })
        .select()
        .single();

      if (insertError) throw insertError;

      toast({
        title: "تم التكرار",
        description: `تم إنشاء نسخة من "${projectName}"`,
      });

      if (onDuplicate && newProject) {
        onDuplicate(newProject.id);
      }
    } catch (error) {
      console.error("Error duplicating project:", error);
      toast({
        title: "خطأ",
        description: "فشل في تكرار المشروع",
        variant: "destructive",
      });
    } finally {
      setDuplicating(false);
    }
  };

  return (
    <Button
      variant="ghost"
      size="sm"
      onClick={handleDuplicate}
      disabled={duplicating}
      className="gap-2"
    >
      {duplicating ? (
        <Loader2 className="w-4 h-4 animate-spin" />
      ) : (
        <Copy className="w-4 h-4" />
      )}
      تكرار
    </Button>
  );
};

export default DuplicateProject;
