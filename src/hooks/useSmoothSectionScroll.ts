

import { useCallback } from "react";
import { useActiveSection } from "../context/ActiveSectionContext";

export function useSmoothSectionScroll() {
  const { activeSection, scrollLockUntilRef } = useActiveSection();

  const scrollToSection = useCallback((sectionId: string) => {
    const element = document.querySelector(`[data-section-id="${sectionId}"]`);
    if (element) {
      scrollLockUntilRef.current = Date.now() + 700;
      // Use native browser smooth scroll
      element.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
      // Update motion value to reflect navigation intent
      activeSection.set(sectionId);
    }
  }, [activeSection]);

  return { scrollToSection };
}
