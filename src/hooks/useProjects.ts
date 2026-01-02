import { useState, useCallback, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "./useAuth";

export interface Project {
  id: string;
  user_id: string;
  name: string;
  description: string | null;
  html_content: string | null;
  status: "draft" | "published";
  published_url: string | null;
  template_id: string | null;
  created_at: string;
  updated_at: string;
}

export const useProjects = () => {
  const { user } = useAuth();
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const [currentProject, setCurrentProject] = useState<Project | null>(null);

  const fetchProjects = useCallback(async () => {
    if (!user) {
      setProjects([]);
      setLoading(false);
      return;
    }

    try {
      const { data, error } = await supabase
        .from("projects")
        .select("*")
        .order("updated_at", { ascending: false });

      if (error) throw error;
      setProjects((data as Project[]) || []);
    } catch (error) {
      console.error("Error fetching projects:", error);
    } finally {
      setLoading(false);
    }
  }, [user]);

  useEffect(() => {
    fetchProjects();
  }, [fetchProjects]);

  const createProject = useCallback(
    async (name: string, templateId?: string, htmlContent?: string) => {
      if (!user) return null;

      try {
        const { data, error } = await supabase
          .from("projects")
          .insert({
            user_id: user.id,
            name,
            template_id: templateId || null,
            html_content: htmlContent || null,
          })
          .select()
          .single();

        if (error) throw error;
        
        const project = data as Project;
        setProjects((prev) => [project, ...prev]);
        setCurrentProject(project);
        return project;
      } catch (error) {
        console.error("Error creating project:", error);
        return null;
      }
    },
    [user]
  );

  const updateProject = useCallback(
    async (projectId: string, updates: Partial<Project>) => {
      try {
        const { data, error } = await supabase
          .from("projects")
          .update(updates)
          .eq("id", projectId)
          .select()
          .single();

        if (error) throw error;

        const project = data as Project;
        setProjects((prev) =>
          prev.map((p) => (p.id === projectId ? project : p))
        );
        
        if (currentProject?.id === projectId) {
          setCurrentProject(project);
        }
        
        return project;
      } catch (error) {
        console.error("Error updating project:", error);
        return null;
      }
    },
    [currentProject]
  );

  const deleteProject = useCallback(async (projectId: string) => {
    try {
      const { error } = await supabase
        .from("projects")
        .delete()
        .eq("id", projectId);

      if (error) throw error;

      setProjects((prev) => prev.filter((p) => p.id !== projectId));
      
      if (currentProject?.id === projectId) {
        setCurrentProject(null);
      }
      
      return true;
    } catch (error) {
      console.error("Error deleting project:", error);
      return false;
    }
  }, [currentProject]);

  const loadProject = useCallback(async (projectId: string) => {
    try {
      const { data, error } = await supabase
        .from("projects")
        .select("*")
        .eq("id", projectId)
        .single();

      if (error) throw error;
      
      const project = data as Project;
      setCurrentProject(project);
      return project;
    } catch (error) {
      console.error("Error loading project:", error);
      return null;
    }
  }, []);

  return {
    projects,
    loading,
    currentProject,
    setCurrentProject,
    createProject,
    updateProject,
    deleteProject,
    loadProject,
    refetch: fetchProjects,
  };
};
