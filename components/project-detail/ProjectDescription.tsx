"use client";
import { useState } from "react";
import { motion } from "framer-motion";
import { Calendar, Building, Layers, Hash, CheckCircle2, FileText, HousePlus, MessageCircle, FileDown } from "lucide-react";

const WHATSAPP_NUMBER = "917330770111";
function openWhatsApp(message: string) {
  const url = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
  window.open(url, "_blank", "noopener,noreferrer");
}

interface Props {
  description: string;
  highlights: string[];
  status: string;
  possessionDate: string;
  totalFloors: string;
  totalUnits: string;
  rera: string;
  projectTitle?: string;
  brochureUrl?: string;
}

export default function ProjectDescription({
  description,
  highlights,
  status,
  possessionDate,
  totalFloors,
  totalUnits,
  rera,
  projectTitle,
  brochureUrl,
}: Props) {
  const [expanded, setExpanded] = useState(false);
  const validHighlights = (highlights || []).filter((h) => h && h.trim() !== "");

  const rawStats = [
    { label: "Status", value: status, icon: <CheckCircle2 size={24} className="text-[#29B1D2]" />, bg: "bg-[#29B1D2]/10", border: "group-hover:border-[#29B1D2]/50", forceShow: false },
    { label: "Possession", value: possessionDate, icon: <Calendar size={24} className="text-[#F5C33C]" />, bg: "bg-[#F5C33C]/10", border: "group-hover:border-[#F5C33C]/50", forceShow: false },
    { label: "Total Floors", value: totalFloors, icon: <Layers size={24} className="text-purple-500" />, bg: "bg-purple-500/10", border: "group-hover:border-purple-500/50", forceShow: false },
    { label: "Total Units", value: totalUnits, icon: <Hash size={24} className="text-emerald-500" />, bg: "bg-emerald-500/10", border: "group-hover:border-emerald-500/50", forceShow: false },
    { label: "RERA No.", value: rera, icon: <FileText size={24} className="text-[#711113]" />, bg: "bg-[#711113]/10", border: "group-hover:border-[#711113]/50", forceShow: true }, // Always show RERA
  ];

  const isValueEmpty = (val: string | undefined | null) => {
    return !val || val.trim() === "" || ["n/a", "na", "-", "none", "null"].includes(val.trim().toLowerCase());
  };

  const overviewStats = rawStats.map(stat => ({
    ...stat,
    isEmpty: isValueEmpty(stat.value)
  })).filter(stat => !stat.isEmpty || stat.forceShow);

  const handleDownloadBrochure = async () => {
    if (!brochureUrl) {
      alert("Brochure is not available for this project yet.");
      return;
    }

    try {
      const link = document.createElement('a');
      link.href = brochureUrl;
      link.setAttribute('download', `${projectTitle?.replace(/\s+/g, '_')}_Brochure.pdf`);
      link.setAttribute('target', '_blank');
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    } catch (error) {
      console.error("Download failed:", error);
      window.open(brochureUrl, '_blank');
    }
  };

  return (
    <section className="pt-6 md:pt-0 py-10 lg:py-12">
      <div className="container mx-auto px-0">

        {/* Project Overview Stats Grid */}
        {/* {overviewStats.length > 0 && (
          <div className="mb-14">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
              <h2 className="text-2xl md:text-3xl font-extrabold text-gray-900 leading-tight flex items-center gap-3">
                <Building className="text-[#711113]" size={32} />
                Project Overview
              </h2>
              
              <div className="flex items-center gap-3">
                <button
                  onClick={() => openWhatsApp(`Hi, I'm interested in ${projectTitle || 'your project'}. Please share more details.`)}
                  className="flex-1 md:flex-none cursor-pointer px-5 py-3 bg-[#711113] hover:bg-[#25D366] text-white font-bold uppercase tracking-widest text-[10px] md:text-xs rounded-xl shadow-md transition-all duration-300 flex items-center justify-center gap-2"
                >
                  <MessageCircle size={16} /> Enquire Now
                </button>
                <motion.button
                  onClick={handleDownloadBrochure}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="relative flex-1 md:flex-none cursor-pointer px-5 py-3 bg-[#F5C33C] border border-[#F5C33C] text-black font-bold uppercase tracking-widest text-[10px] md:text-xs rounded-xl overflow-hidden transition-colors duration-300 flex items-center justify-center gap-2 group shadow-md"
                >
                  <motion.div
                    animate={{ x: ["-200%", "300%"] }}
                    transition={{ duration: 2.5, repeat: Infinity, ease: "linear" }}
                    className="absolute inset-0 w-full bg-gradient-to-r from-transparent via-[#711113]/20 group-hover:via-white/40 to-transparent -skew-x-12 pointer-events-none"
                  />
                  <FileDown size={16} className="relative z-10" />
                  <span className="relative z-10">Brochure</span>
                </motion.button>
              </div>
            </div>
            <div className="grid grid-cols-2 lg:grid-cols-4 xl:grid-cols-5 gap-5">
              {overviewStats.map((stat, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.08, ease: "easeOut" }}
                  className={`group relative overflow-hidden bg-white rounded-2xl p-6 border border-gray-100 shadow-md shadow-gray-200/60 hover:shadow-2xl hover:shadow-gray-300/60 transition-all duration-300 hover:-translate-y-1 ${stat.border}`}
                >
                  <div className={`absolute -right-4 -top-4 w-24 h-24 rounded-full ${stat.bg} blur-2xl opacity-50 group-hover:opacity-100 transition-opacity duration-500`} />
                  
                  <div className={`w-12 h-12 rounded-xl ${stat.bg} flex items-center justify-center mb-5 transition-transform duration-300 group-hover:scale-110 shadow-inner`}>
                    {stat.icon}
                  </div>
                  
                  <div className="relative z-10">
                    <p className="text-[10px] md:text-xs font-bold text-gray-400 uppercase tracking-[0.2em] mb-1.5">
                      {stat.label}
                    </p>
                    {stat.isEmpty ? (
                      <div className="relative inline-block overflow-hidden rounded bg-gray-100 px-2 py-0.5 mt-0.5">
                        <span className="text-gray-900 font-extrabold text-base md:text-lg leading-tight blur-[4px] select-none opacity-40">
                          P0123456789
                        </span>
                        <div className="absolute inset-0 bg-white/20 backdrop-blur-[2px]"></div>
                      </div>
                    ) : (
                      <p className="text-gray-900 font-extrabold text-base md:text-lg leading-tight truncate" title={stat.value}>
                        {stat.value}
                      </p>
                    )}
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        )} */}

        {/* Property Description */}
        <h3 className="text-2xl md:text-3xl font-extrabold text-gray-900 mb-4 leading-tight">Property Description</h3>
        <div className="mb-12 bg-gray-50/50 rounded-2xl p-6 md:p-8 border border-gray-100">
          <p
            className="text-gray-600 text-[15px] md:text-base leading-relaxed transition-all duration-300"
            style={
              expanded
                ? {}
                : {
                  display: "-webkit-box",
                  WebkitLineClamp: 4,
                  WebkitBoxOrient: "vertical",
                  overflow: "hidden",
                }
            }
          >
            {description}
          </p>
          {description?.length > 300 && (
            <button
              onClick={() => setExpanded((prev) => !prev)}
              className="mt-4 text-[#711113] text-sm font-bold tracking-wide uppercase hover:text-[#29B1D2] focus:outline-none transition-colors duration-200 flex items-center gap-1"
            >
              {expanded ? "Read Less" : "Read More"}
            </button>
          )}
        </div>

        {/* Key Highlights */}
        {validHighlights.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <h3 className="tracking-wide text-2xl md:text-3xl font-extrabold text-gray-900 mb-6 leading-tight">Key Highlights</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {validHighlights.map((h, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, x: -10 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.05 }}
                  className="group flex items-start gap-4 bg-white hover:bg-[#711113] rounded-2xl p-5 border border-gray-100 shadow-sm transition-all duration-300"
                >
                  <div className="w-8 h-8 rounded-full bg-gray-50 group-hover:bg-white/20 flex items-center justify-center flex-shrink-0 transition-colors">
                    <HousePlus size={16} className="text-[#711113] group-hover:text-white transition-colors" />
                  </div>
                  <span className="text-sm text-gray-700 group-hover:text-white font-medium mt-1 transition-colors">
                    {h}
                  </span>
                </motion.div>
              ))}
            </div>
          </motion.div>
        )}
      </div>
    </section>
  );
}
