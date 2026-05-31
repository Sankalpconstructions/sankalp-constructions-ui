"use client";
import { useEffect, useState, useRef } from "react";
import { motion } from "framer-motion";

export default function Preloader() {
  const [isVisible, setIsVisible] = useState(true);

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

    const isOffline = typeof navigator !== "undefined" && !navigator.onLine;
    const duration = isOffline ? 4000 : 2200;

    timerRef.current = setTimeout(hide, duration);

    return () => {
      if (timerRef.current) clearTimeout(timerRef.current);
    };
  }, []);

  const hasLoaded = typeof window !== "undefined" && sessionStorage.getItem("sankalp_preloader_loaded") === "true";
  if (!isVisible || hasLoaded) return null;

  return (
    <motion.div
      suppressHydrationWarning
      className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-white"
      style={{ display: hasLoaded ? "none" : "flex" }}
      initial={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <div className="w-full h-full md:w-[600px] md:h-[600px] flex items-center justify-center">
        <img
          src="/assets/preloader.gif"
          alt="Loading..."
          className="w-full h-full object-contain sm:object-contain md:p-4"
        />
      </div>
    </motion.div>
  );
}
