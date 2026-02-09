

import { lazy, Suspense } from "react";
import Footer from "./components/footer/Footer";
import Section from "./components/common/Section";
import HeroSection from "./components/hero/HeroSection";
import Loader from "./components/loader/Loader";
import TestimonialSection from "./components/testimonial/TestimonialSection";
import {
  ActiveSectionProvider
} from "./context/ActiveSectionContext";
import { useActiveSectionDetection } from "./hooks/useActiveSectionDetection";
import { SECTIONS_CONFIG } from "./config/sectionsConfig";
import { portfolioData } from "./data/portfolioData";
import Navbar from "./components/navbar/Navbar";

/* Lazy-loaded heavy sections */
const AboutSection = lazy(() => import("./components/about/AboutSection"));
const SkillsSection = lazy(() => import("./components/skill/SkillSection"));
const ExperienceSection = lazy(
  () => import("./components/experience/ExperienceSection")
);
const ProjectSection = lazy(
  () => import("./components/project/ProjectSection")
);
const ContactSection = lazy(
  () => import("./components/contact/ContactSection")
);

/**
 * Main Portfolio Content
 * Separated into own component so it can use ActiveSectionContext
 */
function PortfolioContent() {


  // Start detecting active sections
  useActiveSectionDetection();

  return (
    <div className="min-h-screen bg-white">
      <Navbar userName={portfolioData.userName} />

      {/* HERO SECTION */}
      <Section
        sectionConfig={SECTIONS_CONFIG.home}
        className="relative"
      >
        <HeroSection
          heroSection={portfolioData.hero}
          onNavigate={() => {
            // In section-based navigation, we scroll to sections
            // instead of changing state
            const contactElement = document.querySelector(
              '[data-section-id="contact"]'
            );
            contactElement?.scrollIntoView({ behavior: "smooth" });
          }}
        />
      </Section>

      {/* ABOUT SECTION */}
      <Section
        sectionConfig={SECTIONS_CONFIG.about}
        className="relative bg-gradient-to-b from-white via-white to-gray-50"
      >
        <Suspense fallback={<Loader visible={true} text="Loading..." />}>
          <AboutSection
            aboutTop={portfolioData.about?.aboutTop}
            aboutBottom={portfolioData.about?.aboutBottom}
            data={portfolioData}
          />
        </Suspense>
      </Section>

      {/* SKILLS SECTION */}
      <Section
        sectionConfig={SECTIONS_CONFIG.skill}
        className="relative"
      >
        <Suspense fallback={<Loader visible={true} text="Loading..." />}>
          <SkillsSection skills={portfolioData.skills} />
        </Suspense>
      </Section>

      {/* EXPERIENCE SECTION */}
      <Section
        sectionConfig={SECTIONS_CONFIG.experience}
        className="relative bg-gradient-to-b from-white to-gray-50"
      >
        <Suspense fallback={<Loader visible={true} text="Loading..." />}>
          <ExperienceSection experiences={portfolioData.experiences} />
        </Suspense>
      </Section>

      {/* PROJECTS SECTION */}
      <Section
        sectionConfig={SECTIONS_CONFIG.project}
        className="relative"
      >
        <Suspense fallback={<Loader visible={true} text="Loading..." />}>
          <ProjectSection
            projects={portfolioData.projects}
            setCurrentPage={() => {
              // Handle project details if needed
            }}
          />
        </Suspense>
      </Section>

      {/* TESTIMONIALS SECTION (optional) */}
      {portfolioData?.testimonials && (
        <Section
          sectionConfig={SECTIONS_CONFIG.testimonial}
          className="relative bg-gradient-to-b from-white to-gray-50"
        >
          <TestimonialSection testimonials={portfolioData.testimonials} />
        </Section>
      )}

      {/* CONTACT SECTION */}
      <Section
        sectionConfig={SECTIONS_CONFIG.contact}
        className="relative"
      >
        <Suspense fallback={<Loader visible={true} text="Loading..." />}>
          <ContactSection contact={portfolioData.contact} />
        </Suspense>
      </Section>

      {/* FOOTER */}
      <Footer
        footer={portfolioData.footer}
        onNavigate={() => {
          const homeElement = document.querySelector(
            '[data-section-id="home"]'
          );
          homeElement?.scrollIntoView({ behavior: "smooth" });
        }}
      />
    </div>
  );
}


export default function Portfolio() {
  return (
    <ActiveSectionProvider>
      <PortfolioContent />
    </ActiveSectionProvider>
  );
}
