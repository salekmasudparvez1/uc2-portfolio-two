import type { IPortfolioData } from "../../data/portfolioData";
import { uploadService } from "../../service/about/Index";
import { EditableText } from "../text/EditableText";
import { useRef, useState } from "react";
import {   Eye, Upload } from "lucide-react";
import { motion } from "motion/react";

interface ProjectItem {
  id: number;
  title: string;
  description: string;
  image: string;
  href: string;
}

const ProjectCard = ({ project, idx, setCurrentPage, updateField, onDataUpdate }: { 
  project: ProjectItem; 
  idx: number; 
  setCurrentPage: React.Dispatch<React.SetStateAction<{ page: string; id: number }>>; 
  updateField?: (path: string, value: string) => void; 
  onDataUpdate?: (d: IPortfolioData) => void 
}) => {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [isUploading, setIsUploading] = useState(false);

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file || !onDataUpdate) return;
    setIsUploading(true);
    try {
      const updatedData = await uploadService.uploadImage(file, `project_${idx}`);
      if (updatedData) onDataUpdate(updatedData);
    } catch { 
      console.error("Upload failed");
    } finally { setIsUploading(false); }
  };

  const T = ({ path, value, className = '', multiline = false }: { path: string; value: string | undefined; className?: string; multiline?: boolean }) => 
    updateField ? (
      <EditableText value={value} onUpdate={(v) => updateField(path, v)} className={className} multiline={multiline} />
    ) : (
      <span className={className}>{value}</span>
    );

  return (
    <motion.div 
      whileHover={{ y: -10 }}
      className="group relative bg-white rounded-[2.5rem] overflow-hidden border border-gray-100 shadow-sm hover:shadow-2xl hover:shadow-[#a855f7]/10 transition-all duration-500 h-[500px]"
    >
      {/* Image Container */}
      <div className="relative h-2/3 overflow-hidden bg-gray-100">
        <img 
          src={project.image} 
          alt={project.title} 
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" 
        />
        <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-4">
          <button 
            onClick={() => setCurrentPage({ page: 'projectDetails', id: project.id })}
            className="px-4 py-2 flex gap-3 transition-all duration-500 rounded-full bg-white text-gray-900 hover:bg-[#a855f7] hover:text-white transition-colors"
          >
            <Eye className="w-6 h-6" /> View
          </button>
          {onDataUpdate && (
             <button 
              onClick={() => fileInputRef.current?.click()}
              className="p-4 rounded-full bg-white/20 backdrop-blur-md text-white hover:bg-white hover:text-gray-900 transition-colors"
            >
              {isUploading ? <div className="w-5 h-5 border-2 border-t-transparent animate-spin rounded-full" /> : <Upload className="w-5 h-5" />}
            </button>
          )}
        </div>
        <input ref={fileInputRef} type="file" className="hidden" onChange={handleFileChange} />
      </div>

      {/* Content */}
      <div className="p-8 space-y-3">
        <div className="flex justify-between items-start">
          <h3 className="text-2xl font-bold text-gray-900 tracking-tight">
            <T path={`projects.${idx}.title`} value={project.title} />
          </h3>
          
        </div>
        <p className="text-gray-500 line-clamp-2 text-sm leading-relaxed">
          <T path={`projects.${idx}.description`} value={project.description} multiline />
        </p>
      </div>
    </motion.div>
  );
};

export default ProjectCard;