"use client";
import { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, User, Calendar, Tag, Facebook, Twitter, Loader2, Share2, Copy, Check, MessageCircle } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3001";

export default function BlogDetailsPage() {
  const params = useParams();
  const id = params?.id as string;
  const [blog, setBlog] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    if (!id) return;
    const fetchBlog = async () => {
      try {
        setLoading(true);
        const res = await fetch(`${API_BASE_URL}/api/blogs/${id}`);
        if (res.ok) {
          const data = await res.json();
          setBlog(data);
        }
      } catch (error) {
        console.error("Error fetching blog detail:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchBlog();
  }, [id]);

  const shareOnFacebook = () => {
    const url = window.location.href;
    window.open(`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`, '_blank');
  };

  const shareOnTwitter = () => {
    const url = window.location.href;
    const text = `Check out this insight from Sankalp Constructions: ${blog.title}`;
    window.open(`https://twitter.com/intent/tweet?url=${encodeURIComponent(url)}&text=${encodeURIComponent(text)}`, '_blank');
  };

  const shareOnWhatsApp = () => {
    const url = window.location.href;
    const text = `Check out this insight from Sankalp Constructions: ${blog.title} - ${url}`;
    window.open(`https://api.whatsapp.com/send?text=${encodeURIComponent(text)}`, '_blank');
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(window.location.href);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  if (loading) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-white">
        <Loader2 className="animate-spin text-[#711113] mb-4" size={48} />
        <p className="text-gray-400 font-bold uppercase tracking-widest text-xs">Loading article details...</p>
      </div>
    );
  }

  if (!blog) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-white">
        <h2 className="text-2xl font-bold text-gray-900 uppercase mb-4">Article Not Found</h2>
        <Link href="/blog" className="text-[#711113] font-bold uppercase tracking-widest text-sm flex items-center gap-2">
          <ArrowLeft size={16} /> Back to Blog
        </Link>
      </div>
    );
  }

  return (
    <div className="bg-white text-gray-900">

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
            <h1 className="text-4xl md:text-5xl font-extrabold tracking-wide mb-6 leading-tight uppercase">
              {blog.title}
            </h1>
            <div className="flex flex-wrap items-center gap-6 text-sm font-medium text-gray-300">
              <div className="flex items-center gap-2"><User size={16} className="text-[#29B1D2]" /> By {blog.author || 'Admin'}</div>
              <div className="flex items-center gap-2"><Calendar size={16} className="text-[#29B1D2]" /> {blog.date}</div>
              <div className="flex items-center gap-2"><Tag size={16} className="text-[#29B1D2]" /> Real Estate, {blog.category}</div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Content */}
      <section className="py-12 md:py-20">
        <div className="container mx-auto px-4 lg:px-8 max-w-4xl">
          <article className="prose prose-lg prose-gray max-w-none">
            <p className="lead text-xl text-gray-600 mb-8 font-light italic border-l-4 border-[#29B1D2] pl-6">
              {blog.summary}
            </p>
            
            <div className="text-gray-800 leading-relaxed whitespace-pre-wrap blog-content">
              {blog.content}
            </div>
          </article>

          <div className="border-t border-gray-200 mt-16 pt-8 flex flex-col md:flex-row gap-6 justify-between items-center">
            <div className="text-gray-500 text-[10px] font-bold uppercase tracking-[0.2em]">
              Share this insight
            </div>
            <div className="flex flex-wrap gap-3">
              <button 
                onClick={shareOnFacebook}
                className="flex items-center gap-2 text-blue-600 hover:text-white hover:bg-blue-600 px-5 py-2.5 border border-blue-600 rounded-full transition-all font-bold text-[10px] uppercase tracking-widest"
              >
                <Facebook size={14} /> Facebook
              </button>
              <button 
                onClick={shareOnTwitter}
                className="flex items-center gap-2 text-sky-500 hover:text-white hover:bg-sky-500 px-5 py-2.5 border border-sky-500 rounded-full transition-all font-bold text-[10px] uppercase tracking-widest"
              >
                <Twitter size={14} /> Twitter
              </button>
              <button 
                onClick={shareOnWhatsApp}
                className="flex items-center gap-2 text-green-600 hover:text-white hover:bg-green-600 px-5 py-2.5 border border-green-600 rounded-full transition-all font-bold text-[10px] uppercase tracking-widest"
              >
                <MessageCircle size={14} /> WhatsApp
              </button>
              <button 
                onClick={copyToClipboard}
                className={`flex items-center gap-2 px-5 py-2.5 rounded-full transition-all font-bold text-[10px] uppercase tracking-widest border ${
                  copied ? 'bg-green-500 border-green-500 text-white' : 'text-gray-600 border-gray-300 hover:bg-gray-100'
                }`}
              >
                {copied ? <Check size={14} /> : <Copy size={14} />} {copied ? 'Copied!' : 'Copy Link'}
              </button>
            </div>
          </div>
        </div>
      </section>

      <style jsx global>{`
        .blog-content {
          font-size: 1.125rem;
          line-height: 1.8;
        }
        .blog-content h3 {
          color: #711113;
          font-weight: 800;
          text-transform: uppercase;
          margin-top: 2rem;
          margin-bottom: 1rem;
        }
      `}</style>
    </div>
  );
}
