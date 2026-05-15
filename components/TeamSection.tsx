"use client";
import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Loader2, User, ClipboardCheck } from "lucide-react";

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3001";

interface TeamMember {
  _id: string;
  name: string;
  role: string;
  image: string;
}

export default function TeamSection() {
  const [members, setMembers] = useState<TeamMember[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTeam = async () => {
      try {
        const res = await fetch(`${API_BASE_URL}/api/team`);
        if (res.ok) {
          const data = await res.json();
          setMembers(data);
        }
      } catch (error) {
        console.error("Error fetching team:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchTeam();
  }, []);

  if (loading) {
    return (
      <div className="py-24 bg-[#E5E7EB] flex flex-col items-center justify-center">
        <Loader2 className="animate-spin text-[#711113] mb-4" size={40} />
        <p className="text-gray-400 font-bold uppercase tracking-widest text-[10px]">Loading Our Team...</p>
      </div>
    );
  }

  if (members.length === 0) return null;

  return (
    <section id="team" className="py-10 md:py-16 bg-[#E5E7EB] text-gray-900 overflow-hidden">
      <div className="container mx-auto px-4 lg:px-8">

        <div className="text-center max-w-2xl mx-auto mb-10 md:mb-14">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            className="text-2xl md:text-3xl lg:text-4xl font-bold text-[#711113] mb-3"
          >
            Meet Our Team
          </motion.h2>
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
                <img
                  src={member.image}
                  alt={member.name}
                  className="w-full h-full object-cover object-top"
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
