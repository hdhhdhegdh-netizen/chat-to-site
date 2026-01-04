-- Create site_versions table for version history
CREATE TABLE public.site_versions (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  project_id UUID NOT NULL REFERENCES public.projects(id) ON DELETE CASCADE,
  html_content TEXT NOT NULL,
  version_number INTEGER NOT NULL DEFAULT 1,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  description TEXT
);

-- Create index for faster lookups
CREATE INDEX idx_site_versions_project_id ON public.site_versions(project_id);
CREATE INDEX idx_site_versions_created_at ON public.site_versions(project_id, created_at DESC);

-- Enable RLS
ALTER TABLE public.site_versions ENABLE ROW LEVEL SECURITY;

-- RLS policies for site_versions
CREATE POLICY "Users can view versions of their projects"
ON public.site_versions
FOR SELECT
USING (EXISTS (
  SELECT 1 FROM projects
  WHERE projects.id = site_versions.project_id
  AND projects.user_id = auth.uid()
));

CREATE POLICY "Users can create versions for their projects"
ON public.site_versions
FOR INSERT
WITH CHECK (EXISTS (
  SELECT 1 FROM projects
  WHERE projects.id = site_versions.project_id
  AND projects.user_id = auth.uid()
));

CREATE POLICY "Users can delete versions of their projects"
ON public.site_versions
FOR DELETE
USING (EXISTS (
  SELECT 1 FROM projects
  WHERE projects.id = site_versions.project_id
  AND projects.user_id = auth.uid()
));

-- Create project_collaborators table for sharing
CREATE TABLE public.project_collaborators (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  project_id UUID NOT NULL REFERENCES public.projects(id) ON DELETE CASCADE,
  user_email TEXT NOT NULL,
  permission TEXT NOT NULL DEFAULT 'view' CHECK (permission IN ('view', 'edit')),
  invited_by UUID REFERENCES auth.users(id),
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  UNIQUE(project_id, user_email)
);

-- Create index for collaborators
CREATE INDEX idx_project_collaborators_project_id ON public.project_collaborators(project_id);
CREATE INDEX idx_project_collaborators_email ON public.project_collaborators(user_email);

-- Enable RLS
ALTER TABLE public.project_collaborators ENABLE ROW LEVEL SECURITY;

-- RLS policies for project_collaborators
CREATE POLICY "Project owners can manage collaborators"
ON public.project_collaborators
FOR ALL
USING (EXISTS (
  SELECT 1 FROM projects
  WHERE projects.id = project_collaborators.project_id
  AND projects.user_id = auth.uid()
));

CREATE POLICY "Collaborators can view their collaborations"
ON public.project_collaborators
FOR SELECT
USING (
  user_email = (SELECT email FROM auth.users WHERE id = auth.uid())
);

-- Add custom_css and tracking columns to projects
ALTER TABLE public.projects 
ADD COLUMN IF NOT EXISTS custom_css TEXT,
ADD COLUMN IF NOT EXISTS google_analytics_id TEXT,
ADD COLUMN IF NOT EXISTS facebook_pixel_id TEXT;