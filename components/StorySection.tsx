"use client";
import React, { useRef, useEffect } from "react";
import { motion, useInView, animate } from "framer-motion";

interface BrandStoryData {
  title: string;
  subtitle: string;
  description: string;
  image: string;
  yearsOfExcellence: string;
  stats: { label: string; value: string }[];
}

// Animated Counter
function AnimatedCounter({ value, className }: { value: string; className?: string }) {
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
  // Static Data (No API)
  const story: BrandStoryData = {
    title: "About Sankalp Constructions",
    subtitle: "Building Dreams Into Reality",
    description: "Since 2001, Sankalp Constructions has been shaping the skyline of Hyderabad with a vision rooted in excellence and refined living. What began as a single villa project has evolved into a legacy of over 3 million square feet of thoughtfully crafted developments across the city.\n\nOur diverse portfolio includes luxury residential apartments, premium villas, sophisticated commercial spaces, and well-planned open plot layouts, all strategically located in the most sought-after locations of Hyderabad.",
    image: "/assets/about-us-dummy.png",
    yearsOfExcellence: "15+",
    stats: [
      { label: "Projects Completed", value: "50+" },
      { label: "Happy Clients", value: "2000+" },
      { label: "Ongoing Projects", value: "10+" },
      { label: "Cities Covered", value: "8+" },
      { label: "Awards Won", value: "12+" },
      { label: "Years Experience", value: "15+" },
    ],
  };

  return (
    <section id="story" className="py-8 md:py-24 bg-white relative overflow-hidden">
      <div className="container mx-auto px-4 lg:px-8 z-10 relative">
        <div className="text-center mb-12">
          <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-[#711113] mb-3">
            {story.title}
          </h2>
        </div>
        <div className="flex flex-col md:flex-row items-start gap-8 md:gap-12 lg:gap-20 text-gray-900">

          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="md:w-1/2 w-full relative"
          >
            <img
              src={story.image}
              alt={story.subtitle}
              className="rounded-lg shadow-2xl w-full object-cover h-[280px] md:h-[500px]"
            />
            <div className="absolute -bottom-10 -right-10 bg-[#711113] p-6 text-white rounded-lg hidden lg:block">
              <h4 className="text-3xl font-bold">
                <AnimatedCounter value={story.yearsOfExcellence} />
              </h4>
              <p className="text-xs uppercase tracking-widest">
                Years of Excellence
              </p>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="md:w-1/2"
          >

            <h3 className="text-[#711113] uppercase text-md md:text-xl font-extrabold mb-4">
              {story.subtitle}
            </h3>

            <p className="text-gray-600 mb-8 whitespace-pre-line">
              {story.description}
            </p>

            <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
              {story.stats.map((stat, idx) => (
                <div key={idx}>
                  <h4 className="text-2xl font-bold">
                    <AnimatedCounter value={stat.value} />
                  </h4>
                  <p className="text-sm text-gray-500">{stat.label}</p>
                </div>
              ))}
            </div>
          </motion.div>

        </div>
      </div>

      <div className="absolute right-0 top-1/2 -translate-y-1/2 w-[60vw] h-[60vw] max-w-[800px] bg-gray-50 rounded-full translate-x-1/2 -z-10"></div>
    </section>
  );
}