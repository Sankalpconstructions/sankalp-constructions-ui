"use client";
import { motion } from "framer-motion";
import { MapPin, Navigation } from "lucide-react";

interface NearbyLocation {
  name: string;
  distance: string;
  category: string;
}

interface Props {
  mapSrc: string;
  address: string;
  nearbyLocations: NearbyLocation[];
}

const categoryColors: Record<string, string> = {
  "School": "bg-blue-50 text-blue-700 border-blue-200",
  "Hospital": "bg-red-50 text-red-700 border-red-200",
  "Mall": "bg-purple-50 text-purple-700 border-purple-200",
  "Transport": "bg-green-50 text-green-700 border-green-200",
  "Restaurant": "bg-orange-50 text-orange-700 border-orange-200",
  "default": "bg-gray-50 text-gray-700 border-gray-200",
};

export default function ProjectLocation({ mapSrc, address, nearbyLocations }: Props) {

  const renderMap = () => {
    if (!mapSrc) return null;

    if (mapSrc.includes("<iframe")) {

      const srcMatch = mapSrc.match(/src="([^"]+)"/);
      const actualSrc = srcMatch ? srcMatch[1] : "";

      if (actualSrc) {
        return (
          <iframe
            src={actualSrc}
            width="100%"
            height="100%"
            style={{ border: 0 }}
            allowFullScreen
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            title="Project Location Map"
          />
        );
      }
    }

    const finalSrc = mapSrc.startsWith("http")
      ? mapSrc
      : `https://www.google.com/maps/embed/v1/place?key=REPLACE_WITH_API_KEY&q=${encodeURIComponent(mapSrc)}`;
    const embedUrl = mapSrc.startsWith("http")
      ? mapSrc
      : `https://maps.google.com/maps?q=${encodeURIComponent(mapSrc)}&t=&z=13&ie=UTF8&iwloc=&output=embed`;

    return (
      <iframe
        src={embedUrl}
        width="100%"
        height="100%"
        style={{ border: 0 }}
        allowFullScreen
        loading="lazy"
        referrerPolicy="no-referrer-when-downgrade"
        title="Project Location Map"
      />
    );
  };

  return (
    <section className="py-10 md:py-16 bg-gray-50 border-t border-gray-100">
      <div className="container mx-auto px-4 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-3xl font-extrabold text-gray-900 mb-4">Where We Are</h2>
          <p className="text-gray-500 text-sm flex items-center justify-center gap-2">
            <MapPin size={14} className="text-[#711113]" /> {address}
          </p>
        </div>

        <div className="flex flex-col xl:flex-row gap-8">
          <div className="w-full xl:w-5/12">
            <h3 className="text-base md:text-lg font-bold text-gray-900 uppercase tracking-wide mb-4 md:mb-6 flex items-center gap-2">
              <Navigation size={18} className="text-[#711113] w-[14px] h-[14px] md:w-[18px] md:h-[18px]" /> Nearby Landmarks
            </h3>
            <div className="space-y-3">
              {nearbyLocations.length > 0 ? nearbyLocations.map((loc, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, x: -15 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.06 }}
                  className="flex items-center justify-between bg-white rounded-xl px-4 py-3 md:px-5 md:py-4 border border-gray-100 shadow-sm gap-2"
                >
                  <div className="flex items-start sm:items-center gap-2 md:gap-3 min-w-0 flex-1">
                    <span className={`text-[9px] md:text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 md:px-2.5 md:py-1 rounded-full border shrink-0 ${categoryColors[loc.category] || categoryColors["default"]}`}>
                      {loc.category}
                    </span>
                    <span className="text-xs md:text-xs font-semibold text-gray-800 break-words">{loc.name}</span>
                  </div>
                  <span className="text-xs md:text-sm font-bold text-[#711113] shrink-0 ml-1">{loc.distance}</span>
                </motion.div>
              )) : (
                <p className="text-xs text-gray-400 italic">Landmarks data being updated...</p>
              )}
            </div>
          </div>

          {/* Right: Map */}
          <div className="w-full xl:w-7/12">
            <div className="w-full h-[350px] md:h-[480px] rounded-2xl overflow-hidden shadow-xl border border-gray-200 bg-white">
              {renderMap()}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
