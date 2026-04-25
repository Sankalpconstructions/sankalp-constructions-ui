"use client";
import { useState, useEffect, useMemo, useRef } from "react";
import { Search, ChevronRight, Loader2, ChevronLeft } from "lucide-react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import ContactFloating from "@/components/ContactFloating";
import ScrollController from "@/components/ScrollController";

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3001";

export default function BlogPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [activeCategory, setActiveCategory] = useState("All");
  const [blogs, setBlogs] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        setLoading(true);
        const res = await fetch(`${API_BASE_URL}/api/blogs`);
        if (res.ok) {
          const data = await res.json();
          setBlogs(data);
        }
      } catch (error) {
        console.error("Error fetching blogs:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchBlogs();
  }, []);

  const dynamicCategories = useMemo(() => {
    const cats = blogs.map(blog => blog.category);
    return ["All", ...Array.from(new Set(cats))];
  }, [blogs]);

  const filteredBlogs = blogs.filter((blog) => {
    const matchesSearch = blog.title.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = activeCategory === "All" || blog.category === activeCategory;
    return matchesSearch && matchesCategory;
  });

  const scroll = (direction: 'left' | 'right') => {
    if (scrollRef.current) {
      const { scrollLeft, clientWidth } = scrollRef.current;
      const scrollTo = direction === 'left' ? scrollLeft - 200 : scrollLeft + 200;
      scrollRef.current.scrollTo({ left: scrollTo, behavior: 'smooth' });
    }
  };

  return (
    <main className="min-h-screen bg-gray-50 text-gray-900 override">
      <Header />

      <div 
        className="relative w-full bg-[#050505] flex items-end mb-12"
        style={{ minHeight: "280px", paddingTop: "120px" }}
      >
        <div
          className="absolute inset-0 opacity-10"
          style={{
            backgroundImage: `url("https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=1600")`,
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#050505] via-[#050505]/80 to-[#050505]/40" />

        <div className="relative z-10 container mx-auto px-4 lg:px-8 pb-14 text-center">
           <span className="text-[#F5C33C] text-[10px] uppercase tracking-[0.4em] font-semibold mb-4 block drop-shadow-md">
             Sankalp Constructions
           </span>
           <h1 className="text-4xl md:text-6xl font-extrabold text-white uppercase tracking-wide leading-tight mb-4 drop-shadow-lg">
             Blog & Insights
           </h1>
           <p className="text-white/50 text-sm md:text-base max-w-xl mx-auto leading-relaxed">
             Read our latest articles, market trends, guides, and insights on the real estate industry, premium homes, and urban living.
           </p>
        </div>
      </div>

      <div className="container mx-auto px-4 lg:px-8 py-4">
        <div className="text-center mb-16">
          <div className="relative max-w-xl mx-auto flex items-center mb-12">
            <Search className="absolute left-4 text-gray-400" size={20} />
            <input
              type="text"
              placeholder="Search articles..."
              className="w-full pl-12 pr-4 py-4 rounded-full border border-gray-200 shadow-sm focus:outline-none focus:border-[#29B1D2] focus:ring-1 focus:ring-[#29B1D2] transition-colors text-lg"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>

          {/* Dynamic Scrollable Categories */}
          <div className="relative max-w-4xl mx-auto group">
            {/* Left Shadow/Fade */}
            <div className="absolute left-0 top-0 bottom-0 w-20 bg-gradient-to-r from-gray-50 to-transparent z-10 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity"></div>
            
            {/* Right Shadow/Fade */}
            <div className="absolute right-0 top-0 bottom-0 w-20 bg-gradient-to-l from-gray-50 to-transparent z-10 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity"></div>

            {/* Scroll Buttons (Visible on Hover) */}
            <button 
              onClick={() => scroll('left')}
              className="absolute -left-12 top-1/2 -translate-y-1/2 p-2 bg-white rounded-full shadow-md hover:text-[#711113] transition-all z-20 hidden lg:block"
            >
              <ChevronLeft size={20} />
            </button>
            <button 
              onClick={() => scroll('right')}
              className="absolute -right-12 top-1/2 -translate-y-1/2 p-2 bg-white rounded-full shadow-md hover:text-[#711113] transition-all z-20 hidden lg:block"
            >
              <ChevronRight size={20} />
            </button>

            <div 
              ref={scrollRef}
              className="flex gap-3 overflow-x-auto no-scrollbar scroll-smooth pb-4 px-4"
            >
              {dynamicCategories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setActiveCategory(cat)}
                  className={`px-6 py-2.5 rounded-full font-bold uppercase tracking-wider text-[10px] transition-all duration-300 whitespace-nowrap shrink-0 ${
                    activeCategory === cat
                      ? "bg-[#29B1D2] text-white shadow-lg scale-105"
                      : "bg-white text-gray-500 border border-gray-200 hover:text-[#711113] hover:border-[#711113]"
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>
        </div>

        {loading ? (
          <div className="flex flex-col items-center justify-center py-20">
            <Loader2 className="animate-spin text-[#711113] mb-4" size={40} />
            <p className="text-gray-400 font-bold uppercase tracking-widest text-xs">Fetching latest insights...</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-20">
            <AnimatePresence mode="popLayout">
              {filteredBlogs.length > 0 ? (
                filteredBlogs.map((blog) => (
                  <motion.div
                    key={blog._id || blog.id}
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
                        <div className="flex justify-between items-center mb-3">
                          <p className="text-gray-400 text-[10px] font-semibold">{blog.date}</p>
                          <p className="text-gray-400 text-[10px] font-semibold uppercase tracking-widest">{blog.readingTime || '5 min read'}</p>
                        </div>
                        <h3 className="text-xl font-bold uppercase text-gray-900 group-hover:text-[#29B1D2] transition-colors mb-4 line-clamp-2">
                          {blog.title}
                        </h3>
                        <p className="text-gray-500 text-xs line-clamp-3 mb-4 leading-relaxed">
                          {blog.summary}
                        </p>
                      </div>
                      <Link href={`/blog/${blog._id || blog.id}`} className="flex items-center text-[#711113] font-bold uppercase tracking-widest text-sm hover:text-[#520c0d] transition-colors mt-4 bg-gray-50 w-full justify-center py-3 rounded">
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
                  No blog posts or insights found.
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        )}
      </div>

      <ContactFloating />
      <ScrollController />
      <Footer />

      <style jsx global>{`
        .no-scrollbar::-webkit-scrollbar {
          display: none;
        }
        .no-scrollbar {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
      `}</style>
    </main>
  );
}
