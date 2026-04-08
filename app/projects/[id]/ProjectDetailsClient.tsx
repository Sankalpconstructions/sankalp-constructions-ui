"use client";
import { useParams } from "next/navigation";
import ContactFloating from "@/components/ContactFloating";
import ScrollController from "@/components/ScrollController";
import Footer from "@/components/Footer";
import Header from "@/components/Header";
import AmenitiesSection from "@/components/AmenitiesSection";
import FloorPlansSection from "@/components/FloorPlansSection";
import ProjectBannerCarousel from "@/components/project-detail/ProjectBannerCarousel";
import ProjectDescription from "@/components/project-detail/ProjectDescription";
import ProjectPriceTable from "@/components/project-detail/ProjectPriceTable";
import ProjectGallery from "@/components/project-detail/ProjectGallery";
import ProjectLocation from "@/components/project-detail/ProjectLocation";
import ProjectSidebar from "@/components/project-detail/ProjectSidebar";

// ─── Project Data ─────────────────────────────────────────────────────────────
import { projectData, ALL_PROJECTS } from "@/lib/data/projects";

export default function ProjectDetailsPage() {
  const params = useParams();
  const id = (params?.id as string) || "1";
  const project = projectData[id] || projectData["1"];

  // Related = all except current (max 4 for sidebar carousel)
  const related = ALL_PROJECTS.filter((p) => p.id !== id);
  const sidebarRelated = related.slice(0, 4);

  return (
    <main className="min-h-screen bg-white">
      {/* Sticky Header */}
      <Header />

      {/* Banner Carousel — full width */}
      <div className="pt-0">
        <ProjectBannerCarousel
          slides={project.slides}
          title={project.title}
          location={project.location}
          type={project.type}
        />
      </div>

      {/* ── Two-Column Layout: Main Content + Sidebar ── */}
      <div className="container mx-auto px-4 lg:px-8 py-8 md:py-12">
        <div className="flex flex-col lg:grid lg:grid-cols-[1fr_320px] xl:grid-cols-[1fr_360px] gap-10 items-start">

          {/* ── Left: Main Content ── */}
          <div className="min-w-0 w-full order-1">
            {/* Description + Key Highlights */}
            <ProjectDescription
              description={project.description}
              highlights={project.highlights}
              status={project.status}
              possessionDate={project.possessionDate}
              totalFloors={project.totalFloors}
              totalUnits={project.totalUnits}
              rera={project.rera}
              projectTitle={project.title}
            />

            {/* Price Table */}
            <ProjectPriceTable
              projectTitle={project.title}
              rows={project.pricingRows}
            />

            {/* Amenities */}
            <AmenitiesSection projectId={id} />

            {/* Floor Plans */}
            <FloorPlansSection
              projectTitle={project.title}
              overviewImg={project.slides[0]?.image}
            />

            {/* Gallery */}
            <ProjectGallery images={project.gallery} />

            {/* Location */}
            <ProjectLocation
              mapSrc={project.mapSrc}
              address={project.address}
              nearbyLocations={project.nearbyLocations}
            />
          </div>

          {/* ── Right: Sidebar (shown below content on mobile, sticky on desktop) ── */}
          <div className="w-full lg:w-auto lg:sticky lg:top-28 order-2">
            <ProjectSidebar
              projectTitle={project.title}
              status={project.status}
              possessionDate={project.possessionDate}
              totalFloors={project.totalFloors}
              totalUnits={project.totalUnits}
              rera={project.rera}
              relatedProjects={sidebarRelated}
            />
          </div>
        </div>
      </div>



      <ContactFloating />
      <ScrollController />
      <Footer />
    </main>
  );
}
