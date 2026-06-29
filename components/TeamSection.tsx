"use client";
import React from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import { useAppData } from "@/context/AppDataContext";
import type { TeamMember } from "@/context/AppDataContext";

export default function TeamSection() {
  // Read from global prefetch cache — data is already loading during preloader
  const { team: members, isReady } = useAppData();

  // Still loading (rare: only if API is slower than 4s hard cap)
  if (!isReady) return null;

  if (members.length === 0) return null;

  return (
    <section id="team" className="py-10 md:py-16 bg-[#E5E7EB] text-gray-900 overflow-hidden">
      <div className="container mx-auto px-4 lg:px-8">

        <div className="text-center max-w-2xl mx-auto mb-10 md:mb-14 flex flex-col items-center">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            className="text-2xl md:text-3xl lg:text-4xl font-bold text-[#711113] mb-3"
          >
            Meet Our Team
          </motion.h2>
          <div className="flex justify-center md:justify-start">
            <Image src="/assets/Title-decorations.png" alt="Decoration" width={200} height={30} className="w-[150px] md:w-[200px] h-auto object-contain mt-1 mb-4" unoptimized />
          </div>
          <p className="text-gray-500 text-xs md:text-base px-2 leading-relaxed">
            The visionary leaders and dedicated experts behind Sankalp Constructions&apos; success.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 md:gap-8">
          {members.map((member, idx) => (
            <motion.div
              key={member._id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ delay: idx * 0.08, duration: 0.5 }}
              className="group relative bg-white overflow-hidden shadow-sm hover:shadow-xl transition-all duration-500 flex flex-col w-full"
              style={{ borderRadius: "32px", height: "460px", padding: "12px" }}
            >
              <div
                className="absolute inset-x-3 top-3 bottom-[120px] group-hover:bottom-3 overflow-hidden transition-all duration-500 z-0"
                style={{ borderRadius: "24px" }}
              >
                <Image
                  src={member.image}
                  alt={member.name}
                  fill
                  className="object-cover object-top"
                  unoptimized
                />
                <div className="absolute inset-0 bg-gradient-to-t from-white via-white/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
              </div>

              <div className="relative z-10 flex flex-col justify-end h-full pointer-events-none">
                <div className="px-3 pb-3 pointer-events-auto">
                  <h3 className="text-2xl font-bold text-gray-900 mb-1 leading-snug">
                    {member.name}
                  </h3>
                  <p className="text-gray-500 text-sm leading-relaxed mb-2 line-clamp-2">
                    {member.role}
                  </p>

                </div>
              </div>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
}
