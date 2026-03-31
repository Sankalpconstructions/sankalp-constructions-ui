"use client";
import { motion } from "framer-motion";
import { CheckCircle2 } from "lucide-react";

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

export default function ProjectDescription({ description, highlights }: Props) {
  return (
    <section className="py-16 md:py-24 bg-white border-b border-gray-100">
      <div className="container mx-auto px-4 lg:px-8">
        <span className="uppercase tracking-[0.25em] text-xs text-[#711113] font-bold mb-3 block">About the project</span>
        <h2 className="text-3xl md:text-4xl font-extrabold text-gray-900 mb-6 leading-tight">Overview</h2>
        <div className="w-12 h-1 bg-[#711113] mb-8 rounded-full" />
        <p className="text-gray-600 text-base md:text-lg leading-relaxed mb-12 max-w-3xl">{description}</p>

        <h3 className="text-xl font-bold text-gray-900 mb-6 uppercase tracking-wide">Key Highlights</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
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
    </section>
  );
}
