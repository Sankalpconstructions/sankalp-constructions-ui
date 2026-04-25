"use client";
import React, { useState, useEffect, useRef } from "react";
import { motion, useInView, animate } from "framer-motion";

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3001";

interface BrandStoryData {
  title: string;
  subtitle: string;
  description: string;
  image: string;
  yearsOfExcellence: string;
  stats: { label: string; value: string }[];
}

// Animated Counter with Original Font Styling
function AnimatedCounter({ value, className }: { value: string, className?: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });
  
  const numericValue = parseInt(value.replace(/[^0-9]/g, "")) || 0;
  const suffix = value.replace(/[0-9,]/g, "");

  useEffect(() => {
    if (isInView && ref.current) {
      const controls = animate(0, numericValue, {
        duration: 2,
        ease: "easeOut",
        onUpdate(v) {
          if (ref.current) {
            ref.current.textContent = Math.round(v).toLocaleString();
          }
        },
      });
      return () => controls.stop();
    }
  }, [numericValue, isInView]);

  return (
    <span className={className}>
      <span ref={ref}>0</span>
      <span>{suffix}</span>
    </span>
  );
}

export default function StorySection() {
  const [story, setStory] = useState<BrandStoryData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStory = async () => {
      try {
        const res = await fetch(`${API_BASE_URL}/api/brand-story`);
        if (res.ok) {
          const data = await res.json();
          setStory(data);
        }
      } catch (error) {
        console.error("Error fetching brand story:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchStory();
  }, []);

  if (loading || !story) {
    return (
      <section id="story" className="py-24 bg-white flex items-center justify-center min-h-[400px]">
        <div className="w-8 h-8 border-4 border-[#711113] border-t-transparent rounded-full animate-spin"></div>
      </section>
    );
  }

  return (
    <section id="story" className="py-8 md:py-24 bg-white relative overflow-hidden">
      <div className="container mx-auto px-4 lg:px-8 z-10 relative">
        <div className="flex flex-col md:flex-row items-center gap-8 md:gap-12 lg:gap-20 text-gray-900">

          {/* Left Side: Image & Badge */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8 }}
            className="md:w-1/2 relative w-full"
          >
            <img
              src={story.image || "/assets/about-us-dummy.png"}
              alt={story.subtitle}
              className="rounded-lg shadow-2xl relative z-10 w-full object-cover h-[280px] md:h-[500px]"
            />
            <div className="absolute -bottom-10 -right-10 bg-[#711113] rounded-lg p-8 text-white z-20 shadow-xl hidden lg:block">
              <h4 className="text-4xl font-extrabold mb-1">
                <AnimatedCounter value={story.yearsOfExcellence} />
              </h4>
              <p className="text-sm tracking-widest uppercase">Years of Excellence</p>
            </div>
          </motion.div>

          {/* Right Side: Original Layout & Content */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="md:w-1/2 mt-8 md:mt-0"
          >
            <h2 className="text-[#711113] text-[9px] md:text-sm tracking-[0.25em] uppercase font-bold mb-2 md:mb-3">
              {story.subtitle}
            </h2>
            <h3 className="text-xl md:text-4xl font-extrabold uppercase mb-4 md:mb-6 leading-tight">
              {story.title}
            </h3>
            <div className="w-16 md:w-24 h-1 bg-[#F5C33C] mb-5 md:mb-8"></div>

            <p className="text-gray-600 mb-10 leading-relaxed text-[15px] whitespace-pre-wrap">
              {story.description}
            </p>

            <div className="grid grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-10 mb-8">
              {story.stats.map((stat, idx) => (
                <div key={idx}>
                  <h4 className="text-[2.5rem] leading-none text-gray-800 mb-2 font-serif tracking-tight">
                    <AnimatedCounter value={stat.value} />
                  </h4>
                  <p className="text-[15px] text-gray-600">{stat.label}</p>
                </div>
              ))}
            </div>
          </motion.div>

        </div>
      </div>

      {/* Original Decorative BG element */}
      <div className="absolute right-0 top-1/2 -translate-y-1/2 w-[60vw] h-[60vw] max-w-[800px] max-h-[800px] bg-gray-50 rounded-full translate-x-1/2 -z-0"></div>
    </section>
  );
}
