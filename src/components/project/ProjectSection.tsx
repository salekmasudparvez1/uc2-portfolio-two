import { useRef } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import type { Swiper as SwiperType } from "swiper";
import { Navigation } from "swiper/modules";
import { ArrowLeft, ArrowRight, Star } from "lucide-react";

// Swiper styles
import "swiper/css";
import "swiper/css/navigation";

import type { ProjectItem } from "../../data/portfolioData";
import ProjectCard from "./ProjectCard";

interface ProjectSectionProps {
  projects: ProjectItem[];
  setCurrentPage: React.Dispatch<
    React.SetStateAction<{ page: string; id: number }>
  >;
  updateField?: (path: string, value: string) => void;
  onDataUpdate?: () => void;
}

const ProjectSection = ({
  projects,
  setCurrentPage,
  updateField,
  onDataUpdate,
}: ProjectSectionProps) => {
  const swiperRef = useRef<SwiperType | null>(null);

  return (
    <section className="py-32 w-full ">
      <div className="max-w-full mx-auto px-6">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-8">
          <div className="space-y-4">
            <div className="flex items-center gap-2 text-[#a855f7] font-bold tracking-widest text-xs uppercase">
              <Star className="w-4 h-4 fill-current" />
              My Projects
            </div>

            <h2 className="text-4xl md:text-6xl font-bold text-gray-900 tracking-tighter">
              Case{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#a855f7] to-blue-500">
                Studies
              </span>
            </h2>
          </div>

          {/* Navigation buttons */}
          <div className="flex gap-4">
            <button
              onClick={() => swiperRef.current?.slidePrev()}
              className="p-4 rounded-2xl bg-white border shadow-sm hover:text-[#a855f7] transition-colors"
              aria-label="Previous slide"
            >
              <ArrowLeft />
            </button>

            <button
              onClick={() => swiperRef.current?.slideNext()}
              className="p-4 rounded-2xl bg-white border shadow-sm hover:text-[#a855f7] transition-colors"
              aria-label="Next slide"
            >
              <ArrowRight />
            </button>
          </div>
        </div>

        {/* Swiper */}
        <div className="w-full">
          <Swiper
            modules={[Navigation]}
            onSwiper={(swiper) => {
              swiperRef.current = swiper;
            }}
            spaceBetween={30}
            slidesPerView={1}
            loop={projects.length > 3}
            breakpoints={{
              640: { 
                slidesPerView: 1,
                spaceBetween: 20,
              },
              768: { 
                slidesPerView: 2,
                spaceBetween: 25,
              },
              1024: { 
                slidesPerView: 3,
                spaceBetween: 30,
              },
            }}
            className="!pb-4"
          >
            {projects.map((project, idx) => (
              <SwiperSlide key={project.id} className="h-auto">
                <ProjectCard
                  project={project}
                  idx={idx}
                  setCurrentPage={setCurrentPage}
                  updateField={updateField}
                  onDataUpdate={onDataUpdate}
                />
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </div>
    </section>
  );
};

export default ProjectSection;
