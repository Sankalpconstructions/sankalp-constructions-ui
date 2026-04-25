"use client";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Send } from "lucide-react";
import { submitLead } from "@/lib/leads";

export default function PopupLeadForm() {
  const [isVisible, setIsVisible] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    email: "",
    interest: "General"
  });

  useEffect(() => {
    const alreadyShown = sessionStorage.getItem("popup_form_shown");
    if (alreadyShown) return; 

    const timer = setTimeout(() => {
      sessionStorage.setItem("popup_form_shown", "true");
      setIsVisible(true);
    }, 15000); // Show after 15 seconds

    return () => clearTimeout(timer);
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      await submitLead({
        name: formData.name,
        email: formData.email,
        phone: formData.phone,
        project: formData.interest,
        message: `Callback request from Popup Form. Interested in ${formData.interest}`
      });
      setIsSubmitted(true);
      setTimeout(() => {
        setIsVisible(false);
      }, 3000);
    } catch (error) {
      console.error(error);
      alert("Failed to submit. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <div className="fixed inset-0 z-[200] flex justify-center items-center bg-black/60 backdrop-blur-sm p-4">
          <motion.div
            initial={{ opacity: 0, y: 50, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95, y: 50 }}
            className="bg-white p-8 rounded-xl shadow-2xl max-w-md w-full relative border-t-4 border-[#711113] overflow-hidden"
          >
            {/* Background Decor */}
            <div className="absolute top-0 right-0 w-32 h-32 bg-[#29B1D2]/10 rounded-full blur-2xl -translate-y-1/2 translate-x-1/2"></div>
            
            <button
              onClick={() => setIsVisible(false)}
              className="absolute top-4 right-4 text-gray-400 hover:text-[#711113] transition-colors z-10"
            >
              <X size={20} />
            </button>
            
            {!isSubmitted ? (
              <>
                <h3 className="text-2xl font-extrabold text-[#711113] uppercase tracking-wide mb-1">
                  Interested?
                </h3>
                <p className="text-sm text-gray-500 mb-6 font-light">
                  Drop your details and our experts will get back to you with the best offers.
                </p>
                
                <form onSubmit={handleSubmit} className="flex flex-col gap-4 relative z-10">
                  <input
                    required
                    type="text"
                    placeholder="Name"
                    value={formData.name}
                    onChange={(e) => setFormData({...formData, name: e.target.value})}
                    className="p-3 border border-gray-200 rounded text-sm focus:outline-[#29B1D2] focus:border-[#29B1D2] transition-colors bg-gray-50"
                  />
                  <input
                    required
                    type="tel"
                    placeholder="Phone"
                    value={formData.phone}
                    onChange={(e) => setFormData({...formData, phone: e.target.value})}
                    className="p-3 border border-gray-200 rounded text-sm focus:outline-[#29B1D2] focus:border-[#29B1D2] transition-colors bg-gray-50"
                  />
                  <input
                    required
                    type="email"
                    placeholder="Email"
                    value={formData.email}
                    onChange={(e) => setFormData({...formData, email: e.target.value})}
                    className="p-3 border border-gray-200 rounded text-sm focus:outline-[#29B1D2] focus:border-[#29B1D2] transition-colors bg-gray-50"
                  />
                  <select
                    required
                    value={formData.interest}
                    onChange={(e) => setFormData({...formData, interest: e.target.value})}
                    className="p-3 border border-gray-200 rounded text-sm focus:outline-[#29B1D2] focus:border-[#29B1D2] transition-colors bg-gray-50"
                  >
                    <option value="General">Select Interest</option>
                    <option value="2 BHK Apartments">2 BHK Apartments</option>
                    <option value="3 BHK Apartments">3 BHK Apartments</option>
                    <option value="Luxury Villas">Luxury Villas</option>
                    <option value="Commercial Space">Commercial Space</option>
                  </select>
                  
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="mt-2 py-4 bg-[#711113] text-white hover:bg-[#520c0d] font-bold uppercase tracking-widest text-sm rounded shadow-lg transition-colors flex justify-center items-center gap-2 disabled:opacity-70"
                  >
                    {isSubmitting ? "Submitting..." : <><Send size={16} /> Submit Callback</>}
                  </button>
                </form>
              </>
            ) : (
              <div className="py-12 flex flex-col items-center justify-center text-center">
                <div className="w-16 h-16 bg-[#29B1D2]/20 text-[#29B1D2] rounded-full flex items-center justify-center mb-4">
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ type: "spring" }}
                  >
                    <Send size={24} />
                  </motion.div>
                </div>
                <h4 className="text-xl font-bold text-[#711113] uppercase">Thank You!</h4>
                <p className="text-sm text-gray-500 mt-2">We will contact you shortly.</p>
              </div>
            )}
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
