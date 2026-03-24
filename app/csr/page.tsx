"use client";
import React, { useState } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Preloader from "@/components/Preloader";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronRight, X, HeartHandshake, BookOpen, Tractor, ShieldPlus, Dog, Tent } from "lucide-react";

const initiatives = [
  {
    id: "education",
    title: "Promoting Education",
    shortDesc: "Building schools and providing resources for a brighter future.",
    longDesc: "Education is the cornerstone of societal progress. We are dedicated to providing access to quality education for underprivileged children. We've established several schools, built libraries, and provided scholarships to thousands of deserving students to ensure that financial constraints never stand in the way of learning and innovation.",
    image: "https://images.unsplash.com/photo-1577896851231-70ef18881754?w=800",
    icon: <BookOpen className="w-8 h-8 text-white" />
  },
  {
    id: "rural",
    title: "Promoting Rural Development",
    shortDesc: "Uplifting villages with modern infrastructure and sustainable living.",
    longDesc: "Our rural development initiatives focus on holistic empowerment. From improving agricultural practices to building robust infrastructure like roads, clean energy resources, and modern community centers, we work alongside rural populations to ensure they thrive while maintaining their rich cultural heritage.",
    image: "https://images.unsplash.com/photo-1592394533824-9440e5d68530?w=800",
    icon: <Tractor className="w-8 h-8 text-white" />
  },
  {
    id: "healthcare",
    title: "Promoting Healthcare and Sanitation",
    shortDesc: "Medical camps, sanitation drives, and healthcare infrastructure.",
    longDesc: "We believe healthcare is a fundamental right. Our efforts include setting up mobile medical clinics, organizing regular health checkup camps in remote areas, and promoting sanitation through the construction of clean water facilities and proper waste management systems to foster healthier communities.",
    image: "https://images.unsplash.com/photo-1505751172876-fa1923c5c528?w=800",
    icon: <ShieldPlus className="w-8 h-8 text-white" />
  },
  {
    id: "animal",
    title: "Promoting Animal Welfare",
    shortDesc: "Caring for our voiceless companions through shelters and medical aid.",
    longDesc: "Compassion extends beyond human boundaries. We actively support animal rescue operations, fund veterinary clinics, and build shelters for abandoned and stray animals. Our goal is to create a harmonious environment where all living beings are treated with dignity and care.",
    image: "https://images.unsplash.com/photo-1548767797-d8c844163c4c?w=800",
    icon: <Dog className="w-8 h-8 text-white" />
  },
  {
    id: "disaster",
    title: "Disaster and Flood Relief",
    shortDesc: "Rapid response teams and rehabilitation for affected communities.",
    longDesc: "In times of crisis, swift action saves lives. Our disaster response teams are trained to deploy immediately to affected regions, providing emergency food supplies, medical kits, and temporary shelters. We also engage in long-term rehabilitation efforts to help communities rebuild.",
    image: "https://images.unsplash.com/photo-1588681664899-f142ff2dc9b1?w=800",
    icon: <Tent className="w-8 h-8 text-white" />
  }
];

export default function CSRPage() {
  const [selectedId, setSelectedId] = useState<string | null>(null);

  const selectedInitiative = initiatives.find((item) => item.id === selectedId);

  return (
    <main className="relative min-h-screen bg-white text-gray-900">
      <Preloader />
      {/* Header needs logic if it changes colors on white background, depending on how Header is structured. Assuming it handles its own state or gets a dark gradient, it will stay legible. */}
      <Header />

      {/* Hero Section */}
      <section className="relative pt-40 pb-20 lg:pt-52 lg:pb-32 px-4 lg:px-8 overflow-hidden z-10 bg-white">
        <div className="absolute inset-x-0 top-0 h-96 bg-gradient-to-b from-gray-100 to-transparent z-0"></div>
        {/* Decorative elements */}
        <div className="absolute top-0 right-0 w-64 h-64 bg-[#711113]/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2"></div>
        <div className="absolute top-40 left-0 w-48 h-48 bg-[#F5C33C]/10 rounded-full blur-2xl -translate-x-1/2"></div>

        <div className="container mx-auto relative z-10 text-center max-w-4xl">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
          >
            <div className="inline-flex items-center justify-center gap-2 px-4 py-1.5 border border-[#711113]/20 bg-[#711113]/5 rounded-full mb-6 relative">
              <HeartHandshake className="w-4 h-4 text-[#711113]" />
              <span className="text-[10px] uppercase tracking-widest text-[#711113] font-semibold">Giving Back</span>
            </div>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-medium uppercase tracking-widest mb-8 leading-tight text-gray-900">
              Corporate Social <br />
              <span className="text-[#711113]">Responsibilities</span>
            </h1>
            <p className="text-gray-600 text-sm md:text-base leading-relaxed tracking-wide mb-10 mx-auto max-w-2xl font-light">
              At Sankalp Constructions, our foundation is built on compassion. We believe that true success is measured by the positive impact we leave on the world. Our mission is to transform communities, protect the environment, and uplift those in need, creating a legacy of care and sustainable progress.
            </p>
            <button className="px-8 py-3 bg-[#711113] text-white text-xs uppercase tracking-[0.2em] font-bold rounded-sm transition-transform hover:scale-105 shadow-md">
              Join Our Initiative
            </button>
          </motion.div>
        </div>
      </section>

      {/* Initiatives Grid */}
      <section className="py-20 lg:py-32 px-4 lg:px-8 relative z-10 border-t border-gray-100">
        <div className="container mx-auto">
          <div className="text-center mb-16 lg:mb-24">
            <h2 className="text-2xl md:text-4xl font-semibold uppercase tracking-widest text-gray-900 mb-4">Our Key Initiatives</h2>
            <div className="w-16 h-px bg-[#711113] mx-auto"></div>
          </div>

          {/* Vertical list of initiative cards */}
          <div className="flex flex-col gap-6 max-w-5xl mx-auto">
            {initiatives.map((item, idx) => (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-40px" }}
                transition={{ duration: 0.5, delay: idx * 0.08 }}
                onClick={() => setSelectedId(item.id)}
                className="flex flex-col sm:flex-row items-start sm:items-center gap-6 bg-white border border-gray-100 rounded-2xl shadow-sm hover:shadow-[0_8px_30px_rgba(113,17,19,0.1)] hover:border-[#711113]/20 transition-all duration-300 p-5 md:p-7 cursor-pointer group"
              >
                {/* Thumbnail */}
                <div className="w-full sm:w-36 md:w-44 h-28 rounded-xl overflow-hidden flex-shrink-0">
                  <img
                    src={item.image}
                    alt={item.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                </div>

                {/* Icon + Title + Desc */}
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-3 mb-2">
                    <div className="w-10 h-10 rounded-full bg-[#711113] flex items-center justify-center text-white flex-shrink-0 shadow-sm">
                      {item.icon}
                    </div>
                    <h3 className="text-lg md:text-xl font-bold text-gray-900 group-hover:text-[#711113] transition-colors leading-tight">
                      {item.title}
                    </h3>
                  </div>
                  <p className="text-sm md:text-base text-gray-500 leading-relaxed">{item.shortDesc}</p>
                </div>

                {/* CTA arrow */}
                <div className="hidden sm:flex items-center justify-center w-10 h-10 rounded-full border border-gray-200 group-hover:bg-[#711113] group-hover:border-[#711113] transition-colors flex-shrink-0">
                  <ChevronRight className="w-5 h-5 text-gray-500 group-hover:text-white transition-colors" />
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Our Commitment Section */}
      <section className="py-20 lg:py-32 px-4 lg:px-8 bg-gray-50 relative z-10 border-t border-gray-100 overflow-hidden">
        {/* Soft background shape */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-3/4 h-3/4 bg-[#711113]/3 rounded-[100%] blur-3xl z-0 pointer-events-none"></div>

        <div className="container mx-auto text-center max-w-4xl relative z-10">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="text-2xl md:text-4xl font-semibold uppercase tracking-widest text-gray-900 mb-8">Our Commitment</h2>
            <div className="w-px h-16 bg-gradient-to-b from-[#711113] to-transparent mx-auto mb-8"></div>
            <p className="text-gray-600 text-lg md:text-xl lg:text-2xl font-light italic leading-relaxed tracking-wide">
              "We believe that true progress is measured not just by what we build, but by the lives we touch. Our commitment to community, compassion, and sustainability continues to guide every initiative — because making living better begins with giving back."
            </p>
          </motion.div>
        </div>
      </section>

      <Footer />

      {/* Modal for Details with light theme */}
      <AnimatePresence>
        {selectedInitiative && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedId(null)}
              className="fixed inset-0 bg-gray-900/40 backdrop-blur-sm z-[100]"
            />
            <div className="fixed inset-0 flex items-center justify-center z-[101] px-4 pointer-events-none">
              <motion.div
                initial={{ opacity: 0, scale: 0.95, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95, y: 20 }}
                className="bg-white border border-gray-100 w-full max-w-4xl rounded-sm overflow-hidden pointer-events-auto relative shadow-2xl flex flex-col md:flex-row"
              >
                <button
                  onClick={() => setSelectedId(null)}
                  className="absolute top-4 right-4 z-10 w-8 h-8 rounded-full bg-white border border-gray-200 shadow-sm flex items-center justify-center text-gray-500 hover:bg-[#711113] hover:text-white hover:border-[#711113] transition-colors"
                >
                  <X className="w-4 h-4" />
                </button>

                <div className="w-full md:w-2/5 h-[250px] md:h-auto relative">
                  <img src={selectedInitiative.image} alt={selectedInitiative.title} className="absolute inset-0 w-full h-full object-cover" />
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent to-white hidden md:block opacity-60"></div>
                  <div className="absolute inset-0 bg-gradient-to-t from-white to-transparent block md:hidden opacity-60"></div>
                  <div className="absolute bottom-4 left-4 md:bottom-auto md:top-6 md:left-6 w-12 h-12 rounded-full bg-[#711113] flex items-center justify-center shadow-lg text-white">
                    {selectedInitiative.icon}
                  </div>
                </div>

                <div className="p-8 md:p-12 w-full md:w-3/5 flex flex-col justify-center bg-white relative">

                  <h3 className="text-2xl md:text-3xl font-bold uppercase tracking-wide text-gray-900 mb-2 mt-4 md:mt-0">
                    {selectedInitiative.title}
                  </h3>
                  <div className="w-12 h-1 bg-[#711113] mb-6"></div>

                  <h4 className="text-sm font-semibold tracking-wider text-[#711113] uppercase mb-4">
                    {selectedInitiative.shortDesc}
                  </h4>
                  <p className="text-gray-600 text-sm leading-relaxed tracking-wide font-light">
                    {selectedInitiative.longDesc}
                  </p>
                </div>
              </motion.div>
            </div>
          </>
        )}
      </AnimatePresence>
    </main>
  );
}
