import { useState, useCallback } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';

interface PublishResult {
  success: boolean;
  subdomain?: string;
  published_url?: string;
  error?: string;
}

export const usePublish = () => {
  const [isPublishing, setIsPublishing] = useState(false);
  const { toast } = useToast();

  const publishSite = useCallback(async (
    projectId: string,
    htmlContent: string,
    subdomain?: string
  ): Promise<PublishResult> => {
    setIsPublishing(true);
    
    try {
      const { data: { session } } = await supabase.auth.getSession();
      
      if (!session) {
        toast({
          title: "غير مسجل",
          description: "يجب تسجيل الدخول لنشر موقعك",
          variant: "destructive"
        });
        return { success: false, error: 'غير مصرح' };
      }

      const { data, error } = await supabase.functions.invoke('publish-site', {
        body: { projectId, htmlContent, subdomain }
      });

      if (error) {
        console.error('Publish error:', error);
        toast({
          title: "فشل النشر",
          description: error.message || "حدث خطأ أثناء نشر الموقع",
          variant: "destructive"
        });
        return { success: false, error: error.message };
      }

      if (data.success) {
        toast({
          title: "تم النشر بنجاح! 🎉",
          description: "موقعك الآن متاح على الإنترنت",
        });
        return {
          success: true,
          subdomain: data.subdomain,
          published_url: data.published_url
        };
      }

      return { success: false, error: data.error };
    } catch (error) {
      console.error('Publish error:', error);
      toast({
        title: "خطأ",
        description: "حدث خطأ غير متوقع",
        variant: "destructive"
      });
      return { success: false, error: 'خطأ غير متوقع' };
    } finally {
      setIsPublishing(false);
    }
  }, [toast]);

  const unpublishSite = useCallback(async (projectId: string) => {
    try {
      const { error } = await supabase
        .from('projects')
        .update({ 
          status: 'draft', 
          published_url: null 
        })
        .eq('id', projectId);

      if (error) throw error;

      toast({
        title: "تم إلغاء النشر",
        description: "موقعك لم يعد متاحاً على الإنترنت",
      });

      return { success: true };
    } catch (error) {
      console.error('Unpublish error:', error);
      toast({
        title: "خطأ",
        description: "فشل في إلغاء النشر",
        variant: "destructive"
      });
      return { success: false };
    }
  }, [toast]);

  return {
    isPublishing,
    publishSite,
    unpublishSite
  };
};
