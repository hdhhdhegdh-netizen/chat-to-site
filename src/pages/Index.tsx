import Header from "@/components/landing/Header";
import HeroSection from "@/components/landing/HeroSection";
import StatsSection from "@/components/landing/StatsSection";
import ProblemSection from "@/components/landing/ProblemSection";
import SolutionSection from "@/components/landing/SolutionSection";
import HowItWorksSection from "@/components/landing/HowItWorksSection";
import WhySection from "@/components/landing/WhySection";
import TestimonialsSection from "@/components/landing/TestimonialsSection";
import FAQSection from "@/components/landing/FAQSection";
import CTASection from "@/components/landing/CTASection";
import Footer from "@/components/landing/Footer";
import { ScrollAnimatedSection } from "@/components/ui/scroll-animated-section";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="pt-16">
        <HeroSection />
        <ScrollAnimatedSection animation="fadeUp">
          <StatsSection />
        </ScrollAnimatedSection>
        <ScrollAnimatedSection animation="fadeUp" delay={0.1}>
          <ProblemSection />
        </ScrollAnimatedSection>
        <ScrollAnimatedSection animation="fadeUp" delay={0.1}>
          <SolutionSection />
        </ScrollAnimatedSection>
        <ScrollAnimatedSection animation="fadeUp" delay={0.1}>
          <HowItWorksSection />
        </ScrollAnimatedSection>
        <ScrollAnimatedSection animation="fadeUp" delay={0.1}>
          <WhySection />
        </ScrollAnimatedSection>
        <ScrollAnimatedSection animation="fadeUp" delay={0.1}>
          <TestimonialsSection />
        </ScrollAnimatedSection>
        <ScrollAnimatedSection animation="fadeUp" delay={0.1}>
          <FAQSection />
        </ScrollAnimatedSection>
        <ScrollAnimatedSection animation="scaleUp" delay={0.1}>
          <CTASection />
        </ScrollAnimatedSection>
      </main>
      <Footer />
    </div>
  );
};

export default Index;
