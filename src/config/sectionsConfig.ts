/**
 * Section Configuration Model
 * Single source of truth for all portfolio sections
 * 
 * DESIGN NOTE: Config-driven architecture eliminates prop drilling and
 * makes it trivial to reorder, add, or remove sections without touching components.
 */

export interface SectionConfig {
  id: string;
  label: string;
  ariaLabel: string;
  icon?: string; // For navbar, if needed
  order: number;
  lazy?: boolean; // Code splitting hint
}

export const SECTIONS_CONFIG: Record<string, SectionConfig> = {
  home: {
    id: "home",
    label: "Home",
    ariaLabel: "Home section",
    order: 0,
    lazy: false,
  },
  about: {
    id: "about",
    label: "About",
    ariaLabel: "About me section",
    order: 1,
    lazy: true,
  },
  skill: {
    id: "skill",
    label: "Skills",
    ariaLabel: "Skills and expertise section",
    order: 2,
    lazy: true,
  },
  experience: {
    id: "experience",
    label: "Experience",
    ariaLabel: "Work experience section",
    order: 3,
    lazy: true,
  },
  project: {
    id: "project",
    label: "Projects",
    ariaLabel: "Featured projects section",
    order: 4,
    lazy: true,
  },
  testimonial: {
    id: "testimonial",
    label: "Testimonials",
    ariaLabel: "Testimonials and reviews section",
    order: 4.5,
    lazy: true,
  },
  contact: {
    id: "contact",
    label: "Contact",
    ariaLabel: "Contact and get in touch section",
    order: 5,
    lazy: true,
  },
};

/**
 * Sorted array of section IDs for iteration
 * Used in Navbar, keyboard navigation, etc.
 */
export const SECTION_ORDER = Object.values(SECTIONS_CONFIG)
  .sort((a, b) => a.order - b.order)
  .map((section) => section.id);

/**
 * Get next/previous section for keyboard navigation
 */
export function getAdjacentSection(
  currentId: string,
  direction: "next" | "prev"
): string | null {
  const currentIndex = SECTION_ORDER.indexOf(currentId);
  if (currentIndex === -1) return null;

  if (direction === "next") {
    return SECTION_ORDER[currentIndex + 1] || null;
  } else {
    return SECTION_ORDER[currentIndex - 1] || null;
  }
}
