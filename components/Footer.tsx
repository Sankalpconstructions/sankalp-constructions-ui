"use client";
import React from "react";
import { MapPin, Phone, Mail, Instagram, Linkedin, Facebook, Twitter, ChevronRight } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import sankalpLogo from "../public/assets/Sankalplogo.png";
import { useProjects } from "@/context/ProjectContext";

import { useState, useEffect } from "react";

export default function Footer() {
  const { projects, loading } = useProjects();
  const [config, setConfig] = useState<Record<string, boolean>>({});

  // Take only the top 5 projects for the footer
  const topProjects = projects.slice(0, 5);

  useEffect(() => {
    const fetchConfig = async () => {
      try {
        const baseUrl = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3001";
        const res = await fetch(`${baseUrl}/api/config`);
        if (res.ok) {
          const data = await res.json();
          setConfig(data);
        }
      } catch (err) {
        console.error("Failed to load footer configs:", err);
      }
    };
    fetchConfig();
  }, []);

  return (
    <footer className="bg-[#f8f9fa] pt-16 relative overflow-hidden flex flex-col mt-auto">
      <div className="container mx-auto px-4 lg:px-8 relative z-10 mb-20 lg:mb-32">
        <div className="bg-white rounded-[2rem] border border-gray-200/80 p-8 md:p-12 lg:p-16 flex flex-col shadow-[0_8px_30px_rgb(0,0,0,0.04)]">

          <div className="flex flex-col lg:flex-row justify-between gap-12 lg:gap-20 mb-12 lg:mb-16">
            {/* Brand Info */}
            <div className="flex flex-col lg:w-1/3 xl:w-2/5">
              <Link href="/" className="flex items-center gap-2 mb-6">
                <Image
                  src={sankalpLogo}
                  alt="Sankalp Constructions Logo"
                  width={200}
                  height={200}
                  className="w-auto h-10 md:h-12 object-contain"
                  priority
                  unoptimized
                />
              </Link>
              <p className="text-sm text-gray-500 mb-8 leading-relaxed max-w-sm">
                Experience the pinnacle of luxury living. With over two decades of experience, we build homes that redefine your lifestyle.
              </p>
              <div className="flex gap-6 items-center">
                <a href="https://x.com/SANKALPCONSTRUC" className="text-gray-900 hover:text-primary transition-colors">
                  <Twitter size={18} strokeWidth={2.5} />
                </a>
                <Link href="https://www.threads.com/@sankalpconstructions?hl=en" className="text-gray-900 hover:text-primary transition-colors">
                  <Instagram size={18} strokeWidth={2.5} />
                </Link>
                <a href="https://www.facebook.com/profile.php?id=100064036060289" className="text-gray-900 hover:text-primary transition-colors">
                  <Facebook size={18} strokeWidth={2.5} />
                </a>
              </div>
            </div>

            {/* Links Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10 lg:gap-12 lg:w-2/3 xl:w-3/5">
              {/* Quick Links */}
              <div>
                <h4 className="text-base font-semibold text-gray-900 mb-6">Quick Links</h4>
                <ul className="space-y-4">
                  <li><Link href="/about" className="text-sm text-gray-500 hover:text-gray-900 transition-colors">Brand Story</Link></li>
                  <li><Link href="/projects" className="text-sm text-gray-500 hover:text-gray-900 transition-colors">Our Projects</Link></li>
                  {config.show_csr_page !== false && (
                    <li><Link href="/csr" className="text-sm text-gray-500 hover:text-gray-900 transition-colors">CSR Initiatives</Link></li>
                  )}
                  <li><Link href="/blog" className="text-sm text-gray-500 hover:text-gray-900 transition-colors">Insights & Blogs</Link></li>
                </ul>
              </div>

              {/* Top Projects */}
              <div>
                <h4 className="text-base font-semibold text-gray-900 mb-6">Top Projects</h4>
                <ul className="space-y-4">
                  {!loading ? (
                    topProjects.map((project) => (
                      <li key={project._id}>
                        <Link href={`/projects/${project._id}`} className="text-sm text-gray-500 hover:text-gray-900 transition-colors">
                          {project.title}
                        </Link>
                      </li>
                    ))
                  ) : (
                    <li className="text-sm text-gray-400 animate-pulse">Loading projects...</li>
                  )}
                  {!loading && projects.length > 0 && (
                    <li>
                      <Link href="/projects" className="text-sm font-semibold text-primary hover:text-[#5a0e0f] transition-colors mt-2 block">
                        View All Projects
                      </Link>
                    </li>
                  )}
                </ul>
              </div>

              {/* Get In Touch */}
              <div>
                <h4 className="text-base font-semibold text-gray-900 mb-6">Get In Touch</h4>
                <ul className="space-y-4">
                  <li className="flex items-start gap-3 text-sm text-gray-500">
                    <MapPin size={16} className="shrink-0 text-gray-400 mt-0.5" />
                    <a href="https://www.google.com/maps/search/?api=1&query=Sankalp+constructions,+S+S+Arcade,+Sainikpuri+1st+Main+Rd,+Secunderabad,+TS+500094" target="_blank" rel="noopener noreferrer" className="leading-relaxed hover:text-gray-900 transition-colors">S S Arcade, Sainikpuri 1st Main Rd, Secunderabad, TS 500094</a>
                  </li>
                  <li className="flex items-center gap-3 text-sm text-gray-500">
                    <Phone size={16} className="shrink-0 text-gray-400" />
                    <a href="tel:+917330770111" className="hover:text-gray-900 transition-colors">+91 73307 70111</a>
                  </li>
                  <li className="flex items-center gap-3 text-sm text-gray-500">
                    <Mail size={16} className="shrink-0 text-gray-400" />
                    <a href="mailto:info@sankalpconstructions.in" className="truncate hover:text-gray-900 transition-colors">info@sankalpconstructions.in</a>
                  </li>
                </ul>
              </div>
            </div>
          </div>

          <div className="h-px bg-gray-100 w-full mb-6"></div>

          <div className="flex flex-col-reverse md:flex-row justify-between items-center text-sm text-gray-500 gap-4">
            <p>2025 Sankalp. All rights reserved</p>
            <div className="flex flex-wrap justify-center gap-4 md:gap-6">
              <Link href="/privacy-policy" className="hover:text-gray-900 transition-colors underline-offset-4 hover:underline">Privacy policy</Link>
              <Link href="/terms-of-service" className="hover:text-gray-900 transition-colors underline-offset-4 hover:underline">Terms of service</Link>
            </div>
          </div>
        </div>
      </div>

      {/* Giant Background Text */}
      <div className="absolute bottom-[-3%] md:bottom-[-6%] left-0 right-0 flex justify-center pointer-events-none select-none z-0 w-full overflow-hidden">
        <span className="text-[25vw] md:text-[22vw] font-bold text-[#e5e7eb]/80 leading-none tracking-tighter whitespace-nowrap px-4">
          Sankalp
        </span>
      </div>
    </footer>
  );
}
