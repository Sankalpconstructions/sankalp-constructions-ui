"use client";
import React, { useState } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import ContactFloating from "@/components/ContactFloating";
import ScrollController from "@/components/ScrollController";
import { motion } from "framer-motion";
import { MapPin, Phone, Mail, Clock, Send, MessageSquare } from "lucide-react";

export default function ContactPage() {
  const [formStatus, setFormStatus] = useState<"idle" | "submitting" | "success">("idle");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setFormStatus("submitting");
    setTimeout(() => setFormStatus("success"), 1500);
  };

  return (
    <main id="projects" className="min-h-screen  bg-white">
      <Header />

      {/* Hero Banner */}
      <section className="relative w-full h-[50vh] md:h-[60vh] flex items-center justify-center pt-20 bg-gray-900">
        <div className="absolute inset-0">
          <img
            src="https://images.unsplash.com/photo-1497366216548-37526070297c?w=1600"
            alt="Contact Us Office"
            className="w-full h-full object-cover opacity-30 block"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-gray-900 via-gray-900/60 to-transparent"></div>
        </div>

        <div className="relative z-10 text-center px-4">
          <motion.h1
            id="contact"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-4xl md:text-6xl font-extrabold text-white uppercase tracking-widest drop-shadow-lg mb-4"
          >
            Get In <span className="text-[#29B1D2]">Touch</span>
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-gray-300 text-lg md:text-xl font-light max-w-2xl mx-auto"
          >
            Whether you&apos;re looking to invest in a dream home or a premium commercial property, our tailored advisors are here to help.
          </motion.p>
        </div>
      </section>

      {/* Main Contact Section */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="flex flex-col lg:flex-row gap-16 justify-center max-w-6xl mx-auto">

            {/* Contact Info Cards */}
            <div className="lg:w-1/3 flex flex-col gap-6">
              <motion.div initial={{ opacity: 0, x: -30 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.1 }} className="bg-white p-8 shadow-xl rounded-2xl border-t-4 border-[#711113]">
                <div className="w-12 h-12 bg-red-50 text-[#711113] rounded-full flex items-center justify-center mb-6">
                  <MapPin size={24} />
                </div>
                <h3 className="text-xl font-bold uppercase text-gray-900 mb-2">Corporate Office</h3>
                <p className="text-gray-600 font-light leading-relaxed">
                  Sankalp Corporate Tower, ECIL Cross Roads,<br />
                  Hyderabad, Telangana 500062
                </p>
              </motion.div>

              <motion.div initial={{ opacity: 0, x: -30 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.2 }} className="bg-white p-8 shadow-xl rounded-2xl border-t-4 border-[#29B1D2]">
                <div className="w-12 h-12 bg-sky-50 text-[#29B1D2] rounded-full flex items-center justify-center mb-6">
                  <Phone size={24} />
                </div>
                <h3 className="text-xl font-bold uppercase text-gray-900 mb-2">Direct Contact</h3>
                <p className="text-gray-600 font-light mb-1"><strong className="text-gray-800 text-sm">Sales:</strong> +91 73307 70111</p>
                <p className="text-gray-600 font-light"><strong className="text-gray-800 text-sm">Support:</strong> +91 87654 32109</p>
              </motion.div>

              <motion.div initial={{ opacity: 0, x: -30 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.3 }} className="bg-white p-8 shadow-xl rounded-2xl border-t-4 border-[#F5C33C]">
                <div className="w-12 h-12 bg-yellow-50 text-[#F5C33C] rounded-full flex items-center justify-center mb-6">
                  <Mail size={24} />
                </div>
                <h3 className="text-xl font-bold uppercase text-gray-900 mb-2">Digital Channels</h3>
                <p className="text-gray-600 font-light mb-1"><strong className="text-gray-800 text-sm">Sales:</strong> sales@sankalpconstructions.in</p>
                <p className="text-gray-600 font-light"><strong className="text-gray-800 text-sm">Info:</strong> info@sankalpconstructions.in</p>
              </motion.div>
            </div>

            {/* Contact Form */}
            <div className="lg:w-2/3">
              <div className="bg-white p-8 md:p-12 shadow-2xl rounded-2xl h-full border border-gray-100 relative overflow-hidden">
                <div className="absolute top-0 right-0 w-32 h-32 bg-[#711113]/5 rounded-bl-full pointer-events-none"></div>

                <h2 className="text-3xl font-extrabold uppercase text-[#711113] mb-2">Send us a message</h2>
                <p className="text-gray-500 font-light mb-10">Our luxury living experts typically respond within 1 hour.</p>

                {formStatus === "success" ? (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="flex flex-col items-center justify-center text-center p-10 bg-green-50 rounded-xl"
                  >
                    <div className="w-20 h-20 bg-green-500 rounded-full flex items-center justify-center text-white mb-6 shadow-lg shadow-green-500/30">
                      <Send size={32} />
                    </div>
                    <h3 className="text-2xl font-bold text-gray-900 mb-2">Message Sent Successfully!</h3>
                    <p className="text-gray-600 mb-8 max-w-sm">Thank you for getting in touch. One of our senior advisors will contact you momentarily.</p>
                    <button onClick={() => setFormStatus("idle")} className="px-8 py-3 bg-[#711113] text-white rounded font-bold uppercase tracking-widest text-sm hover:bg-[#29B1D2] transition-colors shadow-lg">
                      Send Another
                    </button>
                  </motion.div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-6 relative z-10">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <label className="block text-sm uppercase tracking-wider font-semibold text-gray-600 mb-2">Full Name <span className="text-red-500">*</span></label>
                        <input required type="text" className="w-full p-4 bg-gray-50 border border-gray-200 rounded-lg outline-none focus:border-[#29B1D2] focus:bg-white transition-all text-gray-800 shadow-sm" placeholder="John Doe" />
                      </div>
                      <div>
                        <label className="block text-sm uppercase tracking-wider font-semibold text-gray-600 mb-2">Phone Number <span className="text-red-500">*</span></label>
                        <input required type="tel" className="w-full p-4 bg-gray-50 border border-gray-200 rounded-lg outline-none focus:border-[#29B1D2] focus:bg-white transition-all text-gray-800 shadow-sm" placeholder="+91 99999 99999" />
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm uppercase tracking-wider font-semibold text-gray-600 mb-2">Email Address <span className="text-gray-400 font-normal lowercase">(Optional)</span></label>
                      <input type="email" className="w-full p-4 bg-gray-50 border border-gray-200 rounded-lg outline-none focus:border-[#29B1D2] focus:bg-white transition-all text-gray-800 shadow-sm" placeholder="john@example.com" />
                    </div>

                    <div>
                      <label className="block text-sm uppercase tracking-wider font-semibold text-gray-600 mb-2">Project of Interest</label>
                      <select className="w-full p-4 bg-gray-50 border border-gray-200 rounded-lg outline-none focus:border-[#29B1D2] focus:bg-white transition-all text-gray-800 shadow-sm appearance-none cursor-pointer">
                        <option value="">Select a Project</option>
                        <option value="Sankalp Heights">Sankalp Heights</option>
                        <option value="Sankalp Oasis">Sankalp Oasis</option>
                        <option value="Sankalp Residency">Sankalp Residency</option>
                        <option value="Sankalp Greens">Sankalp Greens</option>
                        <option value="Other">General Inquiry</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-sm uppercase tracking-wider font-semibold text-gray-600 mb-2">Your Message <span className="text-red-500">*</span></label>
                      <textarea required rows={4} className="w-full p-4 bg-gray-50 border border-gray-200 rounded-lg outline-none focus:border-[#29B1D2] focus:bg-white transition-all text-gray-800 shadow-sm resize-none" placeholder="Let us know how we can assist you..."></textarea>
                    </div>

                    <button
                      type="submit"
                      disabled={formStatus === "submitting"}
                      className="w-full py-4 bg-[#711113] hover:bg-[#520c0d] text-white font-bold uppercase tracking-[0.2em] rounded-lg shadow-xl shadow-[#711113]/20 transition-all flex items-center justify-center gap-2 group border border-transparent hover:border-[#F5C33C]/50"
                    >
                      {formStatus === "submitting" ? (
                        <div className="w-6 h-6 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                      ) : (
                        <>Send Message <Send size={18} className="group-hover:translate-x-1 transition-transform" /></>
                      )}
                    </button>
                    <p className="text-xs text-center text-gray-400 mt-4">By submitting this form, you agree to our privacy policy and terms of service.</p>
                  </form>
                )}
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* Embedded Map Section */}
      <section className="w-full h-96 relative bg-gray-200 border-t border-gray-300">
        <iframe
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3806.2215286576!2d78.5684347758364!3d17.473010100344583!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bcb9bca88929947%3A0x647492c30076a596!2sECIL%20Cross%20Roads!5e0!3m2!1sen!2sin!4v1711200000000!5m2!1sen!2sin"
          width="100%"
          height="100%"
          style={{ border: 0 }}
          allowFullScreen
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
          className="grayscale opacity-80 hover:grayscale-0 hover:opacity-100 transition-all duration-700"
        ></iframe>
        {/* Placeholder overlay since actual embed needs valid query */}
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
          <div className="bg-white/90 backdrop-blur px-6 py-4 rounded-xl shadow-2xl flex items-center gap-4 animate-bounce">
            <MapPin className="text-[#711113]" size={32} />
            <div>
              <p className="font-bold text-gray-900 uppercase">Sankalp Corporate Office</p>
              <p className="text-sm text-gray-500">ECIL, Hyderabad</p>
            </div>
          </div>
        </div>
      </section>

      <ContactFloating />
      <ScrollController />
      <Footer />
    </main>
  );
}
