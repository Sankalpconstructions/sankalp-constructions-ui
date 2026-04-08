"use client";
import { useParams } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, User, Calendar, Tag, Facebook, Twitter, Linkedin } from "lucide-react";
import ContactFloating from "@/components/ContactFloating";
import ScrollController from "@/components/ScrollController";
import { motion } from "framer-motion";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

import { blogData as dummyBlogs, type BlogData } from "@/lib/data/blogs";

export default function BlogDetailsPage() {
  const params = useParams();
  const id = params?.id as string;
  const blog = dummyBlogs[id] || dummyBlogs["1"];

  return (
    <main className="min-h-screen bg-white text-gray-900">
      {/* Global Header */}
      <Header />

      {/* Banner */}
      <section className="relative w-full h-[50vh] flex flex-col justify-end pb-12 pt-24 mt-0 bg-gray-900">
        <div className="absolute inset-0">
          <motion.img
            initial={{ scale: 1.05 }}
            animate={{ scale: 1 }}
            transition={{ duration: 1 }}
            src={blog.image}
            alt={blog.title}
            className="w-full h-full object-cover opacity-50 block"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-gray-900 via-gray-900/40 to-transparent"></div>
        </div>

        <div className="container mx-auto px-4 lg:px-8 relative z-10 text-white max-w-4xl">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
            <span className="bg-[#711113] text-white px-3 py-1 font-bold text-xs uppercase tracking-widest rounded mb-6 inline-block">
              {blog.category}
            </span>
            <h1 className="text-4xl md:text-5xl font-extrabold tracking-wide mb-6 leading-tight">
              {blog.title}
            </h1>
            <div className="flex flex-wrap items-center gap-6 text-sm font-medium text-gray-300">
              <div className="flex items-center gap-2"><User size={16} className="text-[#29B1D2]" /> By Admin</div>
              <div className="flex items-center gap-2"><Calendar size={16} className="text-[#29B1D2]" /> {blog.date}</div>
              <div className="flex items-center gap-2"><Tag size={16} className="text-[#29B1D2]" /> Real Estate, {blog.category}</div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Content */}
      <section className="py-20">
        <div className="container mx-auto px-4 lg:px-8 max-w-4xl">
          <article className="prose prose-lg prose-gray max-w-none">
            <p className="lead text-xl text-gray-600 mb-8 font-light">
              This is a comprehensive overview of the {blog.title}. At Sankalp Constructions, we have carefully crafted this insight to give you the most accurate and engaging perspective on premium real estate.
            </p>
            <h3 className="text-2xl font-bold uppercase text-[#711113] mb-4 mt-8">The Vision</h3>
            <p className="mb-6 leading-relaxed">
              Real estate is not just about buildings; it is about building dreams and establishing legacies.
              The meticulous planning of {blog.title} demonstrates a high degree of architectural finesse.
              We&apos;ve prioritized both aesthetics and utility, integrating large expansive windows for natural light
              and optimizing cross-ventilation in all units.
            </p>

            <div className="bg-gray-50 border-l-4 border-[#F5C33C] p-6 my-10 italic text-gray-700 shadow-sm">
              &quot;Quality is not an act, it is a habit. This philosophy stands at the very core of our development lifecycle. And the latest addition to our portfolio is no exception.&quot;
            </div>

            <h3 className="text-2xl font-bold uppercase text-[#711113] mb-4 mt-8">Future Prospects</h3>
            <p className="mb-6 leading-relaxed">
              When evaluating a premium property, location is paramount. Connected to all major hubs, yet secluded
              enough to offer peace, this development checks all the boxes for modern professionals and families alike.
            </p>
            <p className="mb-6 leading-relaxed">
              Moreover, with over 24+ world-class amenities spanning fitness, recreation, and security—residents will never have a dull moment.
            </p>
          </article>

          <div className="border-t border-gray-200 mt-16 pt-8 flex justify-between items-center">
            <div className="text-gray-500 text-sm font-semibold uppercase tracking-widest">
              Share this insight
            </div>
            <div className="flex gap-4">
              <button className="flex items-center gap-2 text-blue-600 hover:text-white hover:bg-blue-600 px-4 py-2 border border-blue-600 rounded-full transition-colors font-bold text-xs uppercase"><Facebook size={16} /> Share</button>
              <button className="flex items-center gap-2 text-sky-500 hover:text-white hover:bg-sky-500 px-4 py-2 border border-sky-500 rounded-full transition-colors font-bold text-xs uppercase"><Twitter size={16} /> Tweet</button>
            </div>
          </div>
        </div>
      </section>

      <ContactFloating />
      <ScrollController />
      <Footer />
    </main>
  );
}
