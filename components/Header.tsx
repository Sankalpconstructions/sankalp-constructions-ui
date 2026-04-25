"use client";
import { useState, useEffect, useMemo } from "react";
import Link from "next/link";
import Image from "next/image";
import sankalpLogo from "../public/assets/sankalp-red.png";
import { Menu, X, Search, ChevronDown, Loader2 } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useRouter, usePathname } from "next/navigation";
import { useProjects } from "@/context/ProjectContext";

const navLinks = [
  { name: "About", href: "/#story" },
  { name: "Our Projects", href: "/#projects" },
  { name: "CSR", href: "/csr" },
  { name: "Blog", href: "/blog" },
  { name: "Contact", href: "/#contact" },
];

export default function Header() {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const { projects, loading: loadingProjects } = useProjects();
  const pathname = usePathname();
  const router = useRouter();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Handle cross-page hash scrolling
  useEffect(() => {
    if (pathname === "/" && typeof window !== "undefined" && window.location.hash) {
      const targetId = window.location.hash.replace("#", "");
      // Small timeout to ensure the DOM and components (like Testimonials) are rendered
      const timer = setTimeout(() => {
        const elem = document.getElementById(targetId);
        if (elem) {
          elem.scrollIntoView({ behavior: "smooth" });
        }
      }, 800); 
      return () => clearTimeout(timer);
    }
  }, [pathname]);

  const ongoingProjects = useMemo(() => projects.filter(p => p.status === 'Ongoing'), [projects]);
  const upcomingProjects = useMemo(() => projects.filter(p => p.status === 'Upcoming'), [projects]);
  const completedProjects = useMemo(() => projects.filter(p => p.status === 'Completed'), [projects]);

  const handleScrollTo = (e: React.MouseEvent<HTMLAnchorElement, MouseEvent>, href: string) => {
    // If it's a hash link, check if the target exists on the CURRENT page
    if (href.includes("#")) {
      const targetId = href.split("#")[1];
      const elem = document.getElementById(targetId);
      
      // If the element exists on this page, scroll to it immediately
      if (elem) {
        e.preventDefault();
        elem.scrollIntoView({ behavior: "smooth" });
        setIsOpen(false);
        // Update URL hash without reload
        window.history.pushState(null, "", href);
      }
    }
  };

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      setIsSearchOpen(false);
      setIsOpen(false);
      router.push(`/projects?search=${encodeURIComponent(searchQuery.trim())}`);
      setSearchQuery("");
    }
  };

  return (
    <header
      className={`fixed top-0 w-full z-50 transition-all duration-700 ${isScrolled ? "bg-[#050505] py-2 lg:py-3 shadow-2xl border-b border-white/5" : "bg-gradient-to-b from-black/60 to-transparent py-6 lg:py-8 border-transparent"}`}
    >
      <div className="container mx-auto px-4 lg:px-8 flex justify-between items-center relative">
        <Link href="/" className="flex items-center gap-2 group z-20">
          <Image
            src={sankalpLogo}
            alt="Sankalp Constructions Logo"
            width={350}
            height={350}
            className={`w-auto object-contain transition-all duration-700 ${isScrolled ? "h-16 md:h-18 lg:h-20" : "h-20 md:h-21 lg:h-25"}`}
            priority
          />
        </Link>

        <nav className="hidden md:flex gap-8 items-center z-20">
          {navLinks.map((link) => (
            <div key={link.name} className="relative group">
              <Link
                href={link.href}
                onClick={(e) => link.name !== "Our Projects" && handleScrollTo(e, link.href)}
                className="relative text-white/80 hover:text-white text-[11px] uppercase tracking-[0.2em] font-medium transition-colors flex items-center gap-1.5 py-2 group-hover:after:scale-x-100 after:content-[''] after:absolute after:w-full after:scale-x-0 after:h-[1px] after:bottom-0 after:left-0 after:bg-white after:origin-bottom-right after:transition-transform after:duration-500 hover:after:origin-bottom-left"
              >
                {link.name}
                {link.name === "Our Projects" && <ChevronDown size={14} className="transition-transform duration-300 group-hover:rotate-180" />}
              </Link>

              {link.name === "Our Projects" && (
                <div className="fixed top-[110px] left-0 w-full opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-500 pointer-events-none z-50 flex justify-center">
                  <div className="w-full max-w-[95vw] lg:max-w-[950px] bg-[#050505] text-white shadow-2xl rounded-sm p-10 border border-t-0 border-white/10 flex flex-col md:flex-row justify-between gap-12 cursor-default pointer-events-auto">
                    
                    <div className="flex-1">
                      <h3 className="text-[#F5C33C] text-[10px] uppercase tracking-[0.3em] mb-6 border-b border-white/10 pb-3 whitespace-nowrap flex items-center gap-2">
                        Ongoing Projects {loadingProjects && <Loader2 size={12} className="animate-spin opacity-50" />}
                      </h3>
                      <ul className="space-y-4">
                        {ongoingProjects.map(p => (
                          <li key={p._id}><Link href={`/projects/${p._id}`} className="text-[13px] text-white/60 hover:text-white transition-colors">{p.title}</Link></li>
                        ))}
                        {ongoingProjects.length === 0 && !loadingProjects && <li className="text-[11px] text-white/30 italic uppercase tracking-widest">No ongoing projects</li>}
                      </ul>
                    </div>

                    <div className="flex-1 border-l border-white/5 pl-8 lg:pl-12">
                      <h3 className="text-[#F5C33C] text-[10px] uppercase tracking-[0.3em] mb-6 border-b border-white/10 pb-3 whitespace-nowrap flex items-center gap-2">
                        Upcoming Projects {loadingProjects && <Loader2 size={12} className="animate-spin opacity-50" />}
                      </h3>
                      <ul className="space-y-4">
                        {upcomingProjects.map(p => (
                          <li key={p._id}><Link href={`/projects/${p._id}`} className="text-[13px] text-white/60 hover:text-white transition-colors">{p.title}</Link></li>
                        ))}
                        {upcomingProjects.length === 0 && !loadingProjects && <li className="text-[11px] text-white/30 italic uppercase tracking-widest">No upcoming projects</li>}
                      </ul>
                    </div>

                    <div className="flex-1 border-l border-white/5 pl-8 lg:pl-12">
                      <h3 className="text-[#F5C33C] text-[10px] uppercase tracking-[0.3em] mb-6 border-b border-white/10 pb-3 whitespace-nowrap flex items-center gap-2">
                        Completed Projects {loadingProjects && <Loader2 size={12} className="animate-spin opacity-50" />}
                      </h3>
                      <ul className="space-y-4">
                        {completedProjects.map(p => (
                          <li key={p._id}><Link href={`/projects/${p._id}`} className="text-[13px] text-white/60 hover:text-white transition-colors">{p.title}</Link></li>
                        ))}
                        {completedProjects.length === 0 && !loadingProjects && <li className="text-[11px] text-white/30 italic uppercase tracking-widest">No completed projects</li>}
                      </ul>
                    </div>
                  </div>
                </div>
              )}
            </div>
          ))}
          <button
            onClick={() => setIsSearchOpen(!isSearchOpen)}
            className="transition-transform duration-500 hover:scale-110 text-white hover:text-white/70 ml-4"
          >
            {isSearchOpen ? <X size={18} /> : <Search size={18} />}
          </button>
          <div className="w-[1px] h-4 bg-[#f5c33c] mx-4"></div>
          <Link
            href="/#contact"
            onClick={(e) => handleScrollTo(e as any, "/#contact")}
            className="px-5 py-2 bg-transparent border border-white/30 hover:bg-white hover:text-black hover:border-white text-white font-medium text-[10px] uppercase tracking-[0.2em] rounded-sm transition-all duration-500 flex items-center justify-center cursor-pointer"
          >
            Inquire
          </Link>
        </nav>

        <div className="flex md:hidden items-center gap-4 z-20">
          <button
            onClick={() => setIsSearchOpen(!isSearchOpen)}
            className="transition-colors text-white hover:text-[#F5C33C]"
          >
            {isSearchOpen ? <X size={24} /> : <Search size={24} />}
          </button>
          <button
            className="transition-colors text-white hover:text-[#F5C33C]"
            onClick={() => setIsOpen(!isOpen)}
          >
            {isOpen ? <X size={28} /> : <Menu size={28} />}
          </button>
        </div>

        <AnimatePresence>
          {isSearchOpen && (
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="absolute top-full left-0 right-0 mt-4 px-4 lg:px-8 z-10"
            >
              <form onSubmit={handleSearchSubmit} className="relative max-w-2xl mx-auto shadow-2xl rounded-full overflow-hidden border border-white/20 glass-dark">
                <input
                  type="text"
                  placeholder="Search projects..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  autoFocus
                  className="w-full bg-transparent text-white px-6 py-4 outline-none placeholder:text-gray-300 pr-16"
                />
                <button type="submit" className="absolute right-0 top-0 bottom-0 px-6 bg-[#711113] hover:bg-[#29B1D2] text-white transition-colors flex items-center justify-center">
                  <Search size={20} />
                </button>
              </form>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      <AnimatePresence>
        {isOpen && (
          <motion.nav
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden glass overflow-hidden"
          >
            <ul className="flex flex-col items-center py-6 gap-4">
              {navLinks.map((link) => (
                <li key={link.name} className="w-full text-center flex flex-col items-center">
                  {link.name === "Our Projects" ? (
                    <div className="w-full">
                      <button
                        className="text-gray-800 font-medium text-lg uppercase tracking-wide flex items-center justify-center gap-2 w-full pb-2 hover:text-[#711113]"
                        onClick={() => {
                          const el = document.getElementById('mobile-projects');
                          if (el) el.classList.toggle('hidden');
                        }}
                      >
                        {link.name} <ChevronDown size={18} />
                      </button>
                      <div id="mobile-projects" className="hidden w-full bg-gray-50/80 py-4 px-6 mt-2 rounded-lg text-left">
                        
                        <div className="mb-4 text-center">
                          <h4 className="text-[#711113] font-bold text-xs uppercase tracking-widest border-b border-gray-200 pb-1 mb-2 inline-block">Ongoing</h4>
                          <div className="flex flex-col gap-2">
                            {ongoingProjects.map(p => (
                              <Link key={p._id} href={`/projects/${p._id}`} onClick={() => setIsOpen(false)} className="text-gray-600 text-sm">{p.title}</Link>
                            ))}
                          </div>
                        </div>

                        <div className="mb-4 text-center">
                          <h4 className="text-[#711113] font-bold text-xs uppercase tracking-widest border-b border-gray-200 pb-1 mb-2 inline-block">Upcoming</h4>
                          <div className="flex flex-col gap-2">
                            {upcomingProjects.map(p => (
                              <Link key={p._id} href={`/projects/${p._id}`} onClick={() => setIsOpen(false)} className="text-gray-600 text-sm">{p.title}</Link>
                            ))}
                          </div>
                        </div>

                        <div className="text-center">
                          <h4 className="text-[#711113] font-bold text-xs uppercase tracking-widest border-b border-gray-200 pb-1 mb-2 inline-block">Completed</h4>
                          <div className="flex flex-col gap-2">
                            {completedProjects.map(p => (
                              <Link key={p._id} href={`/projects/${p._id}`} onClick={() => setIsOpen(false)} className="text-gray-600 text-sm">{p.title}</Link>
                            ))}
                          </div>
                        </div>
                      </div>
                    </div>
                  ) : (
                    <Link
                      href={link.href}
                      onClick={(e) => handleScrollTo(e, link.href)}
                      className="text-gray-800 font-medium text-lg uppercase tracking-wide hover:text-[#711113]"
                    >
                      {link.name}
                    </Link>
                  )}
                </li>
              ))}
            </ul>
          </motion.nav>
        )}
      </AnimatePresence>
    </header>
  );
}
