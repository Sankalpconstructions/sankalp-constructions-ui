import { constructMetadata } from "@/lib/seo";
import PageBanner from "@/components/PageBanner";
import StorySection from "@/components/StorySection";

export const dynamic = "force-dynamic";

export const metadata = constructMetadata({
  title: "Our Story & Legacy | Sankalp Constructions",
  description: "Discover the legacy and vision of Sankalp Constructions. With over two decades of excellence, we craft premium real estate properties designed to elevate your everyday living. Learn about our journey, core values, and the milestones that define our commitment to unparalleled architectural quality.",
});

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3001";

export default async function AboutPage() {
  let config: Record<string, boolean> = {};
  try {
    const res = await fetch(`${API_BASE_URL}/api/config`, { cache: 'no-store' });
    if (res.ok) {
      config = await res.json();
    }
  } catch (err) {
    console.error("Failed to load about page configurations:", err);
  }

  return (
    <div className="bg-white min-h-screen">
      {config.show_about_banner !== false ? (
        <PageBanner
          title={<>Our <span className="text-[#29B1D2]">Story</span></>}
          subtitle="Discover the legacy and vision that has shaped the skyline of Hyderabad since 2001."
          image="https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=1600"
          breadcrumbs={[{ label: "About Us" }]}
        />
      ) : (
        <div className="h-24 bg-white" />
      )}
      <StorySection variant="full" config={config} />
    </div>
  );
}
