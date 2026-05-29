"use client";
import { useEffect, useState, useRef } from "react";
import { motion } from "framer-motion";

export default function Preloader() {
  const [isVisible, setIsVisible] = useState(true);

  // Track when the preloader started showing
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const hiddenRef = useRef(false);

  const hide = () => {
    if (hiddenRef.current) return;
    hiddenRef.current = true;
    setIsVisible(false);
    if (typeof window !== "undefined") {
      sessionStorage.setItem("sankalp_preloader_loaded", "true");
    }
    if (timerRef.current) clearTimeout(timerRef.current);
  };

  useEffect(() => {
    const hasLoaded = typeof window !== "undefined" && sessionStorage.getItem("sankalp_preloader_loaded") === "true";
    if (hasLoaded) {
      setIsVisible(false);
      return;
    }

    // Determine duration: 4 seconds if offline, 2 seconds if online
    const isOffline = typeof navigator !== "undefined" && !navigator.onLine;
    const duration = isOffline ? 4000 : 2900;

    timerRef.current = setTimeout(hide, duration);

    return () => {
      if (timerRef.current) clearTimeout(timerRef.current);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // If already loaded, do not display anything
  const hasLoaded = typeof window !== "undefined" && sessionStorage.getItem("sankalp_preloader_loaded") === "true";
  if (!isVisible || hasLoaded) return null;

  return (
    <motion.div
      suppressHydrationWarning
      className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-[#BFC8D1]"
      style={{ display: hasLoaded ? "none" : "flex" }}
      initial={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <div className="relative w-48 h-48 sm:w-60 sm:h-60 md:w-72 md:h-72 lg:w-80 lg:h-80 flex items-center justify-center">
        <video
          src="/assets/Preloader.mp4"
          autoPlay
          loop
          muted
          playsInline
          className="w-full h-full object-contain"
        />
      </div>
      {/* <motion.h1
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="text-base sm:text-lg md:text-2xl lg:text-3xl font-bold text-[#07aeda] uppercase tracking-widest mt-4 md:mt-6 text-center px-6 w-full max-w-[95vw] md:max-w-3xl leading-relaxed"
      >
        welcome to Sankalp Constructions
      </motion.h1> */}
    </motion.div>
  );
}
