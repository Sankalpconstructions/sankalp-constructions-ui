"use client";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronUp, ChevronDown } from "lucide-react";

export default function ScrollController() {
  const [show, setShow] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setShow(window.scrollY > 300);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const scrollToBottom = () => {
    window.scrollTo({ top: document.body.scrollHeight, behavior: "smooth" });
  };

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 50 }}
          className="fixed bottom-6 left-1/2 -translate-x-1/2 z-[140] flex items-center gap-1 bg-white/90 glass shadow-2xl rounded-full p-1"
        >
          <button
            onClick={scrollToTop}
            className="w-10 h-10 bg-[#711113] text-white rounded-full flex items-center justify-center hover:bg-[#520c0d] transition-colors"
            title="Scroll to Top"
          >
            <ChevronUp size={20} />
          </button>
          
          <div className="w-px h-6 bg-gray-300 mx-1"></div>
          
          <button
            onClick={scrollToBottom}
            className="w-10 h-10 bg-[#711113] text-white rounded-full flex items-center justify-center hover:bg-[#520c0d] transition-colors"
            title="Scroll to Bottom"
          >
            <ChevronDown size={20} />
          </button>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
