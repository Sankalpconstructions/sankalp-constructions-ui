"use client";
import { useState, useCallback, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";

const IMAGE_SLIDE_DURATION = 6000;

export default function HeroBanner() {
  const slides = [
    { type: "video", src: "/assets/Project-video.mp4" },
    { type: "image", src: "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=1600" },
    { type: "image", src: "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=1600" },
  ];

  const [index, setIndex] = useState(0);
  const imageTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const advance = useCallback(() => {
    setIndex((prev) => (prev + 1) % slides.length);
  }, [slides.length]);

  useEffect(() => {
    if (imageTimerRef.current) {
      clearTimeout(imageTimerRef.current);
    }

    const currentSlide = slides[index];
    if (currentSlide.type === "image") {
      imageTimerRef.current = setTimeout(advance, IMAGE_SLIDE_DURATION);
    }

    return () => {
      if (imageTimerRef.current) {
        clearTimeout(imageTimerRef.current);
      }
    };
  }, [index, advance, slides]);

  const nextSlide = () => advance();

  const prevSlide = () => {
    setIndex((prev) => (prev === 0 ? slides.length - 1 : prev - 1));
  };

  const handleScrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({
      behavior: "smooth",
    });
  };

  const current = slides[index];

  return (
    <section
      id="hero"
      className="relative w-full h-[50vh] md:h-screen min-h-[400px] md:min-h-[600px] overflow-hidden flex items-center justify-center bg-black"
    >
      <AnimatePresence mode="wait">
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
            initial={{ opacity: 0, scale: 1.05 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1.2 }}
            className="absolute inset-0 w-full h-full object-cover"
          />
        ) : (
          <motion.img
            key={`image-${index}`}
            src={current.src}
            alt="Hero Background"
            initial={{ opacity: 0, scale: 1.05 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1.2 }}
            className="absolute inset-0 w-full h-full object-cover"
          />
        )}
      </AnimatePresence>

      <div className="absolute inset-0 bg-black/30 z-0 pointer-events-none" />

      <button
        onClick={prevSlide}
        className="absolute left-4 md:left-8 top-1/2 -translate-y-1/2 z-20 w-10 h-10 rounded-full border border-white/20 flex items-center justify-center text-white hover:bg-white/10 hover:border-[#F5C33C] hover:text-[#F5C33C] transition-all hidden sm:flex"
      >
        <ChevronLeft size={20} />
      </button>

      <button
        onClick={nextSlide}
        className="absolute right-4 md:right-8 top-1/2 -translate-y-1/2 z-20 w-10 h-10 rounded-full border border-white/20 flex items-center justify-center text-white hover:bg-white/10 hover:border-[#F5C33C] hover:text-[#F5C33C] transition-all hidden sm:flex"
      >
        <ChevronRight size={20} />
      </button>

      {/* Dots */}
      <div className="absolute bottom-10 left-1/2 -translate-x-1/2 z-20 hidden md:flex gap-3">
        {slides.map((_, i) => (
          <button
            key={i}
            onClick={() => setIndex(i)}
            className={`w-2 h-2 rounded-full transition-all duration-300 ${i === index
              ? "bg-[#F5C33C] scale-150 shadow-[0_0_10px_rgba(245,195,60,0.5)]"
              : "bg-white/40 hover:bg-white"
              }`}
          />
        ))}
      </div>

      <motion.div
        animate={{ y: [0, 8, 0] }}
        transition={{ repeat: Infinity, duration: 2 }}
        className="absolute bottom-6 left-1/2 -translate-x-1/2 flex flex-col items-center text-white/60 cursor-pointer lg:hidden z-20"
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