"use client";

import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination, Navigation } from "swiper/modules";
import {
  Instagram,
  Youtube,
  Globe,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import Image from "next/image";

import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3001";

interface SocialFeedItem {
  _id: string;
  platform: string;
  embedUrl: string;
  title?: string;
}

const STATIC_FALLBACK: SocialFeedItem[] = [
  {
    _id: "fallback-1",
    platform: "instagram",
    embedUrl: "https://www.instagram.com/p/C-reKCXzvT9/",
    title: "Instagram Post",
  },
  {
    _id: "fallback-2",
    platform: "instagram",
    embedUrl: "https://www.instagram.com/p/DEg3xzATRnO/",
    title: "Instagram Post",
  },
  {
    _id: "fallback-3",
    platform: "instagram",
    embedUrl: "https://www.instagram.com/reel/DYkGcZGzjHg/",
    title: "Instagram Reel",
  },
  {
    _id: "fallback-4",
    platform: "instagram",
    embedUrl: "https://www.instagram.com/p/DXyajELkwJ8/",
    title: "Instagram Post",
  },
  {
    _id: "fallback-5",
    platform: "instagram",
    embedUrl: "https://www.instagram.com/p/DXGdBCQk-1T/",
    title: "Instagram Post",
  },
];

const getYoutubeEmbedUrl = (url: string) => {
  let videoId = "";
  try {
    if (url.includes("youtube.com/watch")) {
      const urlObj = new URL(url);
      videoId = urlObj.searchParams.get("v") || "";
    } else if (url.includes("youtu.be/")) {
      videoId = url.split("youtu.be/")[1]?.split("?")[0] || "";
    } else if (url.includes("youtube.com/embed/")) {
      videoId = url.split("youtube.com/embed/")[1]?.split("?")[0] || "";
    } else if (url.includes("youtube.com/shorts/")) {
      videoId = url.split("youtube.com/shorts/")[1]?.split("?")[0] || "";
    }
  } catch (e) {
    console.error("Error parsing YouTube URL", e);
  }
  return videoId ? `https://www.youtube.com/embed/${videoId}` : null;
};

export default function InstagramCarousel() {
  const [feeds, setFeeds] = useState<SocialFeedItem[]>(STATIC_FALLBACK);
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    const checkVisibilityAndFetch = async () => {
      try {
        const configRes = await fetch(`${API_BASE_URL}/api/config?key=show_live_updates_section`);
        if (configRes.ok) {
          const configData = await configRes.json();
          setIsVisible(configData.value);
          if (!configData.value) {
            return;
          }
        }

        const res = await fetch(`${API_BASE_URL}/api/social-feeds`);
        if (res.ok) {
          const data = await res.json();
          if (Array.isArray(data) && data.length > 0) {
            setFeeds(data);
          }
        }
      } catch (err) {
        console.error("Error loading dynamic social feeds or config:", err);
      }
    };
    checkVisibilityAndFetch();
  }, []);

  if (!isVisible) return null;

  useEffect(() => {
    // Load Instagram embed script
    const script = document.createElement("script");
    script.src = "https://www.instagram.com/embed.js";
    script.async = true;
    document.body.appendChild(script);

    // Re-process embeds after render
    if ((window as any).instgrm) {
      (window as any).instgrm.Embeds.process();
    }

    return () => {
      document.body.removeChild(script);
    };
  }, [feeds]);

  return (
    <section
      id="instagram-feed"
      className="py-20 bg-gray-50/50 overflow-hidden flex flex-col justify-center"
    >
      <div className="w-full px-4 sm:px-6 lg:px-8 mx-auto max-w-[1600px]">

        {/* Heading */}
        <div className="text-center mb-8 md:mb-12 flex flex-col items-center">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-2xl md:text-3xl lg:text-4xl font-bold text-[#711113] mb-3"
          >
            Live Social Updates
          </motion.h2>

          <Image
            src="/assets/Title-decorations.png"
            alt="Decoration"
            width={200}
            height={30}
            className="w-[150px] md:w-[200px] h-auto object-contain mt-1 mb-4"
            unoptimized
          />

          <p className="text-gray-600 text-sm md:text-base leading-relaxed max-w-2xl text-center">
            Explore our latest social media posts, reels, YouTube videos, and project site updates directly.
          </p>
        </div>

        {/* Slider */}
        <div className="relative w-full pb-12 group/slider">

          {/* Prev Button */}
          <button className="insta-prev absolute left-0 md:-left-4 top-[40%] -translate-y-1/2 z-20 w-10 h-10 md:w-12 md:h-12 flex items-center justify-center bg-white/90 backdrop-blur-md text-primary rounded-full shadow-[0_4px_20px_rgba(0,0,0,0.15)] border border-gray-100 opacity-0 group-hover/slider:opacity-100 transition-all hover:scale-110">
            <ChevronLeft className="w-5 h-5 md:w-6 md:h-6 pr-[2px]" />
          </button>

          {/* Next Button */}
          <button className="insta-next absolute right-0 md:-right-4 top-[40%] -translate-y-1/2 z-20 w-10 h-10 md:w-12 md:h-12 flex items-center justify-center bg-white/90 backdrop-blur-md text-primary rounded-full shadow-[0_4px_20px_rgba(0,0,0,0.15)] border border-gray-100 opacity-0 group-hover/slider:opacity-100 transition-all hover:scale-110">
            <ChevronRight className="w-5 h-5 md:w-6 md:h-6 pl-[2px]" />
          </button>

          <Swiper
            modules={[Autoplay, Pagination, Navigation]}
            navigation={{
              prevEl: ".insta-prev",
              nextEl: ".insta-next",
            }}
            spaceBetween={24}
            loop={feeds.length >= 4} // Only loop if we have enough items
            speed={800}
            autoplay={{
              delay: 5000,
              disableOnInteraction: false,
              pauseOnMouseEnter: true,
            }}
            pagination={{
              clickable: true,
              dynamicBullets: true,
            }}
            breakpoints={{
              0: {
                slidesPerView: 1,
                spaceBetween: 16,
              },
              480: {
                slidesPerView: 1.2,
                spaceBetween: 16,
              },
              640: {
                slidesPerView: 2,
                spaceBetween: 20,
              },
              768: {
                slidesPerView: 2.2,
                spaceBetween: 20,
              },
              1024: {
                slidesPerView: 3,
                spaceBetween: 24,
              },
              1280: {
                slidesPerView: 3.5,
                spaceBetween: 24,
              },
              1536: {
                slidesPerView: 4,
                spaceBetween: 24,
              },
            }}
            className="w-full !pb-16"
          >
            {feeds.map((post) => {
              const isInstagram = post.platform === "instagram";
              const isYoutube = post.platform === "youtube";
              const ytEmbed = isYoutube ? getYoutubeEmbedUrl(post.embedUrl) : null;

              return (
                <SwiperSlide key={post._id} className="!h-auto">
                  <div className="bg-white rounded-2xl overflow-hidden shadow-[0_4px_20px_-4px_rgba(0,0,0,0.1)] border border-gray-100 h-full flex flex-col">
                    {/* Header */}
                    <div className="flex items-center justify-between p-4 border-b border-gray-100 shrink-0">
                      <div className="flex items-center gap-3">
                        <div className={`w-10 h-10 rounded-full p-[2px] ${
                          isInstagram ? "bg-gradient-to-tr from-yellow-400 via-pink-500 to-purple-600" :
                          isYoutube ? "bg-red-600" : "bg-gray-400"
                        }`}>
                          <div className="w-full h-full rounded-full bg-white flex items-center justify-center">
                            {isInstagram && <Instagram className="w-5 h-5 text-pink-600" />}
                            {isYoutube && <Youtube className="w-5 h-5 text-red-600" />}
                            {!isInstagram && !isYoutube && <Globe className="w-5 h-5 text-gray-600" />}
                          </div>
                        </div>

                        <div>
                          <h3 className="font-semibold text-sm text-gray-900 capitalize">
                            {isInstagram ? "sankalpconstructions" : isYoutube ? "Sankalp YouTube" : "Sankalp Constructions"}
                          </h3>
                          <p className="text-xs text-gray-500">
                            {post.title || (isInstagram ? "Instagram Post / Reel" : isYoutube ? "YouTube Video/Short" : "Web Update")}
                          </p>
                        </div>
                      </div>

                      {isInstagram && <Instagram className="w-5 h-5 text-gray-400" />}
                      {isYoutube && <Youtube className="w-5 h-5 text-gray-400" />}
                      {!isInstagram && !isYoutube && <Globe className="w-5 h-5 text-gray-400" />}
                    </div>

                    {/* Social Embed Body */}
                    <div className="w-full flex-1 bg-white flex flex-col justify-center items-center min-h-[350px] overflow-hidden">
                      {isInstagram ? (
                        <div className="w-full [&>iframe]:!w-full [&>iframe]:!min-w-0">
                          <blockquote
                            className="instagram-media"
                            data-instgrm-permalink={post.embedUrl}
                            data-instgrm-version="14"
                            style={{
                              background: "#FFF",
                              border: 0,
                              margin: "0",
                              maxWidth: "100%",
                              minWidth: "100%",
                              width: "100%",
                            }}
                          />
                        </div>
                      ) : isYoutube && ytEmbed ? (
                        <div className="w-full h-full min-h-[350px] relative aspect-[9/16] md:aspect-auto">
                          <iframe
                            src={ytEmbed}
                            className="absolute inset-0 w-full h-full border-0"
                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                            allowFullScreen
                          />
                        </div>
                      ) : (
                        <div className="text-center p-6 text-gray-400">
                          <Globe size={48} className="mx-auto mb-3 opacity-20" />
                          <p className="text-xs font-bold uppercase tracking-wider mb-2">Social Feed Card</p>
                          <a href={post.embedUrl} target="_blank" rel="noreferrer" className="text-xs text-[#29B1D2] font-semibold underline break-all">
                            View Link
                          </a>
                        </div>
                      )}
                    </div>
                  </div>
                </SwiperSlide>
              );
            })}
          </Swiper>
        </div>
      </div>
    </section>
  );
}