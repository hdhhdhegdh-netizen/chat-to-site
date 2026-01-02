import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

const SYSTEM_PROMPT = `أنت Chat2Site، وكيل ذكاء اصطناعي متخصص في بناء المواقع. مهمتك:

1. فهم طلب المستخدم بدقة
2. اتخاذ قرارات التصميم والتنفيذ
3. الرد بإجابات قصيرة ومحددة تصف ما تم تنفيذه

قواعد الرد:
- استخدم العربية دائمًا
- ابدأ بـ "تم" أو "جاري" لوصف الإجراء
- كن موجزًا ومباشرًا
- لا تسأل، نفّذ
- اقترح تحسينات إذا كانت مفيدة

أنت لست أداة، أنت وكيل تنفيذي. المستخدم يخبرك ماذا يريد وأنت تنفذ.

أمثلة على ردودك:
- "تم إنشاء الصفحة الرئيسية مع قسم Hero وزر CTA"
- "تم تعديل الألوان إلى التدرج الأزرق"
- "تم إضافة قسم الخدمات مع 4 بطاقات"
- "جاري بناء نموذج التواصل..."`;

serve(async (req) => {
  // Handle CORS preflight
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { messages, projectDescription } = await req.json();
    
    const LOVABLE_API_KEY = Deno.env.get('LOVABLE_API_KEY');
    if (!LOVABLE_API_KEY) {
      console.error('LOVABLE_API_KEY is not configured');
      throw new Error('مفتاح API غير مكوّن');
    }

    console.log('Processing chat request with', messages?.length || 0, 'messages');

    // Build context with project description if provided
    let systemContent = SYSTEM_PROMPT;
    if (projectDescription) {
      systemContent += `\n\nوصف المشروع الحالي: ${projectDescription}`;
    }

    const response = await fetch("https://ai.gateway.lovable.dev/v1/chat/completions", {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${LOVABLE_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: "google/gemini-2.5-flash",
        messages: [
          { role: "system", content: systemContent },
          ...messages,
        ],
        stream: true,
      }),
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error('AI Gateway error:', response.status, errorText);
      
      if (response.status === 429) {
        return new Response(
          JSON.stringify({ error: "تم تجاوز حد الطلبات. يرجى المحاولة لاحقًا." }),
          { status: 429, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
        );
      }
      if (response.status === 402) {
        return new Response(
          JSON.stringify({ error: "يرجى إضافة رصيد لحسابك." }),
          { status: 402, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
        );
      }
      
      return new Response(
        JSON.stringify({ error: "خطأ في معالجة الطلب" }),
        { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    console.log('Streaming response from AI Gateway');
    
    return new Response(response.body, {
      headers: { ...corsHeaders, 'Content-Type': 'text/event-stream' },
    });

  } catch (error) {
    console.error('Chat AI error:', error);
    return new Response(
      JSON.stringify({ error: error instanceof Error ? error.message : 'خطأ غير معروف' }),
      { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  }
});
