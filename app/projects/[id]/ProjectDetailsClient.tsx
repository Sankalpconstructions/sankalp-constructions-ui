"use client";
import { useParams } from "next/navigation";
import { useState, useEffect } from "react";
import Link from "next/link";
import AmenitiesSection from "@/components/AmenitiesSection";
import FloorPlansSection from "@/components/FloorPlansSection";
import ProjectBannerCarousel from "@/components/project-detail/ProjectBannerCarousel";
import ProjectDescription from "@/components/project-detail/ProjectDescription";
import ProjectPriceTable from "@/components/project-detail/ProjectPriceTable";
import ProjectGallery from "@/components/project-detail/ProjectGallery";
import ProjectLocation from "@/components/project-detail/ProjectLocation";
import ProjectSidebar from "@/components/project-detail/ProjectSidebar";

// ─── Page ─────────────────────────────────────────────────────────────────────
export default function ProjectDetailsPage({ 
  initialProject, 
  initialRelated 
}: { 
  initialProject?: any, 
  initialRelated?: any[] 
}) {
  const [project, setProject] = useState<any>(initialProject || null);
  const [relatedProjects, setRelatedProjects] = useState<any[]>(initialRelated || []);

  if (!project) {
    return (
      <div className="min-h-screen bg-white flex flex-col items-center justify-center">
        <p className="text-red-500 font-bold uppercase tracking-widest text-xs">
          Project not found
        </p>

        <Link
          href="/projects"
          className="mt-4 text-[#711113] hover:underline uppercase text-xs font-bold tracking-widest"
        >
          Back to All Projects
        </Link>
      </div>
    );
  }

  return (
    <div className="bg-white">
      <div className="pt-[88px]">
        <ProjectBannerCarousel
          slides={project.slides}
          title={project.title}
          location={project.location}
          type={project.type}
        />
      </div>

      <div className="container mx-auto px-4 lg:px-8 py-8 md:py-12">
        <div className="flex flex-col lg:grid lg:grid-cols-[1fr_320px] xl:grid-cols-[1fr_360px] gap-10 items-start">
          <div className="min-w-0 w-full order-1">
            <ProjectGallery images={project.gallery} projectTitle={project.title} />

            <ProjectDescription
              description={project.description}
              highlights={project.highlights}
              status={project.status}
              possessionDate={project.possessionDate}
              totalFloors={project.totalFloors}
              totalUnits={project.totalUnits}
              rera={project.rera}
              projectTitle={project.title}
              brochureUrl={project.brochureUrl}
            />

            {project.pricingRows && project.pricingRows.length > 0 && (
              <ProjectPriceTable
                projectTitle={project.title}
                rows={project.pricingRows}
              />
            )}

            <AmenitiesSection
              items={project.amenities}
              amenitiesCount={project.amenitiesCount}
            />

            { (project.status?.toLowerCase() === "ongoing" || project.status?.toLowerCase() === "upcoming") && (
              <FloorPlansSection
                projectTitle={project.title}
                overviewImg={project.slides?.[0]?.image}
                floorPlansCount={project.floorPlansCount}
                floorPlans={project.floorPlans}
                configurations={project.configurations}
              />
            )}

            <ProjectLocation
              mapSrc={project.mapSrc}
              address={project.address}
              nearbyLocations={project.nearbyLocations}
            />
          </div>

          <div className="w-full lg:w-auto lg:sticky lg:top-28 order-2">
            <ProjectSidebar
              projectTitle={project.title}
              status={project.status}
              possessionDate={project.possessionDate}
              totalFloors={project.totalFloors}
              totalUnits={project.totalUnits}
              rera={project.rera}
              relatedProjects={relatedProjects}
              brochureUrl={project.brochureUrl}
            />
          </div>
        </div>
      </div>
    </div>
  );
}