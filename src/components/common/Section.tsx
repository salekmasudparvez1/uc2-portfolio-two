

import { motion, useReducedMotion, type Variants } from "motion/react";
import type { SectionConfig } from "../../config/sectionsConfig";
import { useMemo, type ReactNode } from "react";


interface SectionProps {
  sectionConfig: SectionConfig;
  children: ReactNode;
  className?: string;
}

const Section = ({
  sectionConfig,
  children,
  className = "",
}: SectionProps) => {
  const prefersReducedMotion = useReducedMotion();
  const isMobile =
    typeof window !== "undefined" && window.innerWidth < 768;


  const sectionVariants = useMemo<Variants>(
    () => ({
      hidden: prefersReducedMotion
        ? { opacity: 1 }
        : {
            opacity: 0,
            y: isMobile ? 12 : 24,
          },
      visible: {
        opacity: 1,
        y: 0,
        transition: {
          duration: prefersReducedMotion ? 0 : isMobile ? 0.4 : 0.5,
          ease: "easeOut",
        },
      },
    }),
    [prefersReducedMotion, isMobile]
  );

  const containerVariants = useMemo<Variants>(
    () => ({
      hidden: { opacity: 0 },
      visible: {
        opacity: 1,
        transition: {
          staggerChildren: prefersReducedMotion ? 0 : 0.05,
          delayChildren: prefersReducedMotion ? 0 : 0.1,
        },
      },
    }),
    [prefersReducedMotion]
  );

  return (
    <motion.section
      data-section-id={sectionConfig.id}
      aria-label={sectionConfig.ariaLabel}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: false, margin: "-200px" }}
      variants={sectionVariants}
      className={className}
    >
      {/* Container for staggered children animations */}
      <motion.div variants={containerVariants} className="w-full">
        {children}
      </motion.div>
    </motion.section>
  );
};

export default Section;
