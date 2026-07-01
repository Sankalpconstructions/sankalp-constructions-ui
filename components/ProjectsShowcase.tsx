"use client";
import { useRef, useState, useEffect, useCallback } from "react";
import { motion } from "framer-motion";
import { MapPin, ChevronRight, ChevronLeft, Building } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { useAppData } from "@/context/AppDataContext";

const STATUS_BADGE: Record<
  string,
  { label: string; color: string }
> = {
  ongoing: { label: "Ongoing", color: "bg-amber-500" },
  upcoming: { label: "Upcoming", color: "bg-[#29B1D2]" },
  completed: { label: "Completed", color: "bg-emerald-600" },
};

export default function ProjectsShowcase() {
  const scrollRef = useRef<HTMLDivElement>(null);
  const isHovered = useRef(false);
  const isManualScrolling = useRef(false);

  // Read from global prefetch cache
  const { projects: allProjects, isReady } = useAppData();
  const projects = allProjects.filter(p => (p.status || "").toLowerCase() !== "completed");
  const loading = !isReady;

  const duplicatedProjects = projects.length > 0 ? [...projects, ...projects, ...projects, ...projects] : [];

  const handleScrollClick = useCallback((direction: "left" | "right") => {
    if (!scrollRef.current || projects.length === 0) return;
    isManualScrolling.current = true;

    const container = scrollRef.current;
    const firstCard = container.firstElementChild as HTMLElement;
    if (!firstCard) {
      isManualScrolling.current = false;
      return;
    }

    const gap = parseFloat(window.getComputedStyle(container).gap) || 0;
    const cardWidth = firstCard.offsetWidth + gap;
    const singleSetWidth = cardWidth * projects.length;

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
        isManualScrolling.current = false;
      }, 600);
    });
  }, [projects.length]);

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

  // Infinite loop
  useEffect(() => {
    if (projects.length === 0 || loading) return;

    const intervalId = setInterval(() => {
      if (!isHovered.current && !isManualScrolling.current) {
        handleScrollClick("right");
      }
    }, 3500);

    return () => clearInterval(intervalId);
  }, [projects.length, loading, handleScrollClick]);

  return (
    <section id="projects" className="py-8 md:py-16 bg-gray-50 text-gray-900 overflow-hidden">
      <div className="container mx-auto px-4 lg:px-8">

        <div className="flex flex-col md:flex-row justify-between md:items-end gap-6 mb-6 md:mb-12">
          <div>
            <h2 className="text-2xl text-center md:text-left md:text-3xl lg:text-4xl font-bold text-[#711113] mb-3">
              Our Projects
            </h2>
            <Image src="/assets/Title-decorations.png" alt="Decoration" width={200} height={30} className="m-auto md:ml-0 w-[150px] md:w-[200px] h-auto object-contain mt-1 mb-4" unoptimized />
            <p className="text-gray-600 text-center md:text-left mb-3 whitespace-pre-line">
              Explore our residential & commercial projects.
            </p>
          </div>

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
          onMouseEnter={() => { isHovered.current = true; }}
          onMouseLeave={() => { isHovered.current = false; }}
          onTouchStart={() => { isHovered.current = true; }}
          onTouchEnd={() => {
            setTimeout(() => { isHovered.current = false; }, 2000);
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
                    className="w-full md:w-[60%] lg:w-[38%] h-[220px] shrink-0 rounded-lg bg-gray-200 animate-pulse"
                  >
                    <div className="h-full w-full bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200 animate-shimmer" />
                  </div>
                ))}
              </div>
            ) : duplicatedProjects.length > 0 ? (
              duplicatedProjects.map((project, idx) => {
                const projectStatusNormalized = (project.status || "upcoming").toLowerCase();
                const badge = STATUS_BADGE[projectStatusNormalized] || STATUS_BADGE["upcoming"];

                return (
                  <div
                    key={`${project.id}-${idx}`}
                    className="w-full sm:w-[60%] md:w-[45%] lg:w-[calc(33.333%-21px)] shrink-0 snap-start"
                  >
                    <div className="relative h-[400px] sm:h-[500px] rounded-lg overflow-hidden shadow-xl group/card">

                      <Link href={`/projects/${project.id}`} className="absolute inset-0 z-20" />

                      <Image
                        src={project.image}
                        alt={project.title}
                        fill
                        sizes="(max-width: 768px) 100vw, (max-width: 1024px) 60vw, 38vw"
                        priority={true}
                        className="object-cover object-top group-hover/card:scale-110 transition duration-700 bg-gray-300"
                        unoptimized
                      />

                      {/* Status and Type Badges */}
                      <span
                        className={`absolute top-4 left-4 z-30 ${badge.color} text-white text-[10px] font-bold uppercase tracking-widest px-3 py-1 rounded-full shadow`}
                      >
                        {badge.label}
                      </span>

                      <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent pointer-events-none"></div>

                      <div className="absolute bottom-6 left-6 right-6 text-white pointer-events-none">

                        <h3 className="text-lg md:text-xl font-bold mb-2 group-hover/card:text-[#29B1D2] transition-colors">
                          {project.title}
                        </h3>

                        <div className="flex items-center gap-1 font-light text-sm text-gray-300 mb-3">
                          <Building size={16} />
                          {project.type}
                        </div>

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
                );
              })
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