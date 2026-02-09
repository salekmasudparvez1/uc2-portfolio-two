

import { useEffect, useRef } from "react";
import { useActiveSection } from "../context/ActiveSectionContext";
import { SECTION_ORDER } from "../config/sectionsConfig";

export function useActiveSectionDetection() {
  const { activeSection, scrollLockUntilRef } = useActiveSection();
  const observerRef = useRef<IntersectionObserver | null>(null);
  const lastActiveSectionRef = useRef<string>("home");
  const sectionStateRef = useRef(
    new Map<
      string,
      { isIntersecting: boolean; rect: DOMRectReadOnly; ratio: number }
    >()
  );

  useEffect(() => {
    const observerOptions: IntersectionObserverInit = {
      root: null,
      threshold: [0, 0.25, 0.5, 0.75, 1],
      rootMargin: "-35% 0px -35% 0px",
    };

    observerRef.current = new IntersectionObserver((entries) => {
      if (Date.now() < scrollLockUntilRef.current) {
        return;
      }
      const viewportCenter = window.innerHeight / 2;

      for (const entry of entries) {
        const sectionId = entry.target.getAttribute("data-section-id");
        if (!sectionId || !SECTION_ORDER.includes(sectionId)) continue;
        sectionStateRef.current.set(sectionId, {
          isIntersecting: entry.isIntersecting,
          rect: entry.boundingClientRect,
          ratio: entry.intersectionRatio,
        });
      }

      const candidates: Array<{ id: string; distance: number; ratio: number }> = [];
      for (const [id, state] of sectionStateRef.current.entries()) {
        if (!state.isIntersecting) continue;
        const center = state.rect.top + state.rect.height / 2;
        const distance = Math.abs(center - viewportCenter);
        candidates.push({ id, distance, ratio: state.ratio });
      }

      if (candidates.length === 0) return;

      candidates.sort((a, b) => {
        if (a.distance !== b.distance) return a.distance - b.distance;
        return b.ratio - a.ratio;
      });

      const next = candidates[0];
      const currentId = lastActiveSectionRef.current;
      const currentState = sectionStateRef.current.get(currentId);
      const currentCenter = currentState
        ? currentState.rect.top + currentState.rect.height / 2
        : null;
      const currentDistance =
        currentCenter !== null
          ? Math.abs(currentCenter - viewportCenter)
          : Number.POSITIVE_INFINITY;

      const hysteresisPx = 48; // avoid flicker near boundaries
      const shouldSwitch =
        next.id !== currentId &&
        (!currentState ||
          !currentState.isIntersecting ||
          next.distance + hysteresisPx < currentDistance);

      if (shouldSwitch) {
        lastActiveSectionRef.current = next.id;
        activeSection.set(next.id);
      }
    }, observerOptions);

    // Observe all section elements
    const sections = document.querySelectorAll("[data-section-id]");
    sections.forEach((section) => {
      observerRef.current?.observe(section);
    });

    return () => {
      observerRef.current?.disconnect();
    };
  }, [activeSection]);
}
