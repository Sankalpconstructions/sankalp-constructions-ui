"use client";
import { useState } from "react";
import { ChevronRight, MapPin, Clock, CheckCircle2, Building2 } from "lucide-react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import Footer from "@/components/Footer";
import ContactFloating from "@/components/ContactFloating";
import ScrollController from "@/components/ScrollController";
import Header from "@/components/Header";

// ─── Data ────────────────────────────────────────────────────────────────────
type ProjectStatus = "ongoing" | "upcoming" | "completed";

interface Project {
  id: number;
  title: string;
  category: string;
  location: string;
  image: string;
  status: ProjectStatus;
  possessionDate: string;
  type: string;
}

const dummyProjects: Project[] = [
  {
    id: 1,
    title: "Sankalp Heights – Urban Luxury",
    category: "Premium 3BHK",
    location: "Baner, Pune West",
    image: "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=1600",
    status: "ongoing",
    possessionDate: "Dec 2026",
    type: "3 BHK Premium",
  },
  {
    id: 2,
    title: "Sankalp Oasis – Natural Living",
    category: "Eco-Friendly",
    location: "Wagholi, Pune East",
    image: "https://images.unsplash.com/photo-1515263487990-61b07816b324?w=1600",
    status: "completed",
    possessionDate: "Mar 2025",
    type: "2 & 3 BHK",
  },
  {
    id: 3,
    title: "Sankalp Residency Overview",
    category: "Luxury 4BHK",
    location: "Camp, Central Pune",
    image: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=1600",
    status: "ongoing",
    possessionDate: "Jun 2027",
    type: "4 BHK Luxury",
  },
  {
    id: 4,
    title: "Sankalp Greens – Smart Homes",
    category: "Smart Homes",
    location: "Hinjewadi, Pune",
    image: "https://images.unsplash.com/photo-1628611225249-6c3c7c689552?w=1600",
    status: "upcoming",
    possessionDate: "Sep 2027",
    type: "2 BHK Smart",
  },
  {
    id: 5,
    title: "Sankalp Villas Retreat",
    category: "Villas",
    location: "Lonavala, Maharashtra",
    image: "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=1600",
    status: "completed",
    possessionDate: "Available Now",
    type: "5 BHK Villa",
  },
  {
    id: 6,
    title: "Sankalp Skyline – The Future",
    category: "Ultra Luxury",
    location: "Koregaon Park, Pune",
    image: "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=1600",
    status: "upcoming",
    possessionDate: "Dec 2028",
    type: "3 & 4 BHK",
  },
];

const TABS: { key: ProjectStatus | "all"; label: string; icon: React.ReactNode }[] = [
  { key: "all", label: "All Projects", icon: <Building2 size={15} className="shrink-0" /> },
  { key: "ongoing", label: "Ongoing", icon: <Clock size={15} className="shrink-0" /> },
  { key: "upcoming", label: "Upcoming", icon: <ChevronRight size={15} className="shrink-0" /> },
  { key: "completed", label: "Completed", icon: <CheckCircle2 size={15} className="shrink-0" /> },
];

const STATUS_BADGE: Record<ProjectStatus, { label: string; color: string }> = {
  ongoing: { label: "Ongoing", color: "bg-amber-500" },
  upcoming: { label: "Upcoming", color: "bg-[#29B1D2]" },
  completed: { label: "Completed", color: "bg-emerald-600" },
};

// ─── Page ─────────────────────────────────────────────────────────────────────
export default function AllProjectsPage() {
  const [activeTab, setActiveTab] = useState<ProjectStatus | "all">("all");

  const filteredProjects =
    activeTab === "all"
      ? dummyProjects
      : dummyProjects.filter((p) => p.status === activeTab);

  return (
    <main className="min-h-screen bg-[#f8f5f0] text-gray-900">
      {/* ── Main Header with full navigation ── */}
      <Header />

      {/* ── Page Hero (no carousel) ── */}
      <div
        className="relative w-full bg-[#050505] flex items-end"
        style={{ minHeight: "280px", paddingTop: "120px" }}
      >
        {/* Subtle pattern overlay */}
        <div
          className="absolute inset-0 opacity-10"
          style={{
            backgroundImage: `url("https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=1600")`,
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#050505] via-[#050505]/80 to-[#050505]/40" />

        <div className="relative z-10 container mx-auto px-4 lg:px-8 pb-14">
          <span className="text-[#F5C33C] text-[10px] uppercase tracking-[0.4em] font-semibold mb-4 block">
            Sankalp Constructions
          </span>
          <h1 className="text-4xl md:text-6xl font-extrabold text-white uppercase tracking-wide leading-tight mb-4">
            Our Projects
          </h1>
          <p className="text-white/50 text-sm md:text-base max-w-xl leading-relaxed">
            Explore our curated portfolio of residential masterpieces — from ongoing constructions
            to completed homes that stand the test of time.
          </p>
          {/* Breadcrumb */}
          <div className="flex items-center gap-2 mt-6 text-white/30 text-xs uppercase tracking-widest">
            <Link href="/" className="hover:text-[#F5C33C] transition">Home</Link>
            <span>/</span>
            <span className="text-white/60">All Projects</span>
          </div>
        </div>
      </div>

      {/* ── Tabs + Grid ── */}
      <div className="container mx-auto px-4 lg:px-8 py-14">
        {/* Tabs */}
        <div className="flex flex-wrap items-center gap-3 mb-10">
          {TABS.map((tab) => (
            <button
              key={tab.key}
              onClick={() => setActiveTab(tab.key as ProjectStatus | "all")}
              className={`flex items-center gap-2 px-6 py-3 rounded-full font-bold uppercase tracking-wider text-xs transition-all duration-300 shadow-sm ${
                activeTab === tab.key
                  ? "bg-[#711113] text-white shadow-[#711113]/30 shadow-lg scale-105"
                  : "bg-white text-gray-500 border border-gray-200 hover:text-[#711113] hover:border-[#711113]"
              }`}
            >
              {tab.icon}
              {tab.label}
            </button>
          ))}
          <span className="ml-auto text-xs text-gray-400 font-medium">
            {filteredProjects.length} project{filteredProjects.length !== 1 ? "s" : ""}
          </span>
        </div>

        {/* Projects Grid */}
        <AnimatePresence mode="popLayout">
          {filteredProjects.length > 0 ? (
            <motion.div
              layout
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16"
            >
              {filteredProjects.map((project) => {
                const badge = STATUS_BADGE[project.status];
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
                    {/* Image */}
                    <div className="relative h-60 overflow-hidden">
                      <img
                        src={project.image}
                        alt={project.title}
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700 ease-in-out"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
                      {/* Status badge */}
                      <span className={`absolute top-4 left-4 ${badge.color} text-white text-[10px] font-bold uppercase tracking-widest px-3 py-1 rounded-full shadow`}>
                        {badge.label}
                      </span>
                      {/* Category badge */}
                      <span className="absolute top-4 right-4 bg-black/50 backdrop-blur-sm text-white text-[10px] font-semibold uppercase tracking-wider px-2.5 py-1 rounded-full">
                        {project.category}
                      </span>
                    </div>

                    {/* Body */}
                    <div className="p-6 flex-1 flex flex-col justify-between">
                      <div>
                        <div className="flex items-center gap-1.5 text-gray-500 text-xs mb-2">
                          <MapPin size={12} className="text-[#711113]" /> {project.location}
                        </div>
                        <h3 className="text-lg font-extrabold uppercase text-gray-900 group-hover:text-[#711113] transition-colors mb-1 line-clamp-2">
                          {project.title}
                        </h3>
                        <p className="text-xs text-gray-400 font-medium">
                          {project.type} · Possession: {project.possessionDate}
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

      <ContactFloating />
      <ScrollController />
      <Footer />
    </main>
  );
}
