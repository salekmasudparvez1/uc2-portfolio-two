// components/contact/ContactSection.tsx
import { motion } from "motion/react";
import { Copy, ExternalLink, CheckCircle2, Mail, Linkedin, Figma } from "lucide-react";
import { useState, type JSX } from "react";
import type { IPortfolioData } from "../../data/portfolioData";
import { EditableText } from "../text/EditableText";

interface SocialCard {
  name: string;
  href: string;
  icon: JSX.Element;
  color: string;
}

const T = ({ path, value, className = '', multiline = false, updateField }: { path: string; value: string | undefined; className?: string; multiline?: boolean; updateField?: (path: string, value: string) => void }) => 
  updateField ? (
    <EditableText value={value} onUpdate={(v) => updateField(path, v)} className={className} multiline={multiline} />
  ) : <span className={className}>{value}</span>;

const ContactSection = ({ contact, updateField }: { 
  contact: IPortfolioData["contact"]; 
  updateField?: (path: string, value: string) => void;
}) => {
  const [copied, setCopied] = useState(false);

  const copyToClipboard = () => {
    if (!contact.email) return;
    navigator.clipboard.writeText(contact.email);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

    const socialCards: SocialCard[] =  [
    {
      name: "LinkedIn",
      icon: <Linkedin className="w-6 h-6" />,
      href: contact.secondaryCta.href,
      color: "hover:text-blue-600"
    },
    {
      name: "Figma community",
      icon: <Figma className="w-6 h-6" />,
      href: "#", // Replace with actual data if available
      color: "hover:text-[#F24E1E]"
    },
    {
      name: "Behance",
      icon: <span className="font-bold text-xl">Bē</span>,
      href: "#",
      color: "hover:text-blue-500"
    }
  ];
  return (
    <section className="py-32 bg-white relative">
      <div className="max-w-6xl mx-auto px-6 flex flex-col md:flex-row md:justify-between items-start gap-16">

        {/* LEFT: Content */}
        <div className="w-full md:w-1/2 space-y-8">

          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-purple-500/10 to-orange-400/10 text-sm font-medium text-purple-500">
            <T path="contact.badgeText" value={contact.badgeText} updateField={updateField} /> <span>{contact.badgeEmoji}</span>
          </div>

          {/* Title */}
          <h2 className="text-4xl md:text-5xl font-bold leading-tight">
            <T path="contact.titlePrimary" value={contact.titlePrimary} updateField={updateField} />{" "}
            <span className="bg-gradient-to-r from-purple-400 to-orange-300 bg-clip-text text-transparent">
              <T path="contact.titleHighlight" value={contact.titleHighlight} updateField={updateField} />
            </span>
          </h2>

          {/* Buttons */}
          <div className="flex flex-wrap gap-4">
            <a
              href={contact.primaryCta.href}
              className="flex items-center gap-2 px-6 py-3 rounded-full bg-purple-500 text-white font-semibold uppercase text-sm transition hover:bg-purple-600"
            >
              <Mail className="w-4 h-4" />
              <T path="contact.primaryCta.text" value={contact.primaryCta.text} updateField={updateField} />
            </a>

            <a
              href={contact.secondaryCta.href}
              className="flex items-center gap-2 px-6 py-3 rounded-full border border-purple-500 text-purple-500 font-semibold uppercase text-sm transition hover:bg-purple-500 hover:text-white"
            >
              <Linkedin className="w-4 h-4" />
              <span className="hidden md:inline">
                <T path="contact.secondaryCta.text" value={contact.secondaryCta.text} updateField={updateField} />
              </span>
              <span className="md:hidden">
                <T path="contact.secondaryCta.mobileText" value={contact.secondaryCta.mobileText} updateField={updateField} />
              </span>
            </a>
          </div>

          {/* Email Copy */}
          <div className="group inline-flex items-center gap-4 p-2 pl-4 pr-3 rounded-md bg-gray-50 border border-gray-100 transition-all hover:border-purple-300">
            <span className="font-medium text-gray-800">{contact.email}</span>
            <button onClick={copyToClipboard} className="p-2 rounded-md bg-white shadow-sm border border-gray-100 text-gray-500 hover:text-purple-500 transition-all active:scale-90">
              {copied ? <CheckCircle2 className="w-4 h-4 text-green-500" /> : <Copy className="w-4 h-4" />}
            </button>
          </div>

          {/* Footer / Note */}
          <p className="text-gray-500 mt-4">
            You can also find me <strong>{contact.handle}</strong> on your preferred social media platform.
          </p>
        </div>

        {/* RIGHT: Illustration */}
        <div className="w-full md:w-1/2 flex justify-center items-center">
          <img src={contact.rightImage} alt={contact.rightImageAlt} className="max-w-full max-h-[500px] object-contain" />
        </div>
      </div>

      {/* Social Cards */}
      {socialCards.length > 0 && (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-6xl mx-auto px-6 mt-16">
          {socialCards.map((social, idx) => (
            <motion.a
              key={idx}
              href={social.href}
              target="_blank"
              rel="noopener noreferrer"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1 }}
              className="group relative h-64 p-8 rounded-md bg-[#f8f9fa] border border-transparent hover:border-gray-200 hover:bg-white hover:shadow-2xl flex flex-col justify-between transition-all duration-500"
            >
              <div className={`text-gray-400 group-hover:scale-110 transition-transform duration-500 ${social.color}`}>
                {social.icon}
              </div>
              <div className="flex items-center justify-between">
                <span className="text-2xl font-medium text-gray-800">{social.name}</span>
                <div className="w-10 h-10 rounded-full bg-white flex items-center justify-center opacity-0 group-hover:opacity-100 -translate-x-4 group-hover:translate-x-0 transition-all duration-500 shadow-sm">
                  <ExternalLink className="w-4 h-4 text-gray-400" />
                </div>
              </div>
            </motion.a>
          ))}
        </div>
      )}
    </section>
  );
};

export default ContactSection;
