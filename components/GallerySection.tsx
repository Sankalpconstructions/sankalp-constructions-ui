"use client";
import { useState, useRef, useEffect } from "react";
import { motion } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";

const galleryImages = [
  { url: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800", title: "Lake Viewing Deck", desc: "Refreshing experiences by the lake" },
  { url: "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=800", title: "Theme Gardens", desc: "Mesmerizing times with delightful greens" },
  { url: "https://images.unsplash.com/photo-1628611225249-6c3c7c689552?w=800", title: "Kids' Play Area", desc: "Where tiny tots take turns and play fair" },
  { url: "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=800", title: "Clubhouse", desc: "A place for community and joy" },
  { url: "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=800", title: "Swimming Pool", desc: "Dive into luxury and relaxation" },
];

export default function GallerySection() {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);

  const checkScroll = () => {
    if (scrollRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = scrollRef.current;
      setCanScrollLeft(scrollLeft > 0);
      setCanScrollRight(Math.ceil(scrollLeft + clientWidth) < scrollWidth);
    }
  };

  useEffect(() => {
    checkScroll();
    window.addEventListener("resize", checkScroll);
    return () => window.removeEventListener("resize", checkScroll);
  }, []);

  const handleScrollClick = (direction: "left" | "right") => {
    if (scrollRef.current) {
      const scrollAmount = scrollRef.current.clientWidth * 0.8;
      scrollRef.current.scrollBy({
        left: direction === "right" ? scrollAmount : -scrollAmount,
        behavior: "smooth",
      });
    }
  };

  return (
    <section id="gallery" className="py-24 bg-white text-gray-900 overflow-hidden">
      <div className="container mx-auto px-4 lg:px-8 relative">
        
        <div className="text-center max-w-2xl mx-auto mb-16">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            className="text-4xl font-extrabold text-[#711113] uppercase tracking-wide"
          >
            Project Gallery
          </motion.h2>
          <div className="w-24 h-1 bg-[#29B1D2] mx-auto mt-4 mb-6"></div>
          <p className="text-gray-500 text-lg">
            A glimpse into the architectural marvels built by Sankalp Constructions.
          </p>
        </div>

        <div className="relative group/carousel">
          <div
            ref={scrollRef}
            onScroll={checkScroll}
            className="flex gap-6 overflow-x-auto snap-x snap-mandatory scrollbar-hide pb-8"
            style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
          >
            {galleryImages.map((img, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ delay: idx * 0.1, duration: 0.5 }}
                className="min-w-[85vw] sm:min-w-[350px] md:min-w-[400px] snap-center flex flex-col group cursor-pointer"
              >
                <div className="relative overflow-hidden h-[250px] md:h-[300px] w-full rounded-2xl shadow-md border-white">
                  <img
                    src={img.url}
                    alt={img.title}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700 ease-in-out"
                  />
                  <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                     <span className="text-white border border-white px-4 py-2 uppercase tracking-widest text-xs font-bold font-mono hover:bg-white hover:text-black transition-colors pointer-events-none">
                        View
                     </span>
                  </div>
                </div>
                <div className="mt-4 px-2">
                  <h3 className="font-bold text-lg text-gray-900">{img.title}</h3>
                  <p className="text-sm text-gray-500 mt-1">{img.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Navigation Arrows */}
          <div className="absolute top-[40%] -translate-y-[50%] -left-4 md:-left-6 z-10 transition-opacity duration-300">
            {canScrollLeft && (
              <button
                onClick={() => handleScrollClick("left")}
                className="p-3 bg-white border border-gray-200 rounded-full shadow-lg hover:bg-[#711113] hover:text-white hover:border-[#711113] transition-all"
              >
                <ChevronLeft size={24} />
              </button>
            )}
          </div>
          <div className="absolute top-[40%] -translate-y-[50%] -right-4 md:-right-6 z-10 transition-opacity duration-300">
            {canScrollRight && (
              <button
                onClick={() => handleScrollClick("right")}
                className="p-3 bg-white border border-gray-200 rounded-full shadow-lg hover:bg-[#711113] hover:text-white hover:border-[#711113] transition-all"
              >
                <ChevronRight size={24} />
              </button>
            )}
          </div>
        </div>

      </div>
    </section>
  );
}
