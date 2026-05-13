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
export default function ProjectDetailsPage() {
  const params = useParams();
  const id = params?.id as string;

  const [project, setProject] = useState<any>(null);
  const [relatedProjects, setRelatedProjects] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    const fetchProjectData = async () => {
      try {
        const baseUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001';
        // Fetch specific project
        const res = await fetch(`${baseUrl}/api/projects/${id}`);
        if (!res.ok) throw new Error("Project not found");
        const data = await res.json();
        
        // Format to match frontend structure
        const formattedProject = {
          ...data,
          id: data._id,
          slides: data.banners?.map((b: string) => ({ image: b })) || [{ image: data.image || "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=1600" }],
          gallery: data.gallery || [],
          pricingRows: data.priceConfigurations?.map((pc: any) => ({
            type: pc.configuration,
            area: pc.carpetArea,
            superBuiltUpArea: pc.superBuiltUpArea,
            facing: pc.price // or adjust this mapping as necessary
          })) || [],
          configurations: data.priceConfigurations || [],
          nearbyLocations: data.landmarks?.map((lm: any) => ({
            name: lm.text,
            distance: "",
            category: lm.type
          })) || [],
          floorPlansCount: data.floorPlans?.length || 0,
          brochureUrl: data.brochures?.[0]?.url || "",
          address: data.address || data.location
        };
        
        setProject(formattedProject);

        // Fetch all projects for related
        const allRes = await fetch(`${baseUrl}/api/projects`);
        if (allRes.ok) {
          const allData = await allRes.json();
          const related = allData
            .filter((p: any) => p._id !== id)
            .slice(0, 3)
            .map((p: any) => ({
              id: p._id,
              title: p.title,
              location: p.location,
              type: p.type,
              image: p.banners?.[0] || p.image || "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=1600",
            }));
          setRelatedProjects(related);
        }
      } catch (err) {
        console.error(err);
        setError(true);
      } finally {
        setLoading(false);
      }
    };
    if (id) {
      fetchProjectData();
    }
  }, [id]);

  if (loading) {
    return (
      <div className="min-h-screen bg-white flex flex-col items-center justify-center">
        <p className="text-gray-500 font-bold uppercase tracking-widest text-xs">
          Loading Project...
        </p>
      </div>
    );
  }

  if (error || !project) {
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
      <div className="pt-0">
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

            <ProjectPriceTable
              projectTitle={project.title}
              rows={project.pricingRows}
            />

            <AmenitiesSection
              items={project.amenities}
              amenitiesCount={project.amenitiesCount}
            />

            <FloorPlansSection
              projectTitle={project.title}
              overviewImg={project.slides?.[0]?.image}
              floorPlansCount={project.floorPlansCount}
              configurations={project.configurations}
            />

            <ProjectGallery images={project.gallery} />

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