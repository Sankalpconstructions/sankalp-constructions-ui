"use client";
import React, { useRef, useEffect, useState } from "react";
import { motion, useInView, animate } from "framer-motion";
import Link from "next/link";
import { ArrowRight, Check, Target, Eye, ShieldCheck, Gem, Users, ArrowUpRight } from "lucide-react";

interface BrandStoryData {
  title: string;
  subtitle: string;
  description: string;
  image: string;
  yearsOfExcellence: string;
  stats: { label: string; value: string }[];
}

interface AboutSection {
  _id: string;
  title: string;
  content: string;
  status: string;
}

interface StorySectionProps {
  variant?: "compact" | "full";
}

// Animated Counter
function AnimatedCounter({ value, className }: { value: string; className?: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once: true });

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

export default function StorySection({ variant = "compact" }: StorySectionProps) {
  // --- EXTRA SECTIONS ANIMATIONS ---
  const fadeUp = {
    hidden: { opacity: 0, y: 40 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] } },
  };

  const staggerContainer = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.15 },
    },
  };

  // --- DATA ---
  const [story, setStory] = useState<BrandStoryData | null>(null);
  const [aboutSections, setAboutSections] = useState<AboutSection[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  console.log("story", story)
  useEffect(() => {
    const fetchData = async () => {
      try {
        const baseUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001';

        // Fetch Brand Story
        const storyRes = await fetch(`${baseUrl}/api/brand-story`);
        if (storyRes.ok) {
          const storyData = await storyRes.json();
          setStory(storyData);
        }

        // Fetch About Sections if full variant
        if (variant === "full") {
          const aboutRes = await fetch(`${baseUrl}/api/about`);
          if (aboutRes.ok) {
            const aboutData = await aboutRes.json();
            setAboutSections(aboutData.filter((a: any) => a.status === 'Published'));
          }
        }
      } catch (error) {
        console.error("Failed to fetch story/about data:", error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchData();
  }, [variant]);

  useEffect(() => {
    const fetchAboutSections = async () => {
      try {
        const baseUrl =
          process.env.NEXT_PUBLIC_API_URL ||
          "http://localhost:3001";

        const aboutRes = await fetch(
          `${baseUrl}/api/about`
        );

        if (aboutRes.ok) {
          const aboutData = await aboutRes.json();

          setAboutSections(
            aboutData.filter(
              (a: any) => a.status === "Published"
            )
          );
        }
      } catch (error) {
        console.error(
          "Failed to fetch about sections:",
          error
        );
      }
    };

    fetchAboutSections();
  }, []);
  if (isLoading || !story) return null;

  const descriptionToUse = story.description;

  return (
    <div className={variant === "full" ? "bg-[#FAF9F6] selection:bg-[#711113] selection:text-white" : ""}>

      {/* BASE SHARED SECTION */}
      <section id="story" className="py-10 md:py-16 bg-white relative overflow-hidden">
        <div className="container mx-auto px-4 lg:px-8 z-10 relative">
          <div className="text-center mb-6 md:mb-12">
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
              className="md:w-1/2 flex flex-col h-full justify-center"
            >

              <h3 className="text-[#711113] uppercase text-md md:text-xl font-extrabold mb-4">
                {story.subtitle}
              </h3>

              <p className="text-gray-600 mb-8 whitespace-pre-line text-sm md:text-base leading-relaxed">
                {descriptionToUse}
              </p>

              <div className="grid grid-cols-2 md:grid-cols-3 gap-6 mb-10">
                {story.stats.map((stat, idx) => (
                  <div key={idx}>
                    <h4 className="text-2xl font-bold text-gray-900">
                      <AnimatedCounter value={stat.value} />
                    </h4>
                    <p className="text-sm text-gray-500 font-medium">{stat.label}</p>
                  </div>
                ))}
              </div>

              {/* Show "Explore More" only in compact variant */}
              {variant === "compact" && (
                <Link href="/about" className="inline-flex items-center gap-2 bg-[#711113] text-white px-8 py-3 rounded-md font-semibold hover:bg-black transition-colors w-max group shadow-lg">
                  Explore More
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </Link>
              )}
            </motion.div>

          </div>
        </div>

        <div className="absolute right-0 top-1/2 -translate-y-1/2 w-[60vw] h-[60vw] max-w-[800px] bg-gray-50 rounded-full translate-x-1/2 -z-10"></div>
      </section>

      {variant === "full" && (
        <section className="py-12 md:py-16 bg-gray-50 relative">
          <div className="container mx-auto px-4 lg:px-8 max-w-5xl">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-8">

              {aboutSections.map((section, index) => (
                <motion.div
                  key={section._id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.15 }}
                  className="bg-white p-6 md:p-8 rounded-xl shadow-lg shadow-gray-200/40 border border-gray-100 flex flex-col"
                >
                  <div className="w-12 h-12 bg-[#711113]/10 rounded-xl flex items-center justify-center mb-4">
                    {index % 2 === 0 ? (
                      <Eye className="w-6 h-6 text-[#711113]" />
                    ) : (
                      <Target className="w-6 h-6 text-[#711113]" />
                    )}
                  </div>

                  <h3 className="text-xl md:text-2xl font-bold text-gray-900 mb-4">
                    {section.title}
                  </h3>

                  <div className="text-gray-600 leading-relaxed text-sm md:text-base font-medium whitespace-pre-wrap">
                    {section.content}
                  </div>
                </motion.div>
              ))}

            </div>

            {aboutSections.length === 0 && (
              <div className="text-center py-20">
                <p className="text-gray-400 text-lg">
                  No About sections available
                </p>
              </div>
            )}
          </div>
        </section>
      )}

    </div>
  );
}