"use client";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Camera, ImageIcon } from "lucide-react";

interface GalleryImage {
  desktopSrc: string;
  mobileSrc: string;
  title: string;
  description?: string;
}

interface Props {
  images: any[];
  projectTitle?: string;
}

export default function ProjectGallery({ images = [], projectTitle }: Props) {
  const [activeIndex, setActiveIndex] = useState(0);

  const formattedImages: GalleryImage[] = images.map((img, i) => {
    if (typeof img === 'string') {
      return {
        desktopSrc: img,
        mobileSrc: img,
        title: `${projectTitle || "Project"} View ${i + 1}`,
        description: ""
      };
    }
    return {
      desktopSrc: img.desktop || img.src || img.url || "",
      mobileSrc: img.mobile || img.src || img.url || "",
      title: img.title || `${projectTitle || "Project"} Image ${i + 1}`,
      description: img.description || ""
    };
  }).filter(img => !!img.desktopSrc);

  useEffect(() => {
    if (activeIndex >= formattedImages.length) {
      setActiveIndex(0);
    }
  }, [images, formattedImages.length, activeIndex]);

  if (formattedImages.length === 0) {
    return null;
  }

  return (
    <section id="gallery" className="pt-4 sm:pt-0 pb-6 md:pb-16 bg-white">
      <div className="container mx-auto px-0">

        {formattedImages.length > 0 ? (
          <div className="flex flex-col-reverse lg:flex-row gap-2 sm:gap-4 h-[380px] sm:h-[400px] md:h-[500px] lg:h-[600px]">
            <div className="w-full lg:w-48 xl:w-56 flex flex-row lg:flex-col gap-2 sm:gap-3 overflow-x-auto lg:overflow-y-auto no-scrollbar pt-2 pb-2 lg:pt-0 lg:pb-0 pr-0 lg:pr-2">
              {formattedImages.map((img, i) => (
                <button
                  key={i}
                  onClick={() => setActiveIndex(i)}
                  className={`relative flex-shrink-0 w-20 sm:w-28 lg:w-full aspect-[4/3] rounded-lg overflow-hidden border-2 transition-all duration-300 ${activeIndex === i
                    ? "border-[#29B1D2] ring-4 ring-[#29B1D2]/10 shadow-md"
                    : "border-gray-200 opacity-70 hover:opacity-100 hover:border-gray-300"
                    }`}
                >
                  <img
                    src={img.mobileSrc || img.desktopSrc}
                    alt={img.title}
                    className="w-full h-full object-fill"
                  />
                </button>
              ))}
            </div>

            <div className="flex-1 relative rounded-2xl overflow-hidden bg-gray-100 border border-gray-200 shadow-sm">
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeIndex}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={{ duration: 0.3 }}
                  className="absolute inset-0 w-full h-full"
                >
                  <picture className="w-full h-full">
                    <source media="(max-width: 640px)" srcSet={formattedImages[activeIndex]?.mobileSrc} />
                    <img
                      src={formattedImages[activeIndex]?.desktopSrc}
                      alt={formattedImages[activeIndex]?.title}
                      className="w-full h-full object-cover md:object-cover"
                    />
                  </picture>
                </motion.div>
              </AnimatePresence>

              <div className="absolute inset-x-0 bottom-0 p-4 sm:p-6 bg-gradient-to-t from-black/80 via-black/40 to-transparent">
                <h3 className="text-white text-base sm:text-xl font-bold tracking-wide">
                  {formattedImages[activeIndex]?.title}
                </h3>
                {formattedImages[activeIndex]?.description && (
                  <p className="text-white/80 mt-1 text-xs sm:text-sm">
                    {formattedImages[activeIndex].description}
                  </p>
                )}
              </div>
            </div>
          </div>
        ) : (
          <div className="bg-gray-50 rounded-2xl p-12 text-center border border-gray-200 shadow-sm">
            <div className="w-16 h-16 bg-white rounded-full shadow-md flex items-center justify-center mx-auto mb-4 text-gray-300">
              <ImageIcon size={32} />
            </div>
            <h3 className="text-gray-400 font-bold uppercase tracking-widest text-sm">Images Arriving Soon</h3>
            <p className="text-gray-400 text-xs mt-2">We are currently capturing the beauty of this project.</p>
          </div>
        )}
      </div>
    </section>
  );
}
