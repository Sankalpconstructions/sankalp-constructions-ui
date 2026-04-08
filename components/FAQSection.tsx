"use client";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown, ChevronUp } from "lucide-react";

const faqs = [
  {
    question: "What types of properties do you build?",
    answer: "We specialize in premium residential apartments, luxury villas, and ongoing commercial complexes."
  },
  {
    question: "How long does a typical project take to complete?",
    answer: "A standard residential project takes between 18 to 36 months, depending on the scale and complexity of the development."
  },
  {
    question: "Do you offer financing options or assistance?",
    answer: "Yes, we have tie-ups with leading banks and financial institutions to facilitate smooth home loan processing for our customers."
  },
  {
    question: "Are your properties Vastu compliant?",
    answer: "Absolutely. We ensure that all our projects strictly adhere to fundamental Vastu principles for better harmony and positivity."
  },
  {
    question: "Can I customize the floor plan of my apartment?",
    answer: "Customization depends on the project stage. Early buyers can often request minor layout changes, subject to structural and architectural feasibility."
  }
];

export default function FAQSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggleFAQ = (idx: number) => {
    setOpenIndex(openIndex === idx ? null : idx);
  };

  return (
    <section id="faq" className="py-8 md:py-24 bg-gray-50 text-gray-900 overflow-hidden border-t border-gray-200">
      <div className="container mx-auto px-4 lg:px-8 max-w-4xl">

        <div className="text-center mb-8 md:mb-16">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            className="text-xl md:text-4xl font-extrabold text-[#711113] uppercase tracking-wide"
          >
            Frequently Asked Questions
          </motion.h2>
          <div className="w-20 md:w-24 h-1 bg-[#29B1D2] mx-auto mt-4 mb-6"></div>
          <p className="text-gray-500 text-sm md:text-lg px-2">
            Find answers to common questions about buying a property with Sankalp Constructions.
          </p>
        </div>

        <div className="space-y-4">
          {faqs.map((faq, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1, duration: 0.4 }}
              className="bg-white border text-left border-gray-200 rounded-lg shadow-sm hover:shadow-md transition-shadow"
            >
              <button
                onClick={() => toggleFAQ(idx)}
                className="w-full text-left px-6 py-4 flex justify-between items-center focus:outline-none"
              >
                <h3 className="text-lg font-bold text-gray-800 pr-4">{faq.question}</h3>
                <span className="text-[#29B1D2]">
                  {openIndex === idx ? <ChevronUp size={24} /> : <ChevronDown size={24} />}
                </span>
              </button>
              <AnimatePresence>
                {openIndex === idx && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3 }}
                    className="overflow-hidden"
                  >
                    <div className="px-6 pb-4 pt-2 text-gray-500 text-base leading-relaxed border-t border-gray-100">
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
