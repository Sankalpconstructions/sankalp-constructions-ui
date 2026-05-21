"use client";
import { useState, useCallback, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";

const IMAGE_SLIDE_DURATION = 6000;

export default function HeroBanner() {
  const FALLBACK_SLIDES = [
    { type: "image", src: "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=1600", mobileImage: "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=800" },
    { type: "image", src: "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=1600", mobileImage: "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=800" }
  ];

  const [slides, setSlides] = useState<any[]>(FALLBACK_SLIDES);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchBanners = async () => {
      try {
        const baseUrl = process.env.NEXT_PUBLIC_API_URL || (typeof window !== "undefined" ? `${window.location.protocol}//${window.location.hostname}:3001` : 'http://localhost:3001');
        const res = await fetch(`${baseUrl}/api/herobanners`);
        if (res.ok) {
          const data = await res.json();
          const activeSlides = data.filter((s: any) => s.isActive);
          if (activeSlides.length > 0) {
            setSlides(activeSlides.map((s: any) => ({ type: s.type || 'image', src: s.image || s.url || s.src, mobileImage: s.mobileImage || s.image || s.url || s.src })));
          } else {
            // keep FALLBACK_SLIDES (already set)
          }
        }
      } catch (error) {
        console.error("Error fetching banners:", error);
        setSlides([
          { type: "image", src: "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=1600", mobileImage: "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=800" },
          { type: "image", src: "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=1600", mobileImage: "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=800" }
        ]);
      } finally {
        setLoading(false);
      }
    };
    fetchBanners();
  }, []);

  const [index, setIndex] = useState(0);
  const [direction, setDirection] = useState(1); // 1 = forward, -1 = backward
  const imageTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const advance = useCallback(() => {
    setDirection(1);
    setIndex((prev) => (prev + 1) % slides.length);
  }, [slides.length]);

  useEffect(() => {
    if (imageTimerRef.current) {
      clearTimeout(imageTimerRef.current);
    }

    if (slides.length === 0) return;
    const currentSlide = slides[index];
    if (currentSlide?.type === "image") {
      imageTimerRef.current = setTimeout(advance, IMAGE_SLIDE_DURATION);
    }

    return () => {
      if (imageTimerRef.current) {
        clearTimeout(imageTimerRef.current);
      }
    };
  }, [index, advance, slides]);

  const nextSlide = () => {
    setDirection(1);
    setIndex((prev) => (prev + 1) % slides.length);
  };

  const prevSlide = () => {
    setDirection(-1);
    setIndex((prev) => (prev === 0 ? slides.length - 1 : prev - 1));
  };

  const goToSlide = (i: number) => {
    setDirection(i > index ? 1 : -1);
    setIndex(i);
  };

  const handleScrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({
      behavior: "smooth",
    });
  };

  if (loading || slides.length === 0) return null;

  const current = slides[index] || slides[0];

  const slideVariants = {
    enter: (dir: number) => ({ opacity: 0, x: dir > 0 ? 80 : -80 }),
    center: { opacity: 1, x: 0 },
    exit: (dir: number) => ({ opacity: 0, x: dir > 0 ? -80 : 80 }),
  };

  return (
    <section
      id="hero"
      className="relative w-full overflow-hidden flex items-center justify-center bg-black"
      style={{ height: "450px" }}
    >
      <style>{`
        @media (min-width: 768px) {
          #hero {
            height: 100vh !important;
            min-height: 600px !important;
          }
        }
      `}</style>

      <AnimatePresence mode="wait" custom={direction}>
        {current.type === "video" ? (
          <motion.video
            key={`video-${index}`}
            src={current.src}
            autoPlay
            muted
            playsInline
            onEnded={advance}
            onError={() => {
              setTimeout(advance, 3000);
            }}
            custom={direction}
            variants={slideVariants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{ duration: 0.45, ease: [0.25, 0.46, 0.45, 0.94] }}
            className="absolute inset-0 w-full h-full object-contain md:object-cover"
          />
        ) : (
          <motion.picture
            key={`image-${index}`}
            custom={direction}
            variants={slideVariants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{ duration: 0.45, ease: [0.25, 0.46, 0.45, 0.94] }}
            className="absolute inset-0 w-full h-full"
          >
            <source media="(max-width: 768px)" srcSet={current.mobileImage} />
            <img
              src={current.src}
              alt="Hero Background"
              className="w-full h-full object-cover"
            />
          </motion.picture>
        )}
      </AnimatePresence>

      <div className="absolute inset-0 bg-black/30 z-0 pointer-events-none" />

      {/* Prev Button */}
      <button
        onClick={prevSlide}
        className="absolute left-4 md:left-8 top-1/2 -translate-y-1/2 z-20 w-10 h-10 rounded-full border border-white/20 flex items-center justify-center text-white hover:bg-white/10 hover:border-[#F5C33C] hover:text-[#F5C33C] transition-all"
      >
        <ChevronLeft size={20} />
      </button>

      {/* Next Button */}
      <button
        onClick={nextSlide}
        className="absolute right-4 md:right-8 top-1/2 -translate-y-1/2 z-20 w-10 h-10 rounded-full border border-white/20 flex items-center justify-center text-white hover:bg-white/10 hover:border-[#F5C33C] hover:text-[#F5C33C] transition-all"
      >
        <ChevronRight size={20} />
      </button>

      {/* Dots */}
      <div className="absolute bottom-6 md:bottom-10 left-1/2 -translate-x-1/2 z-20 flex gap-2 items-center">
        {slides.map((_, i) => (
          <button
            key={i}
            onClick={() => goToSlide(i)}
            className={`h-2 rounded-full transition-all duration-300 ${
              i === index
                ? "bg-[#F5C33C] w-8 shadow-[0_0_10px_rgba(245,195,60,0.6)]"
                : "bg-white/40 hover:bg-white w-2"
            }`}
          />
        ))}
      </div>

      <motion.div
        animate={{ y: [0, 8, 0] }}
        transition={{ repeat: Infinity, duration: 2 }}
        className="absolute bottom-16 md:bottom-6 left-1/2 -translate-x-1/2 flex flex-col items-center text-white/60 cursor-pointer lg:hidden z-20"
        onClick={() => handleScrollTo("story")}
      >
        <span className="text-[9px] uppercase tracking-[0.3em]">
          Scroll
        </span>
        <div className="w-px h-8 bg-gradient-to-b from-white to-transparent mt-2" />
      </motion.div>
    </section>
  );
}