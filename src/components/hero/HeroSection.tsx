import { useEffect, useState, useCallback } from "react";
import { motion, AnimatePresence } from "motion/react";
import { ArrowRightIcon } from "lucide-react";
import { EditableText } from "../text/EditableText";
import type { heroSectionProps } from "../../data/portfolioData";

const rotatingWords = ["amazing things", "projects", "experiences"];

const T = ({
  path,
  value,
  className = "",
  multiline = false,
  updateField,
  onEditStart,
  onEditEnd,
}: {
  path: string;
  value?: string;
  className?: string;
  multiline?: boolean;
  updateField?: (path: string, value: string) => void;
  onEditStart?: () => void;
  onEditEnd?: () => void;
}) =>
  updateField ? (
    <EditableText
      value={value}
      multiline={multiline}
      className={className}
      onUpdate={(v) => updateField(path, v)}
      onEditStart={onEditStart}
      onEditEnd={onEditEnd}
    />
  ) : (
    <span className={className}>{value}</span>
  );

const HeroSection = ({
  heroSection,
  updateField,
  onNavigate,
}: {
  heroSection: heroSectionProps;
  updateField?: (path: string, value: string) => void;
  onNavigate?: React.Dispatch<React.SetStateAction<{ page: string; id: number }>>;
}) => {
  const [wordIndex, setWordIndex] = useState(0);
  const [paused, setPaused] = useState(false);

  useEffect(() => {
    if (paused) return;
    const i = setInterval(
      () => setWordIndex((v) => (v + 1) % rotatingWords.length),
      2800
    );
    return () => clearInterval(i);
  }, [paused]);

  const onEditStart = useCallback(() => setPaused(true), []);
  const onEditEnd = useCallback(() => setPaused(false), []);
  if (!heroSection) {
    console.log(heroSection);
    return null;
  }

  return (
    <section className="relative lg:mt-0 mt-5 min-h-screen bg-white flex items-center px-6 sm:px-12 md:px-16 lg:px-32 py-16 overflow-hidden">

      {/* soft green glow */}
      <div className="absolute inset-0  bg-[radial-gradient(60%_50%_at_50%_0%,rgba(168,85,247,0.25),transparent_70%)]" />

      <div className="relative w-full grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">

        {/* LEFT CONTENT */}
        <div>
          {/* BADGE */}
          <div className="inline-flex items-center gap-2 px-4 py-2 mb-6 rounded-full border border-gray-200 text-sm text-gray-700 bg-white">
            <span>{heroSection.badgeEmoji}</span>
            <span>{heroSection.badgeText}</span>
            <T
              path="hero.nameHighlight"
              value={heroSection.nameHighlight}
              className="font-semibold text-[#a855f7]"
              updateField={updateField}
              onEditStart={onEditStart}
              onEditEnd={onEditEnd}
            />
          </div>

          {/* HEADLINE */}
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-semibold text-gray-900 leading-tight">
            <span>{heroSection.headlinePrimary} </span>

            <span className="relative inline-block text-[#a855f7]">
              <AnimatePresence mode="wait">
                <motion.span
                  key={rotatingWords[wordIndex]}
                  initial={{ y: 24, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  exit={{ y: -24, opacity: 0 }}
                  transition={{ duration: 0.35 }}
                  className="block"
                >
                  {rotatingWords[wordIndex]}
                </motion.span>
              </AnimatePresence>
            </span>

            <br />
            <span className="text-gray-700">
              {heroSection.headlineSuffix}
            </span>
          </h1>

          {/* DESCRIPTION */}
          <T
            path="hero.description"
            value={heroSection.description}
            multiline
            className="mt-6 max-w-xl text-base sm:text-lg text-gray-600"
            updateField={updateField}
            onEditStart={onEditStart}
            onEditEnd={onEditEnd}
          />

          {/* CTA */}
          <div className="mt-8">
            <button
              onClick={() => onNavigate?.({ page: "contact", id: 1 })}
              className="group inline-flex items-center gap-2 px-6 py-3 rounded-md
              bg-[#a855f7] text-white text-sm sm:text-base font-medium
              hover:bg-[#9333ea] transition duration-300"
            >
              <span>{heroSection.ctaText}</span>
              <ArrowRightIcon
                size={18}
                className="transition-transform group-hover:translate-x-1"
              />
            </button>
          </div>
        </div>

        {/* RIGHT VISUAL */}
        <div className="relative w-full h-[420px] sm:h-[520px] flex items-center justify-center">
          <img
            src={heroSection.heroImages.left}
            alt=""
            className="absolute left-0 top-1/2 -translate-y-1/2 w-32 sm:w-40 opacity-90"
          />

          <img
            src={heroSection.heroImages.middle}
            alt="Hero"
            className="relative z-10 w-48 sm:w-64 drop-shadow-xl"
          />

          <img
            src={heroSection.heroImages.right}
            alt=""
            className="absolute right-0 top-1/2 -translate-y-1/2 w-32 sm:w-40 opacity-90"
          />
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
