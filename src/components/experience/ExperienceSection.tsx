import { motion } from "motion/react";
import { Briefcase, Calendar } from "lucide-react";
import { EditableText } from "../text/EditableText";
import type { IPortfolioData } from "../../data/portfolioData";

const ExperienceSection = ({
  experiences,
  updateField,
}: {
  experiences: IPortfolioData["experiences"];
  updateField?: (path: string, value: string) => void;
}) => {
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
    <section className="py-32 bg-[#fafafa] overflow-hidden">
      <div className="max-w-6xl mx-auto px-6">
        {/* Section Header */}
        <div className="flex flex-col items-center text-center mb-24 space-y-4">
          <motion.div 
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#a855f7]/10 text-[#a855f7] border border-[#a855f7]/20 text-[10px] font-bold uppercase tracking-[0.2em]"
          >
            <Briefcase className="w-3.5 h-3.5" />
            My Journey
          </motion.div>
          <h2 className="text-4xl md:text-6xl font-bold text-gray-900 tracking-tight">
            Work{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#a855f7] to-blue-500">
              Experience
            </span>
          </h2>
          <p className="text-gray-500 max-w-xl text-lg font-light">
            A chronological look at my professional growth and the impactful projects I've led.
          </p>
        </div>

        {/* Timeline Container */}
        <div className="relative">
          {/* Vertical Center Line (Desktop) / Left Line (Mobile) */}
          <div className="absolute left-4 md:left-1/2 md:-translate-x-[1px] top-0 bottom-0 w-[2px] bg-gradient-to-b from-transparent via-gray-200 to-transparent" />

          <div className="space-y-12">
            {experiences.map((exp, idx) => {
              const isEven = idx % 2 === 0;
              
              return (
                <div key={idx} className="relative flex items-center justify-between w-full">
                  {/* Desktop Layout Split */}
                  <div className="hidden md:block w-[45%]">
                    {isEven && (
                      <ExperienceCard exp={exp} idx={idx} T={T} align="right" />
                    )}
                  </div>

                  {/* The Timeline Dot */}
                  <div className="absolute left-4 md:left-1/2 -translate-x-1/2 z-20">
                    <motion.div 
                      initial={{ scale: 0 }}
                      whileInView={{ scale: 1 }}
                      className="w-5 h-5 rounded-full bg-white border-4 border-[#a855f7] shadow-[0_0_15px_rgba(168,85,247,0.4)]" 
                    />
                  </div>

                  {/* Content Container (Mobile: Right of line / Desktop: Left or Right) */}
                  <div className="w-full pl-12 md:pl-0 md:w-[45%]">
                    {!isEven ? (
                      <ExperienceCard exp={exp} idx={idx} T={T} align="left" />
                    ) : (
                      <div className="md:hidden">
                        <ExperienceCard exp={exp} idx={idx} T={T} align="left" />
                      </div>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};


// eslint-disable-next-line @typescript-eslint/no-explicit-any
const ExperienceCard = ({ exp, idx, T, align }: any) => (
  <motion.div
    initial={{ opacity: 0, x: align === "right" ? -30 : 30 }}
    whileInView={{ opacity: 1, x: 0 }}
    viewport={{ once: true }}
    transition={{ duration: 0.5, delay: idx * 0.1 }}
    className={`group relative bg-white p-8 rounded-md border border-gray-100 shadow-sm hover:shadow-2xl hover:shadow-[#a855f7]/10 hover:border-[#a855f7]/30 transition-all duration-500 ${
      align === "right" ? "text-right" : "text-left"
    }`}
  >
    {/* Period & Icon */}
    <div className={`flex items-center gap-2 mb-4 text-[11px] font-black text-[#a855f7] uppercase tracking-widest ${
      align === "right" ? "flex-row-reverse" : "flex-row"
    }`}>
      <Calendar className="w-3.5 h-3.5" />
      <T path={`experiences.${idx}.period`} value={exp.period} />
    </div>

    <h3 className="text-2xl font-bold text-gray-900 mb-1 group-hover:text-[#a855f7] transition-colors">
      <T path={`experiences.${idx}.role`} value={exp.role} />
    </h3>

    <div className="font-semibold text-gray-600 mb-4">
      <T path={`experiences.${idx}.company`} value={exp.company} />
    </div>

    <p className="text-gray-500 text-sm leading-relaxed font-light">
      <T
        path={`experiences.${idx}.description`}
        value={exp.description}
        multiline
      />
    </p>

    {/* Subtle Glow Background */}
    <div className="absolute -inset-1 bg-gradient-to-r from-[#a855f7]/0 to-blue-500/0 group-hover:from-[#a855f7]/5 group-hover:to-blue-500/5 rounded-md -z-10 transition-all duration-500" />
  </motion.div>
);

export default ExperienceSection;