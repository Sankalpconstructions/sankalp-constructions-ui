"use client";
import { motion } from "framer-motion";

const teamMembers = [
  { name: "Rahul Sharma", role: "Managing Director", img: "https://images.unsplash.com/photo-1560250097-0b93528c311a?w=500" },
  { name: "Priya Singh", role: "Head of Architecture", img: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=500" },
  { name: "Vikram Reddy", role: "Chief Engineer", img: "https://images.unsplash.com/photo-1556157382-97eda2d62296?w=500" },
  { name: "Ananya Desai", role: "Marketing Director", img: "https://images.unsplash.com/photo-1580489944761-15a19d654956?w=500" }
];

export default function TeamSection() {
  return (
    <section id="team" className="py-24 bg-white text-gray-900 overflow-hidden">
      <div className="container mx-auto px-4 lg:px-8">
        
        <div className="text-center max-w-2xl mx-auto mb-16">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            className="text-4xl font-extrabold text-[#711113] uppercase tracking-wide"
          >
            Meet Our Team
          </motion.h2>
          <div className="w-24 h-1 bg-[#29B1D2] mx-auto mt-4 mb-6"></div>
          <p className="text-gray-500 text-lg">
            The visionary leaders and dedicated experts behind Sankalp Constructions' success.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {teamMembers.map((member, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ delay: idx * 0.1, duration: 0.5 }}
              className="group relative bg-[#F5F5F5] rounded-2xl overflow-hidden hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 border border-gray-100 flex flex-col h-[400px]"
            >
              <div className="relative w-full h-full overflow-hidden">
                <img
                  src={member.img}
                  alt={member.name}
                  className="w-full h-full object-cover object-top group-hover:scale-105 transition-transform duration-700"
                />
              </div>
              
              <div className="absolute bottom-0 w-full bg-white bg-opacity-95 p-6 backdrop-blur-md rounded-b-2xl border-t border-gray-100">
                <h3 className="text-xl font-bold text-gray-900 group-hover:text-[#711113] transition-colors">
                  {member.name}
                </h3>
                <p className="text-gray-500 font-medium text-sm mt-1">
                  {member.role}
                </p>
              </div>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
}
