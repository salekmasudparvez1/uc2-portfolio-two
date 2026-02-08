import { useEffect, useMemo, useState, lazy, Suspense } from "react";
import Navbar from "./components/navbar/Navbar";
import HeroSection from "./components/hero/HeroSection";
import Footer from "./components/footer/Footer";
import PageWrapper from "./components/page/PageWrapper";
import { PAGES } from "./types";
import { portfolioData } from "./data/portfolioData";

import {
  AnimatePresence,
  useReducedMotion,
  motion,
  type Variants,
} from "motion/react";
import Loader from "./components/loader/Loader";
import ProjectDetails from "./components/project/ProjectDetails";
import TestimonialSection from "./components/testimonial/TestimonialSection";

/* ---------------- Lazy Pages ---------------- */
const AboutSection = lazy(() => import("./components/about/AboutSection"));
const SkillsSection = lazy(() => import("./components/skill/SkillSection"));
const ExperienceSection = lazy(
  () => import("./components/experience/ExperienceSection"),
);
const ProjectSection = lazy(
  () => import("./components/project/ProjectSection"),
);
const ContactSection = lazy(
  () => import("./components/contact/ContactSection"),
);

/* ---------------- Component ---------------- */
const Portfolio = () => {
  const prefersReducedMotion = useReducedMotion();
  const isMobile =
    typeof window !== "undefined" && window.innerWidth < 768;


  interface Page {
    page: string;
    id: number;
  }
  const [currentPage, setCurrentPage] = useState<Page>(() => {
    if (typeof window !== "undefined") {
      const saved = localStorage.getItem("currentPage");
      if (saved) {
        try {
          const parsed: Page = JSON.parse(saved); 
         
          if (PAGES.some((p) => p === parsed.page)) {
            return parsed;
          }
        } catch {
          // ignore JSON parse errors
        }
      }
    }
    return { page: "home", id: 1 };
  });

  useEffect(() => {
    localStorage.setItem("currentPage", JSON.stringify(currentPage));
  }, [currentPage]);
 

  /* ---------------- Page Animation ---------------- */
  const pageVariants = useMemo<Variants>(
    () => ({
      initial:
        prefersReducedMotion || isMobile
          ? { opacity: 1 }
          : { opacity: 0, y: 16 },
      animate: {
        opacity: 1,
        y: 0,
        transition: {
          duration: prefersReducedMotion || isMobile ? 0.01 : 0.25,
          ease: "easeOut",
        },
      },
      exit:
        prefersReducedMotion || isMobile
          ? { opacity: 1 }
          : {
              opacity: 0,
              y: -16,
              transition: { duration: 0.2, ease: "easeIn" },
            },
    }),
    [prefersReducedMotion, isMobile],
  );

  return (
    <div className="min-h-screen bg-white">
      <Navbar
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
        userName={portfolioData.userName}
      />

      <AnimatePresence mode="wait" initial={false}>
        <motion.div
          key={currentPage?.id}
          variants={pageVariants}
          initial="initial"
          animate="animate"
          exit="exit"
          className="max-w-6xl mx-auto"
          onAnimationComplete={() => {
            window.scrollTo({ top: 0, behavior: "instant" });
          }}
        >
          <Suspense
            fallback={
              <Loader visible={true} text="Loading page..." />
            }
          >
            {currentPage?.page === "home" && (
              <PageWrapper>
                <HeroSection heroSection={portfolioData.hero} onNavigate={setCurrentPage} />
              </PageWrapper>
            )}

            {currentPage?.page  === "about" && (
              <PageWrapper>
                <AboutSection
                  aboutTop={portfolioData.about?.aboutTop}
                  aboutBottom={portfolioData.about?.aboutBottom}
                  data={portfolioData}

                />
              </PageWrapper>
            )}

            {currentPage?.page === "skill" && (
              <PageWrapper>
                <SkillsSection skills={portfolioData.skills} />
              </PageWrapper>
            )}

            {currentPage?.page === "experience" && (
              <PageWrapper>
                <ExperienceSection experiences={portfolioData.experiences} />
              </PageWrapper>
            )}

            {currentPage?.page === "project" && (
              <PageWrapper>
                <ProjectSection projects={portfolioData.projects} setCurrentPage={setCurrentPage} />
              </PageWrapper>
            )}
            {currentPage?.page === "projectDetails" && (
              <PageWrapper>
                <ProjectDetails currentPage={currentPage} setCurrentPage={setCurrentPage} projects={portfolioData.projects} />
              </PageWrapper>
            )}
            {
              currentPage?.page === "testimonial" && (
                <PageWrapper>
                  <TestimonialSection testimonials={portfolioData?.testimonials} />
                </PageWrapper>
              )
            }

            {currentPage?.page === "contact" && (
              <PageWrapper>
                <ContactSection contact={portfolioData.contact} />
              </PageWrapper>
            )}
          </Suspense>
        </motion.div>
      </AnimatePresence>

      <Footer footer={portfolioData.footer} onNavigate={setCurrentPage} />
    </div>
  );
};

export default Portfolio;
