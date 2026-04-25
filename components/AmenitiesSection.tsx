"use client";
import { motion } from "framer-motion";
import {
  Dumbbell, Waves, TreePine, ShieldCheck, Car, Coffee, Play, Sun,
  Activity, Smile, Users, Video, UserMinus, Gamepad2, Book, Trophy,
  Clapperboard, ShoppingCart, Cross, Wifi, Flame, Zap, Droplet, HelpCircle
} from "lucide-react";

// Mapping of amenity names to Lucide icons
const iconMap: Record<string, any> = {
  "Gymnasium": <Dumbbell size={20} />,
  "Gym": <Dumbbell size={20} />,
  "Swimming Pool": <Waves size={20} />,
  "Pool": <Waves size={20} />,
  "Landscaped Gardens": <TreePine size={20} />,
  "Garden": <TreePine size={20} />,
  "24/7 Security": <ShieldCheck size={20} />,
  "Security": <ShieldCheck size={20} />,
  "Ample Parking": <Car size={20} />,
  "Parking": <Car size={20} />,
  "Clubhouse": <Coffee size={20} />,
  "Kids Play Area": <Play size={20} />,
  "Solar Power": <Sun size={20} />,
  "Jogging Track": <Activity size={20} />,
  "Yoga Deck": <Smile size={20} />,
  "Yoga": <Smile size={20} />,
  "Multipurpose Hall": <Users size={20} />,
  "CCTV Surveillance": <Video size={20} />,
  "Senior Citizen Area": <UserMinus size={20} />,
  "Indoor Games": <Gamepad2 size={20} />,
  "Library": <Book size={20} />,
  "Badminton Court": <Trophy size={20} />,
  "Tennis Court": <Activity size={20} />,
  "Mini Theatre": <Clapperboard size={20} />,
  "Movies": <Clapperboard size={20} />,
  "Convenience Store": <ShoppingCart size={20} />,
  "Pharmacy": <Cross size={20} />,
  "Wi-Fi Zones": <Wifi size={20} />,
  "BBQ Area": <Flame size={20} />,
  "EV Charging": <Zap size={20} />,
  "Jacuzzi": <Droplet size={20} />,
};

interface Props {
  items?: string[];
  amenitiesCount?: string;
}

export default function AmenitiesSection({ items = [], amenitiesCount }: Props) {
  // If no items provided, don't show section or show placeholder
  if (items.length === 0 && !amenitiesCount) return null;

  return (
    <section id="amenities" className="py-10 md:py-24 bg-white text-gray-900 border-t border-gray-100">
      <div className="container mx-auto px-4 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-10 md:mb-16">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            className="text-2xl md:text-4xl font-extrabold text-[#711113] uppercase tracking-wide px-4"
          >
            World-Class Amenities
          </motion.h2>
          <div className="w-24 h-1 bg-[#29B1D2] mx-auto mt-4 mb-6"></div>
          <p className="text-gray-500 text-sm md:text-lg px-4 leading-relaxed">
            Experience a lifestyle of uncompromising luxury. {amenitiesCount || `${items.length}+`} curated amenities 
            designed to elevate your everyday living.
          </p>
        </div>

        <div className="grid grid-cols-2 xs:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3 md:gap-4">
          {items.map((title, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ delay: idx * 0.05, duration: 0.3 }}
              whileHover={{ y: -5, scale: 1.05 }}
              className="p-3 md:p-4 rounded-xl flex flex-col items-center justify-center text-center group border border-gray-100 shadow-sm hover:shadow-xl transition-all cursor-pointer h-28 md:h-32 bg-white"
            >
              <div className="w-10 h-10 bg-[#711113]/10 text-[#711113] rounded-full flex justify-center items-center mb-3 group-hover:bg-[#711113] group-hover:text-white transition-colors flex-shrink-0">
                {iconMap[title] || <HelpCircle size={20} />}
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
