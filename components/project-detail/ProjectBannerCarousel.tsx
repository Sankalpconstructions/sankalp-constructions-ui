"use client";
import { useState, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";
import Link from "next/link";

interface BannerSlide {
  image: string;
  label?: string;
}

interface Props {
  slides: BannerSlide[];
  title: string;
  location: string;
  type: string;
}

export default function ProjectBannerCarousel({ slides, title, location, type }: Props) {
  const [current, setCurrent] = useState(0);
  const total = slides.length;

  const next = useCallback(() => setCurrent((p) => (p + 1) % total), [total]);
  const prev = useCallback(() => setCurrent((p) => (p === 0 ? total - 1 : p - 1)), [total]);

  return (
    <section className="relative w-full h-[55vh] md:h-[75vh] overflow-hidden bg-black">
      <AnimatePresence mode="popLayout">
        <motion.img
          key={current}
          src={slides[current].image}
          alt={title}
          initial={{ opacity: 0, scale: 1.08 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.9 }}
          className="absolute inset-0 w-full h-full object-cover opacity-70"
        />
      </AnimatePresence>

      {/* Gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-black/30" />

      {/* Content */}
      <div className="absolute inset-x-0 bottom-0 p-6 md:p-12 z-10 text-white">
        <motion.div
          key={current}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
        >
          <span className="inline-block bg-[#F5C33C] text-[#711113] px-3 py-1 font-bold text-xs uppercase tracking-widest rounded mb-4">
            {type}
          </span>
          <h1 className="text-3xl sm:text-5xl md:text-6xl font-extrabold uppercase tracking-wide drop-shadow-xl mb-2">
            {title}
          </h1>
          <p className="text-gray-300 text-lg">{location}</p>
        </motion.div>
      </div>

      {/* Arrows */}
      {total > 1 && (
        <>
          <button
            onClick={prev}
            className="absolute left-4 md:left-8 top-1/2 -translate-y-1/2 z-20 w-11 h-11 rounded-full bg-black/40 border border-white/20 text-white hover:bg-[#711113] hover:border-[#711113] flex items-center justify-center transition-all"
            aria-label="Previous"
          >
            <ChevronLeft size={22} />
          </button>
          <button
            onClick={next}
            className="absolute right-4 md:right-8 top-1/2 -translate-y-1/2 z-20 w-11 h-11 rounded-full bg-black/40 border border-white/20 text-white hover:bg-[#711113] hover:border-[#711113] flex items-center justify-center transition-all"
            aria-label="Next"
          >
            <ChevronRight size={22} />
          </button>
          {/* Dots */}
          <div className="absolute bottom-6 right-8 z-20 flex gap-2">
            {slides.map((_, i) => (
              <button
                key={i}
                onClick={() => setCurrent(i)}
                className={`h-1.5 rounded-full transition-all duration-300 ${i === current ? "w-6 bg-[#F5C33C]" : "w-2 bg-white/40"}`}
                aria-label={`Slide ${i + 1}`}
              />
            ))}
          </div>
        </>
      )}

    </section>
  );
}
