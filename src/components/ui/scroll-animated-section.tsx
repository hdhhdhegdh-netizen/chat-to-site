import { motion, Variants } from "framer-motion";
import { useScrollAnimation, scrollAnimationVariants } from "@/hooks/useScrollAnimation";
import { ReactNode } from "react";

type AnimationType = "fadeUp" | "fadeDown" | "fadeLeft" | "fadeRight" | "scaleUp" | "staggerChildren";

interface ScrollAnimatedSectionProps {
  children: ReactNode;
  animation?: AnimationType;
  delay?: number;
  duration?: number;
  className?: string;
  threshold?: number;
  customVariants?: Variants;
}

export const ScrollAnimatedSection = ({
  children,
  animation = "fadeUp",
  delay = 0,
  duration = 0.6,
  className = "",
  threshold = 0.1,
  customVariants,
}: ScrollAnimatedSectionProps) => {
  const { ref, isInView } = useScrollAnimation({ threshold });

  const variants = customVariants || scrollAnimationVariants[animation];

  return (
    <motion.div
      ref={ref}
      initial="hidden"
      animate={isInView ? "visible" : "hidden"}
      variants={variants}
      transition={{
        duration,
        delay,
        ease: "easeOut",
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
};

interface ScrollAnimatedItemProps {
  children: ReactNode;
  className?: string;
  delay?: number;
}

export const ScrollAnimatedItem = ({
  children,
  className = "",
  delay = 0,
}: ScrollAnimatedItemProps) => {
  return (
    <motion.div
      variants={{
        hidden: { opacity: 0, y: 20 },
        visible: { opacity: 1, y: 0 },
      }}
      transition={{ delay }}
      className={className}
    >
      {children}
    </motion.div>
  );
};

export default ScrollAnimatedSection;
