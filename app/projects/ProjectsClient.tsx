"use client";
import React, { useState } from "react";
import {
  ChevronRight,
  MapPin,
  Clock,
  CheckCircle2,
  Building2,
} from "lucide-react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import PageBanner from "@/components/PageBanner";

// ─── Data ────────────────────────────────────────────────────────────────────
type ProjectStatus = "ongoing" | "upcoming" | "completed";

interface Project {
  id: string;
  title: string;
  category: string;
  location: string;
  image: string;
  status: ProjectStatus;
  possessionDate: string;
  type: string;
}


const TABS: {
  key: ProjectStatus | "all";
  label: string;
  icon: React.ReactNode;
}[] = [
    {
      key: "all",
      label: "All Projects",
      icon: <Building2 size={15} className="shrink-0" />,
    },
    {
      key: "ongoing",
      label: "Ongoing",
      icon: <Clock size={15} className="shrink-0" />,
    },
    {
      key: "upcoming",
      label: "Upcoming",
      icon: <ChevronRight size={15} className="shrink-0" />,
    },
    {
      key: "completed",
      label: "Completed",
      icon: <CheckCircle2 size={15} className="shrink-0" />,
    },
  ];

const STATUS_BADGE: Record<
  ProjectStatus,
  { label: string; color: string }
> = {
  ongoing: { label: "Ongoing", color: "bg-amber-500" },
  upcoming: { label: "Upcoming", color: "bg-[#29B1D2]" },
  completed: { label: "Completed", color: "bg-emerald-600" },
};

// ─── Page ─────────────────────────────────────────────────────────────────────
export default function AllProjectsPage() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);

  React.useEffect(() => {
    const fetchProjects = async () => {
      try {
        const baseUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001';
        const res = await fetch(`${baseUrl}/api/projects`);
        if (res.ok) {
          const data = await res.json();
          const formatted = data.map((p: any) => ({
            id: p._id || p.id,
            title: p.title,
            category: p.type || "Residential",
            location: p.location,
            image: p.banners?.[0] || p.image || "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=1600",
            status: (p.status || "upcoming").toLowerCase(),
            possessionDate: p.possessionDate || "TBA",
            type: p.type
          }));
          setProjects(formatted);
        }
      } catch (error) {
        console.error("Error fetching projects:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchProjects();
  }, []);
  const [activeTab, setActiveTab] =
    useState<ProjectStatus | "all">("all");

  const filteredProjects =
    activeTab === "all"
      ? projects
      : projects.filter((p) => p.status === activeTab);

  return (
    <div className="bg-[#f8f5f0] text-gray-900">
      <PageBanner
        title={
          <>
            Our <span className="text-[#29B1D2]">Projects</span>
          </>
        }
        subtitle="Explore our curated portfolio of residential masterpieces — from ongoing constructions to completed homes that stand the test of time."
        image="https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=1600"
        breadcrumbs={[{ label: "Our Projects" }]}
      />

      <div className="container mx-auto px-4 lg:px-8 py-14">
        {/* Tabs */}
        <div className="flex flex-wrap items-center gap-3 mb-10">
          {TABS.map((tab) => (
            <button
              key={tab.key}
              onClick={() =>
                setActiveTab(tab.key as ProjectStatus | "all")
              }
              className={`flex items-center gap-2 px-6 py-3 rounded-full font-bold uppercase tracking-wider text-xs transition-all duration-300 shadow-sm ${activeTab === tab.key
                ? "bg-[#711113] text-white shadow-[#711113]/30 shadow-lg scale-105"
                : "bg-white text-gray-500 border border-gray-200 hover:text-[#711113] hover:border-[#711113]"
                }`}
            >
              {tab.icon}
              {tab.label}
            </button>
          ))}

          <span className="ml-auto text-xs text-gray-400 font-medium">
            {!loading && (
              <>
                {filteredProjects.length} project{filteredProjects.length !== 1 ? "s" : ""}
              </>
            )}
          </span>
        </div>

        {/* Projects Grid */}
        <AnimatePresence mode="popLayout">
          {loading ? (
             <motion.div
               key="loading"
               initial={{ opacity: 0 }}
               animate={{ opacity: 1 }}
               exit={{ opacity: 0 }}
               className="py-24 text-center text-gray-400 text-sm uppercase font-bold tracking-widest"
             >
               Loading Projects...
             </motion.div>
          ) : filteredProjects.length > 0 ? (
            <motion.div
              layout
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16"
            >
              {filteredProjects.map((project) => {
                const badge =
                  STATUS_BADGE[project.status] ||
                  STATUS_BADGE["upcoming"];

                return (
                  <motion.div
                    key={project.id}
                    layout
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.92 }}
                    transition={{ duration: 0.4 }}
                    className="bg-white rounded-2xl shadow-md hover:shadow-2xl transition-all duration-400 overflow-hidden group flex flex-col border border-gray-100"
                  >
                    <div className="relative h-60 overflow-hidden">
                      <img
                        src={project.image}
                        alt={project.title}
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700 ease-in-out"
                      />

                      <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />

                      <span
                        className={`absolute top-4 left-4 ${badge.color} text-white text-[10px] font-bold uppercase tracking-widest px-3 py-1 rounded-full shadow`}
                      >
                        {badge.label}
                      </span>

                      <span className="absolute top-4 right-4 bg-black/50 backdrop-blur-sm text-white text-[10px] font-semibold uppercase tracking-wider px-2.5 py-1 rounded-full">
                        {project.category}
                      </span>
                    </div>

                    <div className="p-6 flex-1 flex flex-col justify-between">
                      <div>
                        <div className="flex items-center gap-1.5 text-gray-500 text-xs mb-2">
                          <MapPin
                            size={12}
                            className="text-[#711113]"
                          />
                          {project.location}
                        </div>

                        <h3 className="text-lg font-extrabold uppercase text-gray-900 group-hover:text-[#711113] transition-colors mb-1 line-clamp-2">
                          {project.title}
                        </h3>

                        <p className="text-xs text-gray-400 font-medium">
                          {project.type} · Possession:{" "}
                          {project.possessionDate}
                        </p>
                      </div>

                      <Link
                        href={`/projects/${project.id}`}
                        className="mt-5 flex items-center justify-center gap-2 bg-[#f4eded] hover:bg-[#711113] text-[#711113] hover:text-white font-bold uppercase tracking-widest text-xs py-3 rounded-xl transition-all duration-300"
                      >
                        View Details <ChevronRight size={15} />
                      </Link>
                    </div>
                  </motion.div>
                );
              })}
            </motion.div>
          ) : (
            <motion.div
              key="empty"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="py-24 text-center text-gray-400 text-lg uppercase font-bold tracking-widest"
            >
              No projects in this category.
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}