"use client";
import { motion } from "framer-motion";
import { CheckCircle2, MessageCircle, FileDown } from "lucide-react";

const WHATSAPP_NUMBER = "917330770111"; // +91 73307 70111

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
}

export default function ProjectDescription({ description, highlights, status, possessionDate, totalFloors, totalUnits, rera, projectTitle }: Props) {
  return (
    <section className="py-16 md:py-24 bg-white border-b border-gray-100">
      <div className="container mx-auto px-4 lg:px-8">
        <div className="flex flex-col lg:flex-row gap-12 lg:gap-20">
          {/* Description + Highlights */}
          <div className="lg:w-7/12">
            <span className="uppercase tracking-[0.25em] text-xs text-[#711113] font-bold mb-3 block">About the project</span>
            <h2 className="text-3xl md:text-4xl font-extrabold text-gray-900 mb-6 leading-tight">Overview</h2>
            <div className="w-12 h-1 bg-[#711113] mb-8 rounded-full" />
            <p className="text-gray-600 text-base md:text-lg leading-relaxed mb-12">{description}</p>

            <h3 className="text-xl font-bold text-gray-900 mb-6 uppercase tracking-wide">Key Highlights</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {highlights.map((h, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, x: -10 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.06 }}
                  className="flex items-start gap-3 bg-gray-50 rounded-xl p-4 border border-gray-100"
                >
                  <CheckCircle2 size={18} className="text-[#711113] flex-shrink-0 mt-0.5" />
                  <span className="text-sm text-gray-700 font-medium">{h}</span>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Sticky Info Card */}
          <div className="lg:w-5/12">
            <div className="bg-white border border-gray-200 rounded-2xl shadow-lg p-8 sticky top-28">
              <h3 className="text-lg font-extrabold uppercase tracking-widest text-gray-900 mb-6 text-center border-b border-gray-100 pb-5">
                Project Overview
              </h3>
              <div className="space-y-4">
                {[
                  { label: "Status", value: status, badge: true },
                  { label: "Possession", value: possessionDate },
                  { label: "Total Floors", value: totalFloors },
                  { label: "Total Units", value: totalUnits },
                  { label: "RERA ID", value: rera, mono: true },
                ].map(({ label, value, badge, mono }) => (
                  <div key={label} className="flex justify-between items-center border-b border-gray-50 pb-4 last:border-0">
                    <span className="text-xs font-bold uppercase tracking-widest text-gray-400">{label}</span>
                    {badge ? (
                      <span className="text-xs font-bold bg-green-50 text-green-700 border border-green-200 px-3 py-1 rounded-full">{value}</span>
                    ) : (
                      <span className={`text-sm font-bold text-gray-900 ${mono ? "font-mono text-xs" : ""}`}>{value}</span>
                    )}
                  </div>
                ))}
              </div>

              <div className="mt-8 flex flex-col gap-3">
                <button
                  onClick={() =>
                    openWhatsApp(
                      `Hi, I'm interested in ${projectTitle || "your project"}. Please share more details.`
                    )
                  }
                  className="w-full py-4 bg-[#711113] hover:bg-[#25D366] text-white font-bold uppercase tracking-widest text-sm rounded-xl shadow-lg transition-colors flex items-center justify-center gap-2"
                >
                  <MessageCircle size={17} /> Enquire Now
                </button>
                <button
                  onClick={() =>
                    openWhatsApp(
                      `Hi, I'd like to request the brochure for ${projectTitle || "your project"}. Please share it with me.`
                    )
                  }
                  className="w-full py-4 bg-white border-2 border-gray-200 hover:border-[#25D366] hover:text-[#25D366] text-gray-700 font-bold uppercase tracking-widest text-sm rounded-xl transition-colors flex items-center justify-center gap-2"
                >
                  <FileDown size={17} /> Download Brochure
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
