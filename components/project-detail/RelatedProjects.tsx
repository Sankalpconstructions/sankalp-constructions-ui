"use client";
import { motion } from "framer-motion";
import { MapPin, ChevronRight } from "lucide-react";
import Link from "next/link";

interface RelatedProject {
  id: string;
  title: string;
  location: string;
  type: string;
  image: string;
}

interface Props {
  projects: RelatedProject[];
}

export default function RelatedProjects({ projects }: Props) {
  if (!projects.length) return null;

  return (
    <section className="py-16 md:py-24 bg-white border-t border-gray-100">
      <div className="container mx-auto px-4 lg:px-8">
        <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4 mb-12">
          <div>
            <span className="uppercase tracking-[0.25em] text-xs text-[#711113] font-bold mb-3 block">Explore More</span>
            <h2 className="text-3xl md:text-4xl font-extrabold text-gray-900">Related Projects</h2>
            <div className="w-12 h-1 bg-[#711113] mt-4 rounded-full" />
          </div>
          <Link
            href="/projects"
            className="flex items-center gap-2 text-[#711113] font-bold text-sm uppercase tracking-widest hover:gap-3 transition-all"
          >
            View All <ChevronRight size={16} />
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {projects.map((p, i) => (
            <motion.div
              key={p.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ delay: i * 0.1 }}
              className="group rounded-2xl overflow-hidden border border-gray-100 shadow-sm hover:shadow-xl transition-all duration-300 hover:-translate-y-1 bg-white"
            >
              <Link href={`/projects/${p.id}`}>
                <div className="relative h-52 overflow-hidden">
                  <img
                    src={p.image}
                    alt={p.title}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                  <span className="absolute top-3 left-3 bg-[#F5C33C] text-[#711113] text-[10px] font-bold uppercase tracking-widest px-2.5 py-1 rounded-full">
                    {p.type}
                  </span>
                </div>
                <div className="p-5">
                  <h3 className="text-base md:text-lg font-extrabold text-gray-900 group-hover:text-[#711113] transition-colors mb-2">
                    {p.title}
                  </h3>
                  <div className="flex items-center justify-between">
                    <span className="flex items-center gap-1 text-gray-500 text-sm">
                      <MapPin size={13} /> {p.location}
                    </span>
                    <span className="text-[#711113] font-bold text-xs uppercase tracking-wider flex items-center gap-1">
                      View <ChevronRight size={13} />
                    </span>
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
