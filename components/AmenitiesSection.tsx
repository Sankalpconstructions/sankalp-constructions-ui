"use client";
import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import {
  Dumbbell, Waves, TreePine, ShieldCheck, Car, Coffee, Play, Sun,
  Activity, Smile, Users, Video, UserMinus, Gamepad2, Book, Trophy,
  Clapperboard, ShoppingCart, Cross, Wifi, Flame, Zap, Droplet, HelpCircle, TentTree,
  Home, Droplets, Wind, Timer
} from "lucide-react";

// Mapping of icon names from DB to Lucide components
const dbIconMap: Record<string, React.ComponentType<any>> = {
  Home,
  Droplets,
  Dumbbell,
  Gamepad: Gamepad2,
  Wind,
  Timer,
  Waves,
  TreePine,
  ShieldCheck,
  Car,
  Coffee,
  Play,
  Sun,
  Activity,
  Smile,
  Users,
  Video,
  UserMinus,
  Book,
  Trophy,
  Clapperboard,
  ShoppingCart,
  Cross,
  Wifi,
  Flame,
  Zap,
  Droplet,
  HelpCircle,
  TentTree
};

interface Props {
  items?: string[];
  amenitiesCount?: string;
}

export default function AmenitiesSection({ items = [], amenitiesCount }: Props) {
  const [dbAmenities, setDbAmenities] = useState<any[]>([]);

  useEffect(() => {
    const fetchAmenities = async () => {
      try {
        const baseUrl = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3001";
        const res = await fetch(`${baseUrl}/api/amenities`);
        if (res.ok) {
          const data = await res.json();
          setDbAmenities(data);
        }
      } catch (err) {
        console.error("Error fetching amenities for icons:", err);
      }
    };
    fetchAmenities();
  }, []);

  const getIcon = (title: string) => {
    const cleanTitle = title.trim().toLowerCase();

    // 1. Direct local mapping matching clean title
    const localIconMapCleaned: Record<string, any> = {
      "gymnasium": <Dumbbell size={20} />,
      "gym": <Dumbbell size={20} />,
      "swimming pool": <Waves size={20} />,
      "pool": <Waves size={20} />,
      "landscaped gardens": <TreePine size={20} />,
      "landscaped setback areas": <TreePine size={20} />,
      "garden": <TreePine size={20} />,
      "24/7 security": <ShieldCheck size={20} />,
      "24×7 cctv surveillance": <Video size={20} />,
      "cctv surveillance": <Video size={20} />,
      "security": <ShieldCheck size={20} />,
      "ample parking": <Car size={20} />,
      "parking": <Car size={20} />,
      "clubhouse": <Coffee size={20} />,
      "kids play area": <Play size={20} />,
      "solar power": <Sun size={20} />,
      "sundeck": <Sun size={20} />,
      "jogging track": <Activity size={20} />,
      "yoga deck": <Smile size={20} />,
      "yoga": <Smile size={20} />,
      "multipurpose hall": <Users size={20} />,
      "terrace party area": <Users size={20} />,
      "senior citizen area": <UserMinus size={20} />,
      "indoor games": <Gamepad2 size={20} />,
      "library": <Book size={20} />,
      "badminton court": <Trophy size={20} />,
      "tennis court": <Activity size={20} />,
      "mini theatre": <Clapperboard size={20} />,
      "movies": <Clapperboard size={20} />,
      "convenience store": <ShoppingCart size={20} />,
      "pharmacy": <Cross size={20} />,
      "wi-fi zones": <Wifi size={20} />,
      "bbq area": <Flame size={20} />,
      "ev charging": <Zap size={20} />,
      "jacuzzi": <Droplet size={20} />,
      "automatic lift": <Wind size={20} />,
      "manjeera water supply": <Droplets size={20} />,
      "automatic water control system": <Droplets size={20} />,
      "rainwater harvesting": <Droplets size={20} />,
      "partial power backup": <Zap size={20} />,
      "power backup for common areas": <Zap size={20} />
    };

    if (localIconMapCleaned[cleanTitle]) {
      return localIconMapCleaned[cleanTitle];
    }

    // 2. Check fetched DB amenities mapping
    const matchedDbAmenity = dbAmenities.find(
      (a: any) => a.name && a.name.trim().toLowerCase() === cleanTitle
    );

    if (matchedDbAmenity && matchedDbAmenity.icon) {
      const IconComp = dbIconMap[matchedDbAmenity.icon];
      if (IconComp) {
        return <IconComp size={20} />;
      }
    }

    // 3. Smart Keyword matching
    if (cleanTitle.includes("lift") || cleanTitle.includes("elevator")) return <Wind size={20} />;
    if (cleanTitle.includes("cctv") || cleanTitle.includes("surveillance") || cleanTitle.includes("camera") || cleanTitle.includes("security")) return <ShieldCheck size={20} />;
    if (cleanTitle.includes("water") || cleanTitle.includes("harvesting") || cleanTitle.includes("rain") || cleanTitle.includes("supply")) return <Droplets size={20} />;
    if (cleanTitle.includes("power") || cleanTitle.includes("backup") || cleanTitle.includes("electricity") || cleanTitle.includes("generator") || cleanTitle.includes("charge") || cleanTitle.includes("charging") || cleanTitle.includes("zap")) return <Zap size={20} />;
    if (cleanTitle.includes("garden") || cleanTitle.includes("lawn") || cleanTitle.includes("park") || cleanTitle.includes("green") || cleanTitle.includes("setback") || cleanTitle.includes("tree")) return <TreePine size={20} />;
    if (cleanTitle.includes("pool") || cleanTitle.includes("swimming")) return <Waves size={20} />;
    if (cleanTitle.includes("gym") || cleanTitle.includes("fitness") || cleanTitle.includes("workout")) return <Dumbbell size={20} />;
    if (cleanTitle.includes("play") || cleanTitle.includes("game") || cleanTitle.includes("kid")) return <Play size={20} />;
    if (cleanTitle.includes("car") || cleanTitle.includes("parking")) return <Car size={20} />;
    if (cleanTitle.includes("club") || cleanTitle.includes("coffee") || cleanTitle.includes("lounge")) return <Coffee size={20} />;
    if (cleanTitle.includes("sun") || cleanTitle.includes("deck")) return <Sun size={20} />;
    if (cleanTitle.includes("hall") || cleanTitle.includes("party") || cleanTitle.includes("community")) return <Users size={20} />;

    return <TentTree size={20} />;
  };

  const cleanItems = (items || []).filter(item => item && item.trim() !== "");

  // If no items provided, don't show section
  if (cleanItems.length === 0) return null;

  return (
    <section id="amenities" className="py-10 md:py-16 bg-white text-gray-900 border-t border-gray-100">
      <div className="container mx-auto px-4 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-10 md:mb-16">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            className="text-2xl md:text-3xl font-extrabold text-gray-900 mb-4"
          >
            Amenities
          </motion.h2>
          <p className="text-gray-500 text-sm md:text-base px-4 leading-relaxed">
            Experience a lifestyle of uncompromising luxury. {amenitiesCount || `${cleanItems.length}+`} curated amenities
            designed to elevate your everyday living.
          </p>
        </div>

        <div className="grid grid-cols-2 xs:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 md:gap-4">
          {cleanItems.map((title, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ delay: idx * 0.05, duration: 0.3 }}
              whileHover={{ y: -5, scale: 1.05 }}
              className="p-3 md:p-4 rounded-xl flex flex-col items-center justify-center text-center group border border-gray-100 shadow-sm hover:shadow-xl transition-all cursor-pointer h-full min-h-[112px] md:min-h-[128px] bg-white"
            >
              <div className="w-10 h-10 bg-[#711113]/10 text-[#711113] rounded-full flex justify-center items-center mb-3 group-hover:bg-[#711113] group-hover:text-white transition-colors flex-shrink-0">
                {getIcon(title)}
              </div>
              <h3 className="text-[10px] md:text-xs font-bold uppercase text-gray-700 group-hover:text-[#711113] transition-colors leading-tight">
                {title}
              </h3>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
