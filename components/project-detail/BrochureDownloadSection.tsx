"use client";
import { useState } from "react";
import {
  Download, Phone, Mail, ArrowDownToLine, CheckCircle2,
  Building2, Calendar, Layers3, Home, BadgeCheck, FileText,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

interface ProjectOverviewProps {
  projectTitle: string;
  description: string;
  highlights: string[];
  status: string;
  possessionDate: string;
  totalFloors: string;
  totalUnits: string;
  rera: string;
  type: string;
  location: string;
}

const OVERVIEW_ICONS: Record<string, React.ReactNode> = {
  Status: <BadgeCheck size={16} className="text-[#711113]" />,
  Possession: <Calendar size={16} className="text-[#711113]" />,
  "Total Floors": <Layers3 size={16} className="text-[#711113]" />,
  "Total Units": <Home size={16} className="text-[#711113]" />,
  "RERA ID": <FileText size={16} className="text-[#711113]" />,
  Type: <Building2 size={16} className="text-[#711113]" />,
};

export default function BrochureDownloadSection({
  projectTitle,
  description,
  highlights,
  status,
  possessionDate,
  totalFloors,
  totalUnits,
  rera,
  type,
  location,
}: ProjectOverviewProps) {
  const [submitted, setSubmitted] = useState(false);
  const [form, setForm] = useState({ name: "", phone: "", email: "" });
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setSubmitted(true);
    }, 1200);
  };

  const overviewItems = [
    { label: "Status", value: status, badge: true },
    { label: "Type", value: type },
    { label: "Possession", value: possessionDate },
    { label: "Total Floors", value: totalFloors },
    { label: "Total Units", value: totalUnits },
    { label: "RERA ID", value: rera, mono: true },
  ];

  return (
    <section className="py-20 md:py-28 bg-[#0c0c0e] relative overflow-hidden">
      {/* Decorative bg text */}
      <div className="absolute top-0 right-0 text-[180px] font-extrabold text-white/[0.02] leading-none select-none pointer-events-none uppercase tracking-tighter">
        BROCHURE
      </div>

      <div className="container mx-auto px-4 lg:px-8 relative z-10">
        {/* Section label */}
        <div className="flex items-center gap-4 mb-14">
          <div className="w-1 h-8 bg-[#711113] rounded-full" />
          <div>
            <span className="text-[#F5C33C] text-[10px] uppercase tracking-[0.4em] font-semibold block mb-1">
              Free Download
            </span>
            <h2 className="text-3xl md:text-4xl font-extrabold text-white">
              Project Brochure & Overview
            </h2>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 xl:gap-20 items-start">
          {/* ── Left: Project Overview ── */}
          <div>
            {/* Description */}
            <p className="text-white/60 text-base md:text-lg leading-relaxed mb-10 border-l-2 border-[#711113] pl-5">
              {description}
            </p>

            {/* Overview stats grid */}
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 mb-10">
              {overviewItems.map(({ label, value, badge, mono }) => (
                <div
                  key={label}
                  className="bg-white/5 border border-white/10 rounded-xl p-4 flex flex-col gap-2 hover:border-[#711113]/40 transition-colors"
                >
                  <div className="flex items-center gap-2">
                    {OVERVIEW_ICONS[label]}
                    <span className="text-[10px] font-bold uppercase tracking-widest text-white/40">
                      {label}
                    </span>
                  </div>
                  {badge ? (
                    <span className="text-xs font-bold bg-emerald-900/40 text-emerald-400 border border-emerald-800/60 px-2.5 py-1 rounded-full self-start">
                      {value}
                    </span>
                  ) : (
                    <span className={`text-sm font-bold text-white ${mono ? "font-mono text-xs text-[#F5C33C]" : ""}`}>
                      {value}
                    </span>
                  )}
                </div>
              ))}
            </div>

            {/* Key Highlights */}
            <h3 className="text-xs uppercase tracking-[0.3em] font-bold text-[#F5C33C] mb-5">
              Key Highlights
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {highlights.map((h, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, x: -12 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.05 }}
                  className="flex items-start gap-3"
                >
                  <CheckCircle2 size={16} className="text-[#711113] shrink-0 mt-0.5" />
                  <span className="text-sm text-white/70 font-medium leading-snug">{h}</span>
                </motion.div>
              ))}
            </div>
          </div>

          {/* ── Right: Brochure Download Form ── */}
          <div>
            <div className="bg-white/5 border border-white/10 rounded-3xl overflow-hidden backdrop-blur-sm">
              {/* Card header */}
              <div className="bg-gradient-to-r from-[#711113] to-[#9b1a1c] px-8 py-7">
                <div className="flex items-center gap-4 mb-3">
                  <div className="w-12 h-12 bg-white/15 rounded-2xl flex items-center justify-center shrink-0">
                    <FileText size={24} className="text-white" />
                  </div>
                  <div>
                    <p className="text-white/60 text-[10px] uppercase tracking-[0.35em] font-semibold">
                      Free Download · PDF
                    </p>
                    <h3 className="text-xl font-extrabold text-white leading-tight">
                      {projectTitle}
                    </h3>
                  </div>
                </div>
                <p className="text-white/60 text-xs leading-relaxed">
                  Get the complete brochure with detailed floor plans, pricing, amenities &amp; specifications.
                </p>
              </div>

              {/* Form body */}
              <div className="px-8 py-8">
                <AnimatePresence mode="wait">
                  {submitted ? (
                    <motion.div
                      key="success"
                      initial={{ opacity: 0, scale: 0.92 }}
                      animate={{ opacity: 1, scale: 1 }}
                      className="flex flex-col items-center gap-4 py-6 text-center"
                    >
                      <div className="w-16 h-16 bg-emerald-900/40 border border-emerald-700/50 rounded-full flex items-center justify-center">
                        <ArrowDownToLine size={28} className="text-emerald-400" />
                      </div>
                      <div>
                        <p className="text-white font-extrabold text-lg mb-1">Brochure Sent!</p>
                        <p className="text-white/50 text-sm leading-relaxed">
                          Our team will reach out to you shortly with the brochure and project details.
                        </p>
                      </div>
                      <div className="flex items-center gap-4 mt-2">
                        <a
                          href="tel:+917330770111"
                          className="flex items-center gap-2 text-[#F5C33C] text-xs font-bold uppercase tracking-widest hover:text-white transition"
                        >
                          <Phone size={13} /> Call Us
                        </a>
                        <span className="text-white/20">|</span>
                        <button
                          onClick={() => { setSubmitted(false); setForm({ name: "", phone: "", email: "" }); }}
                          className="text-white/40 text-xs hover:text-white transition"
                        >
                          Request Again
                        </button>
                      </div>
                    </motion.div>
                  ) : (
                    <motion.form
                      key="form"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      onSubmit={handleSubmit}
                      className="flex flex-col gap-4"
                    >
                      <p className="text-white/50 text-xs leading-relaxed mb-1">
                        Fill in your details below to receive the brochure instantly.
                      </p>

                      <div className="flex flex-col gap-4">
                        <div>
                          <label className="text-[10px] uppercase tracking-widest text-white/40 font-semibold mb-1.5 block">
                            Full Name *
                          </label>
                          <input
                            required
                            type="text"
                            placeholder="Your full name"
                            value={form.name}
                            onChange={(e) => setForm({ ...form, name: e.target.value })}
                            className="w-full bg-white/8 border border-white/15 rounded-xl px-4 py-3 text-white text-sm placeholder:text-white/30 focus:outline-none focus:border-[#F5C33C] transition-colors"
                          />
                        </div>

                        <div>
                          <label className="text-[10px] uppercase tracking-widest text-white/40 font-semibold mb-1.5 block">
                            Phone Number *
                          </label>
                          <input
                            required
                            type="tel"
                            placeholder="+91 00000 00000"
                            value={form.phone}
                            onChange={(e) => setForm({ ...form, phone: e.target.value })}
                            className="w-full bg-white/8 border border-white/15 rounded-xl px-4 py-3 text-white text-sm placeholder:text-white/30 focus:outline-none focus:border-[#F5C33C] transition-colors"
                          />
                        </div>

                        <div>
                          <label className="text-[10px] uppercase tracking-widest text-white/40 font-semibold mb-1.5 block">
                            Email Address
                          </label>
                          <input
                            type="email"
                            placeholder="your@email.com (optional)"
                            value={form.email}
                            onChange={(e) => setForm({ ...form, email: e.target.value })}
                            className="w-full bg-white/8 border border-white/15 rounded-xl px-4 py-3 text-white text-sm placeholder:text-white/30 focus:outline-none focus:border-[#F5C33C] transition-colors"
                          />
                        </div>
                      </div>

                      <button
                        type="submit"
                        disabled={loading}
                        className="mt-2 flex items-center justify-center gap-3 bg-[#F5C33C] hover:bg-white text-[#711113] font-extrabold uppercase tracking-widest text-sm py-4 rounded-2xl transition-all duration-300 shadow-xl shadow-[#F5C33C]/10 disabled:opacity-70"
                      >
                        {loading ? (
                          <>
                            <span className="w-4 h-4 rounded-full border-2 border-[#711113]/30 border-t-[#711113] animate-spin" />
                            Sending...
                          </>
                        ) : (
                          <>
                            <Download size={16} /> Download Free Brochure
                          </>
                        )}
                      </button>

                      <p className="text-white/30 text-[10px] text-center leading-relaxed">
                        By submitting, you agree to be contacted by our sales team.
                      </p>
                    </motion.form>
                  )}
                </AnimatePresence>
              </div>

              {/* Quick contact footer */}
              <div className="border-t border-white/10 px-8 py-4 flex flex-col sm:flex-row items-center gap-4 justify-between">
                <a href="tel:+917330770111" className="flex items-center gap-2 text-white/50 hover:text-[#F5C33C] text-xs font-medium transition">
                  <Phone size={13} className="text-[#F5C33C]" /> +91 73307 70111
                </a>
                <a href="mailto:sales@sankalpconstructions.com" className="flex items-center gap-2 text-white/50 hover:text-[#F5C33C] text-xs font-medium transition">
                  <Mail size={13} className="text-[#F5C33C]" /> sales@sankalpconstructions.com
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
