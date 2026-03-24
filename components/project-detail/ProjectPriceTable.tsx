"use client";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Lock, X } from "lucide-react";

interface PricingRow {
  type: string;
  area: string;
  facing?: string;
}

interface Props {
  projectTitle: string;
  rows: PricingRow[];
}

export default function ProjectPriceTable({ projectTitle, rows }: Props) {
  const [showForm, setShowForm] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => { setShowForm(false); setSubmitted(false); }, 2000);
  };

  return (
    <section className="py-16 md:py-24 bg-gray-50 border-t border-gray-100">
      <div className="container mx-auto px-4 lg:px-8">
        <div className="text-center mb-10">
          <span className="uppercase tracking-[0.25em] text-xs text-[#711113] font-bold mb-3 block">Pricing</span>
          <h2 className="text-3xl md:text-4xl font-extrabold text-gray-900 mb-4">Configuration & Pricing</h2>
          <div className="w-12 h-1 bg-[#711113] mx-auto rounded-full mb-4" />
          <p className="text-gray-500 max-w-xl mx-auto">Find the configuration that fits your lifestyle. Contact us for detailed pricing & offers.</p>
        </div>

        <div className="max-w-4xl mx-auto">
          <div className="bg-white rounded-2xl shadow-md border border-gray-100 overflow-hidden">
            {/* Table header */}
            <div className="grid grid-cols-3 bg-[#711113] text-white text-xs font-bold uppercase tracking-widest px-6 py-4">
              <span>Type</span>
              <span className="text-center">Carpet Area</span>
              <span className="text-right">Price</span>
            </div>

            {/* Rows */}
            {rows.map((row, i) => (
              <div
                key={i}
                className={`grid grid-cols-3 px-6 py-5 border-b border-gray-50 items-center ${i % 2 === 0 ? "bg-white" : "bg-gray-50/50"}`}
              >
                <span className="text-sm font-bold text-gray-900">{row.type}</span>
                <span className="text-sm text-gray-600 text-center">{row.area}</span>
                <div className="flex justify-end">
                  <button
                    onClick={() => setShowForm(true)}
                    className="flex items-center gap-1.5 text-xs font-bold text-[#711113] border border-[#711113]/30 px-3 py-1.5 rounded-full hover:bg-[#711113] hover:text-white transition-all"
                  >
                    <Lock size={11} /> Get Price
                  </button>
                </div>
              </div>
            ))}
          </div>

          <p className="text-xs text-gray-400 text-center mt-6">* Prices are subject to change. GST &amp; other charges applicable. Contact our sales team for the latest pricing.</p>
        </div>
      </div>

      {/* Unlock Price Form Modal */}
      <AnimatePresence>
        {showForm && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setShowForm(false)}
              className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[110]"
            />
            <div className="fixed inset-0 flex items-center justify-center z-[111] px-4 pointer-events-none">
              <motion.div
                initial={{ opacity: 0, scale: 0.95, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95, y: 20 }}
                className="bg-white rounded-2xl shadow-2xl p-8 max-w-md w-full relative pointer-events-auto"
              >
                <button
                  onClick={() => setShowForm(false)}
                  className="absolute top-4 right-4 w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center text-gray-500 hover:bg-[#711113] hover:text-white transition-colors"
                >
                  <X size={16} />
                </button>
                <div className="w-12 h-12 bg-[#711113]/10 rounded-xl flex items-center justify-center text-[#711113] mb-5">
                  <Lock size={22} />
                </div>
                <h3 className="text-2xl font-extrabold text-gray-900 mb-2">Get Pricing Details</h3>
                <p className="text-gray-500 text-sm mb-6">Fill in your details and our team will share the latest pricing for {projectTitle}.</p>

                {submitted ? (
                  <div className="text-center py-6">
                    <div className="text-4xl mb-3">✅</div>
                    <p className="text-green-700 font-bold">Request received! We'll get in touch shortly.</p>
                  </div>
                ) : (
                  <form onSubmit={handleFormSubmit} className="flex flex-col gap-4">
                    <input required type="text" placeholder="Full Name" className="p-3 border border-gray-200 rounded-xl text-sm focus:outline-none focus:border-[#711113]" />
                    <input required type="tel" placeholder="Phone Number" className="p-3 border border-gray-200 rounded-xl text-sm focus:outline-none focus:border-[#711113]" />
                    <input required type="email" placeholder="Email (optional)" className="p-3 border border-gray-200 rounded-xl text-sm focus:outline-none focus:border-[#711113]" />
                    <button type="submit" className="mt-2 py-4 bg-[#711113] text-white font-bold uppercase tracking-widest rounded-xl shadow-lg hover:bg-[#520c0d] transition-colors">
                      Get Pricing Now
                    </button>
                  </form>
                )}
              </motion.div>
            </div>
          </>
        )}
      </AnimatePresence>
    </section>
  );
}
