import { useRef, useState } from "react";
import { motion } from "motion/react";
import { Upload } from "lucide-react";
import type { aboutSectionProps, IPortfolioData } from "../../data/portfolioData";
import { EditableText } from "../text/EditableText";
import { uploadService } from "../../service/about/Index";

const fadeUpVariant = {
  hidden: { opacity: 0, y: 30 },
  visible: { 
    opacity: 1, 
    y: 0,
    transition: { duration: 0.8, ease: [0.21, 0.47, 0.32, 0.98] } 
  },
} as const;

const AboutSection = ({
  aboutTop,
  aboutBottom,
  data,
  updateField,
  onDataUpdate,
}: {
  aboutTop: aboutSectionProps["aboutTop"];
  aboutBottom: aboutSectionProps["aboutBottom"];
  data?: IPortfolioData;
  updateField?: (path: string, value: string) => void;
  onDataUpdate?: (updatedData: IPortfolioData) => void;
}) => {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [isUploading, setIsUploading] = useState(false);
  const [imageError, setImageError] = useState(false);

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file || !onDataUpdate) return;
    setIsUploading(true);
    try {
      const updatedData = await uploadService.uploadImage(file, "profile");
      if (updatedData) onDataUpdate(updatedData);
    } catch (error) {
      console.error("Upload failed", error);
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

  const sections = [
    {
      id: "intro",
      badge: "Introduction",
      content: (
        <div className="space-y-6">
          <div className="text-2xl font-light leading-relaxed">
            Hi, I’m{" "}
            <strong className="text-[#a855f7] font-semibold">
              <T path="personal.name" value={data?.personal.name} />
            </strong>
            , a passion-driven{" "}
            <strong className="text-gray-900 font-semibold">
              <T path="personal.title" value={data?.personal.title} />
            </strong>.
          </div>
          <div className="text-gray-600 leading-relaxed">
            <T path="aboutTop.description" value={aboutTop.description} multiline />
          </div>
        </div>
      ),
    },
    {
      id: "details",
      badge: "The Journey",
      content: (
        <div className="space-y-8">
          {aboutBottom.paragraphs.map((para, i) => (
            <p key={i} className="text-gray-600 leading-relaxed">
              <T path={`aboutBottom.paragraphs.${i}`} value={para} multiline />
            </p>
          ))}
        </div>
      ),
    },
    {
      id: "skills",
      badge: "Expertise",
      content: (
        <div className="space-y-8">
          <p className="text-gray-600 italic">
            I specialize in bridging the gap between complex problems and intuitive visual solutions.
          </p>
          <div className="flex flex-wrap gap-3">
            {aboutBottom.services.map((service, i) => (
              <motion.span
                key={i}
                whileHover={{ y: -2 }}
                className="px-5 py-2.5 text-sm font-medium rounded-2xl bg-white border border-gray-100 shadow-sm text-gray-700 hover:border-[#a855f7]/40 hover:text-[#a855f7] transition-all"
              >
                <T path={`aboutBottom.services.${i}`} value={service} />
              </motion.span>
            ))}
          </div>
        </div>
      ),
    },
  ];

  return (
    <section className="relative bg-[#fafafa] py-32 overflow-hidden">
      <div className="mx-auto max-w-7xl px-6">
        <div className="space-y-40">
          {sections.map((section, idx) => (
            <div key={section.id} className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-24">
              
              {/* LEFT COLUMN: Sticky Info */}
              <div className="relative">
                <motion.div
                  variants={fadeUpVariant}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true, margin: "-100px" }}
                  className="lg:sticky lg:top-32 space-y-8"
                >
                  <div className="inline-block px-4 py-1.5 rounded-full border border-[#a855f7]/20 bg-[#a855f7]/5 text-[12px] uppercase tracking-widest font-bold text-[#a855f7]">
                     {section.badge}
                  </div>

                  {idx === 0 && (
                    <div className="space-y-10">
                      <h2 className="text-5xl lg:text-7xl font-bold tracking-tight text-gray-900 leading-[1.1]">
                        Creating <br />
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#a855f7] to-blue-500">
                          Digital Magic
                        </span>
                      </h2>
                      
                      <div className="relative inline-block group">
                        <motion.div
                          whileHover={{ scale: 1.02 }}
                          whileTap={{ scale: 0.98 }}
                          onClick={() => fileInputRef.current?.click()}
                          className="relative w-48 h-56 rounded-3xl overflow-hidden cursor-pointer bg-gray-200 shadow-2xl ring-4 ring-white transition-all group-hover:ring-[#a855f7]/30"
                        >
                          <img
                            src={!imageError ? aboutTop.profileImage : "/avatar.png"}
                            alt="Profile"
                            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                            onError={() => setImageError(true)}
                          />
                          
                          {onDataUpdate && (
                            <div className="absolute inset-0 bg-black/40 backdrop-blur-[2px] opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                              {isUploading ? (
                                <div className="w-8 h-8 border-3 border-white/30 border-t-white rounded-full animate-spin" />
                              ) : (
                                <div className="flex flex-col items-center gap-2 text-white">
                                  <Upload className="w-6 h-6" />
                                  <span className="text-[10px] font-bold uppercase tracking-tighter">Update photo</span>
                                </div>
                              )}
                            </div>
                          )}
                        </motion.div>
                        
                        {/* Decorative background element */}
                        <div className="absolute -bottom-4 -right-4 -z-10 w-48 h-56 rounded-3xl bg-[#a855f7]/10 border border-[#a855f7]/20" />
                      </div>
                    </div>
                  )}
                  
                  <input
                    ref={fileInputRef}
                    type="file"
                    accept="image/*"
                    className="hidden"
                    onChange={handleFileChange}
                  />
                </motion.div>
              </div>

              {/* RIGHT COLUMN: Content */}
              <motion.div
                variants={fadeUpVariant}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: "-100px" }}
                className="flex items-center"
              >
                <div className="max-w-xl w-full">
                  {section.content}
                </div>
              </motion.div>
              
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default AboutSection;