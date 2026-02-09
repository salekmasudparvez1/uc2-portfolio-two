import { useState } from "react";
import { Star } from "lucide-react";

import type { ProjectItem } from "../../data/portfolioData";
import ProjectCard from "./ProjectCard";
import Modal from "../modal/Modal";
import { AnimatePresence } from "motion/react";
import ProjectDetails from "./ProjectDetails";

interface ProjectSectionProps {
  projects: ProjectItem[];
  setCurrentPage: React.Dispatch<
    React.SetStateAction<{ page: string; id: number }>
  >;
  updateField?: (path: string, value: string) => void;
  onDataUpdate?: () => void;
}

const INITIAL_VISIBLE = 3;

const ProjectSection = ({
  projects,
  updateField,
  onDataUpdate,
}: ProjectSectionProps) => {
  const [visibleCount, setVisibleCount] = useState(INITIAL_VISIBLE);
  const [openModal, setOpenModal] = useState({
    open: false,
    id: 1,
  });
  const isAllVisible = visibleCount >= projects.length;

  return (
    <section className="py-32 w-full">
      <div className="max-w-7xl mx-auto px-6">
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
        </div>

        {/* Projects Grid */}
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {projects.slice(0, visibleCount).map((project, idx) => (
            <ProjectCard
              key={project.id}
              project={project}
              idx={idx}
              setOpenModal={setOpenModal}
              updateField={updateField}
              onDataUpdate={onDataUpdate}
            />
          ))}
        </div>

        {/* View More Button */}
        {projects.length > INITIAL_VISIBLE && (
          <div className="mt-16 flex justify-center">
            <button
              onClick={() =>
                setVisibleCount(
                  isAllVisible ? INITIAL_VISIBLE : projects.length,
                )
              }
              className="px-10 py-4 rounded-2xl font-semibold text-white
                bg-gradient-to-r from-[#a855f7] to-blue-500
                hover:scale-105 transition-transform shadow-lg"
            >
              {isAllVisible ? "View Less" : "View More Projects"}
            </button>
          </div>
        )}
      </div>
      <AnimatePresence>
        {openModal.open && (
          <Modal
            key="modal"
            onClose={() => setOpenModal({ open: false, id: 1 })}
          >
            <ProjectDetails
              projects={projects}
              openModal={openModal}
              updateField={updateField}
              onDataUpdate={onDataUpdate}
            />
          </Modal>
        )}
      </AnimatePresence>
    </section>
  );
};

export default ProjectSection;
