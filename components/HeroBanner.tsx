"use client";
import { useState, useEffect, useRef, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { ChevronLeft, ChevronRight, Phone, Mail, Loader2 } from "lucide-react";

const IMAGE_SLIDE_DURATION = 6000; // ms for image slides
const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3001";

interface SlideData {
  type: "video" | "image";
  src: string;
  title: string;
  subtitle: string;
  link: string;
  btnText: string;
}

export default function HeroBanner() {
  const [slides, setSlides] = useState<SlideData[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [index, setIndex] = useState(0);
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const imageTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    const fetchSlides = async () => {
      try {
        const res = await fetch(`${API_BASE_URL}/api/herobanners`);
        const data = await res.json();
        
        // Filter active slides and map to the format HeroBanner expects
        const activeSlides = data
          .filter((slide: any) => slide.isActive !== false)
          .map((slide: any) => {
            const isVideo = slide.image?.toLowerCase().match(/\.(mp4|webm|ogg)$/);
            return {
              type: isVideo ? "video" : "image",
              src: slide.image,
              title: slide.title,
              subtitle: slide.subtitle,
              link: "/#projects", // Default link, since it's not in the admin yet
              btnText: slide.ctaText || "Explore Now"
            };
          });

        if (activeSlides.length > 0) {
          setSlides(activeSlides);
        } else {
          // Fallback if no active slides exist
          setSlides([
            {
              type: "image",
              src: "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=1600",
              title: "Welcome to Sankalp",
              subtitle: "Premium Living At Its Best",
              link: "/#projects",
              btnText: "Explore Projects",
            }
          ]);
        }
      } catch (error) {
        console.error("Error fetching hero slides:", error);
        // Fallback if fetch fails (e.g. CORS or server down)
        setSlides([
          {
            type: "image",
            src: "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=1600",
            title: "Welcome to Sankalp",
            subtitle: "Premium Living At Its Best",
            link: "/#projects",
            btnText: "Explore Projects",
          }
        ]);
      } finally {
        setIsLoading(false);
      }
    };
    fetchSlides();
  }, []);

  const advance = useCallback(() => {
    if (slides.length > 0) {
      setIndex((prev) => (prev + 1) % slides.length);
    }
  }, [slides]);

  // Clear any image timer on slide change
  useEffect(() => {
    if (slides.length === 0) return;
    
    if (imageTimerRef.current) clearTimeout(imageTimerRef.current);

    const slide = slides[index];
    if (slide && slide.type === "image") {
      imageTimerRef.current = setTimeout(advance, IMAGE_SLIDE_DURATION);
    }
    // For video slides, we listen to the `ended` event on the <video> element

    return () => {
      if (imageTimerRef.current) clearTimeout(imageTimerRef.current);
    };
  }, [index, advance, slides]);

  const nextSlide = () => {
    if (slides.length > 0) {
      setIndex((prev) => (prev + 1) % slides.length);
    }
  };
  
  const prevSlide = () => {
    if (slides.length > 0) {
      setIndex((prev) => (prev === 0 ? slides.length - 1 : prev - 1));
    }
  };

  const handleScrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  };

  if (isLoading) {
    return (
      <section className="relative w-full h-[50vh] md:h-screen min-h-[400px] md:min-h-[600px] overflow-hidden flex items-center justify-center bg-black">
        <Loader2 className="animate-spin text-[#F5C33C]" size={40} />
      </section>
    );
  }

  const current = slides[index];
  if (!current) return null;

  return (
    <section
      id="hero"
      className="relative w-full h-[50vh] md:h-screen min-h-[400px] md:min-h-[600px] overflow-hidden flex items-center justify-center bg-black"
    >
      <AnimatePresence mode="popLayout">
        {current.type === "video" ? (
          <motion.video
            key={`vid-${index}`}
            ref={videoRef}
            src={current.src}
            autoPlay
            muted
            playsInline
            onEnded={advance}
            initial={{ opacity: 0, scale: 1.08 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1.4, ease: "easeOut" }}
            className="absolute inset-0 w-full h-full object-cover z-0"
            style={{ width: "100%", height: "100%", objectFit: "cover" }}
          />
        ) : (
          <motion.img
            key={`img-${index}`}
            src={current.src}
            initial={{ opacity: 0, scale: 1.12 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1.4, ease: "easeOut" }}
            className="absolute inset-0 w-full h-full object-cover z-0"
            style={{ width: "100%", height: "100%", objectFit: "cover" }}
            alt={current.title}
          />
        )}
      </AnimatePresence>

      {/* Overlay */}
      <div className="absolute inset-0 bg-black/40 z-0 pointer-events-none" />

      {/* Slide Content */}
      <div className="relative z-10 w-full container mx-auto px-4 lg:px-8 flex flex-col items-center text-center mt-[-5vh]">
        <AnimatePresence mode="wait">
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -30 }}
            transition={{ duration: 1.2, ease: "easeOut" }}
            className="flex flex-col items-center max-w-5xl"
          >
            <span className="uppercase tracking-[0.4em] text-[10px] md:text-xs font-semibold text-[#F5C33C] mb-3 block drop-shadow-md">
              {current.subtitle}
            </span>
            <div className="w-px h-6 bg-gradient-to-b from-transparent via-[#F5C33C] to-transparent mb-3 opacity-60" />
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-medium uppercase tracking-widest text-white leading-[1.2] drop-shadow-2xl px-2 mb-8">
              {current.title}
            </h1>
            <Link
              href={current.link}
              onClick={(e) => {
                if (current.link.startsWith("/#")) {
                  e.preventDefault();
                  handleScrollTo(current.link.replace("/#", ""));
                }
              }}
              className="px-8 py-3 bg-transparent border border-white/50 hover:bg-[#F5C33C] hover:border-[#F5C33C] hover:text-black text-white text-[11px] uppercase tracking-[0.2em] font-semibold rounded-sm transition-all duration-500 shadow-[0_0_15px_rgba(255,255,255,0.05)] hover:shadow-[0_0_20px_rgba(245,195,60,0.4)] backdrop-blur-sm"
            >
              {current.btnText}
            </Link>
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Navigation Arrows */}
      {slides.length > 1 && (
        <>
          <button
            onClick={prevSlide}
            className="absolute left-4 md:left-8 top-1/2 -translate-y-1/2 z-20 w-10 h-10 md:w-12 md:h-12 rounded-full border border-white/20 flex items-center justify-center hover:text-[#F5C33C] text-white hover:bg-white/10 hover:border-[#F5C33C] transition-all hidden sm:flex group"
          >
            <ChevronLeft size={20} strokeWidth={1} className="group-hover:-translate-x-1 transition-transform" />
          </button>
          <button
            onClick={nextSlide}
            className="absolute right-4 md:right-8 top-1/2 -translate-y-1/2 z-20 w-10 h-10 md:w-12 md:h-12 rounded-full border border-white/20 flex items-center justify-center hover:text-[#F5C33C] text-white hover:bg-white/10 hover:border-[#F5C33C] transition-all hidden sm:flex group"
          >
            <ChevronRight size={20} strokeWidth={1} className="group-hover:translate-x-1 transition-transform" />
          </button>
        </>
      )}

      {/* Dots */}
      {slides.length > 1 && (
        <div className="absolute bottom-10 left-1/2 -translate-x-1/2 z-20 hidden md:flex gap-4">
          {slides.map((_, i) => (
            <button
              key={i}
              onClick={() => setIndex(i)}
              className={`w-2 h-2 rounded-full transition-all duration-500 hover:scale-150 ${i === index
                ? "bg-[#F5C33C] scale-150 shadow-[0_0_10px_rgba(245,195,60,0.8)]"
                : "bg-white/30 hover:bg-white/70"
                }`}
              aria-label={`Go to slide ${i + 1}`}
            />
          ))}
        </div>
      )}

      {/* Mobile Scroll Indicator */}
      <motion.div
        animate={{ y: [0, 8, 0] }}
        transition={{ repeat: Infinity, duration: 2 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-3 text-white/50 hover:text-white cursor-pointer transition-colors z-20 lg:hidden"
        onClick={() => handleScrollTo("story")}
        role="button"
      >
        <span className="text-[9px] uppercase tracking-[0.3em] font-medium">Scroll</span>
        <div className="w-px h-10 bg-gradient-to-b from-white to-transparent" />
      </motion.div>
    </section>
  );
}
