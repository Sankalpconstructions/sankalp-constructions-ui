"use client";
import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Plus, Minus, Loader2 } from "lucide-react";

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3001";

interface FAQ {
  _id: string;
  question: string;
  answer: string;
}

export default function FAQSection() {
  const [faqs, setFaqs] = useState<FAQ[]>([]);
  const [loading, setLoading] = useState(true);
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  useEffect(() => {
    const fetchFaqs = async () => {
      try {
        const res = await fetch(`${API_BASE_URL}/api/faq`);
        if (res.ok) {
          const data = await res.json();
          setFaqs(data);
        }
      } catch (error) {
        console.error("Error fetching FAQs:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchFaqs();
  }, []);

  const toggleFAQ = (idx: number) => {
    setOpenIndex(openIndex === idx ? null : idx);
  };

  if (loading) {
    return (
      <div className="py-24 bg-white flex flex-col items-center justify-center">
        <Loader2 className="animate-spin text-[#711113] mb-4" size={40} />
        <p className="text-gray-400 font-bold uppercase tracking-widest text-[10px]">Loading FAQs...</p>
      </div>
    );
  }

  if (faqs.length === 0) return null;

  return (
    <section id="faq" className="py-8 md:py-24 bg-gray-50 text-gray-900 overflow-hidden border-t border-gray-200">
      <div className="container mx-auto px-4 lg:px-8">
        
        <div className="text-center max-w-2xl mx-auto mb-12 md:mb-20">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-2xl md:text-4xl font-extrabold text-[#711113] uppercase tracking-wide"
          >
            Frequently Asked Questions
          </motion.h2>
          <div className="w-16 md:w-24 h-1 bg-[#F5C33C] mx-auto mt-4 mb-6"></div>
          <p className="text-gray-500 text-sm md:text-lg leading-relaxed">
            Everything you need to know about our projects, booking process, and company policies.
          </p>
        </div>

        <div className="max-w-4xl mx-auto space-y-4">
          {faqs.map((faq, idx) => (
            <motion.div
              key={faq._id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.05 }}
              className="bg-white rounded-2xl border border-gray-200 overflow-hidden shadow-sm hover:shadow-md transition-shadow"
            >
              <button
                onClick={() => toggleFAQ(idx)}
                className="w-full p-6 md:p-8 flex items-center justify-between text-left transition-colors hover:bg-gray-50"
              >
                <h3 className="text-lg font-bold text-gray-800 pr-4">{faq.question}</h3>
                <div className={`shrink-0 p-1 rounded-full transition-colors ${openIndex === idx ? 'bg-[#711113] text-white' : 'bg-gray-100 text-gray-400'}`}>
                  {openIndex === idx ? <Minus size={20} /> : <Plus size={20} />}
                </div>
              </button>

              <AnimatePresence>
                {openIndex === idx && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3 }}
                  >
                    <div className="px-6 md:px-8 pb-8 text-gray-600 text-sm md:text-base leading-relaxed border-t border-gray-50 pt-6">
                      {faq.answer}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
}
