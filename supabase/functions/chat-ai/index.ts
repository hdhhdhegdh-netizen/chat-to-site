import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

const SYSTEM_PROMPT = `أنت Chat2Site، وكيل ذكاء اصطناعي متخصص في بناء المواقع. مهمتك:

1. فهم طلب المستخدم بدقة
2. اتخاذ قرارات التصميم والتنفيذ
3. توليد كود HTML/CSS للموقع

عند الرد، يجب أن يكون ردك بتنسيق JSON بالشكل التالي:
{
  "message": "الرسالة للمستخدم باللغة العربية",
  "html": "كود HTML الكامل للموقع"
}

قواعد توليد HTML:
- أنشئ صفحة HTML كاملة مع <!DOCTYPE html>
- استخدم CSS مضمن في <style> داخل <head>
- استخدم تصميم عصري وأنيق
- استخدم خط Tajawal العربي من Google Fonts
- اجعل التصميم متجاوب (responsive)
- استخدم ألوان جذابة ومتناسقة
- أضف تدرجات وظلال للعناصر
- RTL direction للمحتوى العربي

قواعد الرسالة:
- استخدم العربية دائمًا
- ابدأ بـ "تم" لوصف الإجراء
- كن موجزًا ومباشرًا

مثال:
{
  "message": "تم إنشاء الصفحة الرئيسية مع قسم Hero وزر CTA",
  "html": "<!DOCTYPE html><html lang='ar' dir='rtl'>..."
}`;

serve(async (req) => {
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

    const data = await response.json();
    console.log('AI response received');
    
    const content = data.choices?.[0]?.message?.content || '';
    
    // Try to parse as JSON, fallback to plain message
    let result;
    try {
      // Extract JSON from the response (may be wrapped in markdown code blocks)
      let jsonStr = content;
      const jsonMatch = content.match(/```json\s*([\s\S]*?)\s*```/);
      if (jsonMatch) {
        jsonStr = jsonMatch[1];
      } else {
        const plainMatch = content.match(/\{[\s\S]*\}/);
        if (plainMatch) {
          jsonStr = plainMatch[0];
        }
      }
      result = JSON.parse(jsonStr);
    } catch {
      result = { message: content, html: null };
    }

    return new Response(JSON.stringify(result), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });

  } catch (error) {
    console.error('Chat AI error:', error);
    return new Response(
      JSON.stringify({ error: error instanceof Error ? error.message : 'خطأ غير معروف' }),
      { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  }
});
