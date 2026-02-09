import { useState, useRef, useEffect } from "react";
import { X, Menu } from "lucide-react";
import { motion, useMotionValueEvent, useReducedMotion } from "motion/react";
import { useActiveSection } from "../../context/ActiveSectionContext";
import {
  SECTIONS_CONFIG,
  SECTION_ORDER,
  getAdjacentSection,
} from "../../config/sectionsConfig";

interface NavbarProps {
  userName?: string;
}

export default function Navbar({ userName = "User" }: NavbarProps) {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [activeSection, setActiveSection] = useState<string>("home");
  const { activeSection: activeMotionValue, scrollLockUntilRef } = useActiveSection();
  const prefersReducedMotion = useReducedMotion();
  const navRef = useRef<HTMLUListElement>(null);
  const activeNavItemRef = useRef<HTMLAnchorElement>(null);


  useMotionValueEvent(activeMotionValue, "change", (latest) => {
    setActiveSection(latest);
  });

  const scrollToSection = (sectionId: string) => {
    const element = document.querySelector(`[data-section-id="${sectionId}"]`);
    if (element) {
      scrollLockUntilRef.current = Date.now() + 700;
      element.scrollIntoView({ behavior: "smooth", block: "start" });
      activeMotionValue.set(sectionId);
      setMobileOpen(false);
    }
  };

  const handleKeyDown = (e: KeyboardEvent) => {
    if (e.key === "ArrowRight" || e.key === "ArrowDown") {
      e.preventDefault();
      const nextSection = getAdjacentSection(activeSection, "next");
      if (nextSection) {
        scrollToSection(nextSection);
      }
    } else if (e.key === "ArrowLeft" || e.key === "ArrowUp") {
      e.preventDefault();
      const prevSection = getAdjacentSection(activeSection, "prev");
      if (prevSection) {
        scrollToSection(prevSection);
      }
    }
  };

  useEffect(() => {
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [activeSection]);

  const sortedSections = SECTION_ORDER.map((id) => SECTIONS_CONFIG[id]);

  return (
    <div className="relative">
      {/* DESKTOP NAVBAR */}
      <header className="sticky top-0 z-50 glass w-full backdrop-blur-xl border-b border-white/10">
        <nav className="mx-auto max-w-7xl flex items-center justify-between px-6 py-4">
          {/* Logo */}
          <div className="text-gray-700 text-2xl font-semibold tracking-wide">
            {userName.charAt(0)}
            <span className="text-[#a855f7]">{userName.charAt(1)}</span>
            {userName.slice(2)}
          </div>

          {/* DESKTOP MENU */}
          <ul
            ref={navRef}
            className="hidden lg:flex items-center gap-2 text-sm relative"
          >
            {sortedSections.map((section, index) => {
              const isActive = activeSection === section.id;

              return (
                <motion.li
                  key={section.id}
                  initial={{ y: 10, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: index * 0.06 }}
                  className="relative"
                >
                  <a
                    ref={isActive ? activeNavItemRef : null}
                    onClick={(e) => {
                      e.preventDefault();
                      scrollToSection(section.id);
                    }}
                    href={`#${section.id}`}
                    className={`block px-4 py-2 rounded-lg uppercase tracking-wide text-xs font-medium
                      transition-colors duration-300 relative
                      ${
                        isActive
                          ? "text-[#a855f7]"
                          : "text-gray-700 hover:text-[#a855f7]"
                      }
                    `}
                    aria-label={section.ariaLabel}
                    tabIndex={0}
                  >
                    {section.label}
                  </a>

                  {/* Animated underline indicator */}
                  {isActive && !prefersReducedMotion && (
                    <motion.div
                      layoutId="nav-indicator"
                      className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-[#a855f7] to-[#d946ef]"
                      transition={{ type: "spring", stiffness: 300, damping: 30 }}
                    />
                  )}
                </motion.li>
              );
            })}
          </ul>

          {/* MOBILE TOGGLE */}
          <button
            className="lg:hidden text-black hover:text-[#a855f7] transition-colors duration-300 p-2"
            onClick={() => setMobileOpen(true)}
            aria-label="Open menu"
          >
            <Menu size={26} />
          </button>
        </nav>
      </header>

      {/* MOBILE MENU */}
      <motion.div
        initial={{ x: "100%" }}
        animate={{ x: mobileOpen ? 0 : "100%" }}
        transition={{
          type: "spring",
          stiffness: 120,
          damping: 20,
          duration: prefersReducedMotion ? 0 : undefined,
        }}
        className="fixed inset-0 z-50 bg-black/95 backdrop-blur-xl overflow-y-auto"
      >
        {/* CLOSE BUTTON */}
        <button
          onClick={() => setMobileOpen(false)}
          className="fixed top-6 right-6 text-white hover:text-[#a855f7] transition-colors duration-300 z-50 p-2"
          aria-label="Close menu"
        >
          <X size={26} />
        </button>

        {/* MOBILE MENU ITEMS */}
        <div className="flex flex-col items-center justify-center min-h-screen gap-6 text-center px-4">
          {sortedSections.map((section, index) => {
            const isActive = activeSection === section.id;

            return (
              <motion.a
                key={section.id}
                onClick={(e) => {
                  e.preventDefault();
                  scrollToSection(section.id);
                }}
                href={`#${section.id}`}
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: index * 0.08 }}
                className={`text-3xl font-bold uppercase tracking-wide transition-colors duration-300
                  ${
                    isActive
                      ? "text-[#a855f7]"
                      : "text-white hover:text-[#a855f7]"
                  }
                `}
                aria-label={section.ariaLabel}
              >
                {section.label}
              </motion.a>
            );
          })}
        </div>
      </motion.div>
    </div>
  );
}
