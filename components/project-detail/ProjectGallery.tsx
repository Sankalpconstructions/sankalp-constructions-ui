"use client";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, ZoomIn } from "lucide-react";

interface GalleryImage {
  src: string;
  title: string;
  description?: string;
}

interface Props {
  images: GalleryImage[];
}

export default function ProjectGallery({ images }: Props) {
  const [selected, setSelected] = useState<GalleryImage | null>(null);

  return (
    <section className="py-16 md:py-24 bg-white border-t border-gray-100">
      <div className="container mx-auto px-4 lg:px-8">
        <div className="text-center mb-12">
          <span className="uppercase tracking-[0.25em] text-xs text-[#711113] font-bold mb-3 block">Visual Tour</span>
          <h2 className="text-3xl md:text-4xl font-extrabold text-gray-900 mb-4">Project Gallery</h2>
          <div className="w-12 h-1 bg-[#711113] mx-auto rounded-full" />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
          {images.map((img, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ delay: i * 0.07 }}
              onClick={() => setSelected(img)}
              className="group relative rounded-xl overflow-hidden cursor-pointer shadow-sm hover:shadow-xl transition-all duration-300 border border-gray-100"
            >
              <div className="aspect-[4/3] overflow-hidden">
                <img
                  src={img.src}
                  alt={img.title}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                />
              </div>
              {/* Overlay */}
              <div className="absolute inset-0 bg-black/0 group-hover:bg-black/40 transition-colors duration-500 flex flex-col justify-end p-5">
                <div className="translate-y-4 group-hover:translate-y-0 opacity-0 group-hover:opacity-100 transition-all duration-400">
                  <ZoomIn className="text-white mb-2" size={22} />
                  <h4 className="text-white font-bold text-sm">{img.title}</h4>
                  {img.description && <p className="text-white/80 text-xs mt-1 line-clamp-2">{img.description}</p>}
                </div>
              </div>
              {/* Label at bottom */}
              <div className="p-4 bg-white">
                <h4 className="text-sm font-bold text-gray-900 truncate">{img.title}</h4>
                {img.description && <p className="text-xs text-gray-500 mt-0.5 truncate">{img.description}</p>}
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Lightbox */}
      <AnimatePresence>
        {selected && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelected(null)}
              className="fixed inset-0 bg-black/90 z-[200]"
            />
            <div className="fixed inset-0 z-[201] flex items-center justify-center p-4 pointer-events-none">
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                className="pointer-events-auto max-w-5xl w-full relative"
              >
                <button
                  onClick={() => setSelected(null)}
                  className="absolute -top-12 right-0 w-10 h-10 rounded-full bg-white/10 border border-white/20 flex items-center justify-center text-white hover:bg-white hover:text-gray-900 transition-colors z-10"
                  aria-label="Close"
                >
                  <X size={20} />
                </button>
                <img
                  src={selected.src}
                  alt={selected.title}
                  className="w-full max-h-[80vh] object-contain rounded-xl shadow-2xl"
                />
                <div className="mt-4 text-center">
                  <h4 className="text-white font-bold text-lg">{selected.title}</h4>
                  {selected.description && <p className="text-white/70 text-sm mt-1">{selected.description}</p>}
                </div>
              </motion.div>
            </div>
          </>
        )}
      </AnimatePresence>
    </section>
  );
}
