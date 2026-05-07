"use client";
import { useRef, useState, useEffect } from "react";
import { motion } from "framer-motion";
import { MapPin, ChevronRight, ChevronLeft } from "lucide-react";
import Link from "next/link";

export default function ProjectsShowcase() {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [isHovered, setIsHovered] = useState(false);
  const [isManualScrolling, setIsManualScrolling] = useState(false);

  // Static Data (No API)
  const projects = [
    {
      id: "1",
      title: "Skyline Heights",
      location: "Hyderabad",
      image: "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=800",
      type: "Apartments",
    },
    {
      id: "2",
      title: "Elite Villas",
      location: "Bangalore",
      image: "https://images.unsplash.com/photo-1568605114967-8130f3a36994?w=800",
      type: "Luxury Villas",
    },
    {
      id: "3",
      title: "Corporate Hub",
      location: "Chennai",
      image: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=800",
      type: "Commercial",
    },
    {
      id: "4",
      title: "Green Residency",
      location: "Vizag",
      image: "https://images.unsplash.com/photo-1502005229762-cf1b2da7c5d6?w=800",
      type: "Gated Community",
    },
  ];

  const duplicatedProjects = [...projects, ...projects, ...projects, ...projects];

  useEffect(() => {
    let animationId: number;
    const scroll = () => {
      if (scrollRef.current && !isHovered && !isManualScrolling) {
        scrollRef.current.scrollLeft += 1;

        const { scrollLeft, scrollWidth } = scrollRef.current;
        if (scrollLeft >= scrollWidth / 2) {
          scrollRef.current.scrollLeft -= scrollWidth / 2;
        }
      }
      animationId = requestAnimationFrame(scroll);
    };

    animationId = requestAnimationFrame(scroll);
    return () => cancelAnimationFrame(animationId);
  }, [isHovered, isManualScrolling]);

  useEffect(() => {
    if (scrollRef.current) {
      const { scrollWidth } = scrollRef.current;
      scrollRef.current.scrollLeft = scrollWidth / 4;
    }
  }, []);

  const handleScrollClick = (direction: "left" | "right") => {
    if (scrollRef.current) {
      const { scrollLeft, scrollWidth } = scrollRef.current;

      if (direction === "left" && scrollLeft <= 0) {
        scrollRef.current.scrollLeft += scrollWidth / 2;
      } else if (direction === "right" && scrollLeft >= scrollWidth / 2) {
        scrollRef.current.scrollLeft -= scrollWidth / 2;
      }

      setIsManualScrolling(true);

      let scrollAmount = 400;
      if (scrollRef.current.firstElementChild) {
        const firstCard = scrollRef.current.firstElementChild as HTMLElement;
        const parentStyle = window.getComputedStyle(scrollRef.current);
        const gap = parseFloat(parentStyle.gap) || 0;
        scrollAmount = firstCard.offsetWidth + gap;
      }

      scrollRef.current.scrollBy({
        left: direction === "right" ? scrollAmount : -scrollAmount,
        behavior: "smooth",
      });

      setTimeout(() => {
        setIsManualScrolling(false);
      }, 600);
    }
  };

  return (
    <section id="projects" className="py-8 md:py-24 bg-gray-50 text-gray-900 overflow-hidden">
      <div className="container mx-auto px-4 lg:px-8">

        <div className="flex flex-col md:flex-row justify-between md:items-end gap-6 mb-6 md:mb-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-[#711113] mb-3">
              Our Projects
            </h2>
            <p className="text-gray-600 mb-3 whitespace-pre-line">
              Explore our residential & commercial projects.
            </p>
          </motion.div>

          <div className="flex gap-4 self-end md:self-auto">
            <button
              onClick={() => handleScrollClick("left")}
              className="p-2.5 md:p-3 border border-gray-300 rounded-full hover:bg-[#711113] hover:border-[#711113] hover:text-white transition-colors"
              aria-label="Previous Project"
            >
              <ChevronLeft size={12} className="md:size-4" />
            </button>
            <button
              onClick={() => handleScrollClick("right")}
              className="p-2.5 md:p-3 border border-gray-300 rounded-full hover:bg-[#711113] hover:border-[#711113] hover:text-white transition-colors"
              aria-label="Next Project"
            >
              <ChevronRight size={12} className="md:size-4" />
            </button>
          </div>
        </div>

        <div
          className="relative group w-full"
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
          onTouchStart={() => setIsHovered(true)}
          onTouchEnd={() => {
            setTimeout(() => setIsHovered(false), 2000);
          }}
        >
          <div
            ref={scrollRef}
            className="flex gap-4 md:gap-8 overflow-x-auto pb-8 scrollbar-hide [&::-webkit-scrollbar]:hidden"
            style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
          >
            {duplicatedProjects.map((project, idx) => (
              <div
                key={`${project.id}-${idx}`}
                className="w-[85vw] md:w-[400px] shrink-0"
              >
                <div className="relative h-[300px] md:h-[400px] rounded-lg overflow-hidden shadow-xl group/card">

                  <Link href={`/projects/${project.id}`} className="absolute inset-0 z-20" />

                  <img
                    src={project.image}
                    alt={project.title}
                    className="w-full h-full object-cover group-hover/card:scale-110 transition duration-700"
                  />

                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent pointer-events-none"></div>

                  <div className="absolute bottom-6 left-6 right-6 text-white pointer-events-none">
                    <p className="text-xs font-bold tracking-widest text-[#F5C33C] uppercase mb-2">
                      {project.type}
                    </p>

                    <h3 className="text-xl md:text-2xl font-bold mb-2 group-hover/card:text-[#29B1D2] transition-colors">
                      {project.title}
                    </h3>

                    <div className="flex justify-between items-end text-sm text-gray-300">
                      <div className="flex items-center gap-1 font-light">
                        <MapPin size={16} />
                        {project.location}
                      </div>

                      <span className="text-[#F5C33C] text-xs font-bold uppercase tracking-wider relative z-30 flex items-center gap-1">
                        View <ChevronRight size={14} />
                      </span>
                    </div>
                  </div>

                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="flex justify-center mt-4 md:mt-8">
          <Link href="/projects" className="text-[#711113] font-bold hover:text-[#29B1D2] transition-colors uppercase tracking-widest text-sm flex items-center gap-2 border-b-2 border-transparent hover:border-[#29B1D2] pb-1">
            View All Projects <ChevronRight size={18} />
          </Link>
        </div>

      </div>
    </section>
  );
}