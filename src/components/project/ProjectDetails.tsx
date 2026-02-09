import { useRef, useState, type FC } from "react";
import { Globe, Github, ChevronRight, type LucideIcon } from "lucide-react";
import { motion } from "framer-motion";
import type { IPortfolioData, ProjectItem } from "../../data/portfolioData";
import { EditableText } from "../text/EditableText";
import { uploadService } from "../../service/about/Index";

interface ProjectDetailsProps {
  openModal: { open: boolean; id: number };
  projects: ProjectItem[];
  updateField?: (path: string, value: string) => void;
  onDataUpdate?: (d: IPortfolioData) => void;
}

const ProjectDetails: FC<ProjectDetailsProps> = ({
  openModal,
  projects,
  updateField,
  onDataUpdate,
}) => {
  const project = projects.find((p) => p.id === openModal.id);
  const idx = projects.findIndex((p) => p.id === openModal.id);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [isUploading, setIsUploading] = useState(false);

  if (!project) return null;

  /**
   * T Helper Component
   * Handles the logic between editable text (CMS mode) and static text (View mode)
   */
  const T = ({
    path,
    value,
    className = "",
    multiline = false,
  }: {
    path: string;
    value?: string;
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

  return (
    <motion.div
      key={project.id}
      initial={{ opacity: 0, y: 30, scale: 0.98 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, y: 30, scale: 0.98 }}
      transition={{ duration: 0.4, ease: [0.23, 1, 0.32, 1] }}
      className="
        relative w-full max-w-6xl bg-[#fafafa] rounded-md 
        md:max-h-[85vh] max-h-[95vh] overflow-y-auto overflow-x-hidden
        shadow-2xl outline-none
      "
      style={{ scrollbarWidth: 'thin', scrollbarColor: '#a855f7 transparent' }}
    >
      <div className="p-8 md:p-16">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20">
          
          {/* LEFT COLUMN: Media & Meta */}
          <div className="lg:sticky lg:top-0 h-fit space-y-8">
            <div className="relative rounded-md overflow-hidden bg-white shadow-lg group aspect-video lg:aspect-square border border-gray-100">
              <img
                src={project.image}
                alt={project.title}
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
              />

              {onDataUpdate && (
                <div className="absolute inset-0 bg-black/40 backdrop-blur-[2px] flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300">
                  <button
                    onClick={() => fileInputRef.current?.click()}
                    className="px-6 py-3 rounded-2xl bg-white text-black font-bold shadow-xl active:scale-95 transition"
                  >
                    {isUploading ? "Uploading..." : "Change Image"}
                  </button>
                </div>
              )}
              
              <input 
                ref={fileInputRef} 
                type="file" 
                hidden 
                accept="image/*"
                onChange={async (e) => {
                  const file = e.target.files?.[0];
                  if (!file || !onDataUpdate) return;
                  setIsUploading(true);
                  try {
                    const updated = await uploadService.uploadImage(file, `project_${idx}`);
                    if (updated) onDataUpdate(updated);
                  } catch (err) {
                    console.error("Upload failed", err);
                  } finally {
                    setIsUploading(false);
                  }
                }}
              />
            </div>

            <div className="flex flex-wrap gap-3">
              <Badge icon={Globe} label="Live Deployment" />
              <Badge icon={Github} label="Source Repository" />
            </div>
          </div>

          {/* RIGHT COLUMN: Description & Features */}
          <div className="space-y-12">
            <div className="space-y-6">
              <h1 className="text-4xl md:text-6xl font-bold tracking-tight text-slate-900 leading-[1.1]">
                <T path={`projects.${idx}.title`} value={project.title} />
              </h1>

              <div className="text-lg md:text-xl text-gray-500 leading-relaxed font-medium">
                <T
                  path={`projects.${idx}.description`}
                  value={project.description}
                  multiline
                />
              </div>
            </div>

            {/* FEATURES SECTION */}
            <div className="space-y-8">
              <div className="flex items-center gap-4">
                <div className="h-[2px] w-12 bg-purple-500" />
                <h3 className="text-xs uppercase tracking-[0.2em] font-black text-purple-600">
                  Project Highlights
                </h3>
              </div>

              <ul className="grid gap-4">
                {[
                  "Responsive User Interface",
                  "Optimized Performance",
                  "Modern Architecture",
                  "Secure API Integration"
                ].map((feat, i) => (
                  <motion.li
                    key={i}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.1 * i }}
                    className="flex items-center gap-4 p-5 rounded-3xl bg-white border border-slate-100 shadow-sm hover:shadow-md hover:border-purple-200 transition-all cursor-default"
                  >
                    <div className="bg-purple-50 p-2 rounded-xl">
                      <ChevronRight className="w-5 h-5 text-purple-600" />
                    </div>
                    <span className="font-semibold text-slate-700">{feat}</span>
                  </motion.li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
      
    </motion.div>
  );
};

/* Badge Helper */
interface BadgeProps {
  icon: LucideIcon;
  label: string;
}

const Badge: FC<BadgeProps> = ({ icon: Icon, label }) => (
  <div className="flex items-center gap-2 px-5 py-2.5 rounded-2xl bg-white border border-slate-100 text-sm font-semibold text-slate-600 shadow-sm">
    <Icon className="w-4 h-4 text-[#a855f7]" />
    {label}
  </div>
);

export default ProjectDetails;