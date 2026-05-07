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

  // Static FAQ Data (No API)
  const faqs: FAQ[] = [
    {
      _id: "1",
      question: "What is the booking process?",
      answer:
        "You can book a property by selecting your preferred project, filling out the booking form, and completing the payment process.",
    },
    {
      _id: "2",
      question: "Do you offer refunds?",
      answer:
        "Yes, refunds are processed based on our cancellation policy. Please refer to our policy page for full details.",
    },
    {
      _id: "3",
      question: "Can I visit the site before booking?",
      answer:
        "Absolutely. We encourage site visits before booking. You can schedule a visit through our contact page.",
    },
    {
      _id: "4",
      question: "What payment methods are accepted?",
      answer:
        "We accept UPI, credit/debit cards, net banking, and EMI options through supported providers.",
    },
  ];

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
          {faqs.map((faq, idx) => (
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
          ))}
        </div>
      </div>
    </section>
  );
}