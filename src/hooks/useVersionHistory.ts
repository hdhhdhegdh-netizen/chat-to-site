import { useState, useCallback } from "react";
import { supabase } from "@/integrations/supabase/client";
import { MAX_VERSION_HISTORY } from "@/lib/constants";

export interface Version {
  id: string;
  project_id: string;
  html_content: string;
  version_number: number;
  created_at: string;
  description: string | null;
}

export const useVersionHistory = (projectId?: string) => {
  const [versions, setVersions] = useState<Version[]>([]);
  const [loading, setLoading] = useState(false);

  const fetchVersions = useCallback(async () => {
    if (!projectId) return;

    setLoading(true);
    try {
      const { data, error } = await supabase
        .from("site_versions")
        .select("*")
        .eq("project_id", projectId)
        .order("created_at", { ascending: false })
        .limit(MAX_VERSION_HISTORY);

      if (error) throw error;
      setVersions((data as Version[]) || []);
    } catch (error) {
      console.error("Error fetching versions:", error);
    } finally {
      setLoading(false);
    }
  }, [projectId]);

  const saveVersion = useCallback(async (htmlContent: string, description?: string) => {
    if (!projectId || !htmlContent) return null;

    try {
      const nextVersion = versions.length > 0 ? versions[0].version_number + 1 : 1;

      const { data, error } = await supabase
        .from("site_versions")
        .insert({
          project_id: projectId,
          html_content: htmlContent,
          version_number: nextVersion,
          description: description || `نسخة ${nextVersion}`,
        })
        .select()
        .single();

      if (error) throw error;

      const newVersion = data as Version;
      setVersions(prev => [newVersion, ...prev].slice(0, MAX_VERSION_HISTORY));
      
      return newVersion;
    } catch (error) {
      console.error("Error saving version:", error);
      return null;
    }
  }, [projectId, versions]);

  const deleteVersion = useCallback(async (versionId: string) => {
    try {
      const { error } = await supabase
        .from("site_versions")
        .delete()
        .eq("id", versionId);

      if (error) throw error;
      
      setVersions(prev => prev.filter(v => v.id !== versionId));
      return true;
    } catch (error) {
      console.error("Error deleting version:", error);
      return false;
    }
  }, []);

  return {
    versions,
    loading,
    fetchVersions,
    saveVersion,
    deleteVersion,
  };
};
