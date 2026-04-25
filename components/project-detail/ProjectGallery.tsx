"use client";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, ZoomIn, ImageIcon, Camera } from "lucide-react";

interface GalleryImage {
  src: string;
  title: string;
  description?: string;
}

interface Props {
  images: any[]; 
  projectTitle?: string;
}

export default function ProjectGallery({ images = [], projectTitle }: Props) {
  const [selected, setSelected] = useState<GalleryImage | null>(null);

  // Map raw strings or objects to the required format
  const formattedImages: GalleryImage[] = images.map((img, i) => {
    if (typeof img === 'string') {
      return { src: img, title: `${projectTitle || "Project"} View ${i + 1}`, description: "" };
    }
    return { 
      src: img.src || img.url || "", 
      title: img.title || `${projectTitle || "Project"} Image ${i + 1}`, 
      description: img.description || "" 
    };
  }).filter(img => !!img.src);

  return (
    <section id="gallery" className="py-16 md:py-24 bg-white border-t border-gray-100">
      <div className="container mx-auto px-4 lg:px-8">
        <div className="text-center mb-12">
          <span className="uppercase tracking-[0.25em] text-[10px] md:text-xs text-[#711113] font-bold mb-3 block flex items-center justify-center gap-2">
            <Camera size={14} /> Visual Tour
          </span>
          <h2 className="text-2xl md:text-4xl font-extrabold text-gray-900 mb-4 uppercase tracking-widest">
            Project Gallery
          </h2>
          <div className="w-16 h-1 bg-[#29B1D2] mx-auto rounded-full" />
        </div>

        {formattedImages.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
            {formattedImages.map((img, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ delay: i * 0.07 }}
                onClick={() => setSelected(img)}
                className="group relative rounded-xl overflow-hidden cursor-pointer shadow-sm hover:shadow-xl transition-all duration-300 border border-gray-100 bg-gray-50"
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
                <div className="p-4 bg-white border-t border-gray-50">
                  <h4 className="text-[10px] font-black uppercase tracking-widest text-gray-400 truncate">{img.title}</h4>
                </div>
              </motion.div>
            ))}
          </div>
        ) : (
          <div className="bg-gray-50 rounded-2xl p-12 text-center border-2 border-dashed border-gray-200">
             <div className="w-16 h-16 bg-white rounded-full shadow-md flex items-center justify-center mx-auto mb-4 text-gray-300">
                <ImageIcon size={32} />
             </div>
             <h3 className="text-gray-400 font-black uppercase tracking-[0.2em] text-sm">Visual Tour Arriving Soon</h3>
             <p className="text-gray-400 text-xs mt-2">We are currently capturing the beauty of this project.</p>
          </div>
        )}
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
              className="fixed inset-0 bg-black/95 z-[200] backdrop-blur-md"
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
                  className="absolute -top-12 right-0 w-10 h-10 rounded-full bg-white/10 border border-white/20 flex items-center justify-center text-white hover:bg-[#711113] hover:border-[#711113] transition-all z-10"
                  aria-label="Close"
                >
                  <X size={20} />
                </button>
                <div className="bg-white p-2 rounded-2xl shadow-2xl overflow-hidden">
                  <img
                    src={selected.src}
                    alt={selected.title}
                    className="w-full max-h-[75vh] object-contain rounded-xl"
                  />
                  <div className="py-4 px-6 text-center">
                    <h4 className="text-gray-900 font-black uppercase tracking-[0.2em] text-sm">{selected.title}</h4>
                    {selected.description && <p className="text-gray-500 text-xs mt-1">{selected.description}</p>}
                  </div>
                </div>
              </motion.div>
            </div>
          </>
        )}
      </AnimatePresence>
    </section>
  );
}
