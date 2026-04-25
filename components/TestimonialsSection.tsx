"use client";
import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight, X, Play, Pause, Loader2, Quote, Star } from "lucide-react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Autoplay, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3001";

interface Testimonial {
  _id: string;
  name: string;
  role: string;
  quote: string;
  rating: number;
  avatar: string; // Can be an image URL or a video URL (.mp4)
}

export default function TestimonialsSection() {
  const [activeVideoUrl, setActiveVideoUrl] = useState<string | null>(null);
  const [testimonials, setTestimonials] = useState<Testimonial[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  // Video state tracking
  const [playingVideos, setPlayingVideos] = useState<Record<string, boolean>>({});
  const videoRefs = useRef<Record<string, HTMLVideoElement | null>>({});

  useEffect(() => {
    const fetchTestimonials = async () => {
      try {
        const res = await fetch(`${API_BASE_URL}/api/testimonials`);
        const data = await res.json();
        setTestimonials(data);
      } catch (error) {
        console.error("Error fetching testimonials:", error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchTestimonials();
  }, []);

  // Close modal on Escape
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === "Escape") setActiveVideoUrl(null);
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, []);

  const togglePlay = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    const video = videoRefs.current[id];
    if (video) {
      if (video.paused) {
        video.play();
        setPlayingVideos(prev => ({ ...prev, [id]: true }));
      } else {
        video.pause();
        setPlayingVideos(prev => ({ ...prev, [id]: false }));
      }
    }
  };

  const isVideo = (url: string) => {
    if (!url) return false;
    return url.toLowerCase().endsWith('.mp4') || url.toLowerCase().endsWith('.webm') || url.toLowerCase().endsWith('.ogg');
  };

  // If loading, show a small loader
  if (isLoading) {
    return (
      <div className="flex justify-center py-10">
        <Loader2 className="animate-spin text-gray-200" size={24} />
      </div>
    );
  }

  // If NO testimonials exist, hide the entire section completely
  if (testimonials.length === 0) {
    return null;
  }

  return (
    <section
      className="py-16 md:py-24 lg:py-32 bg-gray-50 relative overflow-hidden border-t border-gray-100"
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
          <span className="uppercase tracking-[0.4em] text-[9px] md:text-xs font-bold text-[#711113] mb-3 block">
            Client Stories
          </span>
          <h2 className="text-3xl md:text-5xl font-extrabold uppercase tracking-widest text-gray-900">
            Testimonials
          </h2>
          <div className="w-16 md:w-20 h-1 bg-[#29B1D2] mx-auto mt-4 md:mt-5 rounded-full" />
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
            loop={testimonials.length > 3}
            autoplay={{
              delay: 4000,
              disableOnInteraction: false,
              pauseOnMouseEnter: true,
            }}
            spaceBetween={24}
            slidesPerView={1}
            breakpoints={{
              640: { slidesPerView: 2, spaceBetween: 24 },
              1024: { slidesPerView: 3, spaceBetween: 32 },
            }}
            className="w-full pb-10 px-2"
          >
            {testimonials.map((t, i) => {
              const videoFile = isVideo(t.avatar);

              return (
                <SwiperSlide key={`${t._id}-${i}`} className="py-4 h-auto">
                  <motion.div
                    whileHover={{ y: -8, boxShadow: "0 20px 40px rgba(0,0,0,0.08)" }}
                    transition={{ duration: 0.3 }}
                    className="rounded-2xl overflow-hidden border border-gray-100 bg-white shadow-sm flex flex-col h-full mx-1 relative"
                  >
                    {videoFile ? (
                      // VIDEO LAYOUT
                      <>
                        <div 
                          className="relative w-full aspect-[4/5] bg-black overflow-hidden rounded-t-2xl cursor-pointer group/video"
                          onClick={() => setActiveVideoUrl(t.avatar)}
                        >
                          <video
                            ref={el => { videoRefs.current[t._id] = el; }}
                            src={t.avatar}
                            className="w-full h-full object-cover opacity-80 group-hover/video:opacity-100 transition-opacity"
                            playsInline
                            loop
                            muted={!playingVideos[t._id]}
                          />
                          
                          {/* Play/Pause Overlay */}
                          <div className="absolute inset-0 flex items-center justify-center bg-black/20 hover:bg-black/40 transition-colors">
                            <button 
                              onClick={(e) => togglePlay(t._id, e)}
                              className="w-16 h-16 rounded-full bg-white/20 backdrop-blur-md border border-white/40 flex items-center justify-center shadow-2xl transition-transform hover:scale-110"
                            >
                              {playingVideos[t._id] ? (
                                <Pause size={24} className="text-white" />
                              ) : (
                                <Play size={24} className="text-white ml-1" />
                              )}
                            </button>
                          </div>
                          <button 
                            onClick={(e) => { e.stopPropagation(); setActiveVideoUrl(t.avatar); }}
                            className="absolute top-4 right-4 bg-black/50 backdrop-blur-sm text-white text-[10px] uppercase tracking-widest font-bold px-3 py-1.5 rounded-full border border-white/20 hover:bg-[#711113] transition-colors"
                          >
                            Expand Fullscreen
                          </button>
                        </div>
                        <div className="p-6 flex flex-col flex-1 bg-white relative z-10 -mt-4 rounded-t-3xl shadow-[0_-10px_20px_rgba(0,0,0,0.05)] border-t border-gray-100">
                          <Quote size={24} className="text-[#711113]/20 mb-3" />
                          <p className="text-gray-600 text-sm italic line-clamp-3 mb-4 leading-relaxed">
                            "{t.quote}"
                          </p>
                          <div className="mt-auto flex items-center justify-between">
                            <div>
                              <h4 className="text-gray-900 font-bold text-sm tracking-wide">
                                {t.name}
                              </h4>
                              <p className="text-[#29B1D2] text-[10px] font-black tracking-widest uppercase mt-0.5">
                                {t.role}
                              </p>
                            </div>
                            <div className="flex gap-0.5">
                              {[...Array(5)].map((_, idx) => (
                                <Star key={idx} size={12} className={idx < (t.rating || 5) ? "text-yellow-400 fill-yellow-400" : "text-gray-200"} />
                              ))}
                            </div>
                          </div>
                        </div>
                      </>
                    ) : (
                      // IMAGE LAYOUT (Standard Testimonial)
                      <div className="p-8 flex flex-col flex-1">
                        <Quote size={32} className="text-[#711113]/10 mb-4" />
                        <p className="text-gray-600 text-sm italic mb-6 leading-relaxed flex-1">
                          "{t.quote}"
                        </p>
                        <div className="flex items-center gap-4 mt-auto pt-4 border-t border-gray-50">
                          {t.avatar ? (
                             <img src={t.avatar} alt={t.name} className="w-14 h-14 rounded-full object-cover ring-4 ring-gray-50 shadow-sm" />
                          ) : (
                             <div className="w-14 h-14 rounded-full bg-gray-100 flex items-center justify-center font-bold text-gray-400 ring-4 ring-gray-50 shadow-sm">
                               {t.name.charAt(0)}
                             </div>
                          )}
                          <div className="flex flex-col justify-center">
                            <h4 className="text-gray-900 font-bold text-sm tracking-wide">
                              {t.name}
                            </h4>
                            <p className="text-[#711113] text-[10px] font-black tracking-widest uppercase mt-0.5">
                              {t.role}
                            </p>
                            <div className="flex gap-0.5 mt-1">
                              {[...Array(5)].map((_, idx) => (
                                <Star key={idx} size={10} className={idx < (t.rating || 5) ? "text-yellow-400 fill-yellow-400" : "text-gray-200"} />
                              ))}
                            </div>
                          </div>
                        </div>
                      </div>
                    )}
                  </motion.div>
                </SwiperSlide>
              );
            })}
          </Swiper>

          {/* Prev / Next Arrows */}
          <button
            className="testi-prev absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 md:-translate-x-6 w-12 h-12 rounded-full border border-gray-200 bg-white shadow-xl flex items-center justify-center text-gray-700 hover:bg-[#711113] hover:text-white hover:border-[#711113] transition-all z-10"
            aria-label="Previous"
          >
            <ChevronLeft size={24} />
          </button>
          <button
            className="testi-next absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 md:translate-x-6 w-12 h-12 rounded-full border border-gray-200 bg-white shadow-xl flex items-center justify-center text-gray-700 hover:bg-[#711113] hover:text-white hover:border-[#711113] transition-all z-10"
            aria-label="Next"
          >
            <ChevronRight size={24} />
          </button>
        </div>

        {/* Dynamic Pagination Container */}
        <div className="testi-pagination flex justify-center items-center mt-4" />
      </div>

      {/* Fullscreen Video Modal */}
      <AnimatePresence>
        {activeVideoUrl && (
          <>
            {/* Backdrop */}
            <motion.div
              key="backdrop"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setActiveVideoUrl(null)}
              className="fixed inset-0 bg-black/90 backdrop-blur-md z-[200]"
            />

            {/* Modal */}
            <div className="fixed inset-0 z-[201] flex items-center justify-center p-4 sm:p-8 pointer-events-none">
              <motion.div
                key="modal"
                initial={{ opacity: 0, scale: 0.9, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.9, y: 20 }}
                transition={{ type: "spring", stiffness: 300, damping: 30 }}
                className="pointer-events-auto w-full max-w-4xl rounded-2xl overflow-hidden shadow-2xl bg-black relative border border-white/10"
              >
                {/* Close button */}
                <button
                  onClick={() => setActiveVideoUrl(null)}
                  className="absolute top-4 right-4 z-20 w-10 h-10 rounded-full bg-black/50 hover:bg-[#711113] border border-white/20 flex items-center justify-center text-white transition-all backdrop-blur-sm"
                  aria-label="Close"
                >
                  <X size={20} />
                </button>

                {/* Video Player */}
                <div className="relative w-full bg-black flex items-center justify-center" style={{ maxHeight: '85vh' }}>
                  <video
                    src={activeVideoUrl}
                    controls
                    autoPlay
                    className="w-full h-full max-h-[85vh] object-contain"
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
