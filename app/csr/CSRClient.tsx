"use client";

import React, { useState } from "react";
import Preloader from "@/components/Preloader";
import { motion, AnimatePresence } from "framer-motion";
import {
  Calendar,
  Clock,
  X,
  ChevronRight,
  Image as ImageIcon,
} from "lucide-react";
import PageBanner from "@/components/PageBanner";

export default function CSRClient() {

  const [events, setEvents] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedId, setSelectedId] = useState<string | null>(null);

  React.useEffect(() => {
    const fetchEvents = async () => {
      try {
        const baseUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001';
        const res = await fetch(`${baseUrl}/api/csr`);
        if (res.ok) {
          const data = await res.json();
          const formatted = data.map((item: any) => ({
            ...item,
            id: item._id || item.id,
          }));
          setEvents(formatted);
        }
      } catch (error) {
        console.error("Error fetching CSR events:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchEvents();
  }, []);

  const selectedEvent = events.find((item) => item.id === selectedId);

  return (
    <div className="relative bg-white text-gray-900">
      <Preloader />

      <PageBanner
        title={
          <>
            Company <span className="text-[#29B1D2]">Events</span>
          </>
        }
        subtitle="Explore the culture, milestones, and celebrations that shape our organization. From annual strategy meetings to festive gatherings and team retreats."
        image="https://images.unsplash.com/photo-1511795409834-ef04bbd61622?w=1600"
        breadcrumbs={[{ label: "Life at Sankalp" }]}
      />

      {/* Events Grid */}
      <section className="py-15 px-4 lg:px-8 relative z-10 border-t border-gray-100 bg-gray-50/50 min-h-[400px]">
        <div className="container mx-auto">
          <div className="text-center mb-16 ">
            <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-[#711113] mb-3">
              Event Highlights
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
            {loading ? (
              <div className="col-span-full py-20 text-center text-gray-500 font-bold uppercase tracking-widest text-sm">
                Loading Events...
              </div>
            ) : events.length > 0 ? (
              events.map((item, idx) => (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-40px" }}
                transition={{ duration: 0.5, delay: idx * 0.1 }}
                onClick={() => setSelectedId(item.id)}
                className="bg-white border border-gray-100 rounded-2xl shadow-sm hover:shadow-xl hover:border-[#711113]/20 transition-all duration-300 cursor-pointer overflow-hidden group flex flex-col h-full"
              >
                <div className="w-full h-48 lg:h-56 relative overflow-hidden flex-shrink-0">
                  <img
                    src={item.images?.[0] || 'https://images.unsplash.com/photo-1511795409834-ef04bbd61622?w=1200'}
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
                      <Clock size={12} className="text-[#F5C33C]" />{" "}
                      {item.time}
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
            ))
            ) : (
              <div className="col-span-full py-20 text-center text-gray-500 font-bold uppercase tracking-widest text-sm">
                No Events Found
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Modal */}
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
                className="absolute top-6 right-6 z-30 w-10 h-10 rounded-full bg-white/20 backdrop-blur-md text-white hover:bg-[#711113] transition-all flex items-center justify-center border border-white/30"
              >
                <X className="w-5 h-5" />
              </button>

              <div className="overflow-y-auto no-scrollbar flex-1">
                {/* Banner */}
                <div className="w-full h-[300px] md:h-[450px] relative shrink-0">
                  <img
                    src={selectedEvent.images?.[0] || 'https://images.unsplash.com/photo-1511795409834-ef04bbd61622?w=1200'}
                    alt={selectedEvent.title}
                    className="absolute inset-0 w-full h-full object-cover"
                  />

                  <div className="absolute inset-0 bg-gradient-to-t from-white via-black/20 to-transparent"></div>

                  <div className="absolute bottom-8 left-8 md:bottom-12 md:left-12 pr-12">
                    <div className="flex flex-wrap items-center gap-4 text-xs font-bold uppercase tracking-widest text-[#F5C33C] mb-4 bg-black/40 w-fit px-3 py-1 rounded-sm backdrop-blur-sm">
                      <span className="flex items-center gap-1.5">
                        <Calendar size={14} /> {selectedEvent.date}
                      </span>

                      <span className="flex items-center gap-1.5 text-white/60">
                        |
                      </span>

                      <span className="flex items-center gap-1.5">
                        <Clock size={14} /> {selectedEvent.time}
                      </span>
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

                  {/* Gallery */}
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
                          <img
                            src={img}
                            alt={`${selectedEvent.title} ${idx + 1}`}
                            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                          />

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