"use client";
import { motion } from "framer-motion";
import {
  Dumbbell, Waves, TreePine, ShieldCheck, Car, Coffee, Play, Sun,
  Activity, Smile, Users, Video, UserMinus, Gamepad2, Book, Trophy,
  Clapperboard, ShoppingCart, Cross, Wifi, Flame, Zap, Droplet
} from "lucide-react";

const amenities = [
  { icon: <Dumbbell size={20} />, title: "Gymnasium" },
  { icon: <Waves size={20} />, title: "Swimming Pool" },
  { icon: <TreePine size={20} />, title: "Landscaped Gardens" },
  { icon: <ShieldCheck size={20} />, title: "24/7 Security" },
  { icon: <Car size={20} />, title: "Ample Parking" },
  { icon: <Coffee size={20} />, title: "Clubhouse" },
  { icon: <Play size={20} />, title: "Kids Play Area" },
  { icon: <Sun size={20} />, title: "Solar Power" },
  { icon: <Activity size={20} />, title: "Jogging Track" },
  { icon: <Smile size={20} />, title: "Yoga Deck" },
  { icon: <Users size={20} />, title: "Multipurpose Hall" },
  { icon: <Video size={20} />, title: "CCTV Surveillance" },
  { icon: <UserMinus size={20} />, title: "Senior Citizen Area" },
  { icon: <Gamepad2 size={20} />, title: "Indoor Games" },
  { icon: <Book size={20} />, title: "Library" },
  { icon: <Trophy size={20} />, title: "Badminton Court" },
  { icon: <Activity size={20} />, title: "Tennis Court" },
  { icon: <Clapperboard size={20} />, title: "Mini Theatre" },
  { icon: <ShoppingCart size={20} />, title: "Convenience Store" },
  { icon: <Cross size={20} />, title: "Pharmacy" },
  { icon: <Wifi size={20} />, title: "Wi-Fi Zones" },
  { icon: <Flame size={20} />, title: "BBQ Area" },
  { icon: <Zap size={20} />, title: "EV Charging" },
  { icon: <Droplet size={20} />, title: "Jacuzzi" },
];

export default function AmenitiesSection({ projectId }: { projectId?: string }) {
  let displayAmenities = amenities;
  if (projectId) {
    const startIdx = (parseInt(projectId) * 5) % amenities.length;
    displayAmenities = [...amenities.slice(startIdx), ...amenities.slice(0, startIdx)].slice(0, 10);
  }

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
            Experience a lifestyle of uncompromising luxury. Over 24 curated amenities 
            designed to elevate your everyday living.
          </p>
        </div>

        <div className="grid grid-cols-2 xs:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3 md:gap-4">
          {displayAmenities.map((item, idx) => (
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
                {item.icon}
              </div>
              <h3 className="text-[10px] md:text-xs font-bold uppercase text-gray-700 group-hover:text-[#711113] transition-colors leading-tight">
                {item.title}
              </h3>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
