"use client";
import { useEffect, useState, useRef } from "react";
import { motion } from "framer-motion";

export default function Preloader() {
  const [isVisible, setIsVisible] = useState(true);
  const [isFadingOut, setIsFadingOut] = useState(false);
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    const hasLoaded = localStorage.getItem("sankalp_preloader_loaded") === "true";
    if (hasLoaded) {
      setIsVisible(false);
      return;
    }

    const isOffline = typeof navigator !== "undefined" && !navigator.onLine;
    const duration = isOffline ? 4000 : 2200;

    timerRef.current = setTimeout(() => {
      setIsFadingOut(true);
      // Wait for the fade-out animation to complete before removing from DOM
      setTimeout(() => {
        setIsVisible(false);
        localStorage.setItem("sankalp_preloader_loaded", "true");
      }, 500); // 500ms matches the transition duration
    }, duration);

    return () => {
      if (timerRef.current) clearTimeout(timerRef.current);
    };
  }, []);

  if (!isVisible) return null;

  return (
    <>
      <script
        dangerouslySetInnerHTML={{
          __html: `
            if (localStorage.getItem("sankalp_preloader_loaded") === "true") {
              document.documentElement.style.setProperty('--preloader-display', 'none');
            } else {
              document.documentElement.style.setProperty('--preloader-display', 'flex');
            }
          `,
        }}
      />
      <motion.div
        suppressHydrationWarning
        className="fixed inset-0 z-[100] flex-col items-center justify-center bg-white"
        style={{ display: "var(--preloader-display, flex)" }}
        initial={{ opacity: 1 }}
        animate={{ opacity: isFadingOut ? 0 : 1 }}
        transition={{ duration: 0.5, ease: "easeInOut" }}
      >
        <div className="w-full h-full md:w-[600px] md:h-[600px] flex items-center justify-center">
          <img
            src="/assets/preloader.gif"
            alt="Loading..."
            className="w-full h-full object-contain sm:object-contain md:p-4"
          />
        </div>
      </motion.div>
    </>
  );
}
