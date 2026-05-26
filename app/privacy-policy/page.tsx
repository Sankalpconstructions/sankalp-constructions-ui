import React from 'react';
import PageBanner from "@/components/PageBanner";

export const privacyPolicy = [
  {
    title: "Information We Collect",
    description: "We may collect personal information such as your name, phone number, email address, and property preferences when you submit enquiries or contact us through the website."
  },
  {
    title: "How We Use Information",
    description: "The collected information is used to respond to enquiries, provide project updates, improve customer service, and share relevant property or promotional information related to Sankalp Constructions."
  },
  {
    title: "Data Protection",
    description: "Sankalp Constructions takes reasonable security measures to protect your personal information from unauthorized access, misuse, or disclosure."
  },
  {
    title: "Cookies and Tracking",
    description: "Our website may use cookies and analytics tools to improve user experience, track website performance, and understand visitor interactions."
  },
  {
    title: "Third-Party Services",
    description: "We may use trusted third-party services such as social media integrations, analytics tools, or marketing platforms. These services may collect limited information according to their own privacy policies."
  },
  {
    title: "Sharing of Information",
    description: "Sankalp Constructions does not sell or rent user personal information to third parties. Information may only be shared when required by law or for essential business operations."
  },
  {
    title: "User Rights",
    description: "Users may request access, correction, or deletion of their personal information by contacting Sankalp Constructions directly through the provided contact details."
  },
  {
    title: "Policy Updates",
    description: "This Privacy Policy may be updated periodically to reflect changes in business practices, legal requirements, or website functionality."
  }
];

export const metadata = {
  title: "Privacy Policy | Sankalp Constructions",
  description: "Privacy Policy for Sankalp Constructions",
};

export default function PrivacyPolicy() {
  return (
    <div className="min-h-screen bg-gray-50/50 flex flex-col">
      <PageBanner
        title={<>Privacy <span className="text-[#29B1D2]">Policy</span></>}
        subtitle="Learn how we collect, use, and protect your personal information."
        image="https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=1600&q=80"
        breadcrumbs={[{ label: "Privacy Policy" }]}
      />
      <div className="py-20 max-w-[1240px] mx-auto px-4 sm:px-6 lg:px-8 w-full">
        <div className="text-center mb-8 md:mb-12 flex flex-col items-center">
          <h1 className="text-2xl md:text-3xl lg:text-4xl font-bold text-primary mb-3">
            Privacy Policy
          </h1>
          <img src="/assets/Title-decorations.png" alt="Decoration" className="w-[150px] md:w-[200px] h-auto object-contain mt-1 mb-4" />
          <p className="text-gray-600 text-sm md:text-base leading-relaxed">
            Last updated: May 2026
          </p>
        </div>
        
        <div className="bg-white shadow-xl rounded-2xl p-8 md:p-12 border border-gray-100">
          <div className="space-y-10">
            {privacyPolicy.map((section, index) => (
              <div key={index} className="group">
                <h2 className="text-2xl font-semibold text-gray-900 mb-4 group-hover:text-secondary transition-colors">
                  {section.title}
                </h2>
                <p className="text-gray-600 leading-relaxed text-lg">
                  {section.description}
                </p>
                {index !== privacyPolicy.length - 1 && (
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
