"use client";
import { motion, AnimatePresence } from "framer-motion";
import { MapPin, Navigation, ExternalLink, Building2, GraduationCap, HeartPulse, ShoppingBag, Bus, Utensils, Landmark, Trees, Dumbbell, Church } from "lucide-react";
import { useState, useMemo, useEffect } from "react";

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

// ─── Category config ───────────────────────────────────────────────────────────
const CATEGORY_CONFIG: Record<string, { icon: React.ReactNode; color: string; bg: string; ring: string; dot: string }> = {
  "School/College": { icon: <GraduationCap size={15} />, color: "text-blue-600", bg: "bg-blue-500/10", ring: "ring-blue-500/30", dot: "bg-blue-500" },
  "Mall/Market": { icon: <ShoppingBag size={15} />, color: "text-purple-600", bg: "bg-purple-500/10", ring: "ring-purple-500/30", dot: "bg-purple-500" },
  "Transit Hub": { icon: <Bus size={15} />, color: "text-green-600", bg: "bg-green-500/10", ring: "ring-green-500/30", dot: "bg-green-500" },
  Hospital: { icon: <HeartPulse size={15} />, color: "text-red-600", bg: "bg-red-500/10", ring: "ring-red-500/30", dot: "bg-red-500" },
  School: { icon: <GraduationCap size={15} />, color: "text-blue-600", bg: "bg-blue-500/10", ring: "ring-blue-500/30", dot: "bg-blue-500" },
  College: { icon: <GraduationCap size={15} />, color: "text-blue-600", bg: "bg-blue-500/10", ring: "ring-blue-500/30", dot: "bg-blue-500" },
  Mall: { icon: <ShoppingBag size={15} />, color: "text-purple-600", bg: "bg-purple-500/10", ring: "ring-purple-500/30", dot: "bg-purple-500" },
  Transport: { icon: <Bus size={15} />, color: "text-green-600", bg: "bg-green-500/10", ring: "ring-green-500/30", dot: "bg-green-500" },
  Restaurant: { icon: <Utensils size={15} />, color: "text-orange-600", bg: "bg-orange-500/10", ring: "ring-orange-500/30", dot: "bg-orange-500" },
  Park: { icon: <Trees size={15} />, color: "text-emerald-600", bg: "bg-emerald-500/10", ring: "ring-emerald-500/30", dot: "bg-emerald-500" },
  Gym: { icon: <Dumbbell size={15} />, color: "text-yellow-600", bg: "bg-yellow-500/10", ring: "ring-yellow-500/30", dot: "bg-yellow-500" },
  Temple: { icon: <Church size={15} />, color: "text-amber-600", bg: "bg-amber-500/10", ring: "ring-amber-500/30", dot: "bg-amber-500" },
  Bank: { icon: <Building2 size={15} />, color: "text-cyan-600", bg: "bg-cyan-500/10", ring: "ring-cyan-500/30", dot: "bg-cyan-500" },
  default: { icon: <Landmark size={15} />, color: "text-gray-600", bg: "bg-gray-500/10", ring: "ring-gray-500/30", dot: "bg-gray-500" },
};

function getCategoryConfig(category: string) {
  return CATEGORY_CONFIG[category] || CATEGORY_CONFIG.default;
}

// ─── Map src extractor ─────────────────────────────────────────────────────────
function buildEmbedSrc(mapSrc: string, address: string, activeLandmark?: NearbyLocation | null): string {
  if (activeLandmark) {
    const dest = address || (!mapSrc.includes("<iframe") && !mapSrc.startsWith("http") ? mapSrc : "");
    if (dest) {
      return `https://maps.google.com/maps?f=d&saddr=${encodeURIComponent(activeLandmark.name)}&daddr=${encodeURIComponent(dest)}&output=embed`;
    }
  }

  if (!mapSrc) return "";
  if (mapSrc.includes("<iframe")) {
    const m = mapSrc.match(/src="([^"]+)"/);
    return m ? m[1] : "";
  }
  if (mapSrc.startsWith("http")) return mapSrc;
  return `https://maps.google.com/maps?q=${encodeURIComponent(mapSrc)}&t=&z=15&ie=UTF8&iwloc=&output=embed`;
}

// ─── Main Component ────────────────────────────────────────────────────────────
export default function ProjectLocation({ mapSrc, address, nearbyLocations }: Props) {
  const validLandmarks = useMemo(() => {
    return (nearbyLocations || []).filter(loc => loc && loc.name?.trim() !== "");
  }, [nearbyLocations]);

  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [activeIdx, setActiveIdx] = useState<number | null>(null);
  const [mapLoading, setMapLoading] = useState(false);

  const activeLandmark = activeIdx !== null ? validLandmarks[activeIdx] : null;
  const embedSrc = useMemo(() => buildEmbedSrc(mapSrc || "", address, activeLandmark), [mapSrc, address, activeLandmark]);

  useEffect(() => {
    if (activeIdx !== null) {
      const current = validLandmarks[activeIdx];
      if (!current || (selectedCategory && current.category !== selectedCategory)) {
        setActiveIdx(null);
      }
    }
  }, [selectedCategory, validLandmarks, activeIdx]);

  useEffect(() => {
    if (embedSrc) {
      setMapLoading(true);
      const timer = setTimeout(() => setMapLoading(false), 5000); // 5s fallback safety
      return () => clearTimeout(timer);
    } else {
      setMapLoading(false);
    }
  }, [embedSrc]);

  const filteredLandmarks = useMemo(() => {
    if (!selectedCategory) return validLandmarks;
    return validLandmarks.filter(loc => loc.category === selectedCategory);
  }, [validLandmarks, selectedCategory]);

  const grouped = useMemo(() => {
    const map: Record<string, number> = {};
    validLandmarks.forEach((l) => { map[l.category] = (map[l.category] || 0) + 1; });
    return map;
  }, [validLandmarks]);

  const directionsUrl = useMemo(() => {
    if (activeLandmark) {
      const dest = address || (mapSrc && !mapSrc.includes("<iframe") && !mapSrc.startsWith("http") ? mapSrc : "");
      return `https://www.google.com/maps/dir/?api=1&origin=${encodeURIComponent(activeLandmark.name)}&destination=${encodeURIComponent(dest)}`;
    }
    return address
      ? `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(address)}`
      : "#";
  }, [address, mapSrc, activeLandmark]);

  if (!mapSrc && validLandmarks.length === 0) return null;

  return (
    <section className="bg-white border border-gray-100 relative overflow-hidden rounded-2xl shadow-lg mb-12">

      {/* ── Red Gradient Header ── */}
      <div className="bg-gradient-to-r from-[#711113] to-[#9b1a1c] px-6 py-8 md:py-10 text-center relative overflow-hidden">
        {/* Subtle background pattern for header */}
        <div
          className="absolute inset-0 opacity-[0.1] pointer-events-none"
          style={{
            backgroundImage: "linear-gradient(#fff 1px, transparent 1px), linear-gradient(90deg, #fff 1px, transparent 1px)",
            backgroundSize: "20px 20px",
          }}
        />
        <div className="relative z-10">
          <span className="text-white/80 text-[10px] uppercase tracking-[0.4em] font-bold block mb-3">
            Location &amp; Connectivity
          </span>
          <h2 className="text-3xl md:text-4xl font-extrabold text-white mb-4 uppercase tracking-tight drop-shadow-md">
            Where We Are
          </h2>
          <p className="text-white/90 text-sm flex items-center justify-center gap-2">
            <MapPin size={16} className="shrink-0 text-[#F5C33C]" />
            {address || "Location details available on request"}
          </p>
        </div>
      </div>

      <div className="container mx-auto px-4 lg:px-8 py-10 relative">

          {Object.keys(grouped).length > 0 && (
            <div className="flex flex-wrap gap-2.5 justify-center mt-6 mb-10">
              <motion.button
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                onClick={() => setSelectedCategory(null)}
                className={`flex items-center gap-1.5 px-4 py-1.5 rounded-full text-[10px] font-bold uppercase tracking-wider transition-all duration-300 border cursor-pointer select-none
                  ${!selectedCategory
                    ? "bg-gray-100 text-gray-900 border-gray-200 shadow-sm"
                    : "bg-white text-gray-400 border-gray-100 hover:bg-gray-50 hover:text-gray-600"
                  }
                `}
              >
                <span className={`w-1.5 h-1.5 rounded-full ${!selectedCategory ? "bg-gray-900" : "bg-gray-300"}`} />
                All ({validLandmarks.length})
              </motion.button>

              {Object.entries(grouped).map(([cat, count]) => {
                const cfg = getCategoryConfig(cat);
                const isSelected = selectedCategory === cat;
                return (
                  <motion.button
                    key={cat}
                    initial={{ opacity: 0, scale: 0.8 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    onClick={() => setSelectedCategory(isSelected ? null : cat)}
                    className={`flex items-center gap-1.5 px-4 py-1.5 rounded-full text-[10px] font-bold uppercase tracking-wider transition-all duration-300 border cursor-pointer select-none
                      ${isSelected
                        ? `${cfg.bg} ${cfg.color} border-current ring-2 ${cfg.ring} shadow-sm`
                        : selectedCategory
                          ? "bg-white text-gray-300 border-gray-100 opacity-60 hover:opacity-100 hover:text-gray-500 hover:bg-gray-50"
                          : `${cfg.bg} ${cfg.color} border-transparent hover:border-current hover:scale-105 shadow-sm`
                      }
                    `}
                  >
                    <span className={`w-1.5 h-1.5 rounded-full ${cfg.dot} ${isSelected ? "animate-pulse" : ""}`} />
                    {count} {cat}{count > 1 ? "s" : ""}
                  </motion.button>
                );
              })}
            </div>
          )}

        <div className="flex flex-col xl:flex-row gap-6 lg:gap-8 items-stretch">

          {mapSrc && (
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className={`w-full ${validLandmarks.length > 0 ? "xl:w-[58%]" : "xl:w-full"}`}
            >
              <div className="relative w-full h-[300px] sm:h-[380px] md:h-[480px] rounded-2xl overflow-hidden border border-gray-200 shadow-xl shadow-gray-200/50">

                {embedSrc ? (
                  <>
                    <iframe
                      src={embedSrc}
                      width="100%"
                      height="100%"
                      style={{ border: 0 }}
                      allowFullScreen
                      loading="lazy"
                      referrerPolicy="no-referrer-when-downgrade"
                      title="Project Location Map"
                      onLoad={() => setMapLoading(false)}
                    />

                    <AnimatePresence>
                      {mapLoading && (
                        <motion.div
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          exit={{ opacity: 0 }}
                          transition={{ duration: 0.25 }}
                          className="absolute inset-0 bg-white/60 backdrop-blur-[4px] flex items-center justify-center z-10"
                        >
                          <div className="flex flex-col items-center gap-3 bg-white border border-gray-100 px-5 py-4 rounded-xl shadow-xl">
                            <div className="relative w-8 h-8">
                              <motion.div
                                animate={{ rotate: 360 }}
                                transition={{ repeat: Infinity, duration: 1, ease: "linear" }}
                                className="w-8 h-8 rounded-full border-2 border-gray-200 border-t-[#711113]"
                              />
                            </div>
                            <span className="text-[10px] text-gray-500 font-bold uppercase tracking-wider animate-pulse">
                              Loading Route...
                            </span>
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </>
                ) : (
                  <div className="w-full h-full bg-gray-50 flex items-center justify-center">
                    <div className="text-center">
                      <MapPin size={40} className="text-gray-300 mx-auto mb-3" />
                      <p className="text-gray-400 text-sm font-medium">Map coming soon</p>
                    </div>
                  </div>
                )}

                <div className="absolute bottom-0 left-0 right-0 p-3 md:p-4 pointer-events-none">
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.5, duration: 0.5 }}
                    className="bg-white/90 backdrop-blur-md border border-gray-200 rounded-xl px-4 py-3 flex items-center gap-3 shadow-lg"
                  >
                    <div className="relative shrink-0">
                      <div className="w-9 h-9 rounded-full bg-[#711113] flex items-center justify-center shadow-md">
                        <MapPin size={16} className="text-white fill-white" />
                      </div>
                      <span className="absolute inset-0 rounded-full bg-[#711113]/30 animate-ping" />
                    </div>

                    <div className="min-w-0 flex-1">
                      <p className="text-gray-900 font-bold text-sm truncate">Project Location</p>
                      <p className="text-gray-500 text-[11px] truncate">{address || "View on map"}</p>
                    </div>

                    <a
                      href={directionsUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="pointer-events-auto shrink-0 flex items-center gap-1.5 bg-[#711113] hover:bg-[#8a1416] active:scale-95 text-white text-[10px] font-bold uppercase tracking-wider px-3 py-2 rounded-lg transition-all shadow-md"
                    >
                      <Navigation size={11} />
                      {activeLandmark ? "View Route" : "Directions"}
                    </a>
                  </motion.div>
                </div>
              </div>

              <div className="mt-2.5 flex justify-end">
                <a
                  href={directionsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-1.5 text-gray-500 hover:text-[#29B1D2] text-[11px] font-medium transition-colors"
                >
                  <ExternalLink size={11} />
                  Open in Google Maps
                </a>
              </div>
            </motion.div>
          )}

          {validLandmarks.length > 0 && (
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className={`w-full ${mapSrc ? "xl:w-[42%]" : "xl:w-full"} flex flex-col`}
            >
              <div className="flex items-center gap-2 mb-4">
                <Navigation size={16} className="text-[#711113]" />
                <h3 className="text-gray-900 font-bold uppercase tracking-widest text-sm">
                  Nearby Landmarks
                </h3>
                <span className="ml-auto bg-gray-100 border border-gray-200 text-gray-600 text-[10px] font-bold px-2.5 py-0.5 rounded-full">
                  {filteredLandmarks.length}
                </span>
              </div>

              <div
                className="flex-1 space-y-2.5 overflow-y-auto pr-2"
                style={{ maxHeight: "480px", scrollbarWidth: "thin", scrollbarColor: "rgba(0,0,0,0.1) transparent" }}
              >
                <AnimatePresence mode="popLayout">
                  {filteredLandmarks.map((loc) => {
                    const cfg = getCategoryConfig(loc.category);
                    const isActive = activeLandmark === loc;

                    return (
                      <motion.div
                        key={loc.name + "-" + loc.category}
                        initial={{ opacity: 0, y: 12 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -12 }}
                        transition={{ duration: 0.25, ease: "easeOut" }}
                        whileHover={{ x: 4 }}
                        onClick={() => {
                          const idxInOriginal = validLandmarks.indexOf(loc);
                          setActiveIdx(isActive ? null : idxInOriginal);
                        }}
                        className={`
                          relative flex items-center gap-3 px-4 py-3.5 rounded-xl border cursor-pointer
                          transition-all duration-300 select-none
                          ${isActive
                            ? `${cfg.bg} border-current ring-2 ${cfg.ring} shadow-md`
                            : "bg-white border-gray-100 hover:bg-gray-50 hover:border-gray-200 shadow-sm"
                          }
                        `}
                      >
                        {isActive && (
                          <motion.div
                            layoutId="accent-bar"
                            className={`absolute left-0 top-2 bottom-2 w-0.5 rounded-full ${cfg.dot}`}
                          />
                        )}

                        <div className="relative shrink-0">
                          <div className={`w-8 h-8 rounded-full flex items-center justify-center transition-all duration-300 ${isActive ? cfg.bg : "bg-gray-100"}`}>
                            <span className={cfg.color}>{cfg.icon}</span>
                          </div>
                          {isActive && (
                            <motion.div
                              animate={{ scale: [1, 1.5, 1], opacity: [0.3, 0, 0.3] }}
                              transition={{ repeat: Infinity, duration: 1.8, ease: "easeInOut" }}
                              className={`absolute inset-0 rounded-full ${cfg.dot}`}
                            />
                          )}
                        </div>

                        <div className="min-w-0 flex-1">
                          <p className="text-gray-900 text-sm font-semibold truncate leading-tight">{loc.name}</p>
                          <span className={`text-[10px] font-bold uppercase tracking-wider ${cfg.color}`}>
                            {loc.category}
                          </span>
                        </div>

                        <AnimatePresence>
                          {isActive && (
                            <motion.div
                              initial={{ scale: 0, opacity: 0 }}
                              animate={{ scale: 1, opacity: 1 }}
                              exit={{ scale: 0, opacity: 0 }}
                              className={`w-2 h-2 rounded-full shrink-0 ${cfg.dot}`}
                            />
                          )}
                        </AnimatePresence>
                      </motion.div>
                    );
                  })}
                </AnimatePresence>
              </div>
            </motion.div>
          )}
        </div>
      </div>
    </section>
  );
}
