"use client";
import { useState } from "react";
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
  const [expanded, setExpanded] = useState(false);

  return (
    <section className="pt-6 md:pt-0 py-10 lg:py-12">
      <div className="container mx-auto px-0">
        <h2 className="text-2xl md:text-3xl font-extrabold text-gray-900 mb-4 leading-tight">Property Description</h2>
        <div className="mb-10">
          <p
            className="text-gray-600 text-[15px] md:text-md leading-relaxed transition-all duration-300"
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
          <button
            onClick={() => setExpanded((prev) => !prev)}
            className="mt-2 text-[#711113] text-sm font-semibold hover:underline focus:outline-none transition-colors duration-200"
          >
            {expanded ? "Read Less" : "Read More..."}
          </button>
        </div>

        <h3 className="tracking-wide text-2xl md:text-3xl font-extrabold text-gray-900 mb-4 leading-tight">Key Highlights</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {highlights.map((h, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, x: -10 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.06 }}
              className="flex items-start gap-3 bg-gray-50 rounded-xl p-3 md:p-4 border border-gray-100"
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
