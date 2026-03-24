"use client";
import { motion, AnimatePresence } from "framer-motion";
import { MessageCircle, Phone } from "lucide-react";
import { useState } from "react";

export default function ContactFloating() {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div className="fixed bottom-[5.5rem] right-6 z-[150] flex flex-col items-end gap-4">
      <motion.div
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        className="group relative flex flex-col items-center bg-[#25D366] text-white rounded-full shadow-2xl hover:shadow-green-500/30 transition-all overflow-visible w-14 py-2"
      >
        <AnimatePresence>
          {isHovered && (
            <motion.div
              initial={{ x: 10, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              exit={{ x: 10, opacity: 0 }}
              className="absolute right-[120%] top-1/2 -translate-y-1/2 bg-white text-gray-800 px-4 py-2 rounded-lg shadow-xl whitespace-nowrap hidden md:block border border-gray-100"
            >
              <span className="font-bold uppercase tracking-wider text-xs">Connect With Us</span>
            </motion.div>
          )}
        </AnimatePresence>

        <a
          href="tel:+917330770111"
          className="w-full h-12 flex flex-shrink-0 items-center justify-center hover:bg-black/10 transition-colors rounded-t-full relative z-10"
          title="Call Us"
        >
          <Phone size={22} />
        </a>
        
        <div className="w-8 h-[1px] bg-white/40 my-1" />

        <a
          href="https://wa.me/917330770111?text=Hello%20Sankalp%20Constructions,%20I%20would%20like%20to%20know%20more%20about%20your%20projects."
          target="_blank"
          rel="noreferrer"
          className="w-full h-12 flex flex-shrink-0 items-center justify-center hover:bg-black/10 transition-colors rounded-b-full relative z-10"
          title="WhatsApp Us"
        >
          <MessageCircle size={26} />
        </a>
      </motion.div>
    </div>
  );
}
