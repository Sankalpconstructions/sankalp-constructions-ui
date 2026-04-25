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
  // Helper to determine if mapSrc is an iframe or a raw coordinate/query
  const renderMap = () => {
    if (!mapSrc) return null;

    // If it's already an iframe string (contains <iframe)
    if (mapSrc.includes("<iframe")) {
      // Extract src from iframe string if possible, or just dangerouslySet
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

    // If it's just a URL or a search query
    const finalSrc = mapSrc.startsWith("http") 
      ? mapSrc 
      : `https://www.google.com/maps/embed/v1/place?key=REPLACE_WITH_API_KEY&q=${encodeURIComponent(mapSrc)}`;

    // Fallback if no API key is provided for v1/place - use generic embed
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
    <section className="py-16 md:py-24 bg-gray-50 border-t border-gray-100">
      <div className="container mx-auto px-4 lg:px-8">
        <div className="text-center mb-12">
          <span className="uppercase tracking-[0.25em] text-xs text-[#711113] font-bold mb-3 block">Location</span>
          <h2 className="text-3xl md:text-4xl font-extrabold text-gray-900 mb-4">Where We Are</h2>
          <div className="w-12 h-1 bg-[#711113] mx-auto rounded-full mb-4" />
          <p className="text-gray-500 text-sm flex items-center justify-center gap-2">
            <MapPin size={14} className="text-[#711113]" /> {address}
          </p>
        </div>

        <div className="flex flex-col lg:flex-row gap-8">
          {/* Left: Nearby Locations */}
          <div className="lg:w-5/12">
            <h3 className="text-lg font-bold text-gray-900 uppercase tracking-wide mb-6 flex items-center gap-2">
              <Navigation size={18} className="text-[#711113]" /> Nearby Landmarks
            </h3>
            <div className="space-y-3">
              {nearbyLocations.length > 0 ? nearbyLocations.map((loc, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, x: -15 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.06 }}
                  className="flex items-center justify-between bg-white rounded-xl px-5 py-4 border border-gray-100 shadow-sm"
                >
                  <div className="flex items-center gap-3">
                    <span className={`text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-full border ${categoryColors[loc.category] || categoryColors["default"]}`}>
                      {loc.category}
                    </span>
                    <span className="text-sm font-semibold text-gray-800">{loc.name}</span>
                  </div>
                  <span className="text-sm font-bold text-[#711113] flex-shrink-0 ml-3">{loc.distance}</span>
                </motion.div>
              )) : (
                <p className="text-xs text-gray-400 italic">Landmarks data being updated...</p>
              )}
            </div>
          </div>

          {/* Right: Map */}
          <div className="lg:w-7/12">
            <div className="w-full h-[350px] md:h-[480px] rounded-2xl overflow-hidden shadow-xl border border-gray-200 bg-white">
              {renderMap()}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
