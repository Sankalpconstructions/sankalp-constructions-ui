"use client";
import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight, X, Play } from "lucide-react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Autoplay, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

const testimonials = [
  { id: "M7lc1UVf-VE", title: "Luxury Villa Tour", reviewer: "Rajesh K." },
  { id: "JkaxUblCGz0", title: "Modern Apartment Walkthrough", reviewer: "Priya M." },
  { id: "39udgGPyYMg", title: "Real Estate Client Review", reviewer: "Arun S." },
  { id: "9bZkp7q19f0", title: "Happy Homeowners Experience", reviewer: "Divya & Suresh" },
  { id: "y9j-BL5ocW8", title: "Premium Living Testimonial", reviewer: "Vikram R." },
  { id: "ysz5S6PUM-U", title: "Why We Chose Sankalp", reviewer: "Sunita P." },
  { id: "EngW7tCbLhI", title: "Our Dream House Setup", reviewer: "Karthik N." },
  { id: "fJ9rUzIMcZQ", title: "Amazing Architectural Details", reviewer: "Meena V." },
  { id: "kJQP7kiw5Fk", title: "Family's Feedback", reviewer: "The Sharma Family" },
  { id: "V-_O7nl0Ii0", title: "Best Investment Decision", reviewer: "Ravi & Anita" },
];

export default function TestimonialsSection() {
  const [activeVideoId, setActiveVideoId] = useState<string | null>(null);

  // Close modal on Escape
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === "Escape") setActiveVideoId(null);
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, []);

  return (
    <section
      className="py-16 md:py-24 lg:py-32 bg-white relative overflow-hidden"
      id="testimonials"
    >
      {/* Custom Pagination Styles */}
      <style>{`
        .testi-pagination .swiper-pagination-bullet {
          width: 8px;
          height: 8px;
          background: #d1d5db;
          opacity: 1;
          transition: all 0.3s ease;
          border-radius: 9999px;
          margin: 0 4px;
          display: inline-block;
          cursor: pointer;
        }
        .testi-pagination .swiper-pagination-bullet-active {
          width: 24px;
          background: #711113;
        }
      `}</style>

      {/* Subtle background pattern */}
      <div
        className="absolute inset-0 opacity-[0.03] pointer-events-none"
        style={{
          backgroundImage: "radial-gradient(circle, #711113 1px, transparent 1px)",
          backgroundSize: "32px 32px",
        }}
      />

      <div className="container mx-auto px-4 lg:px-8">
        {/* Heading */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.8 }}
          className="text-center mb-12 md:mb-16"
        >
          <span className="uppercase tracking-[0.4em] text-[10px] md:text-xs font-semibold text-[#711113] mb-3 block">
            Hear from our clients
          </span>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-medium uppercase tracking-widest text-gray-900">
            Testimonials
          </h2>
          <div className="w-16 h-[2px] bg-[#711113] mx-auto mt-5" />
        </motion.div>

        {/* Infinite Loop Carousel */}
        <div className="relative group max-w-7xl mx-auto">
          <Swiper
            modules={[Navigation, Autoplay, Pagination]}
            navigation={{
              prevEl: ".testi-prev",
              nextEl: ".testi-next",
            }}
            pagination={{
              clickable: true,
              el: ".testi-pagination",
            }}
            loop={true}
            autoplay={{
              delay: 3500,
              disableOnInteraction: false,
              pauseOnMouseEnter: true,
            }}
            spaceBetween={20}
            slidesPerView={1}
            breakpoints={{
              640: { slidesPerView: 2, spaceBetween: 20 },
              1024: { slidesPerView: 3, spaceBetween: 24 },
            }}
            className="w-full pb-4 px-2"
          >
            {testimonials.map((t, i) => (
              <SwiperSlide key={`${t.id}-${i}`} className="py-4">
                <motion.div
                  whileHover={{ y: -4, boxShadow: "0 20px 40px rgba(113,17,19,0.12)" }}
                  transition={{ duration: 0.25 }}
                  onClick={() => setActiveVideoId(t.id)}
                  className="cursor-pointer rounded-xl overflow-hidden border border-gray-200 bg-white shadow-sm flex flex-col h-full mx-1"
                >
                  <div className="relative w-full aspect-video bg-gray-100 overflow-hidden rounded-t-xl">
                    <img
                      src={`https://img.youtube.com/vi/${t.id}/hqdefault.jpg`}
                      alt={t.title}
                      className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-black/20 hover:bg-black/40 transition-colors flex items-center justify-center">
                      <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-full bg-[#711113] flex items-center justify-center shadow-lg transition-transform hover:scale-110">
                        <Play size={20} className="text-white ml-1" />
                      </div>
                    </div>
                  </div>
                  <div className="p-4 sm:p-5 flex-1 flex flex-col justify-center">
                    <h4 className="text-gray-900 text-sm sm:text-[15px] font-semibold tracking-wide line-clamp-1 mb-1">
                      {t.title}
                    </h4>
                    <p className="text-[#711113] text-xs font-medium tracking-wider uppercase line-clamp-1">
                      {t.reviewer}
                    </p>
                  </div>
                </motion.div>
              </SwiperSlide>
            ))}
          </Swiper>

          {/* Prev / Next Arrows */}
          <button
            className="testi-prev absolute left-0 top-1/2 -translate-y-1/2 -translate-x-3 md:-translate-x-6 w-10 h-10 sm:w-12 sm:h-12 rounded-full border border-gray-200 bg-white shadow-md flex items-center justify-center text-gray-700 hover:bg-[#711113] hover:text-white hover:border-[#711113] transition-all z-10"
            aria-label="Previous"
          >
            <ChevronLeft size={20} />
          </button>
          <button
            className="testi-next absolute right-0 top-1/2 -translate-y-1/2 translate-x-3 md:translate-x-6 w-10 h-10 sm:w-12 sm:h-12 rounded-full border border-gray-200 bg-white shadow-md flex items-center justify-center text-gray-700 hover:bg-[#711113] hover:text-white hover:border-[#711113] transition-all z-10"
            aria-label="Next"
          >
            <ChevronRight size={20} />
          </button>
        </div>

        {/* Dynamic Pagination Container */}
        <div className="testi-pagination flex justify-center items-center mt-6" />
      </div>

      {/* YouTube Popup Modal */}
      <AnimatePresence>
        {activeVideoId && (
          <>
            {/* Backdrop */}
            <motion.div
              key="backdrop"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setActiveVideoId(null)}
              className="fixed inset-0 bg-black/80 backdrop-blur-sm z-[200]"
            />

            {/* Modal */}
            <div className="fixed inset-0 z-[201] flex items-center justify-center px-4 pointer-events-none">
              <motion.div
                key="modal"
                initial={{ opacity: 0, scale: 0.9, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.9, y: 20 }}
                transition={{ type: "spring", stiffness: 300, damping: 30 }}
                className="pointer-events-auto w-full max-w-xs sm:max-w-lg md:max-w-2xl lg:max-w-4xl rounded-2xl overflow-hidden shadow-2xl bg-black relative"
              >
                {/* Close button */}
                <button
                  onClick={() => setActiveVideoId(null)}
                  className="absolute top-3 right-3 z-10 w-8 h-8 rounded-full bg-white/10 hover:bg-[#711113] border border-white/20 flex items-center justify-center text-white transition-colors"
                  aria-label="Close"
                >
                  <X size={16} />
                </button>

                {/* Responsive 16:9 iframe wrapper */}
                <div className="relative w-full" style={{ paddingBottom: "56.25%" }}>
                  <iframe
                    className="absolute inset-0 w-full h-full"
                    src={`https://www.youtube.com/embed/${activeVideoId}?autoplay=1&rel=0&modestbranding=1`}
                    title="YouTube video player"
                    frameBorder="0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                    allowFullScreen
                  />
                </div>
              </motion.div>
            </div>
          </>
        )}
      </AnimatePresence>
    </section>
  );
}
