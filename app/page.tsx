import Preloader from "@/components/Preloader";
import HeroBanner from "@/components/HeroBanner";
import StorySection from "@/components/StorySection";
import ProjectsShowcase from "@/components/ProjectsShowcase";
import TestimonialsSection from "@/components/TestimonialsSection";
import TeamSection from "@/components/TeamSection";
import FAQSection from "@/components/FAQSection";
import ContactSection from "@/components/ContactSection";
import PopupLeadForm from "@/components/PopupLeadForm";
import Chatbot from "@/components/Chatbot";

import { constructMetadata } from "@/lib/seo";

export const metadata = constructMetadata({
  title: "Sankalp Constructions | Premium Building & Development",
  description: "Welcome to Sankalp Constructions, where visionary architecture meets uncompromising quality. Experience a legacy of excellence as we shape the future of urban living with our meticulously designed residential and commercial projects. At Sankalp, we understand that a property is more than just a space—it is an experience, a lifestyle, and a lasting investment. From smart homes to eco-friendly retreats and corporate high-rises, our diverse portfolio is built around the modern needs of families and professionals alike. Discover unparalleled amenities, robust structural foundations, unparalleled natural views, and strategic locations that combine everyday convenience with absolute luxury, bringing your ultimate real estate dreams to life.",
});

export default function Home() {
  return (
    <>
      <Preloader />
      
      <HeroBanner />
      <StorySection />
      <ProjectsShowcase />
      <TestimonialsSection />
      <TeamSection />
      <FAQSection />
      <ContactSection />
      
      <div id="filter" className="bg-white py-12" />
      
      {/* Utility components */}
      <PopupLeadForm />
      <Chatbot />
    </>
  );
}
