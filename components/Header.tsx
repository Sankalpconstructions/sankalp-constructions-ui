"use client";

import { useState, useEffect, useMemo } from "react";
import Link from "next/link";
import Image from "next/image";
import sankalpLogo from "../public/assets/Sankalplogo.png";
import {
  Menu,
  X,
  Search,
  ChevronDown,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useRouter, usePathname } from "next/navigation";
import { useProjects } from "@/context/ProjectContext";

const navLinks = [
  { name: "About", href: "/about" },
  { name: "Our Projects", href: "/projects" },
  { name: "CSR", href: "/csr" },
  { name: "Rent", href: "#" },
  { name: "Contact", href: "/contact" },
];



export default function Header() {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  const pathname = usePathname();
  const router = useRouter();

  const { projects } = useProjects();

  // Scroll Effect
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  // Hash Scroll
  useEffect(() => {
    if (
      pathname === "/" &&
      typeof window !== "undefined" &&
      window.location.hash
    ) {
      const targetId = window.location.hash.replace("#", "");

      setTimeout(() => {
        const elem = document.getElementById(targetId);

        if (elem) {
          elem.scrollIntoView({
            behavior: "smooth",
          });
        }
      }, 500);
    }
  }, [pathname]);

  // Filter Static Projects
  const ongoingProjects = useMemo(
    () => projects.filter((p) => p.status === "Ongoing"),
    [projects]
  );

  const upcomingProjects = useMemo(
    () => projects.filter((p) => p.status === "Upcoming"),
    [projects]
  );

  const completedProjects = useMemo(
    () => projects.filter((p) => p.status === "Completed"),
    [projects]
  );

  const handleScrollTo = (
    e: React.MouseEvent<HTMLAnchorElement, MouseEvent>,
    href: string
  ) => {
    if (href.includes("#")) {
      const targetId = href.split("#")[1];

      const elem = document.getElementById(targetId);

      if (elem) {
        e.preventDefault();

        elem.scrollIntoView({
          behavior: "smooth",
        });

        setIsOpen(false);

        window.history.pushState(null, "", href);
      }
    }
  };

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (searchQuery.trim()) {
      setIsSearchOpen(false);
      setIsOpen(false);

      router.push(
        `/projects?search=${encodeURIComponent(searchQuery.trim())}`
      );

      setSearchQuery("");
    }
  };

  return (
    <header
      className={`fixed top-0 w-full z-50 transition-all duration-700 ${isScrolled
        ? "bg-white py-2 shadow-2xl border-b border-black/5"
        : "bg-white py-3"
        }`}
    >
      <div className="container mx-auto px-4 lg:px-8 flex justify-between items-center relative">

        {/* Logo */}
        <Link href="/" className="z-20">
          <Image
            src={sankalpLogo}
            alt="Sankalp Logo"
            width={190}
            height={190}
            priority
            className={`w-auto object-contain transition-all duration-700 ${isScrolled
              ? "h-16 md:h-16"
              : "h-16 md:h-16"
              }`}
          />
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center gap-8 z-20">
          {navLinks.map((link) => (
            <div
              key={link.name}
              className="relative group"
            >
              <Link
                href={link.href}
                onClick={(e) =>
                  link.name !== "Our Projects" &&
                  link.name !== "Rent" &&
                  handleScrollTo(e, link.href)
                }
                className="text-black/80 hover:text-black text-[11px] uppercase font-bold tracking-[0.2em] transition-colors flex items-center gap-1"
              >
                {link.name}

                {(link.name === "Our Projects" ||
                  link.name === "Rent") && (
                    <ChevronDown
                      size={14}
                      className="group-hover:rotate-180 transition-transform"
                    />
                  )}
              </Link>

              {/* Projects Dropdown */}
              {link.name === "Our Projects" && (
                <div className="absolute top-full left-1/2 -translate-x-1/2 pt-6 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-500 z-50">
                  <div className="w-max bg-white/40 backdrop-blur-[40px] text-black shadow-2xl p-8 border border-black/10 flex gap-10">

                    {/* Ongoing */}
                    <div className="flex-1">
                      <h3 className="text-black font-bold text-xs uppercase mb-6">
                        Ongoing Projects
                      </h3>

                      <ul className="space-y-4">
                        {ongoingProjects.map((p) => (
                          <li key={p._id}>
                            <Link
                              href={`/projects/${p._id}`}
                              className="text-sm text-black/70 hover:text-black font-medium"
                            >
                              {p.title}
                            </Link>
                          </li>
                        ))}
                      </ul>
                    </div>

                    {/* Upcoming */}
                    <div className="flex-1 border-l border-black/10 pl-10">
                      <h3 className="text-black font-bold text-xs uppercase mb-6">
                        Upcoming Projects
                      </h3>

                      <ul className="space-y-4">
                        {upcomingProjects.map((p) => (
                          <li key={p._id}>
                            <Link
                              href={`/projects/${p._id}`}
                              className="text-sm text-black/70 hover:text-black font-medium"
                            >
                              {p.title}
                            </Link>
                          </li>
                        ))}
                      </ul>
                    </div>

                    {/* Completed */}
                    <div className="flex-1 border-l border-black/10 pl-10">
                      <h3 className="text-black font-bold text-xs uppercase mb-6">
                        Completed Projects
                      </h3>

                      <ul className="space-y-4">
                        {completedProjects.map((p) => (
                          <li key={p._id}>
                            <Link
                              href={`/projects/${p._id}`}
                              className="text-sm text-black/70 hover:text-black font-medium"
                            >
                              {p.title}
                            </Link>
                          </li>
                        ))}
                      </ul>
                    </div>

                  </div>
                </div>
              )}

              {/* Rent Dropdown */}
              {link.name === "Rent" && (
                <div className="absolute top-full left-1/2 -translate-x-1/2 pt-6 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-500 z-50">
                  <div className="w-max min-w-[300px] bg-white/40 backdrop-blur-[40px] text-black shadow-2xl p-8 border border-black/10 flex gap-10">

                    {/* Residential */}
                    <div className="flex-1">
                      <h3 className="text-black font-bold text-xs uppercase mb-6">
                        Residential
                      </h3>
                      <ul className="space-y-4">
                        <li>
                          <Link href="/rent/residential" className="text-sm text-black/70 hover:text-black font-medium">
                            View Residential Properties
                          </Link>
                        </li>
                      </ul>
                    </div>

                    {/* Commercial */}
                    <div className="flex-1 border-l border-black/10 pl-10">
                      <h3 className="text-black font-bold text-xs uppercase mb-6">
                        Commercial
                      </h3>
                      <ul className="space-y-4">
                        <li>
                          <Link href="/rent/commercial" className="text-sm text-black/70 hover:text-black font-medium">
                            View Commercial Properties
                          </Link>
                        </li>
                      </ul>
                    </div>

                  </div>
                </div>
              )}
            </div>
          ))}

          {/* Search */}
          <button
            onClick={() =>
              setIsSearchOpen(!isSearchOpen)
            }
            className="text-black hover:text-[#711113]"
          >
            {isSearchOpen ? (
              <X size={18} />
            ) : (
              <Search size={18} />
            )}
          </button>

          {/* CTA */}
          <Link
            href="/contact"
            className="px-5 py-2 border border-black/30 text-black font-bold hover:bg-black hover:text-white transition-all text-[10px] uppercase tracking-[0.2em]"
          >
            Enquiry Now
          </Link>
        </nav>

        {/* Mobile Buttons */}
        <div className="flex md:hidden items-center gap-3 z-20">
          <button
            onClick={() =>
              setIsSearchOpen(!isSearchOpen)
            }
            className="text-black"
          >
            {isSearchOpen ? (
              <X size={18} />
            ) : (
              <Search size={18} />
            )}
          </button>

          <button
            onClick={() => setIsOpen(!isOpen)}
            className="text-black"
          >
            {isOpen ? (
              <X size={20} />
            ) : (
              <Menu size={20} />
            )}
          </button>
        </div>

        {/* Search Bar */}
        <AnimatePresence>
          {isSearchOpen && (
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="absolute top-full left-0 right-0 mt-4 px-4 z-10"
            >
              <form
                onSubmit={handleSearchSubmit}
                className="max-w-lg mx-auto bg-white border border-black/10 rounded-full overflow-hidden flex shadow-2xl"
              >
                <input
                  type="text"
                  placeholder="Search projects..."
                  value={searchQuery}
                  onChange={(e) =>
                    setSearchQuery(e.target.value)
                  }
                  className="flex-1 bg-transparent text-black px-5 py-3 text-sm outline-none placeholder:text-gray-500"
                />

                <button
                  type="submit"
                  className="px-6 bg-[#711113] hover:bg-[#520c0d] transition-colors text-white flex items-center justify-center"
                >
                  <Search size={18} />
                </button>
              </form>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.nav
            initial={{
              opacity: 0,
              height: 0,
            }}
            animate={{
              opacity: 1,
              height: "auto",
            }}
            exit={{
              opacity: 0,
              height: 0,
            }}
            className="md:hidden bg-white/40 backdrop-blur-[40px] overflow-hidden"
          >
            <ul className="flex flex-col items-start px-4 py-4 gap-3 w-full">
              {navLinks.map((link) => (
                <li key={link.name} className="w-full flex flex-col items-start">
                  {link.name === "Our Projects" ? (
                    <div className="w-full">
                      <button
                        className="text-black uppercase text-[11px] tracking-[0.15em] hover:text-black/70 flex items-center justify-between w-full pb-2 border-b border-black/10"
                        onClick={() => {
                          const el = document.getElementById('mobile-projects');
                          if (el) el.classList.toggle('hidden');
                        }}
                      >
                        {link.name} <ChevronDown size={13} />
                      </button>
                      <div id="mobile-projects" className="hidden w-full bg-white/20 py-2 px-3 mt-1.5 text-left rounded-md">
                        <div className="mb-3 text-left">
                          <h4 className="text-black font-bold text-[9px] uppercase tracking-widest border-b border-black/10 pb-1 mb-2 inline-block">Ongoing</h4>
                          <div className="flex flex-col gap-0.5">
                            {ongoingProjects.map(p => (
                              <Link key={p._id} href={`/projects/${p._id}`} onClick={() => setIsOpen(false)} className="text-black/70 text-[11px] py-1 hover:text-black block font-medium">{p.title}</Link>
                            ))}
                          </div>
                        </div>

                        <div className="mb-3 text-left">
                          <h4 className="text-black font-bold text-[9px] uppercase tracking-widest border-b border-black/10 pb-1 mb-2 inline-block">Upcoming</h4>
                          <div className="flex flex-col gap-0.5">
                            {upcomingProjects.map(p => (
                              <Link key={p._id} href={`/projects/${p._id}`} onClick={() => setIsOpen(false)} className="text-black/70 text-[11px] py-1 hover:text-black block font-medium">{p.title}</Link>
                            ))}
                          </div>
                        </div>

                        <div className="text-left">
                          <h4 className="text-black font-bold text-[9px] uppercase tracking-widest border-b border-black/10 pb-1 mb-2 inline-block">Completed</h4>
                          <div className="flex flex-col gap-0.5">
                            {completedProjects.map(p => (
                              <Link key={p._id} href={`/projects/${p._id}`} onClick={() => setIsOpen(false)} className="text-black/70 text-[11px] py-1 hover:text-black block font-medium">{p.title}</Link>
                            ))}
                          </div>
                        </div>
                      </div>
                    </div>
                  ) : link.name === "Rent" ? (
                    <div className="w-full">
                      <button
                        className="text-black uppercase text-[11px] tracking-[0.15em] hover:text-black/70 flex items-center justify-between w-full pb-2 border-b border-black/10"
                        onClick={() => {
                          const el = document.getElementById('mobile-rent');
                          if (el) el.classList.toggle('hidden');
                        }}
                      >
                        {link.name} <ChevronDown size={13} />
                      </button>
                      <div id="mobile-rent" className="hidden w-full bg-white/20 py-2 px-3 mt-1.5 text-left rounded-md flex flex-col gap-0.5">
                        <Link href="/rent/residential" onClick={() => setIsOpen(false)} className="text-black/80 font-bold text-[11px] uppercase tracking-widest hover:text-black block py-1.5">Residential</Link>
                        <Link href="/rent/commercial" onClick={() => setIsOpen(false)} className="text-black/80 font-bold text-[11px] uppercase tracking-widest hover:text-black block py-1.5">Commercial</Link>
                      </div>
                    </div>
                  ) : (
                    <div className="w-full border-b border-black/10 pb-2 text-left">
                      <Link
                        href={link.href}
                        onClick={() => setIsOpen(false)}
                        className="text-black uppercase text-[11px] tracking-[0.15em] hover:text-black/70 block w-full"
                      >
                        {link.name}
                      </Link>
                    </div>
                  )}
                </li>
              ))}
              <li className="w-full pt-2">
                <Link
                  href="/contact"
                  onClick={() => setIsOpen(false)}
                  className="w-full block text-center font-bold bg-black text-white py-2.5  uppercase tracking-widest text-[10px] hover:bg-black/80 transition-colors"
                >
                  Enquiry Now
                </Link>
              </li>
            </ul>
          </motion.nav>
        )}
      </AnimatePresence>
    </header>
  );
}