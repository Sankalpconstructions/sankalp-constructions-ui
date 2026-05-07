"use client";

import { useState, useEffect, useMemo } from "react";
import Link from "next/link";
import Image from "next/image";
import sankalpLogo from "../public/assets/sankalp-red.png";
import {
  Menu,
  X,
  Search,
  ChevronDown,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useRouter, usePathname } from "next/navigation";

const navLinks = [
  { name: "About", href: "/about" },
  { name: "Our Projects", href: "/projects" },
  { name: "CSR", href: "/csr" },
  { name: "Rent", href: "#" },
  { name: "Contact", href: "/contact" },
];

// Static Projects Data (No API / No Context)
const projects = [
  {
    _id: "1",
    title: "Skyline Heights",
    status: "Ongoing",
  },
  {
    _id: "2",
    title: "Elite Villas",
    status: "Upcoming",
  },
  {
    _id: "3",
    title: "Green Residency",
    status: "Completed",
  },
  {
    _id: "4",
    title: "Corporate Hub",
    status: "Ongoing",
  },
];

export default function Header() {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  const pathname = usePathname();
  const router = useRouter();

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
    []
  );

  const upcomingProjects = useMemo(
    () => projects.filter((p) => p.status === "Upcoming"),
    []
  );

  const completedProjects = useMemo(
    () => projects.filter((p) => p.status === "Completed"),
    []
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
        ? "bg-[#050505] py-2 shadow-2xl border-b border-white/5"
        : "bg-gradient-to-b from-black/60 to-transparent py-6"
        }`}
    >
      <div className="container mx-auto px-4 lg:px-8 flex justify-between items-center relative">

        {/* Logo */}
        <Link href="/" className="z-20">
          <Image
            src={sankalpLogo}
            alt="Sankalp Logo"
            width={200}
            height={200}
            priority
            className={`w-auto object-contain transition-all duration-700 ${isScrolled
              ? "h-15 md:h-18"
              : "h-15 md:h-18"
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
                className="text-white/80 hover:text-white text-[11px] uppercase tracking-[0.2em] transition-colors flex items-center gap-1"
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
                  <div className="w-max bg-[#050505] text-white shadow-2xl p-8 border border-white/10 flex gap-10">

                    {/* Ongoing */}
                    <div className="flex-1">
                      <h3 className="text-[#F5C33C] text-xs uppercase mb-6">
                        Ongoing Projects
                      </h3>

                      <ul className="space-y-4">
                        {ongoingProjects.map((p) => (
                          <li key={p._id}>
                            <Link
                              href={`/projects/${p._id}`}
                              className="text-sm text-white/60 hover:text-white"
                            >
                              {p.title}
                            </Link>
                          </li>
                        ))}
                      </ul>
                    </div>

                    {/* Upcoming */}
                    <div className="flex-1 border-l border-white/10 pl-10">
                      <h3 className="text-[#F5C33C] text-xs uppercase mb-6">
                        Upcoming Projects
                      </h3>

                      <ul className="space-y-4">
                        {upcomingProjects.map((p) => (
                          <li key={p._id}>
                            <Link
                              href={`/projects/${p._id}`}
                              className="text-white/60 hover:text-white"
                            >
                              {p.title}
                            </Link>
                          </li>
                        ))}
                      </ul>
                    </div>

                    {/* Completed */}
                    <div className="flex-1 border-l border-white/10 pl-10">
                      <h3 className="text-[#F5C33C] text-xs uppercase mb-6">
                        Completed Projects
                      </h3>

                      <ul className="space-y-4">
                        {completedProjects.map((p) => (
                          <li key={p._id}>
                            <Link
                              href={`/projects/${p._id}`}
                              className="text-sm text-white/60 hover:text-white"
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
                  <div className="w-max min-w-[300px] bg-[#050505] text-white shadow-2xl p-8 border border-white/10 flex gap-10">

                    {/* Residential */}
                    <div className="flex-1">
                      <h3 className="text-[#F5C33C] text-xs uppercase mb-6">
                        Residential
                      </h3>
                      <ul className="space-y-4">
                        <li>
                          <Link href="/rent/residential" className="text-sm text-white/60 hover:text-white">
                            View Residential Properties
                          </Link>
                        </li>
                      </ul>
                    </div>

                    {/* Commercial */}
                    <div className="flex-1 border-l border-white/10 pl-10">
                      <h3 className="text-[#F5C33C] text-xs uppercase mb-6">
                        Commercial
                      </h3>
                      <ul className="space-y-4">
                        <li>
                          <Link href="/rent/commercial" className="text-sm text-white/60 hover:text-white">
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
            className="text-white hover:text-[#F5C33C]"
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
            className="px-5 py-2 border border-white/30 text-white hover:bg-white hover:text-black transition-all text-[10px] uppercase tracking-[0.2em]"
          >
            Inquire
          </Link>
        </nav>

        {/* Mobile Buttons */}
        <div className="flex md:hidden items-center gap-4 z-20">
          <button
            onClick={() =>
              setIsSearchOpen(!isSearchOpen)
            }
            className="text-white"
          >
            {isSearchOpen ? (
              <X size={24} />
            ) : (
              <Search size={24} />
            )}
          </button>

          <button
            onClick={() => setIsOpen(!isOpen)}
            className="text-white"
          >
            {isOpen ? (
              <X size={28} />
            ) : (
              <Menu size={28} />
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
                className="max-w-lg mx-auto bg-black/90 border border-white/20 rounded-full overflow-hidden flex shadow-2xl backdrop-blur-sm"
              >
                <input
                  type="text"
                  placeholder="Search projects..."
                  value={searchQuery}
                  onChange={(e) =>
                    setSearchQuery(e.target.value)
                  }
                  className="flex-1 bg-transparent text-white px-5 py-3 text-sm outline-none placeholder:text-gray-400"
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
            className="md:hidden bg-white overflow-hidden"
          >
            <ul className="flex flex-col items-start px-8 py-8 gap-6 w-full">
              {navLinks.map((link) => (
                <li key={link.name} className="w-full flex flex-col items-start">
                  {link.name === "Our Projects" ? (
                    <div className="w-full">
                      <button
                        className="text-black uppercase text-lg hover:text-[#711113] flex items-center justify-between w-full pb-2 border-b border-gray-100"
                        onClick={() => {
                          const el = document.getElementById('mobile-projects');
                          if (el) el.classList.toggle('hidden');
                        }}
                      >
                        {link.name} <ChevronDown size={18} />
                      </button>
                      <div id="mobile-projects" className="hidden w-full bg-gray-50 py-4 px-4 mt-2 text-left rounded-md">
                        <div className="mb-4 text-left">
                          <h4 className="text-[#711113] font-bold text-sm uppercase tracking-widest border-b border-gray-200 pb-1 mb-3 inline-block">Ongoing</h4>
                          <div className="flex flex-col gap-1">
                            {ongoingProjects.map(p => (
                              <Link key={p._id} href={`/projects/${p._id}`} onClick={() => setIsOpen(false)} className="text-gray-700 text-base py-1.5 hover:text-black block">{p.title}</Link>
                            ))}
                          </div>
                        </div>

                        <div className="mb-4 text-left">
                          <h4 className="text-[#711113] font-bold text-sm uppercase tracking-widest border-b border-gray-200 pb-1 mb-3 inline-block">Upcoming</h4>
                          <div className="flex flex-col gap-1">
                            {upcomingProjects.map(p => (
                              <Link key={p._id} href={`/projects/${p._id}`} onClick={() => setIsOpen(false)} className="text-gray-700 text-base py-1.5 hover:text-black block">{p.title}</Link>
                            ))}
                          </div>
                        </div>

                        <div className="text-left">
                          <h4 className="text-[#711113] font-bold text-sm uppercase tracking-widest border-b border-gray-200 pb-1 mb-3 inline-block">Completed</h4>
                          <div className="flex flex-col gap-1">
                            {completedProjects.map(p => (
                              <Link key={p._id} href={`/projects/${p._id}`} onClick={() => setIsOpen(false)} className="text-gray-700 text-base py-1.5 hover:text-black block">{p.title}</Link>
                            ))}
                          </div>
                        </div>
                      </div>
                    </div>
                  ) : link.name === "Rent" ? (
                    <div className="w-full">
                      <button
                        className="text-black uppercase text-lg hover:text-[#711113] flex items-center justify-between w-full pb-2 border-b border-gray-100"
                        onClick={() => {
                          const el = document.getElementById('mobile-rent');
                          if (el) el.classList.toggle('hidden');
                        }}
                      >
                        {link.name} <ChevronDown size={18} />
                      </button>
                      <div id="mobile-rent" className="hidden w-full bg-gray-50 py-4 px-4 mt-2 text-left rounded-md flex flex-col gap-1">
                        <Link href="/rent/residential" onClick={() => setIsOpen(false)} className="text-[#711113] font-bold text-base uppercase tracking-widest hover:text-black block py-2">Residential</Link>
                        <Link href="/rent/commercial" onClick={() => setIsOpen(false)} className="text-[#711113] font-bold text-base uppercase tracking-widest hover:text-black block py-2">Commercial</Link>
                      </div>
                    </div>
                  ) : (
                    <div className="w-full border-b border-gray-100 pb-2 text-left">
                      <Link
                        href={link.href}
                        onClick={() => setIsOpen(false)}
                        className="text-black uppercase text-lg hover:text-[#711113] block w-full"
                      >
                        {link.name}
                      </Link>
                    </div>
                  )}
                </li>
              ))}
              <li className="w-full pt-4">
                <Link
                  href="/contact"
                  onClick={() => setIsOpen(false)}
                  className="w-full block text-center bg-black text-white py-3 font-semibold uppercase tracking-widest text-sm hover:bg-[#711113] transition-colors"
                >
                  Inquire Now
                </Link>
              </li>
            </ul>
          </motion.nav>
        )}
      </AnimatePresence>
    </header>
  );
}