"use client";
import { useState, useEffect } from "react";
import { Search, ChevronRight, Menu, X, ArrowLeft } from "lucide-react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import Footer from "@/components/Footer";
import ContactFloating from "@/components/ContactFloating";
import ScrollController from "@/components/ScrollController";

const dummyBlogs = [
  { id: 6, title: "Future of Real Estate in Pune", category: "Insights", image: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=800", date: "May 20, 2025" },
  { id: 7, title: "Top 5 Luxury Home Features", category: "Market Trends", image: "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=800", date: "Apr 15, 2025" },
  { id: 8, title: "Step by Step Guide to Buying Property", category: "Guides", image: "https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=800", date: "Mar 10, 2025" },
];

const categories = ["All", "Insights", "Market Trends", "Guides"];

export default function BlogPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [activeCategory, setActiveCategory] = useState("All");
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const params = new URLSearchParams(window.location.search);
      const query = params.get("search");
      if (query) setSearchTerm(query);
    }
  }, []);

  const filteredBlogs = dummyBlogs.filter((blog) => {
    const matchesSearch = blog.title.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = activeCategory === "All" || blog.category === activeCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <main className="min-h-screen bg-gray-50 pt-24 text-gray-900 override">
      {/* Blog Dedicated Header */}
      <header className="fixed top-0 w-full z-50 glass py-3">
        <div className="container mx-auto px-4 lg:px-8 flex justify-between items-center">
          <Link href="/" className="flex items-center gap-2 group">
            <div className="w-10 h-10 bg-[#711113] text-white flex items-center justify-center font-bold text-xl rounded shadow-lg group-hover:bg-[#29B1D2] transition-colors">
              <ArrowLeft size={20} />
            </div>
            <div>
              <h1 className="text-[#711113] font-bold text-xl uppercase tracking-wider leading-none">
                Sankalp
              </h1>
              <span className="text-[#29B1D2] text-xs font-semibold tracking-widest uppercase mt-1 inline-block">
                Blog & Insights
              </span>
            </div>
          </Link>

          <nav className="hidden md:flex gap-8 items-center">
            <Link href="/projects" className="text-gray-800 font-medium hover:text-[#711113] transition text-sm uppercase tracking-wide">
              All Projects
            </Link>
            <Link href="/" className="text-gray-800 font-medium hover:text-[#711113] transition text-sm uppercase tracking-wide border px-4 py-2 border-[#711113] rounded">
              Main Site
            </Link>
          </nav>

          <button className="md:hidden text-[#711113]" onClick={() => setIsMenuOpen(!isMenuOpen)}>
            {isMenuOpen ? <X size={28} /> : <Menu size={28} />}
          </button>
        </div>
      </header>

      <div className="container mx-auto px-4 lg:px-8 py-12">
        <div className="text-center mb-16">
          <h2 className="text-5xl font-extrabold text-[#711113] uppercase tracking-wide mb-6">
            Blog & Insights
          </h2>
          <div className="relative max-w-xl mx-auto flex items-center mb-8">
            <Search className="absolute left-4 text-gray-400" size={20} />
            <input
              type="text"
              placeholder="Search articles..."
              className="w-full pl-12 pr-4 py-4 rounded-full border border-gray-200 shadow-sm focus:outline-none focus:border-[#29B1D2] focus:ring-1 focus:ring-[#29B1D2] transition-colors text-lg"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>

          <div className="flex flex-wrap justify-center gap-3">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`px-5 py-2 rounded-full font-bold uppercase tracking-wider text-xs transition-all duration-300 ${
                  activeCategory === cat
                    ? "bg-[#29B1D2] text-white shadow-lg"
                    : "bg-white text-gray-500 border border-gray-200 hover:text-[#711113] hover:border-[#711113]"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Blog Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-20">
          <AnimatePresence mode="popLayout">
            {filteredBlogs.length > 0 ? (
              filteredBlogs.map((blog) => (
                <motion.div
                  key={blog.id}
                  layout
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  transition={{ duration: 0.3 }}
                  className="bg-white rounded-xl shadow-lg hover:shadow-2xl transition-all border border-gray-100 overflow-hidden group flex flex-col"
                >
                  <div className="h-64 overflow-hidden relative">
                    <img 
                      src={blog.image} 
                      alt={blog.title} 
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700 ease-in-out" 
                    />
                    <div className="absolute top-4 left-4 bg-[#711113] text-white text-[10px] font-bold uppercase tracking-widest px-3 py-1 rounded">
                      {blog.category}
                    </div>
                  </div>
                  <div className="p-6 flex-1 flex flex-col justify-between">
                    <div>
                      <p className="text-gray-400 text-xs font-semibold mb-3">{blog.date}</p>
                      <h3 className="text-xl font-bold uppercase text-gray-900 group-hover:text-[#29B1D2] transition-colors mb-4 line-clamp-2">
                        {blog.title}
                      </h3>
                    </div>
                    <Link href={`/blog/${blog.id}`} className="flex items-center text-[#711113] font-bold uppercase tracking-widest text-sm hover:text-[#520c0d] transition-colors mt-4 bg-gray-50 w-full justify-center py-3 rounded">
                      Read Details <ChevronRight size={18} className="ml-1" />
                    </Link>
                  </div>
                </motion.div>
              ))
            ) : (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="col-span-full py-20 text-center text-gray-500 text-lg uppercase font-bold tracking-widest"
              >
                No projects or insights found.
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>

      <ContactFloating />
      <ScrollController />
      <Footer />
    </main>
  );
}
