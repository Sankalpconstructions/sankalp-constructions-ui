import Header from "@/components/Header";
import Preloader from "@/components/Preloader";
import HeroBanner from "@/components/HeroBanner";
import StorySection from "@/components/StorySection";
import ProjectsShowcase from "@/components/ProjectsShowcase";
import TestimonialsSection from "@/components/TestimonialsSection";
import TeamSection from "@/components/TeamSection";
import FAQSection from "@/components/FAQSection";
import ContactSection from "@/components/ContactSection";
import PopupLeadForm from "@/components/PopupLeadForm";
import ContactFloating from "@/components/ContactFloating";
import ScrollController from "@/components/ScrollController";
import Chatbot from "@/components/Chatbot";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <main className="relative min-h-screen">
      <Preloader />
      <Header />
      
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
      <ContactFloating />
      <ScrollController />
      <Chatbot />
      
      <Footer />
    </main>
  );
}
