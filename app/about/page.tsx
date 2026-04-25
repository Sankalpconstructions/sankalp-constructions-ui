import { constructMetadata } from "@/lib/seo";
import StorySection from "@/components/StorySection";

export const metadata = constructMetadata({
  title: "Our Story & Legacy | Sankalp Constructions",
  description: "Discover the legacy and vision of Sankalp Constructions. With over two decades of excellence, we craft premium real estate properties designed to elevate your everyday living. Learn about our journey, core values, and the milestones that define our commitment to unparalleled architectural quality.",
});

export default function AboutPage() {
  return (
    <div className="bg-white pt-20 md:pt-32 min-h-screen">
      <StorySection />
    </div>
  );
}
