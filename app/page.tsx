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
import InstagramCarousel from "@/components/InstagramCarousel";

import { constructMetadata } from "@/lib/seo";

export const dynamic = "force-dynamic";

export const metadata = constructMetadata({
  title: "Sankalp Constructions | Premium Building & Development",
  description: "Welcome to Sankalp Constructions, where visionary architecture meets uncompromising quality. Experience a legacy of excellence as we shape the future of urban living with our meticulously designed residential and commercial projects. At Sankalp, we understand that a property is more than just a space—it is an experience, a lifestyle, and a lasting investment. From smart homes to eco-friendly retreats and corporate high-rises, our diverse portfolio is built around the modern needs of families and professionals alike. Discover unparalleled amenities, robust structural foundations, unparalleled natural views, and strategic locations that combine everyday convenience with absolute luxury, bringing your ultimate real estate dreams to life.",
});

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3001";

export default async function Home() {
  let config: Record<string, boolean> = {};
  try {
    const res = await fetch(`${API_BASE_URL}/api/config`, { cache: 'no-store' });
    if (res.ok) {
      config = await res.json();
    }
  } catch (err) {
    console.error("Failed to load page configurations:", err);
  }

  return (
    <>
      <Preloader />

      {config.show_hero_banner !== false ? (
        <HeroBanner />
      ) : (
        <div className="h-24 bg-white" />
      )}
      {config.show_story_section !== false && <StorySection />}
      {config.show_projects_showcase !== false && <ProjectsShowcase />}
      {config.show_testimonials_section === true && <TestimonialsSection />}
      
      {config.show_team_section !== false && <TeamSection />}
      {config.show_faq_section !== false && <FAQSection />}
      {config.show_live_updates_section !== false && <InstagramCarousel />}
      {config.show_contact_section !== false && <ContactSection />}

      {config.show_popup_lead_form !== false && <PopupLeadForm />}
      {config.show_chatbot !== false && <Chatbot />}
    </>
  );
}
