import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { projectId, htmlContent, subdomain } = await req.json();

    if (!projectId || !htmlContent) {
      console.error('Missing required fields');
      return new Response(
        JSON.stringify({ error: 'معرف المشروع والمحتوى مطلوبان' }),
        { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    console.log(`Publishing project: ${projectId}`);

    const supabaseUrl = Deno.env.get('SUPABASE_URL')!;
    const supabaseKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!;
    const supabase = createClient(supabaseUrl, supabaseKey);

    // Get authorization header to identify user
    const authHeader = req.headers.get('Authorization');
    if (!authHeader) {
      return new Response(
        JSON.stringify({ error: 'غير مصرح' }),
        { status: 401, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    // Create a client with user's auth token
    const userSupabase = createClient(supabaseUrl, Deno.env.get('SUPABASE_ANON_KEY')!, {
      global: { headers: { Authorization: authHeader } }
    });

    // Verify user owns this project
    const { data: project, error: projectError } = await userSupabase
      .from('projects')
      .select('id, user_id, name, subdomain')
      .eq('id', projectId)
      .single();

    if (projectError || !project) {
      console.error('Project not found or access denied:', projectError);
      return new Response(
        JSON.stringify({ error: 'المشروع غير موجود أو لا تملك صلاحية الوصول' }),
        { status: 404, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    // Generate subdomain if not provided
    let finalSubdomain = subdomain || project.subdomain;
    if (!finalSubdomain) {
      // Generate a unique subdomain from project name or ID
      const cleanName = project.name
        .toLowerCase()
        .replace(/[^a-z0-9\u0600-\u06FF]/g, '-')
        .replace(/-+/g, '-')
        .substring(0, 20);
      
      finalSubdomain = `${cleanName}-${projectId.substring(0, 8)}`;
    }

    // Check if subdomain is available
    const { data: existingProject } = await supabase
      .from('projects')
      .select('id')
      .eq('subdomain', finalSubdomain)
      .neq('id', projectId)
      .maybeSingle();

    if (existingProject) {
      // Add random suffix if subdomain is taken
      finalSubdomain = `${finalSubdomain}-${Date.now().toString(36)}`;
    }

    // Construct the public URL
    const supabaseProjectId = supabaseUrl.match(/https:\/\/([^.]+)/)?.[1] || '';
    const publishedUrl = `https://${supabaseProjectId}.supabase.co/functions/v1/serve-site?subdomain=${finalSubdomain}`;

    // Update project with published status
    const { error: updateError } = await supabase
      .from('projects')
      .update({
        status: 'published',
        subdomain: finalSubdomain,
        published_url: publishedUrl,
        html_content: htmlContent,
        updated_at: new Date().toISOString()
      })
      .eq('id', projectId);

    if (updateError) {
      console.error('Failed to update project:', updateError);
      return new Response(
        JSON.stringify({ error: 'فشل في تحديث المشروع' }),
        { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    console.log(`Successfully published project ${projectId} to ${publishedUrl}`);

    return new Response(
      JSON.stringify({
        success: true,
        subdomain: finalSubdomain,
        published_url: publishedUrl,
        message: 'تم نشر موقعك بنجاح!'
      }),
      { 
        status: 200, 
        headers: { ...corsHeaders, 'Content-Type': 'application/json' } 
      }
    );

  } catch (error) {
    console.error('Error publishing site:', error);
    return new Response(
      JSON.stringify({ error: 'حدث خطأ أثناء النشر' }),
      { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  }
});
