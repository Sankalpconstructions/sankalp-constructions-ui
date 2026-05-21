"use client";
import { useRef, useState, useEffect, useCallback } from "react";
import { motion } from "framer-motion";
import { MapPin, ChevronRight, ChevronLeft } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { useAppData } from "@/context/AppDataContext";

export default function ProjectsShowcase() {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [isHovered, setIsHovered] = useState(false);
  const [isManualScrolling, setIsManualScrolling] = useState(false);

  // Read from global prefetch cache — data is already loading during preloader
  const { projects, isReady } = useAppData();
  const loading = !isReady;

  // Duplicate projects to create an infinite scroll illusion
  // Using 4 sets ensures we have enough items for very wide screens and seamless wrapping
  const duplicatedProjects = projects.length > 0 ? [...projects, ...projects, ...projects, ...projects] : [];

  const handleScrollClick = useCallback((direction: "left" | "right") => {
    if (!scrollRef.current || projects.length === 0) return;
    setIsManualScrolling(true);

    const container = scrollRef.current;
    const firstCard = container.firstElementChild as HTMLElement;
    if (!firstCard) {
      setIsManualScrolling(false);
      return;
    }

    const gap = parseFloat(window.getComputedStyle(container).gap) || 0;
    const cardWidth = firstCard.offsetWidth + gap;
    const singleSetWidth = cardWidth * projects.length;

    // Wrap around logic to keep scroll in the middle sets invisibly
    if (direction === "right" && container.scrollLeft >= singleSetWidth * 2 - 10) {
      container.scrollLeft -= singleSetWidth;
    } else if (direction === "left" && container.scrollLeft <= 10) {
      container.scrollLeft += singleSetWidth;
    }

    requestAnimationFrame(() => {
      container.scrollBy({
        left: direction === "right" ? cardWidth : -cardWidth,
        behavior: "smooth",
      });

      setTimeout(() => {
        setIsManualScrolling(false);
      }, 600); // Wait for smooth scroll to finish
    });
  }, [projects.length]);

  // Set initial scroll position to the second set to allow immediate left scrolling
  useEffect(() => {
    if (scrollRef.current && projects.length > 0) {
      const container = scrollRef.current;
      const firstCard = container.firstElementChild as HTMLElement;
      if (firstCard) {
        const gap = parseFloat(window.getComputedStyle(container).gap) || 0;
        const cardWidth = firstCard.offsetWidth + gap;
        container.scrollLeft = cardWidth * projects.length;
      }
    }
  }, [projects]);

  // Infinite loop Slide -> Stop -> Slide -> Stop
  useEffect(() => {
    if (projects.length === 0 || loading) return;

    let intervalId: ReturnType<typeof setInterval>;

    const startCarousel = () => {
      intervalId = setInterval(() => {
        handleScrollClick("right");
      }, 3500); // 3.5 seconds pause between transitions
    };

    if (!isHovered && !isManualScrolling) {
      startCarousel();
    }

    return () => {
      if (intervalId) clearInterval(intervalId);
    };
  }, [projects.length, loading, isHovered, isManualScrolling, handleScrollClick]);

  return (
    <section id="projects" className="py-8 md:py-16 bg-gray-50 text-gray-900 overflow-hidden">
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
            className="flex gap-4 md:gap-8 overflow-x-auto pb-8 scrollbar-hide snap-x snap-mandatory [&::-webkit-scrollbar]:hidden"
            style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
          >
            {loading ? (
               <div className="flex gap-4 md:gap-8">
    {Array.from({ length: 4 }).map((_, i) => (
      <div
        key={i}
        className="w-[85vw] md:w-[350px] h-[220px] shrink-0 rounded-lg bg-gray-200 animate-pulse"
      >
        <div className="h-full w-full bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200 animate-shimmer" />
      </div>
    ))}
  </div>
            ) : duplicatedProjects.length > 0 ? (
              duplicatedProjects.map((project, idx) => (
              <div
                key={`${project.id}-${idx}`}
                className="w-[85vw] md:w-[400px] shrink-0 snap-start"
              >
                <div className="relative h-[300px] md:h-[400px] rounded-lg overflow-hidden shadow-xl group/card">

                  <Link href={`/projects/${project.id}`} className="absolute inset-0 z-20" />

                  <Image
                    src={project.image}
                    alt={project.title}
                    fill
                    sizes="(max-width: 768px) 85vw, 400px"
                    priority={idx < 3}
                    className="object-cover group-hover/card:scale-110 transition duration-700"
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
                        {project.configurations}
                      </div>

                      <span className="text-[#F5C33C] text-xs font-bold uppercase tracking-wider relative z-30 flex items-center gap-1">
                        View <ChevronRight size={14} />
                      </span>
                    </div>
                  </div>

                </div>
              </div>
            ))
            ) : (
              <div className="w-full text-center py-20 text-gray-500 font-bold uppercase tracking-widest text-sm">
                No Projects Found
              </div>
            )}
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