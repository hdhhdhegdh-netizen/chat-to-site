import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Share2, X, UserPlus, Trash2, Loader2, Mail, Eye, Edit } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface Collaborator {
  id: string;
  user_email: string;
  permission: "view" | "edit";
  created_at: string;
}

interface ShareProjectProps {
  projectId: string;
  projectName: string;
}

const ShareProject = ({ projectId, projectName }: ShareProjectProps) => {
  const [open, setOpen] = useState(false);
  const [collaborators, setCollaborators] = useState<Collaborator[]>([]);
  const [loading, setLoading] = useState(false);
  const [adding, setAdding] = useState(false);
  const [email, setEmail] = useState("");
  const [permission, setPermission] = useState<"view" | "edit">("view");
  const { toast } = useToast();

  const fetchCollaborators = async () => {
    if (!projectId) return;
    
    setLoading(true);
    try {
      const { data, error } = await supabase
        .from("project_collaborators")
        .select("*")
        .eq("project_id", projectId)
        .order("created_at", { ascending: false });

      if (error) throw error;
      setCollaborators((data as Collaborator[]) || []);
    } catch (error) {
      console.error("Error fetching collaborators:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (open) {
      fetchCollaborators();
    }
  }, [open, projectId]);

  const handleAddCollaborator = async () => {
    if (!email.trim() || !projectId) return;

    setAdding(true);
    try {
      const { data: { user } } = await supabase.auth.getUser();
      
      const { error } = await supabase.from("project_collaborators").insert({
        project_id: projectId,
        user_email: email.toLowerCase().trim(),
        permission,
        invited_by: user?.id,
      });

      if (error) {
        if (error.code === "23505") {
          toast({
            title: "المستخدم موجود",
            description: "هذا البريد مضاف مسبقاً",
            variant: "destructive",
          });
        } else {
          throw error;
        }
      } else {
        toast({
          title: "تمت الإضافة",
          description: `تم إضافة ${email} للمشروع`,
        });
        setEmail("");
        fetchCollaborators();
      }
    } catch (error) {
      console.error("Error adding collaborator:", error);
      toast({
        title: "خطأ",
        description: "فشل في إضافة المتعاون",
        variant: "destructive",
      });
    } finally {
      setAdding(false);
    }
  };

  const handleRemoveCollaborator = async (collaboratorId: string) => {
    try {
      const { error } = await supabase
        .from("project_collaborators")
        .delete()
        .eq("id", collaboratorId);

      if (error) throw error;
      
      setCollaborators(prev => prev.filter(c => c.id !== collaboratorId));
      toast({
        title: "تمت الإزالة",
        description: "تم إزالة المتعاون من المشروع",
      });
    } catch (error) {
      console.error("Error removing collaborator:", error);
    }
  };

  const handleUpdatePermission = async (collaboratorId: string, newPermission: "view" | "edit") => {
    try {
      const { error } = await supabase
        .from("project_collaborators")
        .update({ permission: newPermission })
        .eq("id", collaboratorId);

      if (error) throw error;
      
      setCollaborators(prev => 
        prev.map(c => c.id === collaboratorId ? { ...c, permission: newPermission } : c)
      );
    } catch (error) {
      console.error("Error updating permission:", error);
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="outline" size="sm" className="gap-2">
          <Share2 className="w-4 h-4" />
          مشاركة
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Share2 className="w-5 h-5" />
            مشاركة المشروع
          </DialogTitle>
          <DialogDescription>
            شارك "{projectName}" مع فريقك
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4 py-4">
          {/* Add collaborator form */}
          <div className="space-y-3">
            <Label>إضافة متعاون</Label>
            <div className="flex gap-2">
              <Input
                type="email"
                placeholder="البريد الإلكتروني"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="flex-1"
                dir="ltr"
              />
              <Select value={permission} onValueChange={(v: "view" | "edit") => setPermission(v)}>
                <SelectTrigger className="w-24">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="view">
                    <span className="flex items-center gap-1">
                      <Eye className="w-3 h-3" />
                      مشاهدة
                    </span>
                  </SelectItem>
                  <SelectItem value="edit">
                    <span className="flex items-center gap-1">
                      <Edit className="w-3 h-3" />
                      تعديل
                    </span>
                  </SelectItem>
                </SelectContent>
              </Select>
            </div>
            <Button
              onClick={handleAddCollaborator}
              disabled={!email.trim() || adding}
              className="w-full gap-2"
            >
              {adding ? (
                <Loader2 className="w-4 h-4 animate-spin" />
              ) : (
                <UserPlus className="w-4 h-4" />
              )}
              إضافة
            </Button>
          </div>

          {/* Collaborators list */}
          <div className="space-y-2">
            <Label>المتعاونون ({collaborators.length})</Label>
            {loading ? (
              <div className="flex items-center justify-center py-4">
                <Loader2 className="w-5 h-5 animate-spin text-primary" />
              </div>
            ) : collaborators.length === 0 ? (
              <div className="text-center py-4 text-sm text-muted-foreground">
                لا يوجد متعاونون بعد
              </div>
            ) : (
              <div className="space-y-2 max-h-48 overflow-y-auto">
                <AnimatePresence>
                  {collaborators.map((collaborator) => (
                    <motion.div
                      key={collaborator.id}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, x: -20 }}
                      className="flex items-center gap-3 p-3 bg-muted rounded-lg group"
                    >
                      <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center">
                        <Mail className="w-4 h-4 text-primary" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium truncate" dir="ltr">
                          {collaborator.user_email}
                        </p>
                      </div>
                      <Select
                        value={collaborator.permission}
                        onValueChange={(v: "view" | "edit") => 
                          handleUpdatePermission(collaborator.id, v)
                        }
                      >
                        <SelectTrigger className="w-20 h-8 text-xs">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="view">مشاهدة</SelectItem>
                          <SelectItem value="edit">تعديل</SelectItem>
                        </SelectContent>
                      </Select>
                      <Button
                        variant="ghost"
                        size="icon"
                        className="h-8 w-8 opacity-0 group-hover:opacity-100 transition-opacity text-destructive"
                        onClick={() => handleRemoveCollaborator(collaborator.id)}
                      >
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </motion.div>
                  ))}
                </AnimatePresence>
              </div>
            )}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default ShareProject;
