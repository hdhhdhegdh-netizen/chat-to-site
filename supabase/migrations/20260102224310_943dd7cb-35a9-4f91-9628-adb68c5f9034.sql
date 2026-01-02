-- Add SEO fields to projects table
ALTER TABLE public.projects 
ADD COLUMN IF NOT EXISTS seo_title TEXT,
ADD COLUMN IF NOT EXISTS seo_description TEXT,
ADD COLUMN IF NOT EXISTS og_image TEXT,
ADD COLUMN IF NOT EXISTS whatsapp_number TEXT;

-- Create analytics table for tracking visits
CREATE TABLE public.analytics (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  project_id UUID NOT NULL REFERENCES public.projects(id) ON DELETE CASCADE,
  page_path TEXT NOT NULL DEFAULT '/',
  visitor_ip TEXT,
  user_agent TEXT,
  referrer TEXT,
  country TEXT,
  city TEXT,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create index for faster queries
CREATE INDEX idx_analytics_project_id ON public.analytics(project_id);
CREATE INDEX idx_analytics_created_at ON public.analytics(created_at);

-- Enable RLS
ALTER TABLE public.analytics ENABLE ROW LEVEL SECURITY;

-- Users can view analytics for their own projects
CREATE POLICY "Users can view analytics for their projects"
ON public.analytics
FOR SELECT
USING (
  EXISTS (
    SELECT 1 FROM public.projects
    WHERE projects.id = analytics.project_id
    AND projects.user_id = auth.uid()
  )
);

-- Allow public insert for tracking (from edge function)
CREATE POLICY "Allow public insert for tracking"
ON public.analytics
FOR INSERT
WITH CHECK (true);

-- Enable realtime for analytics
ALTER PUBLICATION supabase_realtime ADD TABLE public.analytics;