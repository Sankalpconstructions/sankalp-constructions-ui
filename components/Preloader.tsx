"use client";
import { useEffect, useState, useRef } from "react";
import { motion } from "framer-motion";
import { Home, Building, Blocks } from "lucide-react";
import { useAppData } from "@/context/AppDataContext";

const MIN_DISPLAY_MS = 2000; // always show at least 2s (brand experience)
const MAX_DISPLAY_MS = 4000; // never block longer than 4s (slow network safety)

export default function Preloader() {
  const [isVisible, setIsVisible] = useState(false);
  const { isReady } = useAppData();

  // Track when the preloader started showing
  const shownAtRef = useRef<number | null>(null);
  const maxTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const minTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const hiddenRef = useRef(false);

  const hide = () => {
    if (hiddenRef.current) return;
    hiddenRef.current = true;
    setIsVisible(false);
    if (maxTimerRef.current) clearTimeout(maxTimerRef.current);
    if (minTimerRef.current) clearTimeout(minTimerRef.current);
  };

  useEffect(() => {
    const alreadyShown = sessionStorage.getItem("preloader_shown");
    if (alreadyShown) return;

    sessionStorage.setItem("preloader_shown", "true");
    shownAtRef.current = Date.now();
    setIsVisible(true);

    // Hard cap: never block the user more than MAX_DISPLAY_MS
    maxTimerRef.current = setTimeout(hide, MAX_DISPLAY_MS);

    // Minimum brand display
    minTimerRef.current = setTimeout(() => {
      // If APIs are already ready by the time min timer fires → hide immediately
      if (isReady) hide();
      // Otherwise wait for isReady effect below to trigger hide
    }, MIN_DISPLAY_MS);

    return () => {
      if (maxTimerRef.current) clearTimeout(maxTimerRef.current);
      if (minTimerRef.current) clearTimeout(minTimerRef.current);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // When APIs become ready, hide only if min time has already passed
  useEffect(() => {
    if (!isReady || !isVisible || !shownAtRef.current) return;
    const elapsed = Date.now() - shownAtRef.current;
    if (elapsed >= MIN_DISPLAY_MS) {
      hide();
    }
    // If min time hasn't passed yet, the minTimer useEffect above will handle it
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isReady]);

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
