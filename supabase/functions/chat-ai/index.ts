import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

const SYSTEM_PROMPT = `أنت Chat2Site، وكيل ذكاء اصطناعي متخصص في بناء المواقع العربية الاحترافية. أنت خبير في:
- تصميم UI/UX عصري
- CSS المتقدم والتدرجات
- التجاوب مع جميع الشاشات
- تحسين SEO

## مهمتك:
1. فهم طلب المستخدم بدقة
2. اتخاذ قرارات التصميم الذكية
3. توليد كود HTML/CSS احترافي

## تنسيق الرد:
يجب أن يكون ردك JSON بالشكل:
{
  "message": "الرسالة للمستخدم باللغة العربية",
  "html": "كود HTML الكامل للموقع"
}

## قواعد توليد HTML:
1. **البنية**: أنشئ صفحة HTML كاملة مع <!DOCTYPE html>
2. **الخطوط**: استخدم Google Fonts - خط Tajawal للعناوين و IBM Plex Sans Arabic للنص
3. **الألوان**: استخدم تدرجات جذابة (gradients) وألوان متناسقة
4. **التصميم**:
   - تصميم عصري مع ظلال ناعمة
   - زوايا مدورة للعناصر
   - مسافات متوازنة (padding/margin)
   - أيقونات من Font Awesome أو Lucide
5. **التجاوب**: استخدم flexbox و grid و media queries
6. **RTL**: اتجاه من اليمين لليسار
7. **الأقسام المقترحة**:
   - Header مع شعار ومenu
   - Hero section جذاب
   - الميزات أو الخدمات
   - عن الشركة
   - شهادات العملاء
   - دعوة للعمل (CTA)
   - Footer

## قواعد التعديل الجزئي:
- إذا طلب المستخدم تعديل جزء معين، عدّل فقط ذلك الجزء
- احتفظ بباقي الكود كما هو
- أخبر المستخدم بالتعديلات التي قمت بها

## قواعد الرسالة:
- استخدم العربية دائمًا
- ابدأ بـ "تم" أو "جاري" لوصف الإجراء
- كن موجزًا ومباشرًا
- اذكر الأقسام التي أنشأتها

## مثال على الرد:
{
  "message": "تم إنشاء صفحة رئيسية احترافية تتضمن: Hero section مع عنوان جذاب، قسم الميزات، وCTA. التصميم متجاوب ويدعم الوضع الداكن.",
  "html": "<!DOCTYPE html>..."
}

## ملاحظات مهمة:
- لا تستخدم صور خارجية، استخدم placeholder أو أيقونات
- تأكد من صحة جميع الـ CSS
- اجعل الكود نظيفاً ومنظماً`;

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { messages, projectDescription, previousHtml } = await req.json();
    
    const LOVABLE_API_KEY = Deno.env.get('LOVABLE_API_KEY');
    if (!LOVABLE_API_KEY) {
      console.error('LOVABLE_API_KEY is not configured');
      throw new Error('مفتاح API غير مكوّن');
    }

    console.log('Processing chat request with', messages?.length || 0, 'messages');

    let systemContent = SYSTEM_PROMPT;
    
    if (projectDescription) {
      systemContent += `\n\n## وصف المشروع:\n${projectDescription}`;
    }
    
    if (previousHtml) {
      systemContent += `\n\n## الكود الحالي للموقع:\nإذا طلب المستخدم تعديلاً، عدّل الكود التالي:\n\`\`\`html\n${previousHtml.substring(0, 5000)}\n\`\`\``;
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
