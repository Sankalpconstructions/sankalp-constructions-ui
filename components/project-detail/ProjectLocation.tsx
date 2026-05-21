"use client";
import { motion, AnimatePresence } from "framer-motion";
import { MapPin, Navigation, ExternalLink, Building2, GraduationCap, HeartPulse, ShoppingBag, Bus, Utensils, Landmark, Trees, Dumbbell, Church } from "lucide-react";
import { useState, useMemo } from "react";

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
  School: { icon: <GraduationCap size={15} />, color: "text-blue-400", bg: "bg-blue-500/10", ring: "ring-blue-500/40", dot: "bg-blue-400" },
  College: { icon: <GraduationCap size={15} />, color: "text-blue-400", bg: "bg-blue-500/10", ring: "ring-blue-500/40", dot: "bg-blue-400" },
  Hospital: { icon: <HeartPulse size={15} />, color: "text-red-400", bg: "bg-red-500/10", ring: "ring-red-500/40", dot: "bg-red-400" },
  Mall: { icon: <ShoppingBag size={15} />, color: "text-purple-400", bg: "bg-purple-500/10", ring: "ring-purple-500/40", dot: "bg-purple-400" },
  Transport: { icon: <Bus size={15} />, color: "text-green-400", bg: "bg-green-500/10", ring: "ring-green-500/40", dot: "bg-green-400" },
  Restaurant: { icon: <Utensils size={15} />, color: "text-orange-400", bg: "bg-orange-500/10", ring: "ring-orange-500/40", dot: "bg-orange-400" },
  Park: { icon: <Trees size={15} />, color: "text-emerald-400", bg: "bg-emerald-500/10", ring: "ring-emerald-500/40", dot: "bg-emerald-400" },
  Gym: { icon: <Dumbbell size={15} />, color: "text-yellow-400", bg: "bg-yellow-500/10", ring: "ring-yellow-500/40", dot: "bg-yellow-400" },
  Temple: { icon: <Church size={15} />, color: "text-amber-400", bg: "bg-amber-500/10", ring: "ring-amber-500/40", dot: "bg-amber-400" },
  Bank: { icon: <Building2 size={15} />, color: "text-cyan-400", bg: "bg-cyan-500/10", ring: "ring-cyan-500/40", dot: "bg-cyan-400" },
  default: { icon: <Landmark size={15} />, color: "text-gray-400", bg: "bg-gray-500/10", ring: "ring-gray-500/40", dot: "bg-gray-400" },
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
  const [activeIdx, setActiveIdx] = useState<number | null>(null);
  const activeLandmark = activeIdx !== null ? nearbyLocations[activeIdx] : null;
  const embedSrc = useMemo(() => buildEmbedSrc(mapSrc, address, activeLandmark), [mapSrc, address, activeLandmark]);

  // Group by category for summary chips
  const grouped = useMemo(() => {
    const map: Record<string, number> = {};
    nearbyLocations.forEach((l) => { map[l.category] = (map[l.category] || 0) + 1; });
    return map;
  }, [nearbyLocations]);

  const directionsUrl = useMemo(() => {
    if (activeLandmark) {
      const dest = address || (!mapSrc.includes("<iframe") && !mapSrc.startsWith("http") ? mapSrc : "");
      return `https://www.google.com/maps/dir/?api=1&origin=${encodeURIComponent(activeLandmark.name)}&destination=${encodeURIComponent(dest)}`;
    }
    return address
      ? `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(address)}`
      : "#";
  }, [address, mapSrc, activeLandmark]);

  return (
    <section className="py-12 md:py-20 bg-[#0d0d0d] border-t border-white/5 relative overflow-hidden rounded">

      {/* Background grid */}
      <div
        className="absolute inset-0 opacity-[0.04] pointer-events-none"
        style={{
          backgroundImage:
            "linear-gradient(#fff 1px, transparent 1px), linear-gradient(90deg, #fff 1px, transparent 1px)",
          backgroundSize: "40px 40px",
        }}
      />

      {/* Top glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[180px] bg-[#711113]/20 blur-[100px] rounded-full pointer-events-none" />

      <div className="container mx-auto px-4 lg:px-8 relative">

        {/* ── Heading ── */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-10 md:mb-14"
        >
          <span className="text-[#711113] text-[10px] uppercase tracking-[0.4em] font-bold block mb-3">
            Location &amp; Connectivity
          </span>
          <h2 className="text-3xl md:text-4xl font-extrabold text-white mb-4 uppercase tracking-tight">
            Where We Are
          </h2>
          <p className="text-gray-400 text-sm flex items-center justify-center gap-2">
            <MapPin size={14} className="text-[#711113] shrink-0" />
            {address || "Location details available on request"}
          </p>

          {/* Category summary chips */}
          {Object.keys(grouped).length > 0 && (
            <div className="flex flex-wrap gap-2 justify-center mt-5">
              {Object.entries(grouped).map(([cat, count]) => {
                const cfg = getCategoryConfig(cat);
                return (
                  <motion.span
                    key={cat}
                    initial={{ opacity: 0, scale: 0.8 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    className={`flex items-center gap-1.5 px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider ${cfg.bg} ${cfg.color} border border-white/10`}
                  >
                    <span className={`w-1.5 h-1.5 rounded-full ${cfg.dot}`} />
                    {count} {cat}{count > 1 ? "s" : ""}
                  </motion.span>
                );
              })}
            </div>
          )}
        </motion.div>

        {/* ── Two-column layout ── */}
        <div className="flex flex-col xl:flex-row gap-6 lg:gap-8 items-stretch">

          {/* ── Map panel ── */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="w-full xl:w-[58%]"
          >
            <div className="relative w-full h-[300px] sm:h-[380px] md:h-[480px] rounded-2xl overflow-hidden border border-white/10 shadow-2xl shadow-black/60">

              {embedSrc ? (
                <iframe
                  src={embedSrc}
                  width="100%"
                  height="100%"
                  style={{ border: 0, filter: "grayscale(15%) contrast(1.05)" }}
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  title="Project Location Map"
                />
              ) : (
                <div className="w-full h-full bg-gray-900 flex items-center justify-center">
                  <div className="text-center">
                    <MapPin size={40} className="text-[#711113] mx-auto mb-3" />
                    <p className="text-gray-400 text-sm">Map coming soon</p>
                  </div>
                </div>
              )}

              {/* Glassmorphic bottom overlay card */}
              <div className="absolute bottom-0 left-0 right-0 p-3 md:p-4 pointer-events-none">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.5, duration: 0.5 }}
                  className="bg-black/65 backdrop-blur-md border border-white/10 rounded-xl px-4 py-3 flex items-center gap-3"
                >
                  {/* Pulsing project pin */}
                  <div className="relative shrink-0">
                    <div className="w-9 h-9 rounded-full bg-[#711113] flex items-center justify-center shadow-lg shadow-[#711113]/50">
                      <MapPin size={16} className="text-white fill-white" />
                    </div>
                    <span className="absolute inset-0 rounded-full bg-[#711113]/40 animate-ping" />
                  </div>

                  <div className="min-w-0 flex-1">
                    <p className="text-white font-bold text-sm truncate">Project Location</p>
                    <p className="text-gray-400 text-[11px] truncate">{address || "View on map"}</p>
                  </div>

                  <a
                    href={directionsUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="pointer-events-auto shrink-0 flex items-center gap-1.5 bg-[#711113] hover:bg-[#8a1416] active:scale-95 text-white text-[10px] font-bold uppercase tracking-wider px-3 py-2 rounded-lg transition-all"
                  >
                    <Navigation size={11} />
                    {activeLandmark ? "View Route" : "Directions"}
                  </a>
                </motion.div>
              </div>
            </div>

            {/* Open in Maps link */}
            <div className="mt-2.5 flex justify-end">
              <a
                href={directionsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-1.5 text-gray-600 hover:text-[#29B1D2] text-[11px] font-medium transition-colors"
              >
                <ExternalLink size={11} />
                Open in Google Maps
              </a>
            </div>
          </motion.div>

          {/* ── Landmark list panel ── */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="w-full xl:w-[42%] flex flex-col"
          >
            {/* Panel header */}
            <div className="flex items-center gap-2 mb-4">
              <Navigation size={16} className="text-[#711113]" />
              <h3 className="text-white font-bold uppercase tracking-widest text-sm">
                Nearby Landmarks
              </h3>
              {nearbyLocations.length > 0 && (
                <span className="ml-auto bg-white/5 border border-white/10 text-gray-400 text-[10px] font-bold px-2.5 py-0.5 rounded-full">
                  {nearbyLocations.length}
                </span>
              )}
            </div>

            {nearbyLocations.length === 0 ? (
              <div className="flex-1 flex items-center justify-center py-16">
                <p className="text-gray-600 text-xs italic">Landmark details being updated...</p>
              </div>
            ) : (
              <div
                className="flex-1 space-y-2.5 overflow-y-auto pr-1"
                style={{ maxHeight: "480px", scrollbarWidth: "thin", scrollbarColor: "rgba(255,255,255,0.1) transparent" }}
              >
                {nearbyLocations.map((loc, i) => {
                  const cfg = getCategoryConfig(loc.category);
                  const isActive = activeIdx === i;

                  return (
                    <motion.div
                      key={i}
                      initial={{ opacity: 0, x: 28 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true, margin: "-20px" }}
                      transition={{ delay: i * 0.055, duration: 0.4, ease: "easeOut" }}
                      whileHover={{ x: 4 }}
                      onClick={() => setActiveIdx(isActive ? null : i)}
                      className={`
                        relative flex items-center gap-3 px-4 py-3.5 rounded-xl border cursor-pointer
                        transition-all duration-300 select-none
                        ${isActive
                          ? `${cfg.bg} border-white/20 ring-2 ${cfg.ring} shadow-lg`
                          : "bg-white/[0.03] border-white/5 hover:bg-white/[0.07] hover:border-white/10"
                        }
                      `}
                    >
                      {/* Left accent bar when active */}
                      {isActive && (
                        <motion.div
                          layoutId="accent-bar"
                          className={`absolute left-0 top-2 bottom-2 w-0.5 rounded-full ${cfg.dot}`}
                        />
                      )}

                      {/* Icon circle */}
                      <div className="relative shrink-0">
                        <div className={`w-8 h-8 rounded-full flex items-center justify-center transition-all duration-300 ${isActive ? cfg.bg : "bg-white/5"}`}>
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

                      {/* Text */}
                      <div className="min-w-0 flex-1">
                        <p className="text-white text-sm font-semibold truncate leading-tight">{loc.name}</p>
                        <span className={`text-[10px] font-bold uppercase tracking-wider ${cfg.color}`}>
                          {loc.category}
                        </span>
                      </div>

                      {/* Active dot */}
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
              </div>
            )}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
