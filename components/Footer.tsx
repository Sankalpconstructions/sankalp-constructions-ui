"use client";
import React from "react";
import { MapPin, Phone, Mail, Instagram, Linkedin, Facebook, ChevronRight } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import sankalpLogo from "../public/assets/sankalp-red.png";
import { useProjects } from "@/context/ProjectContext";

export default function Footer() {
  const { projects, loading } = useProjects();

  // Take only the top 5 projects for the footer
  const topProjects = projects.slice(0, 5);

  return (
    <footer className="bg-white pt-12 pb-6 sm:pt-16 sm:pb-8">
      <div className="container mx-auto px-4 lg:px-8">
        <div className="bg-[#050505] rounded-3xl md:rounded-tl-3xl overflow-hidden flex flex-col border border-gray-800">
          <div className="p-8 md:p-12 lg:p-16 text-gray-300">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">

              {/* Brand Info */}
              <div className="flex flex-col">
                <Link href="/" className="flex items-center gap-2 mb-6">
                  <Image
                    src={sankalpLogo}
                    alt="Sankalp Constructions Logo"
                    width={200}
                    height={200}
                    className="w-auto h-16 md:h-20 object-contain"
                    priority
                  />
                </Link>
                <p className="text-sm text-gray-400 mb-8 leading-relaxed pr-4">
                  Experience the pinnacle of luxury living. With over two decades of experience, we build homes that redefine your lifestyle.
                </p>
                <div className="flex gap-3">
                  <a href="#" className="w-9 h-9 rounded-full border border-gray-700 flex items-center justify-center text-gray-400 hover:bg-[#711113] hover:border-[#711113] hover:text-white transition-all">
                    <Facebook size={16} />
                  </a>
                  <a href="#" className="w-9 h-9 rounded-full border border-gray-700 flex items-center justify-center text-gray-400 hover:bg-[#711113] hover:border-[#711113] hover:text-white transition-all">
                    <Instagram size={16} />
                  </a>
                  <a href="#" className="w-9 h-9 rounded-full border border-gray-700 flex items-center justify-center text-gray-400 hover:bg-[#711113] hover:border-[#711113] hover:text-white transition-all">
                    <Linkedin size={16} />
                  </a>
                </div>
              </div>

              {/* Contact Details */}
              <div>
                <h4 className="text-lg font-bold text-white mb-6">Get In Touch</h4>
                <ul className="space-y-6">
                  <li className="flex items-start gap-4">
                    <div className="w-10 h-10 rounded-full border border-gray-700 flex items-center justify-center shrink-0">
                      <MapPin size={18} className="text-gray-400" />
                    </div>
                    <span className="text-sm text-gray-400 mt-2">
                     S S Arcade, Sainikpuri 1st Main Rd, SGKS United Residency, Hill Top Colony, Sainikpuri, Secunderabad, Telangana 500094
                    </span>
                  </li>
                  <li className="flex items-center gap-4">
                    <div className="w-10 h-10 rounded-full border border-gray-700 flex items-center justify-center shrink-0">
                      <Phone size={18} className="text-gray-400" />
                    </div>
                    <span className="text-sm text-gray-400">+91 73307 70111</span>
                  </li>
                  <li className="flex items-center gap-4">
                    <div className="w-10 h-10 rounded-full border border-gray-700 flex items-center justify-center shrink-0">
                      <Mail size={18} className="text-gray-400" />
                    </div>
                    <span className="text-sm text-gray-400">info@sankalpconstructions.in</span>
                  </li>
                </ul>
              </div>

              {/* Quick Links */}
              <div>
                <h4 className="text-lg font-bold text-white mb-6">Quick Links</h4>
                <ul className="space-y-4">
                  <li>
                    <Link href="/about" className="flex items-center gap-3 text-sm text-gray-400 hover:text-white transition-colors group">
                      <ChevronRight size={14} className="text-gray-600 group-hover:text-[#F5C33C] transition-colors" />
                      Brand Story
                    </Link>
                  </li>
                  <li>
                    <Link href="/projects" className="flex items-center gap-3 text-sm text-gray-400 hover:text-white transition-colors group">
                      <ChevronRight size={14} className="text-gray-600 group-hover:text-[#F5C33C] transition-colors" />
                      Our Projects
                    </Link>
                  </li>
                  <li>
                    <Link href="/csr" className="flex items-center gap-3 text-sm text-gray-400 hover:text-white transition-colors group">
                      <ChevronRight size={14} className="text-gray-600 group-hover:text-[#F5C33C] transition-colors" />
                      CSR Initiatives
                    </Link>
                  </li>
                  <li>
                    <Link href="/blog" className="flex items-center gap-3 text-sm text-gray-400 hover:text-white transition-colors group">
                      <ChevronRight size={14} className="text-gray-600 group-hover:text-[#F5C33C] transition-colors" />
                      Insights & Blogs
                    </Link>
                  </li>
                </ul>
              </div>

              {/* Dynamic Top Projects */}
              <div>
                <h4 className="text-lg font-bold text-white mb-6">Top Projects</h4>
                <ul className="space-y-4">
                  {!loading ? (
                    topProjects.map((project) => (
                      <li key={project._id}>
                        <Link href={`/projects/${project._id}`} className="flex items-center gap-3 text-sm text-gray-400 hover:text-white transition-colors group">
                          <ChevronRight size={14} className="text-gray-600 group-hover:text-[#F5C33C] transition-colors" />
                          {project.title}
                        </Link>
                      </li>
                    ))
                  ) : (
                    <li className="text-sm text-gray-500 animate-pulse">Loading projects...</li>
                  )}
                  {!loading && projects.length > 0 && (
                    <li>
                      <Link href="/projects" className="flex items-center gap-3 text-sm font-semibold text-[#F5C33C] hover:text-white transition-colors mt-2 group">
                        <ChevronRight size={14} className="text-[#F5C33C] group-hover:text-white transition-colors" />
                        View All Projects
                      </Link>
                    </li>
                  )}
                </ul>
              </div>

            </div>
          </div>

          <div className="bg-[#0a0a0a] border-t border-gray-800 py-6 px-8 md:px-12 lg:px-16 flex flex-col md:flex-row justify-between items-center text-sm font-medium text-gray-500">
            <p>&copy; {new Date().getFullYear()} Sankalp Constructions. All rights reserved.</p>
            <div className="flex gap-6 mt-4 md:mt-0">
              <a href="#" className="hover:text-white transition-colors">Terms of Service</a>
              <a href="#" className="hover:text-white transition-colors">Privacy Policy</a>
              <a href="#" className="hover:text-white transition-colors">Cookies</a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
