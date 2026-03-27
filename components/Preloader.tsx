"use client";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Home, Building, Blocks } from "lucide-react";

export default function Preloader() {
  // Start invisible until we confirm on the client whether it should show
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const alreadyShown = sessionStorage.getItem("preloader_shown");
    if (alreadyShown) {
      // Don't show again during this browser session
      return;
    }

    // Mark as shown for the rest of this session
    sessionStorage.setItem("preloader_shown", "true");
    setIsVisible(true);

    const timer = setTimeout(() => {
      setIsVisible(false);
    }, 2000);
    return () => clearTimeout(timer);
  }, []);

  if (!isVisible) return null;

  return (
    <motion.div
      className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-white"
      initial={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5, delay: 1.5 }}
    >
      <div className="flex gap-4 mb-4">
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ repeat: Infinity, duration: 2, ease: "linear" }}
        >
          <Home size={48} className="text-[#711113]" />
        </motion.div>
        <motion.div
          animate={{ scale: [1, 1.2, 1] }}
          transition={{ repeat: Infinity, duration: 1.5, ease: "easeInOut" }}
        >
          <Building size={48} className="text-[#29B1D2]" />
        </motion.div>
        <motion.div
          animate={{ rotate: -360 }}
          transition={{ repeat: Infinity, duration: 2, ease: "linear" }}
        >
          <Blocks size={48} className="text-[#F5C33C]" />
        </motion.div>
      </div>
      <motion.h1
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
        className="text-2xl font-bold text-[#711113] uppercase tracking-widest mt-4"
      >
        Sankalp Constructions
      </motion.h1>
      <p className="text-gray-500 mt-2 text-sm tracking-widest uppercase">Building Dreams</p>
    </motion.div>
  );
}
