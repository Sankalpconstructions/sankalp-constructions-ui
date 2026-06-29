"use client";
import React from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import Image from "next/image";

interface Breadcrumb {
  label: string;
  href?: string;
}

interface PageBannerProps {
  title: React.ReactNode;
  subtitle: string;
  image: string;
  breadcrumbs?: Breadcrumb[];
}

export default function PageBanner({ title, subtitle, image, breadcrumbs }: PageBannerProps) {
  return (
    <section className="relative w-full min-h-[40vh] md:min-h-[50vh] flex items-center justify-center pt-24 pb-12 bg-gray-900 overflow-hidden">
      <div className="absolute inset-0">
        <Image
          src={image}
          alt="Banner Background"
          fill
          className="object-cover opacity-30 block"
          unoptimized
        />
        <div className="absolute inset-0 bg-gradient-to-t from-gray-900 via-gray-900/60 to-transparent"></div>
      </div>

      <div className="relative z-10 text-center px-4 w-full max-w-5xl mx-auto mt-8 md:mt-12 flex flex-col items-center">
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="sm:text-3xl md:text-3xl lg:text-4xl font-extrabold text-white uppercase tracking-wider drop-shadow-lg mb-4"
        >
          {title}
        </motion.h1>
        
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="text-gray-300 text-sm sm:text-base md:text-lg font-light max-w-3xl mx-auto leading-relaxed"
        >
          {subtitle}
        </motion.p>

        {breadcrumbs && breadcrumbs.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="flex items-center justify-center flex-wrap gap-2 mt-8 text-white/50 text-xs uppercase tracking-widest font-semibold"
          >
            <Link href="/" className="hover:text-[#F5C33C] transition-colors">Home</Link>
            {breadcrumbs.map((crumb, idx) => (
              <React.Fragment key={idx}>
                <span className="text-white/30">/</span>
                {crumb.href ? (
                  <Link href={crumb.href} className="hover:text-[#F5C33C] transition-colors">
                    {crumb.label}
                  </Link>
                ) : (
                  <span className="text-white/80">{crumb.label}</span>
                )}
              </React.Fragment>
            ))}
          </motion.div>
        )}
      </div>
    </section>
  );
}
