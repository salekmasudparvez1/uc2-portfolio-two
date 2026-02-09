import type { IPortfolioData } from "../../data/portfolioData";
import { uploadService } from "../../service/about/Index";
import { EditableText } from "../text/EditableText";
import { useRef, useState } from "react";
import { Eye, Upload } from "lucide-react";
import { motion } from "motion/react";

interface ProjectItem {
  id: number;
  title: string;
  description: string;
  image: string;
  href: string;
}

const cardVariants = {
  initial: { y: 0 },
  hover: {
    y: -6,
    transition: { duration: 0.35, ease: "easeOut" },
  },
} as const;

const ProjectCard = ({
  project,
  idx,
  setOpenModal,
  updateField,
  onDataUpdate,
}: {
  project: ProjectItem;
  idx: number;
  setOpenModal: React.Dispatch<
    React.SetStateAction<{ open: boolean; id: number }>
  >;
  updateField?: (path: string, value: string) => void;
  onDataUpdate?: (d: IPortfolioData) => void;
}) => {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [isUploading, setIsUploading] = useState(false);

  const handleFileChange = async (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const file = e.target.files?.[0];
    if (!file || !onDataUpdate) return;

    setIsUploading(true);
    try {
      const updatedData = await uploadService.uploadImage(
        file,
        `project_${idx}`
      );
      if (updatedData) onDataUpdate(updatedData);
    } catch {
      console.error("Upload failed");
    } finally {
      setIsUploading(false);
    }
  };

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

  return (
    <motion.article
      variants={cardVariants}
      initial="initial"
      whileHover="hover"
      onClick={setOpenModal.bind(null, { open: true, id: project.id })  }
      className="group relative h-[480px] rounded-xl overflow-hidden bg-white
                 border border-gray-100 shadow-sm
                 hover:shadow-xl hover:shadow-[#a855f7]/10
                 transition-shadow duration-300 cursor-pointer"
    >
      {/* Image */}
      <div className="relative h-[62%] overflow-hidden bg-gray-100">
        <img
          src={project.image}
          alt={project.title}
          className="h-full w-full object-cover
                     transition-transform duration-700
                     group-hover:scale-110"
        />

        {/* Overlay */}
        <div
          className="absolute inset-0 flex items-center justify-center gap-3
                     bg-black/50 opacity-0
                     group-hover:opacity-100
                     transition-opacity duration-300"
        >
          <button
            onClick={(e) => {
              e.stopPropagation();
              setOpenModal({ open: true, id: project.id });
            }}
            className="inline-flex items-center gap-2 rounded-full
                       bg-white px-5 py-2 text-sm font-medium text-gray-900
                       hover:bg-[#a855f7] hover:text-white
                       transition-colors"
          >
            <Eye className="h-5 w-5" />
            View
          </button>

          {onDataUpdate && (
            <>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  fileInputRef.current?.click();
                }}
                className="flex h-11 w-11 items-center justify-center
                           rounded-full bg-white/20 text-white
                           backdrop-blur-md
                           hover:bg-white hover:text-gray-900
                           transition-colors"
                aria-label="Upload image"
              >
                {isUploading ? (
                  <span className="h-5 w-5 animate-spin rounded-full border-2 border-t-transparent" />
                ) : (
                  <Upload className="h-5 w-5" />
                )}
              </button>

              <input
                ref={fileInputRef}
                type="file"
                className="hidden"
                onChange={handleFileChange}
              />
            </>
          )}
        </div>
      </div>

      {/* Content */}
      <div className="flex h-[38%] flex-col justify-between p-6">
        <h3 className="text-lg font-semibold text-gray-900 leading-snug">
          <T
            path={`projects.${idx}.title`}
            value={project.title}
          />
        </h3>

        <p className="mt-2 text-sm text-gray-500 line-clamp-3 leading-relaxed">
          <T
            path={`projects.${idx}.description`}
            value={project.description}
            multiline
          />
        </p>
      </div>
    </motion.article>
  );
};

export default ProjectCard;
