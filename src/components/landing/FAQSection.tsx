import { motion } from "framer-motion";
import { HelpCircle, Plus, Minus } from "lucide-react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const faqs = [
  {
    question: "كيف يعمل Chat2Site؟",
    answer: "ببساطة، تتحدث مع الذكاء الاصطناعي بالعربية وتصف له موقعك المطلوب. الوكيل الذكي يفهم احتياجاتك ويبني الموقع مباشرة أمامك في الوقت الحقيقي، بدون أي تدخل تقني منك."
  },
  {
    question: "هل أحتاج خبرة برمجية؟",
    answer: "لا أبداً! Chat2Site مصمم للجميع. كل ما تحتاجه هو وصف ما تريده بلغتك العادية، والذكاء الاصطناعي يتولى كل التفاصيل التقنية نيابة عنك."
  },
  {
    question: "كم يستغرق بناء موقع كامل؟",
    answer: "يمكنك الحصول على موقع احترافي جاهز للنشر في أقل من ساعة! بعض المستخدمين أنجزوا مواقعهم في 15 دقيقة فقط."
  },
  {
    question: "هل يمكنني تعديل الموقع بعد إنشائه؟",
    answer: "بالتأكيد! يمكنك العودة في أي وقت والتحدث مع الوكيل لإجراء أي تعديلات. فقط اطلب ما تريد تغييره وسيتم تنفيذه فوراً."
  },
  {
    question: "ما هي خيارات النشر المتاحة؟",
    answer: "نوفر لك نطاق فرعي مجاني، أو يمكنك ربط نطاقك الخاص بسهولة. موقعك سيكون متاحاً للعالم بضغطة زر واحدة."
  },
  {
    question: "هل الموقع متوافق مع الجوال؟",
    answer: "نعم! جميع المواقع المُنشأة تكون متجاوبة بشكل كامل وتعمل بشكل مثالي على جميع الأجهزة: الجوال، التابلت، والحاسوب."
  }
];

const FAQSection = () => {
  return (
    <section className="py-24 relative overflow-hidden" dir="rtl">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-background to-primary/5" />
      
      {/* Decorative elements */}
      <motion.div
        className="absolute top-40 left-10 w-72 h-72 bg-gradient-to-br from-primary/10 to-purple-500/10 rounded-full blur-3xl"
        animate={{
          scale: [1, 1.1, 1],
          opacity: [0.3, 0.5, 0.3],
        }}
        transition={{ duration: 10, repeat: Infinity }}
      />

      <div className="container mx-auto px-4 relative z-10">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <motion.div
            initial={{ scale: 0 }}
            whileInView={{ scale: 1 }}
            viewport={{ once: true }}
            transition={{ type: "spring", stiffness: 200, delay: 0.2 }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-primary/20 to-purple-500/20 border border-primary/30 mb-6"
          >
            <HelpCircle className="w-4 h-4 text-primary" />
            <span className="text-sm font-medium text-primary">الأسئلة الشائعة</span>
          </motion.div>
          
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            <span className="bg-gradient-to-l from-primary via-purple-500 to-pink-500 bg-clip-text text-transparent">
              كل ما تريد معرفته
            </span>
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            إجابات واضحة لأكثر الأسئلة شيوعاً
          </p>
        </motion.div>

        {/* FAQ Accordion */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="max-w-3xl mx-auto"
        >
          <Accordion type="single" collapsible className="space-y-4">
            {faqs.map((faq, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: index * 0.1 }}
              >
                <AccordionItem
                  value={`item-${index}`}
                  className="group bg-card/60 backdrop-blur-xl border border-white/10 rounded-xl px-6 overflow-hidden hover:border-primary/30 transition-colors duration-300"
                >
                  <AccordionTrigger className="text-right py-5 hover:no-underline [&[data-state=open]>div>.plus-icon]:hidden [&[data-state=open]>div>.minus-icon]:block">
                    <span className="text-lg font-medium text-foreground group-hover:text-primary transition-colors">
                      {faq.question}
                    </span>
                    <div className="mr-auto ml-4 w-8 h-8 rounded-full bg-gradient-to-br from-primary/20 to-purple-500/20 flex items-center justify-center shrink-0">
                      <Plus className="w-4 h-4 text-primary plus-icon" />
                      <Minus className="w-4 h-4 text-primary minus-icon hidden" />
                    </div>
                  </AccordionTrigger>
                  <AccordionContent className="text-muted-foreground pb-5 leading-relaxed">
                    {faq.answer}
                  </AccordionContent>
                </AccordionItem>
              </motion.div>
            ))}
          </Accordion>
        </motion.div>

        {/* Contact CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.6 }}
          className="text-center mt-12"
        >
          <p className="text-muted-foreground">
            لم تجد إجابة سؤالك؟{" "}
            <a href="#" className="text-primary hover:underline font-medium">
              تواصل معنا
            </a>
          </p>
        </motion.div>
      </div>
    </section>
  );
};

export default FAQSection;
