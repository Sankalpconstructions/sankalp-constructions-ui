"use client";
import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Loader2 } from "lucide-react";

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
      <div className="py-24 bg-white flex flex-col items-center justify-center">
        <Loader2 className="animate-spin text-[#711113] mb-4" size={40} />
        <p className="text-gray-400 font-bold uppercase tracking-widest text-[10px]">Loading Our Team...</p>
      </div>
    );
  }

  if (members.length === 0) return null;

  return (
    <section id="team" className="py-8 md:py-24 bg-white text-gray-900 overflow-hidden">
      <div className="container mx-auto px-4 lg:px-8">

        <div className="text-center max-w-2xl mx-auto mb-8 md:mb-16">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            className="text-xl md:text-4xl font-extrabold text-[#711113] uppercase tracking-wide"
          >
            Meet Our Team
          </motion.h2>
          <div className="w-16 md:w-24 h-1 bg-[#29B1D2] mx-auto mt-3 md:mt-4 mb-5 md:mb-6"></div>
          <p className="text-gray-500 text-xs md:text-lg px-2 leading-relaxed">
            The visionary leaders and dedicated experts behind Sankalp Constructions&apos; success.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {members.map((member, idx) => (
            <motion.div
              key={member._id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ delay: idx * 0.1, duration: 0.5 }}
              className="group relative bg-[#F5F5F5] rounded-2xl overflow-hidden hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 border border-gray-100 flex flex-col h-[400px]"
            >
              <div className="relative w-full h-full overflow-hidden">
                <img
                  src={member.image}
                  alt={member.name}
                  className="w-full h-full object-cover object-top group-hover:scale-105 transition-transform duration-700"
                />
              </div>

              <div className="absolute bottom-0 w-full bg-white bg-opacity-95 p-6 backdrop-blur-md rounded-b-2xl border-t border-gray-100">
                <h3 className="text-xl font-bold text-gray-900 group-hover:text-[#711113] transition-colors">
                  {member.name}
                </h3>
                <p className="text-gray-500 font-medium text-sm mt-1">
                  {member.role}
                </p>
              </div>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
}
