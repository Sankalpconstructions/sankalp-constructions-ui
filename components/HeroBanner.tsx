"use client";
import { useState, useEffect, useRef, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { ChevronLeft, ChevronRight, Phone, Mail } from "lucide-react";

const IMAGE_SLIDE_DURATION = 6000; // ms for image slides

const sliderData: {
  type: "video" | "image";
  src: string;
  title: string;
  subtitle: string;
  link: string;
  btnText: string;
}[] = [
    {
      type: "video",
      src: "/assets/Apartment.mp4",
      title: "Experience Luxury Like Never Before",
      subtitle: "A NEW ERA OF ELEGANCE",
      link: "/#projects",
      btnText: "Explore Projects",
    },
    {
      type: "image",
      src: "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=1600",
      title: "Premium Living At Its Best",
      subtitle: "Discover Spaces Designed For You",
      link: "/#projects",
      btnText: "Explore Projects",
    },
    {
      type: "image",
      src: "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=1600",
      title: "Modern Architecture",
      subtitle: "Built with elegance and innovation",
      link: "/#story",
      btnText: "Our Story",
    },
    {
      type: "image",
      src: "https://images.unsplash.com/photo-1628611225249-6c3c7c689552?w=1600",
      title: "Luxury Amenities",
      subtitle: "Elevate your lifestyle with world-class facilities",
      link: "/#amenities",
      btnText: "View Amenities",
    },
  ];

export default function HeroBanner() {
  const [index, setIndex] = useState(0);
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const imageTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const advance = useCallback(() => {
    setIndex((prev) => (prev + 1) % sliderData.length);
  }, []);

  // Clear any image timer on slide change
  useEffect(() => {
    if (imageTimerRef.current) clearTimeout(imageTimerRef.current);

    const slide = sliderData[index];
    if (slide.type === "image") {
      imageTimerRef.current = setTimeout(advance, IMAGE_SLIDE_DURATION);
    }
    // For video slides, we listen to the `ended` event on the <video> element

    return () => {
      if (imageTimerRef.current) clearTimeout(imageTimerRef.current);
    };
  }, [index, advance]);

  const nextSlide = () => setIndex((prev) => (prev + 1) % sliderData.length);
  const prevSlide = () =>
    setIndex((prev) => (prev === 0 ? sliderData.length - 1 : prev - 1));

  const handleScrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  };

  const current = sliderData[index];

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
            alt="Sankalp Constructions"
          />
        )}
      </AnimatePresence>

      {/* Overlay */}
      <div className="absolute inset-0 bg-black/25 z-0 pointer-events-none" />

      {/* Slide Content */}
      {/* <div className="relative z-10 w-full container mx-auto px-4 lg:px-8 flex flex-col items-center text-center mt-[-5vh]">
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
      </div> */}

      {/* Navigation Arrows */}
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

      {/* Dots */}
      <div className="absolute bottom-10 left-1/2 -translate-x-1/2 z-20 hidden md:flex gap-4">
        {sliderData.map((_, i) => (
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

      {/* Bottom Contact Bar */}
      {/* <div className="absolute bottom-0 left-0 w-full z-20">
        <div className="bg-[#050505]/95 backdrop-blur-2xl border-t border-white/10 shadow-[0_-10px_40px_rgba(0,0,0,0.3)] p-4 lg:p-0">
          <div className="container mx-auto px-2 lg:px-8 flex flex-col xl:flex-row justify-between items-center py-2 lg:py-5 gap-4 lg:gap-0">
            <div className="text-white hidden sm:flex items-center gap-4 lg:gap-10">
              <div className="flex flex-col items-center xl:items-start text-center xl:text-left">
                <p className="uppercase tracking-[0.2em] text-[8px] text-[#F5C33C] mb-1.5 flex items-center gap-1.5">
                  <Phone size={10} /> Expert Consultation
                </p>
                <h4 className="text-[11px] lg:text-[13px] font-semibold tracking-widest text-white">
                  +91 73307 70111
                </h4>
              </div>
              <div className="w-px h-8 bg-white/10" />
              <div className="flex flex-col items-center xl:items-start text-center xl:text-left">
                <p className="uppercase tracking-[0.2em] text-[8px] text-[#F5C33C] mb-1.5 flex items-center gap-1.5">
                  <Mail size={10} /> Direct Inquiry
                </p>
                <h4 className="text-[10px] lg:text-[11px] uppercase tracking-widest text-white">
                  sales@sankalpconstructions.com
                </h4>
              </div>
            </div>

            <form
              className="flex flex-col sm:flex-row gap-2 sm:gap-4 items-center w-full sm:w-auto overflow-hidden"
              onSubmit={(e) => {
                e.preventDefault();
                alert("Inquiry Sent Successfully");
              }}
            >
              <input
                required
                type="text"
                placeholder="Full Name"
                className="bg-white/5 border border-white/10 px-4 py-2 lg:py-3 text-white w-full sm:w-36 md:w-40 lg:w-48 text-[10px] lg:text-[11px] uppercase tracking-widest focus:outline-none focus:border-[#F5C33C] focus:bg-white/15 transition-all placeholder:text-gray-500 rounded-sm"
              />
              <input
                required
                type="tel"
                placeholder="Phone Number"
                className="bg-white/5 border border-white/10 px-4 py-2 lg:py-3 text-white w-full sm:w-36 md:w-40 lg:w-48 text-[10px] lg:text-[11px] uppercase tracking-widest focus:outline-none focus:border-[#F5C33C] focus:bg-white/15 transition-all placeholder:text-gray-500 rounded-sm"
              />
              <button
                type="submit"
                className="bg-white text-black px-6 lg:px-10 py-2 lg:py-3 text-[10px] lg:text-[11px] uppercase tracking-[0.2em] font-bold hover:bg-[#F5C33C] transition-all shadow-lg rounded-sm border border-transparent hover:border-black/10 w-full sm:w-auto"
              >
                Enquire Now
              </button>
            </form>
          </div>
        </div>
      </div> */}

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
