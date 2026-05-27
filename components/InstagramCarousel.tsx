"use client";

import React, { useEffect } from "react";
import { motion } from "framer-motion";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination, Navigation } from "swiper/modules";
import {
  Instagram,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";

import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";

const instagramEmbeds = [
  {
    id: 1,
    embedUrl:
      "https://www.instagram.com/p/C-reKCXzvT9/",
  },
  {
    id: 2,
    embedUrl:
      "https://www.instagram.com/p/DEg3xzATRnO/",
  },
  {
    id: 3,
    embedUrl:
      "https://www.instagram.com/reel/DYkGcZGzjHg/",
  },
  {
    id: 4,
    embedUrl:
      "https://www.instagram.com/p/DXyajELkwJ8/",
  },
  {
    id: 5,
    embedUrl:
      "https://www.instagram.com/p/DXGdBCQk-1T/",
  },
];

export default function InstagramCarousel() {

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
  }, []);

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
            Live Updates from Instagram
          </motion.h2>

          <img
            src="/assets/Title-decorations.png"
            alt="Decoration"
            className="w-[150px] md:w-[200px] h-auto object-contain mt-1 mb-4"
          />

          <p className="text-gray-600 text-sm md:text-base leading-relaxed max-w-2xl text-center">
            Explore our latest posters, reels, project updates and customer
            stories directly from Instagram.
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
            loop={true}
            speed={800}
            autoplay={{
              delay: 4000,
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
            {instagramEmbeds.map((post) => (
              <SwiperSlide key={post.id} className="!h-auto">
                <div className="bg-white rounded-2xl overflow-hidden shadow-[0_4px_20px_-4px_rgba(0,0,0,0.1)] border border-gray-100 h-full flex flex-col">
                  {/* Header */}
                  <div className="flex items-center justify-between p-4 border-b border-gray-100 shrink-0">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-yellow-400 via-pink-500 to-purple-600 p-[2px]">
                        <div className="w-full h-full rounded-full bg-white flex items-center justify-center">
                          <Instagram className="w-5 h-5 text-pink-600" />
                        </div>
                      </div>

                      <div>
                        <h3 className="font-semibold text-sm text-gray-900">
                          sankalpconstructions
                        </h3>
                        <p className="text-xs text-gray-500">
                          Instagram Post / Reel
                        </p>
                      </div>
                    </div>

                    <Instagram className="w-5 h-5 text-gray-400" />
                  </div>

                  {/* Instagram Embed */}
                  <div className="w-full flex-1 bg-white flex flex-col [&>iframe]:!w-full [&>iframe]:!min-w-0">
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
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </div>
    </section>
  );
}