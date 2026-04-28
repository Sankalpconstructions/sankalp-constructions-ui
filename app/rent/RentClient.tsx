"use client";
import { useState, useEffect } from "react";
import { ChevronRight, MapPin, Loader2, Building2 } from "lucide-react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";

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

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3001";

const STATUS_BADGE: Record<ProjectStatus, { label: string; color: string }> = {
  ongoing: { label: "Ongoing", color: "bg-amber-500" },
  upcoming: { label: "Upcoming", color: "bg-[#29B1D2]" },
  completed: { label: "Completed", color: "bg-emerald-600" },
};

export default function RentClient({ rentType }: { rentType: "residential" | "commercial" }) {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        setLoading(true);
        const res = await fetch(`${API_BASE_URL}/api/projects`);
        if (!res.ok) throw new Error("Failed to fetch projects");
        const data = await res.json();
        
        // Map API data to UI structure
        const mappedProjects: Project[] = data.map((p: any) => ({
          id: p._id,
          title: p.title,
          category: p.type,
          location: p.location,
          image: p.image || (p.banners && p.banners[0]) || "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=1600",
          status: (p.status?.toLowerCase() || "upcoming") as ProjectStatus,
          possessionDate: p.possessionDate || "TBA",
          type: p.type,
        }));
        
        // Filter by rentType (Residential / Commercial)
        const filtered = mappedProjects.filter(p => 
          p.category?.toLowerCase().includes(rentType.toLowerCase()) ||
          p.type?.toLowerCase().includes(rentType.toLowerCase())
        );
        
        setProjects(filtered);
        setError(null);
      } catch (err: any) {
        console.error("Error fetching projects:", err);
        setError("Unable to load projects at the moment.");
      } finally {
        setLoading(false);
      }
    };

    fetchProjects();
  }, [rentType]);

  const title = rentType === "residential" ? "Residential Projects" : "Commercial Projects";
  const desc = rentType === "residential" 
    ? "Discover premium residential properties designed to elevate your everyday living with world-class amenities."
    : "Explore prime commercial spaces crafted for success, strategic growth, and business excellence.";

  return (
    <div className="bg-[#f8f5f0] text-gray-900 min-h-screen">
      <div
        className="relative w-full bg-[#050505] flex items-end"
        style={{ minHeight: "280px", paddingTop: "120px" }}
      >
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
            Rent / {rentType}
          </span>
          <h1 className="text-4xl md:text-6xl font-extrabold text-white uppercase tracking-wide leading-tight mb-4">
            {title}
          </h1>
          <p className="text-white/50 text-sm md:text-base max-w-xl leading-relaxed">
            {desc}
          </p>
          <div className="flex items-center gap-2 mt-6 text-white/30 text-xs uppercase tracking-widest">
            <Link href="/" className="hover:text-[#F5C33C] transition">Home</Link>
            <span>/</span>
            <span className="text-white/60">Rent</span>
            <span>/</span>
            <span className="text-white/60 capitalize">{rentType}</span>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 lg:px-8 py-14">
        {loading ? (
          <div className="py-24 flex flex-col items-center justify-center text-gray-400">
            <Loader2 className="animate-spin mb-4" size={40} />
            <p className="uppercase tracking-[0.2em] font-bold text-xs">Loading {rentType} projects...</p>
          </div>
        ) : error ? (
          <div className="py-24 text-center text-red-500 uppercase font-bold tracking-widest">
            {error}
          </div>
        ) : (
          <AnimatePresence mode="popLayout">
            {projects.length > 0 ? (
              <motion.div
                layout
                className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16"
              >
                {projects.map((project) => {
                  const badge = STATUS_BADGE[project.status] || STATUS_BADGE["upcoming"];
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
                        <span className={`absolute top-4 left-4 ${badge.color} text-white text-[10px] font-bold uppercase tracking-widest px-3 py-1 rounded-full shadow`}>
                          {badge.label}
                        </span>
                        <span className="absolute top-4 right-4 bg-black/50 backdrop-blur-sm text-white text-[10px] font-semibold uppercase tracking-wider px-2.5 py-1 rounded-full">
                          {project.category}
                        </span>
                      </div>

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
                className="py-24 text-center text-gray-400 flex flex-col items-center justify-center gap-4"
              >
                <Building2 size={48} className="text-gray-300" />
                <p className="text-lg uppercase font-bold tracking-widest">
                  No {rentType} projects available.
                </p>
              </motion.div>
            )}
          </AnimatePresence>
        )}
      </div>

    </div>
  );
}
