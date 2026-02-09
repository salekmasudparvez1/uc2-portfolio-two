import { useState } from "react";
import { Star, ArrowLeft } from "lucide-react";
import ProjectCard from "../project/ProjectCard";
import Modal from "../modal/Modal";
import { AnimatePresence } from "motion/react";
import ProjectDetails from "../project/ProjectDetails";
import { portfolioData } from "../../data/portfolioData";

interface AllProjectsProps {
  onBack: () => void;
}

const AllProjects = ({ onBack }: AllProjectsProps) => {
  const [openModal, setOpenModal] = useState({
    open: false,
    id: 1,
  });

  const projects = portfolioData.projects;

  return (
    <div className="min-h-screen bg-white">
      {/* Header with Back Button */}
      <div className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <button
            onClick={onBack}
            className="flex items-center gap-2 text-gray-600 hover:text-[#a855f7] transition-colors"
          >
            <ArrowLeft className="w-5 h-5" />
            <span className="font-medium">Back to Home</span>
          </button>
        </div>
      </div>

      {/* Main Content */}
      <section className="py-20 w-full">
        <div className="max-w-7xl mx-auto px-6">
          {/* Header */}
          <div className="flex flex-col mb-16 gap-8">
            <div className="space-y-4">
              <div className="flex items-center gap-2 text-[#a855f7] font-bold tracking-widest text-xs uppercase">
                <Star className="w-4 h-4 fill-current" />
                All My Projects
              </div>

              <h1 className="text-4xl md:text-6xl font-bold text-gray-900 tracking-tighter">
                Complete{" "}
                <span className="text-transparent bg-clip-text bg-linear-to-r from-[#a855f7] to-blue-500">
                  Portfolio
                </span>
              </h1>
              
              <p className="text-lg text-gray-600 max-w-2xl">
                Explore all {projects.length} projects showcasing my work in web development, 
                design, and creative solutions.
              </p>
            </div>
          </div>

          {/* Projects Grid */}
          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {projects.map((project, idx) => (
              <ProjectCard
                key={project.id}
                project={project}
                idx={idx}
                setOpenModal={setOpenModal}
              />
            ))}
          </div>
        </div>
      </section>

      {/* Modal for Project Details */}
      <AnimatePresence>
        {openModal.open && (
          <Modal
            key="modal"
            onClose={() => setOpenModal({ open: false, id: 1 })}
          >
            <ProjectDetails
              projects={projects}
              openModal={openModal}
            />
          </Modal>
        )}
      </AnimatePresence>
    </div>
  );
};

export default AllProjects;
