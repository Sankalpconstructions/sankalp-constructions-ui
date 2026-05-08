"use client";
import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Plus, Minus } from "lucide-react";

interface FAQ {
  _id: string;
  question: string;
  answer: string;
}

export default function FAQSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const [faqs, setFaqs] = useState<FAQ[]>([]);
  const [loading, setLoading] = useState(true);

  React.useEffect(() => {
    const fetchFaqs = async () => {
      try {
        const baseUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001';
        const res = await fetch(`${baseUrl}/api/faqs`);
        if (res.ok) {
          const data = await res.json();
          // Assuming API returns { _id, question, answer }
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

  return (
    <section
      id="faq"
      className="py-12 md:py-24 bg-white text-gray-900 overflow-hidden border-t border-gray-200"
    >
      <div className="container mx-auto px-4 lg:px-8 max-w-6xl">
        {/* Heading */}
        <div className="mb-8 md:mb-12">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-2xl md:text-3xl lg:text-4xl font-bold text-[#711113] mb-3"
          >
            Frequently Asked Questions
          </motion.h2>

          <p className="text-gray-600 text-sm md:text-base leading-relaxed">
            Everything you need to know about our projects, booking process, and company policies.
          </p>
        </div>

        {/* FAQ List */}
        <div className="space-y-3">
          {loading ? (
             <div className="py-10 text-center text-gray-500 font-bold uppercase tracking-widest text-sm">
               Loading FAQs...
             </div>
          ) : faqs.length > 0 ? (
            faqs.map((faq, idx) => (
            <motion.div
              key={faq._id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.05 }}
              className={`rounded-lg transition-all duration-300 ${openIndex === idx
                ? "bg-white border border-[#29B1D2]"
                : "bg-gray-100 border border-transparent"
                }`}
            >
              <button
                onClick={() => toggleFAQ(idx)}
                className="w-full p-5 md:p-6 flex items-center justify-between text-left"
              >
                <h3 className="text-base md:text-lg font-semibold text-gray-900 pr-4">
                  {faq.question}
                </h3>

                <div className="shrink-0 text-gray-900">
                  {openIndex === idx ? (
                    <Minus size={20} strokeWidth={2} />
                  ) : (
                    <Plus size={20} strokeWidth={2} />
                  )}
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
                    <div className="px-5 md:px-6 pb-6 text-gray-600 text-sm md:text-base leading-relaxed">
                      {faq.answer}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))
          ) : (
            <div className="py-10 text-center text-gray-500 font-bold uppercase tracking-widest text-sm">
               No FAQs Available
            </div>
          )}
        </div>
      </div>
    </section>
  );
}