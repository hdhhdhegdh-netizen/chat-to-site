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
    const url = new URL(req.url);
    const subdomain = url.searchParams.get('subdomain');

    if (!subdomain) {
      console.error('No subdomain provided');
      return new Response(
        generateErrorPage('الموقع غير موجود', 'لم يتم تحديد عنوان الموقع'),
        { 
          status: 400, 
          headers: { ...corsHeaders, 'Content-Type': 'text/html; charset=utf-8' } 
        }
      );
    }

    console.log(`Serving site for subdomain: ${subdomain}`);

    const supabaseUrl = Deno.env.get('SUPABASE_URL')!;
    const supabaseKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!;
    const supabase = createClient(supabaseUrl, supabaseKey);

    // First try to find by subdomain
    let { data: project, error } = await supabase
      .from('projects')
      .select('id, name, html_content, status, subdomain, published_url')
      .eq('subdomain', subdomain)
      .eq('status', 'published')
      .maybeSingle();

    // If not found by subdomain, try by project ID
    if (!project) {
      const result = await supabase
        .from('projects')
        .select('id, name, html_content, status, subdomain, published_url')
        .eq('id', subdomain)
        .eq('status', 'published')
        .maybeSingle();
      
      project = result.data;
      error = result.error;
    }

    if (error) {
      console.error('Database error:', error);
      return new Response(
        generateErrorPage('خطأ', 'حدث خطأ أثناء تحميل الموقع'),
        { 
          status: 500, 
          headers: { ...corsHeaders, 'Content-Type': 'text/html; charset=utf-8' } 
        }
      );
    }

    if (!project || !project.html_content) {
      console.log(`Site not found for subdomain: ${subdomain}`);
      return new Response(
        generateNotFoundPage(),
        { 
          status: 404, 
          headers: { ...corsHeaders, 'Content-Type': 'text/html; charset=utf-8' } 
        }
      );
    }

    console.log(`Successfully serving site: ${project.name}`);

    // Return the HTML content
    return new Response(project.html_content, {
      status: 200,
      headers: {
        ...corsHeaders,
        'Content-Type': 'text/html; charset=utf-8',
        'Cache-Control': 'public, max-age=3600',
      },
    });

  } catch (error) {
    console.error('Error serving site:', error);
    return new Response(
      generateErrorPage('خطأ', 'حدث خطأ غير متوقع'),
      { 
        status: 500, 
        headers: { ...corsHeaders, 'Content-Type': 'text/html; charset=utf-8' } 
      }
    );
  }
});

function generateErrorPage(title: string, message: string): string {
  return `<!DOCTYPE html>
<html lang="ar" dir="rtl">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>${title} - Chat2Site</title>
  <link href="https://fonts.googleapis.com/css2?family=Tajawal:wght@400;500;700&display=swap" rel="stylesheet">
  <style>
    * { margin: 0; padding: 0; box-sizing: border-box; }
    body {
      font-family: 'Tajawal', sans-serif;
      min-height: 100vh;
      display: flex;
      align-items: center;
      justify-content: center;
      background: linear-gradient(135deg, #1e3a5f 0%, #0f172a 100%);
      color: white;
      text-align: center;
      padding: 20px;
    }
    .container {
      max-width: 500px;
    }
    .icon {
      width: 80px;
      height: 80px;
      background: rgba(255,255,255,0.1);
      border-radius: 20px;
      display: flex;
      align-items: center;
      justify-content: center;
      margin: 0 auto 24px;
      font-size: 40px;
    }
    h1 { font-size: 2rem; margin-bottom: 12px; }
    p { color: rgba(255,255,255,0.7); font-size: 1.1rem; margin-bottom: 24px; }
    a {
      display: inline-block;
      padding: 12px 24px;
      background: #3b82f6;
      color: white;
      text-decoration: none;
      border-radius: 8px;
      font-weight: 500;
      transition: background 0.2s;
    }
    a:hover { background: #2563eb; }
  </style>
</head>
<body>
  <div class="container">
    <div class="icon">⚠️</div>
    <h1>${title}</h1>
    <p>${message}</p>
    <a href="https://chat2site.app">ابنِ موقعك مع Chat2Site</a>
  </div>
</body>
</html>`;
}

function generateNotFoundPage(): string {
  return `<!DOCTYPE html>
<html lang="ar" dir="rtl">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>الموقع غير موجود - Chat2Site</title>
  <link href="https://fonts.googleapis.com/css2?family=Tajawal:wght@400;500;700&display=swap" rel="stylesheet">
  <style>
    * { margin: 0; padding: 0; box-sizing: border-box; }
    body {
      font-family: 'Tajawal', sans-serif;
      min-height: 100vh;
      display: flex;
      align-items: center;
      justify-content: center;
      background: linear-gradient(135deg, #1e3a5f 0%, #0f172a 100%);
      color: white;
      text-align: center;
      padding: 20px;
    }
    .container {
      max-width: 500px;
    }
    .icon {
      width: 100px;
      height: 100px;
      background: linear-gradient(135deg, #3b82f6, #8b5cf6);
      border-radius: 24px;
      display: flex;
      align-items: center;
      justify-content: center;
      margin: 0 auto 32px;
      font-size: 48px;
      box-shadow: 0 20px 40px rgba(59, 130, 246, 0.3);
    }
    h1 { font-size: 2.5rem; margin-bottom: 16px; }
    p { color: rgba(255,255,255,0.7); font-size: 1.2rem; margin-bottom: 32px; line-height: 1.6; }
    .cta {
      display: inline-block;
      padding: 16px 32px;
      background: linear-gradient(135deg, #3b82f6, #8b5cf6);
      color: white;
      text-decoration: none;
      border-radius: 12px;
      font-weight: 700;
      font-size: 1.1rem;
      transition: transform 0.2s, box-shadow 0.2s;
      box-shadow: 0 10px 30px rgba(59, 130, 246, 0.3);
    }
    .cta:hover {
      transform: translateY(-2px);
      box-shadow: 0 15px 40px rgba(59, 130, 246, 0.4);
    }
    .footer {
      margin-top: 48px;
      color: rgba(255,255,255,0.5);
      font-size: 0.9rem;
    }
  </style>
</head>
<body>
  <div class="container">
    <div class="icon">🔍</div>
    <h1>الموقع غير موجود</h1>
    <p>هذا العنوان غير متاح أو لم يتم نشره بعد.<br>هل تريد بناء موقعك الخاص؟</p>
    <a href="https://chat2site.app" class="cta">ابدأ الآن مجاناً</a>
    <div class="footer">
      مدعوم بواسطة Chat2Site - وكيلك الذكي لبناء المواقع
    </div>
  </div>
</body>
</html>`;
}
