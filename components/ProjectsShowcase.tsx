"use client";
import { useRef } from "react";
import { motion } from "framer-motion";
import { ChevronRight, ChevronLeft, MapPin } from "lucide-react";
import Link from "next/link";

const dummyProjects = [
  { id: 1, title: "Sankalp Heights", location: "Pune West", image: "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=800", type: "3 BHK Premium" },
  { id: 2, title: "Sankalp Oasis", location: "Pune East", image: "https://images.unsplash.com/photo-1515263487990-61b07816b324?w=800", type: "2 & 3 BHK Apartments" },
  { id: 3, title: "Sankalp Residency", location: "Central Pune", image: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800", type: "4 BHK Luxury" },
  { id: 4, title: "Sankalp Greens", location: "Hinjewadi", image: "https://images.unsplash.com/photo-1628611225249-6c3c7c689552?w=800", type: "2 BHK Smart Homes" },
  { id: 5, title: "Sankalp Villas", location: "Lonavala", image: "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=800", type: "5 BHK Villas" },
];

export default function ProjectsShowcase() {
  const scrollRef = useRef<HTMLDivElement>(null);

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
    <section id="projects" className="py-24 bg-gray-50 overflow-hidden text-gray-900">
      <div className="container mx-auto px-4 lg:px-8">
        <div className="flex justify-between items-end mb-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
          >
            <h2 className="text-4xl font-extrabold text-[#711113] uppercase tracking-wide">
              Our Projects
            </h2>
            <div className="w-24 h-1 bg-[#29B1D2] mt-4 mb-2"></div>
            <p className="text-gray-500 max-w-lg mt-4">
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
          <div
            ref={scrollRef}
            className="flex gap-8 overflow-x-auto snap-x snap-mandatory scrollbar-hide pb-8"
            style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
          >
            {dummyProjects.map((project, idx) => (
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
