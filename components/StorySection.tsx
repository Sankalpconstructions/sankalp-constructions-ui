"use client";
import { motion } from "framer-motion";

export default function StorySection() {
  return (
    <section id="story" className="py-8 md:py-24 bg-white relative overflow-hidden">
      <div className="container mx-auto px-4 lg:px-8 z-10 relative">
        <div className="flex flex-col md:flex-row items-center gap-8 md:gap-12 lg:gap-20 text-gray-900">

          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8 }}
            className="md:w-1/2 relative w-full"
          >
            <div className="absolute -left-4 -top-4 w-32 h-32 bg-[#F5C33C]/20 rounded-full blur-3xl text-sm tracking-widest uppercase text-white font-bold opacity-0"></div>
            <img
              src="/assets/about-us-dummy.png"
              alt="Brand Story"
              className="rounded-lg shadow-2xl relative z-10 w-full object-cover h-[280px] md:h-[500px]"
            />
            <div className="absolute -bottom-10 -right-10 bg-[#711113] rounded-lg p-8 text-white z-20 shadow-xl hidden lg:block">
              <h4 className="text-4xl font-extrabold mb-1">25+</h4>
              <p className="text-sm tracking-widest uppercase">Years of Excellence</p>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="md:w-1/2 mt-8 md:mt-0"
          >
            <h2 className="text-[#711113] text-[9px] md:text-sm tracking-[0.25em] uppercase font-bold mb-2 md:mb-3">
              Brand Story
            </h2>
            <h3 className="text-xl md:text-4xl font-extrabold uppercase mb-4 md:mb-6 leading-tight">
              A Legacy of <br />
              <span className="text-[#29B1D2]">Trust & Quality</span>
            </h3>
            <div className="w-16 md:w-24 h-1 bg-[#F5C33C] mb-5 md:mb-8"></div>

            <p className="text-gray-600 mb-10 leading-relaxed text-[15px]">
              Since our inception, Sankalp Constructions has been a trusted real estate developer, known for delivering high-quality residential and commercial spaces. With a strong foundation of trust, innovation, and a customer-first approach, we continue to redefine the real estate landscape, creating sustainable, future-ready spaces that inspire modern urban living.
            </p>

            <div className="grid grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-10 mb-8">
              <div>
                <h4 className="text-[2.5rem] leading-none text-gray-800 mb-2 font-serif tracking-tight">25+</h4>
                <p className="text-[15px] text-gray-600">Years of Legacy</p>
              </div>
              <div>
                <h4 className="text-[2.5rem] leading-none text-gray-800 mb-2 font-serif tracking-tight">19+</h4>
                <p className="text-[15px] text-gray-600">Projects Delivered</p>
              </div>
              <div>
                <h4 className="text-[2.5rem] leading-none text-gray-800 mb-2 font-serif tracking-tight">3</h4>
                <p className="text-[15px] text-gray-600">Ongoing Projects</p>
              </div>
              <div>
                <h4 className="text-[2.5rem] leading-none text-gray-800 mb-2 font-serif tracking-tight">3<span className="text-3xl">M+</span></h4>
                <p className="text-[15px] text-gray-600">Sq.Ft. Delivered</p>
              </div>
              <div>
                <h4 className="text-[2.5rem] leading-none text-gray-800 mb-2 font-serif tracking-tight">2<span className="text-3xl">M+</span></h4>
                <p className="text-[15px] text-gray-600">Sq.Ft. in Progress</p>
              </div>
              <div>
                <h4 className="text-[2.5rem] leading-none text-gray-800 mb-2 font-serif tracking-tight">10,000+</h4>
                <p className="text-[15px] text-gray-600">Happy Families</p>
              </div>
            </div>
          </motion.div>

        </div>
      </div>

      {/* Decorative BG element */}
      <div className="absolute right-0 top-1/2 -translate-y-1/2 w-[60vw] h-[60vw] max-w-[800px] max-h-[800px] bg-gray-50 rounded-full translate-x-1/2 -z-0"></div>
    </section>
  );
}
