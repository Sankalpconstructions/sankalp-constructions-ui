import React from 'react';
import PageBanner from "@/components/PageBanner";
import Image from "next/image";

export const termsOfService = [
  {
    title: "Acceptance of Terms",
    description: "By accessing and using the Sankalp Constructions website, you agree to comply with and be bound by these Terms of Service. If you do not agree with any part of these terms, please do not use our website."
  },
  {
    title: "Website Usage",
    description: "The content available on this website is provided for general informational purposes related to our real estate projects, construction services, and property offerings. Users may not misuse, copy, or distribute website content without prior permission."
  },
  {
    title: "Property Information",
    description: "Sankalp Constructions strives to ensure all property details, pricing, floor plans, amenities, and specifications are accurate. However, project details may change without prior notice based on approvals, availability, or development updates."
  },
  {
    title: "Intellectual Property Rights",
    description: "All website content including logos, designs, images, text, graphics, and project materials are the intellectual property of Sankalp Constructions and may not be reused without written consent."
  },
  {
    title: "Third-Party Links",
    description: "Our website may contain links to third-party platforms such as Instagram, Facebook, or external property portals. Sankalp Constructions is not responsible for the content or privacy practices of these external websites."
  },
  {
    title: "Limitation of Liability",
    description: "Sankalp Constructions shall not be held liable for any direct or indirect damages arising from the use of this website, including inaccuracies, delays, or interruptions in website services."
  },
  {
    title: "User Responsibilities",
    description: "Users must provide accurate information while submitting contact forms, enquiries, or booking requests. Any misuse of the website or fraudulent activity is strictly prohibited."
  },
  {
    title: "Modifications to Terms",
    description: "Sankalp Constructions reserves the right to update or modify these Terms of Service at any time without prior notice. Continued use of the website indicates acceptance of the updated terms."
  }
];

export const metadata = {
  title: "Terms of Service | Sankalp Constructions",
  description: "Terms of Service for Sankalp Constructions",
};

export default function TermsOfService() {
  return (
    <div className="min-h-screen bg-gray-50/50 flex flex-col">
      <PageBanner
        title={<>Terms of <span className="text-[#29B1D2]">Service</span></>}
        subtitle="Read our terms and conditions for using our website and services."
        image="https://images.unsplash.com/photo-1450101499163-c8848c66cb85?auto=format&fit=crop&w=1600&q=80"
        breadcrumbs={[{ label: "Terms of Service" }]}
      />
      <div className="py-20 max-w-[1240px] mx-auto px-4 sm:px-6 lg:px-8 w-full">
        <div className="text-center mb-8 md:mb-12 flex flex-col items-center">
          <h1 className="text-2xl md:text-3xl lg:text-4xl font-bold text-primary mb-3">
            Terms of Service
          </h1>
          <Image src="/assets/Title-decorations.png" alt="Decoration" width={200} height={30} className="w-[150px] md:w-[200px] h-auto object-contain mt-1 mb-4" unoptimized />
          <p className="text-gray-600 text-sm md:text-base leading-relaxed">
            Last updated: May 2026
          </p>
        </div>
        
        <div className="bg-white shadow-xl rounded-2xl p-8 md:p-12 border border-gray-100">
          <div className="space-y-10">
            {termsOfService.map((section, index) => (
              <div key={index} className="group">
                <h2 className="text-2xl font-semibold text-gray-900 mb-4 group-hover:text-secondary transition-colors">
                  {section.title}
                </h2>
                <p className="text-gray-600 leading-relaxed text-lg">
                  {section.description}
                </p>
                {index !== termsOfService.length - 1 && (
                  <div className="h-px bg-gray-100 mt-10 w-full"></div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
