"use client";
import { useState, useEffect, useCallback, useRef } from "react";
import Link from "next/link";
import {
  MapPin, ChevronLeft, ChevronRight, MessageCircle, FileDown,
  BadgeCheck, Calendar, Layers, Home, Shield,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const WHATSAPP_NUMBER = "917330770111";
function openWhatsApp(message: string) {
  const url = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
  window.open(url, "_blank", "noopener,noreferrer");
}

// ─── Types ────────────────────────────────────────────────────────────────────
interface RelatedProject {
  id: string;
  title: string;
  location: string;
  type: string;
  image: string;
}

interface Props {
  projectTitle: string;
  status: string;
  possessionDate: string;
  totalFloors: string;
  totalUnits: string;
  rera: string;
  relatedProjects: RelatedProject[];
  brochureUrl?: string;
}

// ─── Project Overview Card ─────────────────────────────────────────────────────
function ProjectOverviewCard({
  projectTitle, status, possessionDate, totalFloors, totalUnits, rera, brochureUrl
}: Omit<Props, "relatedProjects">) {
  const items = [
    {
      icon: <BadgeCheck size={16} className="text-[#711113]" />,
      label: "Status",
      value: status,
      badge: true,
    },
    {
      icon: <Calendar size={16} className="text-[#711113]" />,
      label: "Possession",
      value: possessionDate,
    },
    {
      icon: <Layers size={16} className="text-[#711113]" />,
      label: "Total Floors",
      value: totalFloors,
    },
    {
      icon: <Home size={16} className="text-[#711113]" />,
      label: "Total Units",
      value: totalUnits,
    },
    {
      icon: <Shield size={16} className="text-[#711113]" />,
      label: "RERA ID",
      value: rera,
      mono: true,
    },
  ];

  const handleDownloadBrochure = async () => {
    if (!brochureUrl) {
      alert("Brochure is not available for this project yet.");
      return;
    }

    try {
      // Create a hidden link and trigger download
      const link = document.createElement('a');
      link.href = brochureUrl;
      link.setAttribute('download', `${projectTitle.replace(/\s+/g, '_')}_Brochure.pdf`);
      link.setAttribute('target', '_blank'); // Fallback for blob/external URLs
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    } catch (error) {
      console.error("Download failed:", error);
      window.open(brochureUrl, '_blank');
    }
  };

  return (
    <div className="bg-white rounded-2xl shadow-lg overflow-hidden border border-gray-100">
      {/* Header bar */}
      <div className="bg-gradient-to-r from-[#711113] to-[#9b1a1c] px-6 py-5">
        <h3 className="text-base font-extrabold text-white tracking-wide text-center">
          Project Overview
        </h3>
      </div>

      {/* Rows */}
      <div className="px-5 py-2 divide-y divide-gray-50 bg-white">
        {items.map(({ icon, label, value, badge, mono }) => (
          <div
            key={label}
            className="flex items-center justify-between gap-3 py-3.5"
          >
            {/* Label with icon */}
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 bg-[#711113]/5 rounded-lg flex items-center justify-center shrink-0">
                {icon}
              </div>
              <span className="text-[11px] font-bold uppercase tracking-widest text-gray-400">
                {label}
              </span>
            </div>

            {/* Value */}
            <div className="flex-1 flex justify-end">
              {badge ? (
                <span className="text-[11px] font-bold bg-emerald-50 text-emerald-700 border border-emerald-200 px-3 py-1 rounded-full leading-none whitespace-nowrap">
                  {value}
                </span>
              ) : (
                <span
                  className={`text-right font-bold text-gray-900 line-clamp-1 ${mono
                    ? "font-mono text-[10px] text-[#711113] bg-[#711113]/5 px-2 py-1 rounded-md"
                    : "text-sm"
                    }`}
                >
                  {value}
                </span>
              )}
            </div>
          </div>
        ))}
      </div>

      {/* CTA Buttons */}
      <div className="px-5 pt-3 pb-5 flex flex-col sm:flex-row lg:flex-col gap-3 bg-gray-50/50">
        <button
          onClick={() =>
            openWhatsApp(
              `Hi, I'm interested in ${projectTitle}. Please share more details.`
            )
          }
          className="flex-1 py-3.5 bg-[#711113] hover:bg-[#25D366] text-white font-bold uppercase tracking-widest text-[10px] md:text-xs rounded-xl shadow-md transition-all duration-300 flex items-center justify-center gap-2"
        >
          <MessageCircle size={16} /> Enquire Now
        </button>
        <button
          onClick={handleDownloadBrochure}
          className="flex-1 py-3.5 bg-white border-2 border-gray-200 hover:border-[#711113] hover:text-[#711113] text-gray-700 font-bold uppercase tracking-widest text-[10px] md:text-xs rounded-xl transition-all duration-300 flex items-center justify-center gap-2"
        >
          <FileDown size={16} /> Download Brochure
        </button>
      </div>
    </div>
  );
}

// ─── Related Projects Mini-Carousel ──────────────────────────────────────────
const CAROUSEL_INTERVAL = 3500;

function RelatedCarousel({ projects }: { projects: RelatedProject[] }) {
  const [index, setIndex] = useState(0);
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const advance = useCallback(() => {
    setIndex((prev) => (prev + 1) % projects.length);
  }, [projects.length]);

  const resetTimer = useCallback(() => {
    if (timerRef.current) clearTimeout(timerRef.current);
    timerRef.current = setTimeout(advance, CAROUSEL_INTERVAL);
  }, [advance]);

  useEffect(() => {
    if (projects.length < 2) return;
    resetTimer();
    return () => {
      if (timerRef.current) clearTimeout(timerRef.current);
    };
  }, [index, resetTimer, projects.length]);

  const prev = () => {
    resetTimer();
    setIndex((p) => (p === 0 ? projects.length - 1 : p - 1));
  };
  const next = () => {
    resetTimer();
    setIndex((p) => (p + 1) % projects.length);
  };

  if (!projects.length) return null;
  const current = projects[index];

  return (
    <div className="rounded-2xl overflow-hidden border border-gray-100 shadow-lg bg-white">
      {/* Title */}
      <div className="px-5 py-4 border-b border-gray-100 flex items-center gap-3">
        <div className="w-1 h-6 bg-[#711113] rounded-full" />
        <div>
          <p className="text-[10px] uppercase tracking-widest font-bold text-[#711113] leading-none text-center">
            Explore More
          </p>
          <h3 className="text-sm font-extrabold text-gray-900">
            Related Projects
          </h3>
        </div>
      </div>

      {/* Image carousel */}
      <div className="relative h-44 overflow-hidden">
        <AnimatePresence mode="popLayout">
          <motion.img
            key={current.image}
            src={current.image}
            alt={current.title}
            initial={{ opacity: 0, x: 40 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -40 }}
            transition={{ duration: 0.8, ease: "easeInOut" }}
            className="absolute inset-0 w-full h-full object-cover"
          />
        </AnimatePresence>
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
        <span className="absolute top-3 left-3 bg-[#F5C33C] text-[#711113] text-[9px] font-extrabold uppercase tracking-widest px-2.5 py-1 rounded-full shadow">
          {current.type}
        </span>
        {projects.length > 1 && (
          <>
            <button
              onClick={prev}
              className="absolute left-2 top-1/2 -translate-y-1/2 w-7 h-7 rounded-full bg-black/40 backdrop-blur-sm border border-white/20 flex items-center justify-center text-white hover:bg-[#711113] transition-all"
            >
              <ChevronLeft size={14} />
            </button>
            <button
              onClick={next}
              className="absolute right-2 top-1/2 -translate-y-1/2 w-7 h-7 rounded-full bg-black/40 backdrop-blur-sm border border-white/20 flex items-center justify-center text-white hover:bg-[#711113] transition-all"
            >
              <ChevronRight size={14} />
            </button>
          </>
        )}
      </div>

      {/* Project info */}
      <AnimatePresence mode="wait">
        <motion.div
          key={current.id}
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -8 }}
          transition={{ duration: 0.5 }}
          className="px-5 py-4"
        >
          <h4 className="font-extrabold text-gray-900 text-sm leading-snug line-clamp-2 mb-1.5">
            {current.title}
          </h4>
          <p className="flex items-center gap-1 text-gray-500 text-[10px] md:text-xs mb-4">
            <MapPin size={11} className="text-[#711113]" /> {current.location}
          </p>
          <Link
            href={`/projects/${current.id}`}
            className="flex items-center justify-center gap-2 bg-[#711113] hover:bg-[#F5C33C] hover:text-black text-white font-bold uppercase tracking-widest text-[10px] py-2.5 rounded-xl transition-all duration-300"
          >
            View Details <ChevronRight size={13} />
          </Link>
        </motion.div>
      </AnimatePresence>

      {/* Dots */}
      {projects.length > 1 && (
        <div className="flex justify-center gap-1.5 pb-4">
          {projects.map((_, i) => (
            <button
              key={i}
              onClick={() => {
                resetTimer();
                setIndex(i);
              }}
              className={`rounded-full transition-all duration-500 ${i === index
                ? "w-5 h-1.5 bg-[#711113]"
                : "w-1.5 h-1.5 bg-gray-300 hover:bg-gray-500"
                }`}
            />
          ))}
        </div>
      )}

      {/* View all link */}
      <div className="border-t border-gray-100 px-5 py-3 flex justify-end">
        <Link
          href="/projects"
          className="flex items-center gap-1 text-[#711113] font-bold text-[10px] uppercase tracking-widest hover:gap-2 transition-all"
        >
          View All Projects <ChevronRight size={13} />
        </Link>
      </div>
    </div>
  );
}

// ─── Exported Sidebar ─────────────────────────────────────────────────────────
export default function ProjectSidebar({
  projectTitle,
  status,
  possessionDate,
  totalFloors,
  totalUnits,
  rera,
  relatedProjects,
  brochureUrl,
}: Props) {
  return (
    <aside className="flex flex-col gap-6 w-full max-w-full overflow-hidden">
      <ProjectOverviewCard
        projectTitle={projectTitle}
        status={status}
        possessionDate={possessionDate}
        totalFloors={totalFloors}
        totalUnits={totalUnits}
        rera={rera}
        brochureUrl={brochureUrl}
      />
      <RelatedCarousel projects={relatedProjects} />
    </aside>
  );
}
