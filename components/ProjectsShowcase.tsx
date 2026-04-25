"use client";
import { useRef, useState, useEffect } from "react";
import { motion } from "framer-motion";
import { ChevronRight, ChevronLeft, MapPin, Loader2 } from "lucide-react";
import Link from "next/link";

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3001";

export default function ProjectsShowcase() {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [projects, setProjects] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        setLoading(true);
        const res = await fetch(`${API_BASE_URL}/api/projects`);
        if (res.ok) {
          const data = await res.json();
          const mapped = data.map((p: any) => ({
            id: p._id,
            title: p.title,
            location: p.location,
            image: p.image || (p.banners && p.banners[0]) || "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=800",
            type: p.type
          }));
          setProjects(mapped);
        }
      } catch (err) {
        console.error("Error fetching projects for showcase:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchProjects();
  }, []);

  const handleScrollClick = (direction: "left" | "right") => {
    if (scrollRef.current) {
      const scrollAmount = 400;
      scrollRef.current.scrollBy({
        left: direction === "right" ? scrollAmount : -scrollAmount,
        behavior: "smooth",
      });
    }
  };

  return (
    <section id="projects" className="py-8 md:py-24 bg-gray-50 overflow-hidden text-gray-900">
      <div className="container mx-auto px-4 lg:px-8">
        <div className="flex justify-between items-end mb-6 md:mb-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
          >
            <h2 className="text-xl md:text-4xl font-extrabold text-[#711113] uppercase tracking-wide">
              Our Projects
            </h2>
            <div className="w-20 md:w-24 h-1 bg-[#29B1D2] mt-3 md:mt-4 mb-2"></div>
            <p className="text-gray-500 text-xs md:text-base max-w-lg mt-3 md:mt-4">
              Explore our diverse portfolio of residential & commercial masterpieces designed for the modern era.
            </p>
          </motion.div>

          <div className="hidden md:flex gap-4">
            <button
              onClick={() => handleScrollClick("left")}
              className="p-3 border border-gray-300 rounded-full hover:bg-[#711113] hover:border-[#711113] hover:text-white transition-colors"
            >
              <ChevronLeft size={24} />
            </button>
            <button
              onClick={() => handleScrollClick("right")}
              className="p-3 border border-gray-300 rounded-full hover:bg-[#711113] hover:border-[#711113] hover:text-white transition-colors"
            >
              <ChevronRight size={24} />
            </button>
          </div>
        </div>

        <div className="relative">
          {loading ? (
            <div className="py-24 flex flex-col items-center justify-center text-gray-400">
              <Loader2 className="animate-spin mb-4" size={40} />
              <p className="uppercase tracking-[0.2em] font-bold text-xs">Loading projects...</p>
            </div>
          ) : projects.length > 0 ? (
            <div
              ref={scrollRef}
              className="flex gap-8 overflow-x-auto snap-x snap-mandatory scrollbar-hide pb-8"
              style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
            >
              {projects.map((project, idx) => (
                <motion.div
                  key={project.id}
                  initial={{ opacity: 0, x: 50 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.5, delay: idx * 0.1 }}
                  viewport={{ once: true }}
                  className="min-w-[85vw] md:min-w-[400px] snap-center flex flex-col group"
                >
                  <div className="relative overflow-hidden h-[300px] md:h-[400px] w-full rounded shadow-xl">
                    <Link href={`/projects/${project.id}`} className="absolute inset-0 z-20"></Link>
                    <img
                      src={project.image}
                      alt={project.title}
                      className="object-cover w-full h-full group-hover:scale-110 transition-transform duration-700 ease-in-out"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent"></div>

                    <div className="absolute bottom-6 left-6 right-6 text-white text-left">
                      <p className="uppercase tracking-[0.2em] text-[#F5C33C] text-xs font-bold mb-2">
                        {project.type}
                      </p>
                      <h3 className="text-2xl font-bold uppercase mb-2 group-hover:text-[#29B1D2] transition-colors">
                        {project.title}
                      </h3>
                      <div className="flex flex-row justify-between items-end text-gray-300 text-sm font-light">
                        <div className="flex items-center gap-1">
                          <MapPin size={16} />
                          {project.location}
                        </div>
                        <Link href={`/projects/${project.id}`} className="text-[#F5C33C] text-xs font-bold uppercase tracking-wider relative z-30 flex items-center gap-1 hover:text-white transition-colors">
                          View <ChevronRight size={14} />
                        </Link>
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          ) : (
            <div className="py-24 text-center text-gray-400 uppercase font-bold tracking-widest">
              No projects to display.
            </div>
          )}
        </div>

        <div className="flex justify-center mt-8">
          <Link
            href="/projects"
            className="inline-flex items-center gap-2 text-[#711113] font-bold uppercase tracking-widest hover:text-[#29B1D2] transition-colors border-b-2 border-transparent hover:border-[#29B1D2] pb-1"
          >
            View All Projects
            <ChevronRight size={20} />
          </Link>
        </div>
      </div>
    </section>
  );
}
