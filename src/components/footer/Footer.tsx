import { motion } from "motion/react";
import { ArrowUp, ExternalLink } from "lucide-react";
import type { IPortfolioData } from "../../data/portfolioData";
import { PAGES } from "../../types";

const Footer = ({ 
  footer, 
  onNavigate 
}: { 
  footer: IPortfolioData["footer"]; 
  onNavigate?: React.Dispatch<React.SetStateAction<{ page: string; id: number }>>; 
}) => {
  
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer className="relative bg-gray-900  text-white rounded-t-[2.5rem] p-8 md:p-16 mt-20 overflow-hidden">
      {/* Background Glow Decor */}
      <div className="absolute top-0 right-0 w-[300px] h-[300px] bg-[#a855f7]/10 blur-[120px] rounded-full -translate-y-1/2 translate-x-1/2" />

      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col lg:flex-row justify-between items-start gap-16">
          
          {/* CTA & Brand Section */}
          <div className="max-w-xl space-y-8">
            <h2 className="text-4xl md:text-5xl font-bold leading-tight tracking-tight">
              {footer.ctaHeadline}
            </h2>
            
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => onNavigate?.({ page: 'contact', id: 1 })}
              className="inline-flex items-center gap-3 px-8 py-4 bg-white text-gray-900 rounded-2xl font-bold transition-colors hover:bg-[#a855f7] hover:text-white"
            >
              {footer.ctaLinkText}
              <ExternalLink className="w-4 h-4" />
            </motion.button>
          </div>

          {/* Social Links Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-8 w-full lg:w-auto">
            <div className="flex flex-col gap-4">
              <span className="text-xs font-black uppercase tracking-[0.2em] text-gray-500">Connect</span>
              <div className="flex flex-col gap-3">
                {footer.socialLinks.map((link, i) => (
                  <a
                    key={i}
                    href={link.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`group flex items-center gap-2 text-gray-300 hover:text-white transition-all ${link.hiddenOnMd ? 'md:hidden' : ''}`}
                  >
                    <span className="p-2 rounded-lg bg-gray-800 group-hover:bg-[#a855f7] transition-colors">
                      {link.icon}
                    </span>
                    <span className="font-medium">{link.title}</span>
                  </a>
                ))}
              </div>
            </div>
            
            {/* Navigation Placeholder - Can be linked to your PAGES constant */}
            <div className="flex flex-col gap-4">
              <span className="text-xs font-black uppercase tracking-[0.2em] text-gray-500">Navigation</span>
              <div className="flex flex-col gap-3">
                {PAGES.map((item) => (
                  <button
                    key={item}
                    onClick={() => onNavigate?.({ page: item.toLowerCase(), id: 1 })}
                    className="text-left text-gray-300 hover:text-[#a855f7] transition-colors font-medium"
                  >
                    {item}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-24 pt-8 border-t border-gray-800 flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="flex flex-col md:flex-row items-center gap-4 md:gap-8 text-sm text-gray-500">
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
              Available for new opportunities
            </div>
            <span>© {new Date().getFullYear()} — {footer.authorName}</span>
          </div>

          <button
            onClick={scrollToTop}
            className="group flex items-center gap-3 px-5 py-2.5 rounded-xl border border-gray-800 text-gray-400 hover:border-[#a855f7] hover:text-white transition-all"
          >
            <span className="text-xs font-bold uppercase tracking-widest">Back to top</span>
            <div className="p-1 rounded-md bg-gray-800 group-hover:bg-[#a855f7] group-hover:text-white transition-colors">
              <ArrowUp className="w-4 h-4" />
            </div>
          </button>
        </div>
      </div>
    </footer>
  );
};

export default Footer;