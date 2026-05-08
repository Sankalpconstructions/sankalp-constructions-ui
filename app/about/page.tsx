import { constructMetadata } from "@/lib/seo";
import PageBanner from "@/components/PageBanner";
import StorySection from "@/components/StorySection";

export const metadata = constructMetadata({
  title: "Our Story & Legacy | Sankalp Constructions",
  description: "Discover the legacy and vision of Sankalp Constructions. With over two decades of excellence, we craft premium real estate properties designed to elevate your everyday living. Learn about our journey, core values, and the milestones that define our commitment to unparalleled architectural quality.",
});

export default function AboutPage() {
  return (
    <div className="bg-white min-h-screen">
      <PageBanner
        title={<>Our <span className="text-[#29B1D2]">Story</span></>}
        subtitle="Discover the legacy and vision that has shaped the skyline of Hyderabad since 2001."
        image="https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=1600"
        breadcrumbs={[{ label: "About Us" }]}
      />
      <StorySection variant="full" />
    </div>
  );
}
