import { useRef, useState } from "react";
import {
  ArrowLeft,
  ExternalLink,
  Globe,
  Github,
  ChevronRight,
} from "lucide-react";
import { motion } from "motion/react";
import type { IPortfolioData, ProjectItem } from "../../data/portfolioData";
import { EditableText } from "../text/EditableText";
import { uploadService } from "../../service/about/Index";

interface ProjectDetailsProps {
  currentPage: { page: string; id: number };
  setCurrentPage: React.Dispatch<
    React.SetStateAction<{ page: string; id: number }>
  >;
  projects: ProjectItem[];
  updateField?: (path: string, value: string) => void;
  onDataUpdate?: (d: IPortfolioData) => void;
}

const ProjectDetails: React.FC<ProjectDetailsProps> = ({
  currentPage,
  setCurrentPage,
  projects,
  updateField,
  onDataUpdate,
}) => {
  const project = projects.find((p) => p.id === currentPage.id);
  const idx = projects.findIndex((p) => p.id === currentPage.id);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [isUploading, setIsUploading] = useState(false);

  const T = ({
    path,
    value,
    className = "",
    multiline = false,
  }: {
    path: string;
    value: string | undefined;
    className?: string;
    multiline?: boolean;
  }) =>
    updateField ? (
      <EditableText
        value={value}
        onUpdate={(v) => updateField(path, v)}
        className={className}
        multiline={multiline}
      />
    ) : (
      <span className={className}>{value}</span>
    );

  if (!project) {
    return (
      <div className="min-h-screen flex items-center justify-center text-gray-500">
        Project not found.
      </div>
    );
  }

  return (
    <motion.section
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      className="min-h-screen bg-[#fafafa]"
    >
      {/* Top Nav */}
      <div className="sticky top-0 z-50 bg-white/80 backdrop-blur-xl border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
          <button
            onClick={() => setCurrentPage({ page: "project", id: 0 })}
            className="group flex items-center gap-2 text-sm font-bold text-gray-900 hover:text-[#a855f7]"
          >
            <ArrowLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
            Back to Projects
          </button>

          <a
            href={project.href}
            target="_blank"
            className="flex items-center gap-2 px-6 py-2.5 rounded-full bg-gray-900 text-white text-xs font-bold uppercase tracking-widest hover:bg-[#a855f7] transition-all"
          >
            Live Preview <ExternalLink className="w-3.5 h-3.5" />
          </a>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-7xl mx-auto px-6 py-20">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-20">
          {/* Left */}
          <div className="lg:sticky lg:top-32 space-y-8">
            <motion.div
              className="relative rounded-[2rem] overflow-hidden bg-white shadow-2xl group"
            >
              <img
                src={project.image}
                alt={project.title}
                className="w-full object-cover"
              />

              {onDataUpdate && (
                <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                  <button
                    onClick={() => fileInputRef.current?.click()}
                    className="px-6 py-3 rounded-2xl bg-white font-bold text-gray-900"
                  >
                    {isUploading ? "Uploading..." : "Change Image"}
                  </button>
                </div>
              )}

              <input
                ref={fileInputRef}
                type="file"
                className="hidden"
                onChange={async (e) => {
                  const file = e.target.files?.[0];
                  if (!file || !onDataUpdate) return;
                  setIsUploading(true);
                  try {
                    const updatedData =
                      await uploadService.uploadImage(file, `project_${idx}`);
                    if (updatedData) onDataUpdate(updatedData);
                  } finally {
                    setIsUploading(false);
                  }
                }}
              />
            </motion.div>

            <div className="flex flex-wrap gap-4">
              <div className="flex items-center gap-2 px-5 py-3 rounded-2xl bg-white border text-sm text-gray-700">
                <Globe className="w-4 h-4 text-[#a855f7]" />
                Deployment: Vercel
              </div>
              <div className="flex items-center gap-2 px-5 py-3 rounded-2xl bg-white border text-sm text-gray-700">
                <Github className="w-4 h-4 text-[#a855f7]" />
                Public Repository
              </div>
            </div>
          </div>

          {/* Right */}
          <div className="space-y-14">
            <div className="space-y-6">
              <h1 className="text-5xl md:text-7xl font-bold tracking-tighter text-gray-900">
                <T
                  path={`projects.${idx}.title`}
                  value={project.title}
                />
              </h1>

              <p className="text-xl text-gray-600 leading-relaxed">
                <T
                  path={`projects.${idx}.description`}
                  value={project.description}
                  multiline
                />
              </p>
            </div>

            {/* Features */}
            <div className="space-y-6">
              <h3 className="text-xl font-bold text-gray-900 flex items-center gap-3">
                <span className="w-8 h-1 rounded-full bg-[#a855f7]" />
                Key Features
              </h3>

              <ul className="grid gap-4">
                {[
                  "Responsive User Interface",
                  "Optimized Performance",
                  "Modern Component Architecture",
                  "SEO-Friendly Structure",
                ].map((feat, i) => (
                  <li
                    key={i}
                    className="flex items-center gap-4 p-5 rounded-2xl bg-white border hover:border-[#a855f7]/30 transition-all"
                  >
                    <ChevronRight className="w-5 h-5 text-[#a855f7]" />
                    <span className="text-gray-800 font-medium">
                      {feat}
                    </span>
                  </li>
                ))}
              </ul>
            </div>

            {/* CTA */}
            <div className="p-10 rounded-[2.5rem] bg-white border space-y-6">
              <h4 className="text-2xl font-bold text-gray-900">
                Interested in the process?
              </h4>
              <p className="text-gray-600">
                I’m available for freelance work or technical consultation.
              </p>
              <button
                onClick={() =>
                  setCurrentPage({ page: "contact", id: 0 })
                }
                className="w-full py-4 rounded-2xl bg-[#a855f7] text-white font-bold hover:bg-gray-900 transition-all"
              >
                Discuss this Project
              </button>
            </div>
          </div>
        </div>
      </div>
    </motion.section>
  );
};

export default ProjectDetails;
