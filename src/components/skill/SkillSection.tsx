
import { motion } from "motion/react";
import { Star, Code2, Database, Terminal } from "lucide-react";
import type { skillSectionProps } from "../../data/portfolioData";
import { EditableText } from "../text/EditableText";



const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
    },
  },
};

const cardVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: "easeOut" },
  },
} as const;

const SkillsSection = ({ 
  skills, 
  updateField 
}: { 
  skills: skillSectionProps[]; 
  updateField?: (path: string, value: string) => void 
}) => {
  
  const T = ({ 
    path, 
    value, 
    className = '', 
    multiline = false 
  }: { 
    path: string; 
    value: string | undefined; 
    className?: string; 
    multiline?: boolean 
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

  const getIcon = (index: number) => {
    switch (index) {
      case 0: return <Code2 className="w-6 h-6 text-[#a855f7]" />;
      case 1: return <Database className="w-6 h-6 text-[#a855f7]" />;
      default: return <Terminal className="w-6 h-6 text-[#a855f7]" />;
    }
  };

  return (
    <section className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-6">
        {/* Header */}
        <div className="mb-16 space-y-4">
          <div className="flex items-center gap-2 text-[#a855f7] font-bold tracking-widest text-xs uppercase">
            <Star className="w-4 h-4 fill-current" />
            My Skills
          </div>
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 tracking-tight">
            Technical <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#a855f7] to-blue-500">Proficiency</span>
          </h2>
        </div>

        {/* Skills Grid */}
        <motion.div 
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          {skills.map((group, groupIdx) => (
            <motion.div
              key={groupIdx}
              variants={cardVariants}
              whileHover={{ y: -8 }}
              className="group p-8 rounded-3xl bg-[#fafafa] border border-gray-100 hover:border-[#a855f7]/30 hover:bg-white hover:shadow-xl hover:shadow-[#a855f7]/5 transition-all duration-300"
            >
              {/* Icon & Title */}
              <div className="mb-6 space-y-4">
                <div className="w-12 h-12 rounded-2xl bg-white border border-gray-100 flex items-center justify-center shadow-sm group-hover:scale-110 transition-transform">
                  {getIcon(groupIdx)}
                </div>
                <h3 className="text-xl font-bold text-gray-900">
                  <T 
                    path={`skills.${groupIdx}.title`} 
                    value={group.title} 
                  />
                </h3>
                <p className="text-gray-500 text-sm leading-relaxed">
                  <T 
                    path={`skills.${groupIdx}.description`} 
                    value={group.description} 
                    multiline 
                  />
                </p>
              </div>

              {/* Skills Tags */}
              <div className="flex flex-wrap gap-2">
                {group.items.map((item, itemIdx) => (
                  <div
                    key={itemIdx}
                    className="px-3 py-1.5 rounded-lg bg-white border border-gray-200 text-xs font-semibold text-gray-700 group-hover:border-[#a855f7]/20 transition-colors"
                  >
                    <T 
                      path={`skills.${groupIdx}.items.${itemIdx}.name`} 
                      value={item.name} 
                    />
                  </div>
                ))}
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default SkillsSection;