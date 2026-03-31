"use client";
import { motion } from "framer-motion";
import { MapPin, Phone, Mail, Clock } from "lucide-react";

export default function ContactSection() {
  return (
    <section id="contact" className="py-8 md:py-24 bg-gray-50 text-gray-900 overflow-hidden border-t border-gray-200">
      <div className="container mx-auto px-4 lg:px-8">
        
        <div className="text-center max-w-2xl mx-auto mb-8 md:mb-16">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            className="text-xl md:text-3xl lg:text-4xl font-extrabold text-[#711113] uppercase tracking-wide px-4"
          >
            Get In Touch
          </motion.h2>
          <div className="w-16 md:w-24 h-1 bg-[#29B1D2] mx-auto mt-3 md:mt-4 mb-5 md:mb-6"></div>
          <p className="text-gray-500 text-xs md:text-lg px-2 leading-relaxed">
            Reach out to our expert team for any inquiries, site visits, or investment opportunities.
          </p>
        </div>

        <div className="flex flex-col lg:flex-row bg-white rounded-2xl shadow-xl overflow-hidden border border-gray-100">
          
          {/* Form Side (Left) */}
          <div className="lg:w-1/2 p-5 md:p-10 lg:p-14 flex flex-col justify-center">
            <h3 className="text-lg md:text-2xl font-bold uppercase text-gray-900 mb-1.5">Send a Message</h3>
            <p className="text-[10px] md:text-sm text-gray-500 mb-5 md:mb-8">Fill out the form below and our real estate consultant will get back to you shortly.</p>
            
            <form className="space-y-6" onSubmit={(e) => e.preventDefault()}>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-[11px] font-bold text-gray-700 uppercase mb-2 tracking-widest">Full Name</label>
                  <input type="text" className="w-full border-b border-gray-200 py-2 focus:outline-none focus:border-[#29B1D2] transition-colors text-sm text-gray-600" placeholder="John Doe" />
                </div>
                <div>
                  <label className="block text-[11px] font-bold text-gray-700 uppercase mb-2 tracking-widest">Email Address</label>
                  <input type="email" className="w-full border-b border-gray-200 py-2 focus:outline-none focus:border-[#29B1D2] transition-colors text-sm text-gray-600" placeholder="john@example.com" />
                </div>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-[11px] font-bold text-gray-700 uppercase mb-2 tracking-widest">Phone Number</label>
                  <input type="tel" className="w-full border-b border-gray-200 py-2 focus:outline-none focus:border-[#29B1D2] transition-colors text-sm text-gray-600" placeholder="+91 99999 99999" />
                </div>
                <div>
                  <label className="block text-[11px] font-bold text-gray-700 uppercase mb-2 tracking-widest">Interested In</label>
                  <select className="w-full border-b border-gray-200 py-2 focus:outline-none focus:border-[#29B1D2] transition-colors bg-white text-sm text-gray-600 cursor-pointer">
                    <option>2 BHK Apartments</option>
                    <option>3 BHK Premium</option>
                    <option>Luxury Villas</option>
                    <option>Commercial Spaces</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-[11px] font-bold text-gray-700 uppercase mb-2 tracking-widest">Your Message</label>
                <textarea rows={2} className="w-full border-b border-gray-200 py-2 focus:outline-none focus:border-[#29B1D2] transition-colors resize-none text-sm text-gray-600" placeholder="How can we help you?"></textarea>
              </div>

              <button type="submit" className="px-8 mt-4 py-3 bg-[#711113] hover:bg-[#520c0d] text-white font-bold uppercase tracking-widest text-xs rounded shadow-lg shadow-[#711113]/30 transition-all hover:-translate-y-0.5 w-full md:w-auto">
                Submit Inquiry
              </button>
            </form>
          </div>

          {/* Map Side (Right) */}
          <div className="lg:w-1/2 min-h-[400px] lg:min-h-auto relative bg-gray-100">
            <iframe 
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d121059.04360434!2d73.78056541640626!3d18.52460359999999!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bc2bf2e67461101%3A0x828d43bf9d9ee343!2sPune%2C%20Maharashtra!5e0!3m2!1sen!2sin!4v1711200000000!5m2!1sen!2sin" 
              className="absolute inset-0 w-full h-full border-0 grayscale hover:grayscale-0 transition-all duration-1000"
              allowFullScreen={false} 
              loading="lazy" 
              referrerPolicy="no-referrer-when-downgrade"
            ></iframe>
          </div>

        </div>

      </div>
    </section>
  );
}
