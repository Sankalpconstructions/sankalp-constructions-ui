"use client";
import React, { useState } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Preloader from "@/components/Preloader";
import { motion, AnimatePresence } from "framer-motion";
import { Calendar, Clock, X, ChevronRight, Image as ImageIcon, Users } from "lucide-react";

const companyEvents = [
  {
    id: "annual-meet-2025",
    title: "Annual Strategy Meet 2025",
    date: "January 15, 2025",
    time: "10:00 AM - 4:00 PM",
    shortDesc: "Our leadership team gathered to discuss the roadmap and upcoming milestones for 2025.",
    longDesc: "The Annual Strategy Meet 2025 brought together all department heads to align our collective vision for the upcoming year. Discussions centered around expanding our portfolio, adopting new smart-home technologies, and ensuring we meet our sustainability targets. The event concluded with an award ceremony recognizing outstanding employee contributions.",
    images: [
      "https://images.unsplash.com/photo-1542744173-8e7e53415bb0?w=800",
      "https://images.unsplash.com/photo-1515169065865-7e2cb2954a1a?w=800",
      "https://images.unsplash.com/photo-1556761175-5973dc0f32e7?w=800"
    ]
  },
  {
    id: "diwali-celebration",
    title: "Diwali Gala & Celebration",
    date: "October 24, 2025",
    time: "6:00 PM Onwards",
    shortDesc: "A vibrant evening of cultural performances, festive foods, and team bonding.",
    longDesc: "Our annual Diwali celebration was a spectacular evening filled with joy and camaraderie. Employees dressed in traditional attire and participated in rangoli competitions, musical performances, and a grand feast. It was a wonderful opportunity for the entire Sankalp family to come together outside the office environment.",
    images: [
      "https://images.unsplash.com/photo-1514525253161-7a46d19cd819?w=800",
      "https://images.unsplash.com/photo-1543637005-4d639a4e16de?w=800"
    ]
  },
  {
    id: "project-launch",
    title: "Sankalp Skyline Launch Party",
    date: "August 10, 2025",
    time: "7:00 PM - 11:00 PM",
    shortDesc: "Celebrating the successful launch of our newest ultra-luxury project, Sankalp Skyline.",
    longDesc: "To commemorate the groundbreaking of Sankalp Skyline, we hosted an exclusive launch party for our employees and key stakeholders. The night featured a 3D walkthrough presentation of the upcoming project, followed by networking, dinner, and live entertainment. A proud moment for the entire development team.",
    images: [
      "https://images.unsplash.com/photo-1511795409834-ef04bbd61622?w=800",
      "https://images.unsplash.com/photo-1492684223066-81342ee5ff30?w=800"
    ]
  },
  {
    id: "team-building",
    title: "Annual Team Retreat",
    date: "March 05, 2025",
    time: "Weekend Away",
    shortDesc: "A weekend of adventure, team building activities, and relaxation at Lonavala.",
    longDesc: "Taking a break from the hustle, the team traveled to Lonavala for a weekend retreat. Activities included obstacle courses, collaborative problem-solving games, and a bonfire night. The retreat successfully fostered stronger bonds and improved cross-departmental communication.",
    images: [
      "https://images.unsplash.com/photo-1523580494863-6f3031224c94?w=800",
      "https://images.unsplash.com/photo-1517457373958-b7bdd4587205?w=800"
    ]
  }
];

export default function CSRClient() {
  const [selectedId, setSelectedId] = useState<string | null>(null);

  const selectedEvent = companyEvents.find((item) => item.id === selectedId);

  return (
    <main className="relative min-h-screen bg-white text-gray-900">
      <Preloader />
      <Header />

      {/* Hero Section */}
      <section className="relative pt-40 pb-20 lg:pt-52 lg:pb-32 px-4 lg:px-8 overflow-hidden z-10 bg-[#050505]">
        {/* Subtle pattern overlay */}
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
              Explore the culture, milestones, and celebrations that shape our organization. From annual strategy meetings to festive gatherings and team retreats, discover the vibrant internal activities that keep the Sankalp family connected and inspired.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Events Grid */}
      <section className="py-20 lg:py-32 px-4 lg:px-8 relative z-10 border-t border-gray-100 bg-gray-50/50">
        <div className="container mx-auto">
          <div className="text-center mb-16 lg:mb-24">
            <h2 className="text-2xl md:text-4xl font-semibold uppercase tracking-widest text-gray-900 mb-4">Event Highlights</h2>
            <div className="w-16 h-px bg-[#711113] mx-auto"></div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
            {companyEvents.map((item, idx) => (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-40px" }}
                transition={{ duration: 0.5, delay: idx * 0.1 }}
                onClick={() => setSelectedId(item.id)}
                className="bg-white border border-gray-100 rounded-2xl shadow-sm hover:shadow-xl hover:border-[#711113]/20 transition-all duration-300 cursor-pointer overflow-hidden group flex flex-col h-full"
              >
                {/* Thumbnail */}
                <div className="w-full h-48 lg:h-56 relative overflow-hidden flex-shrink-0">
                  <img
                    src={item.images[0]}
                    alt={item.title}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700 ease-in-out"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent"></div>
                  
                  {/* Date Badge overlay */}
                  <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm text-[#711113] text-[10px] font-bold uppercase tracking-widest px-3 py-1.5 rounded shadow">
                    {item.date}
                  </div>
                  
                  {/* Gallery Count */}
                  <div className="absolute bottom-4 left-4 flex items-center gap-1.5 text-white text-[11px] font-medium tracking-wide">
                    <ImageIcon size={14} /> {item.images.length} Photos
                  </div>
                </div>

                {/* Content */}
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
        </div>
      </section>

      <Footer />

      {/* Modal for Details with Photo Gallery */}
      <AnimatePresence>
        {selectedEvent && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedId(null)}
              className="fixed inset-0 bg-gray-900/60 backdrop-blur-md z-[100]"
            />
            <div className="fixed inset-0 flex items-center justify-center z-[101] px-4 py-10 pointer-events-none overflow-y-auto">
              <motion.div
                initial={{ opacity: 0, scale: 0.95, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95, y: 20 }}
                className="bg-white border border-gray-100 w-full max-w-5xl rounded-xl overflow-hidden pointer-events-auto relative shadow-2xl flex flex-col my-auto"
              >
                <button
                  onClick={() => setSelectedId(null)}
                  className="absolute top-4 right-4 z-20 w-8 h-8 rounded-full bg-white border border-gray-200 shadow-sm flex items-center justify-center text-gray-500 hover:bg-[#711113] hover:text-white hover:border-[#711113] transition-colors"
                >
                  <X className="w-4 h-4" />
                </button>

                {/* Top Image Banner */}
                <div className="w-full h-[250px] md:h-[350px] relative shrink-0">
                  <img src={selectedEvent.images[0]} alt={selectedEvent.title} className="absolute inset-0 w-full h-full object-cover" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent"></div>
                  
                  <div className="absolute bottom-6 left-6 md:bottom-8 md:left-10 text-white pr-6">
                    <div className="flex flex-wrap items-center gap-4 text-xs font-semibold uppercase tracking-widest text-[#F5C33C] mb-3">
                       <span className="flex items-center gap-1"><Calendar size={14} /> {selectedEvent.date}</span>
                       <span className="flex items-center gap-1"><Clock size={14} /> {selectedEvent.time}</span>
                    </div>
                    <h3 className="text-3xl md:text-4xl font-extrabold uppercase tracking-wide leading-tight shadow-sm">
                      {selectedEvent.title}
                    </h3>
                  </div>
                </div>

                <div className="p-6 md:p-10 w-full flex flex-col bg-white">
                  <div className="mb-10 max-w-3xl">
                    <h4 className="text-sm font-semibold tracking-wider text-[#711113] uppercase mb-4">
                      {selectedEvent.shortDesc}
                    </h4>
                    <p className="text-gray-600 text-base leading-relaxed tracking-wide font-light">
                      {selectedEvent.longDesc}
                    </p>
                  </div>
                  
                  {/* Event Photo Gallery */}
                  <div>
                    <h4 className="text-xs font-bold uppercase tracking-widest text-gray-900 mb-6 border-b border-gray-100 pb-2">Event Gallery</h4>
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                      {selectedEvent.images.map((img, idx) => (
                        <div key={idx} className="h-32 md:h-48 rounded-lg overflow-hidden shadow-sm relative group cursor-pointer border border-gray-100">
                          <img src={img} alt={`${selectedEvent.title} ${idx + 1}`} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
                          <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-300" />
                        </div>
                      ))}
                    </div>
                  </div>

                </div>
              </motion.div>
            </div>
          </>
        )}
      </AnimatePresence>
    </main>
  );
}
