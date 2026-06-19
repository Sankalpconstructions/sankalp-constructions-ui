"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import sankalpLogo from "../public/assets/Sankalplogo.png";

export default function Preloader() {
  const [isVisible, setIsVisible] = useState(true);
  const [isFading, setIsFading] = useState(false);

  useEffect(() => {
    // Start fade out after 5 seconds
    const timer = setTimeout(() => {
      setIsFading(true);
      // Remove from DOM after fade out completes (500ms)
      setTimeout(() => setIsVisible(false), 500);
    }, 3000);

    return () => clearTimeout(timer);
  }, []);

  if (!isVisible) return null;

  return (
    <div className={`fixed inset-0 z-[9999] flex items-center justify-center bg-white transition-opacity duration-500 ${isFading ? 'opacity-0' : 'opacity-100'}`}>
      <Image
        src={sankalpLogo}
        alt="Sankalp Constructions Logo"
        width={300}
        height={300}
        className="w-48 md:w-64 h-auto object-contain animate-pulse"
        priority
      />
    </div>
  );
}
