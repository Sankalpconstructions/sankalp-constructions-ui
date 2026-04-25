"use client";
import React, { useState, useEffect } from "react";
import Preloader from "@/components/Preloader";
import { motion, AnimatePresence } from "framer-motion";
import { Calendar, Clock, X, ChevronRight, Image as ImageIcon, Users, Loader2 } from "lucide-react";

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3001";

export default function CSRClient() {
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [events, setEvents] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        setLoading(true);
        const res = await fetch(`${API_BASE_URL}/api/csr`);
        if (res.ok) {
          const data = await res.json();
          setEvents(data);
        }
      } catch (error) {
        console.error("Error fetching CSR events:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchEvents();
  }, []);

  const selectedEvent = events.find((item) => (item._id || item.id) === selectedId);

  return (
    <div className="relative bg-white text-gray-900">
      <Preloader />

      {/* Hero Section */}
      <section className="relative pt-40 pb-20 lg:pt-52 lg:pb-32 px-4 lg:px-8 overflow-hidden z-10 bg-[#050505]">
        <div
          className="absolute inset-0 opacity-20"
          style={{
            backgroundImage: `url("https://images.unsplash.com/photo-1511795409834-ef04bbd61622?w=1600")`,
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        />
        <div className="absolute inset-x-0 top-0 h-full bg-gradient-to-b from-[#050505] via-[#050505]/90 to-[#050505]/40 z-0"></div>

        <div className="container mx-auto relative z-10 text-center max-w-4xl">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
          >
            <div className="inline-flex items-center justify-center gap-2 px-4 py-1.5 border border-[#F5C33C]/20 bg-[#F5C33C]/10 rounded-full mb-6 relative backdrop-blur-sm">
              <Users className="w-4 h-4 text-[#F5C33C]" />
              <span className="text-[10px] uppercase tracking-widest text-[#F5C33C] font-semibold">Life at Sankalp</span>
            </div>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold uppercase tracking-wide mb-8 leading-tight text-white">
              Company Events <br />
              <span className="text-[#F5C33C]">& Activities</span>
            </h1>
            <p className="text-white/60 text-sm md:text-base leading-relaxed tracking-wide mb-10 mx-auto max-w-2xl font-light">
              Explore the culture, milestones, and celebrations that shape our organization. From annual strategy meetings to festive gatherings and team retreats.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Events Grid */}
      <section className="py-20 lg:py-32 px-4 lg:px-8 relative z-10 border-t border-gray-100 bg-gray-50/50 min-h-[400px]">
        <div className="container mx-auto">
          <div className="text-center mb-16 lg:mb-24">
            <h2 className="text-2xl md:text-4xl font-semibold uppercase tracking-widest text-gray-900 mb-4">Event Highlights</h2>
            <div className="w-16 h-px bg-[#711113] mx-auto"></div>
          </div>

          {loading ? (
            <div className="flex flex-col items-center justify-center py-20">
              <Loader2 className="animate-spin text-[#711113] mb-4" size={40} />
              <p className="text-gray-400 font-bold uppercase tracking-widest text-xs">Loading Highlights...</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
              {events.map((item, idx) => (
                <motion.div
                  key={item._id || item.id}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-40px" }}
                  transition={{ duration: 0.5, delay: idx * 0.1 }}
                  onClick={() => setSelectedId(item._id || item.id)}
                  className="bg-white border border-gray-100 rounded-2xl shadow-sm hover:shadow-xl hover:border-[#711113]/20 transition-all duration-300 cursor-pointer overflow-hidden group flex flex-col h-full"
                >
                  <div className="w-full h-48 lg:h-56 relative overflow-hidden flex-shrink-0">
                    <img
                      src={item.images?.[0] || "https://images.unsplash.com/photo-1511795409834-ef04bbd61622?w=800"}
                      alt={item.title}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700 ease-in-out"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent"></div>
                    
                    <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm text-[#711113] text-[10px] font-bold uppercase tracking-widest px-3 py-1.5 rounded shadow">
                      {item.date}
                    </div>
                    
                    <div className="absolute bottom-4 left-4 flex items-center gap-1.5 text-white text-[11px] font-medium tracking-wide">
                      <ImageIcon size={14} /> {item.images?.length || 0} Photos
                    </div>
                  </div>

                  <div className="p-6 md:p-8 flex-1 flex flex-col justify-between items-start">
                    <div className="w-full">
                      <div className="flex items-center gap-2 text-xs text-gray-400 font-medium mb-3 uppercase tracking-wider">
                         <Clock size={12} className="text-[#F5C33C]" /> {item.time}
                      </div>
                      
                      <h3 className="text-xl font-extrabold uppercase tracking-widest text-gray-900 group-hover:text-[#711113] transition-colors mb-3 leading-tight line-clamp-2">
                        {item.title}
                      </h3>
                      <p className="text-sm md:text-base text-gray-500 leading-relaxed line-clamp-3">
                        {item.shortDesc}
                      </p>
                    </div>
                    
                    <div className="mt-8 flex items-center justify-center w-full bg-gray-50 group-hover:bg-[#711113] group-hover:text-white text-[#711113] py-3 rounded-lg font-bold uppercase tracking-widest text-xs transition-colors">
                      View Gallery & Details 
                      <ChevronRight className="w-4 h-4 ml-1" />
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Modal for Details with Photo Gallery */}
      <AnimatePresence>
        {selectedEvent && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 md:p-8">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedId(null)}
              className="absolute inset-0 bg-gray-900/60 backdrop-blur-md"
            />
            
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="bg-white border border-gray-100 w-full max-w-5xl max-h-[90vh] rounded-3xl overflow-hidden relative shadow-2xl flex flex-col z-10"
            >
              <button
                onClick={() => setSelectedId(null)}
                className="absolute top-6 right-6 z-30 w-10 h-10 rounded-full bg-white/20 backdrop-blur-md text-white hover:bg-[#711113] hover:text-white transition-all flex items-center justify-center border border-white/30"
              >
                <X className="w-5 h-5" />
              </button>

              {/* Scrollable Container */}
              <div className="overflow-y-auto no-scrollbar flex-1">
                {/* Top Image Banner */}
                <div className="w-full h-[300px] md:h-[450px] relative shrink-0">
                  <img src={selectedEvent.images?.[0]} alt={selectedEvent.title} className="absolute inset-0 w-full h-full object-cover" />
                  <div className="absolute inset-0 bg-gradient-to-t from-white via-black/20 to-transparent"></div>
                  
                  <div className="absolute bottom-8 left-8 md:bottom-12 md:left-12 pr-12">
                    <div className="flex flex-wrap items-center gap-4 text-xs font-bold uppercase tracking-widest text-[#F5C33C] mb-4 bg-black/40 w-fit px-3 py-1 rounded-sm backdrop-blur-sm">
                       <span className="flex items-center gap-1.5"><Calendar size={14} /> {selectedEvent.date}</span>
                       <span className="flex items-center gap-1.5 text-white/60">|</span>
                       <span className="flex items-center gap-1.5"><Clock size={14} /> {selectedEvent.time}</span>
                    </div>
                    <h3 className="text-3xl md:text-5xl font-extrabold uppercase tracking-wide leading-tight text-white drop-shadow-2xl">
                      {selectedEvent.title}
                    </h3>
                  </div>
                </div>

                <div className="p-8 md:p-12 w-full flex flex-col bg-white">
                  <div className="mb-12 max-w-4xl">
                    <h4 className="text-base md:text-lg font-bold tracking-wider text-[#711113] uppercase mb-6 leading-relaxed border-l-4 border-[#F5C33C] pl-6">
                      {selectedEvent.shortDesc}
                    </h4>
                    <p className="text-gray-600 text-base md:text-lg leading-relaxed tracking-wide font-light whitespace-pre-wrap">
                      {selectedEvent.longDesc}
                    </p>
                  </div>
                  
                  {/* Event Photo Gallery */}
                  <div>
                    <h4 className="text-[10px] font-bold uppercase tracking-[0.3em] text-gray-400 mb-8 flex items-center gap-4">
                      <span>Event Gallery</span>
                      <div className="flex-1 h-px bg-gray-100"></div>
                    </h4>
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
                      {selectedEvent.images?.map((img: string, idx: number) => (
                        <motion.div 
                          key={idx} 
                          whileHover={{ y: -5 }}
                          className="aspect-video rounded-2xl overflow-hidden shadow-sm relative group cursor-pointer border border-gray-100"
                        >
                          <img src={img} alt={`${selectedEvent.title} ${idx + 1}`} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
                          <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-300" />
                        </motion.div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      <style jsx global>{`
        .no-scrollbar::-webkit-scrollbar {
          display: none;
        }
        .no-scrollbar {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
      `}</style>
    </div>
  );
}
