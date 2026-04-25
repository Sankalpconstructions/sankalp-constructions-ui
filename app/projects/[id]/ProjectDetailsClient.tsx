"use client";
import { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";
import { Loader2 } from "lucide-react";
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

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3001";

export default function ProjectDetailsPage() {
  const params = useParams();
  const id = params?.id as string;

  const [project, setProject] = useState<any>(null);
  const [relatedProjects, setRelatedProjects] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!id) return;

    const fetchProjectData = async () => {
      try {
        setLoading(true);
        // Fetch specific project
        const projectRes = await fetch(`${API_BASE_URL}/api/projects/${id}`);
        if (!projectRes.ok) throw new Error("Project not found");
        const rawProject = await projectRes.json();

        // Fetch all projects for "Related Projects" sidebar
        const allRes = await fetch(`${API_BASE_URL}/api/projects`);
        let related = [];
        if (allRes.ok) {
          const allData = await allRes.json();
          related = allData
            .filter((p: any) => p._id !== id)
            .map((p: any) => ({
              id: p._id,
              title: p.title,
              location: p.location,
              type: p.type,
              image: p.image || (p.banners && p.banners[0]) || "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=1600"
            }))
            .slice(0, 4);
        }

        // Map API project to UI structure
        const mappedProject = {
          title: rawProject.title,
          location: rawProject.location,
          address: rawProject.address || rawProject.location,
          type: rawProject.type,
          status: rawProject.status,
          possessionDate: rawProject.possessionDate || "TBA",
          totalFloors: rawProject.totalFloors || "N/A",
          totalUnits: rawProject.totalUnits || "N/A",
          rera: rawProject.rera || "TBA",
          description: rawProject.description,
          highlights: rawProject.highlights || [],
          slides: (rawProject.banners || []).map((img: string) => ({ image: img })),
          gallery: (rawProject.gallery && rawProject.gallery.length > 0) 
            ? rawProject.gallery 
            : (rawProject.banners || []),
          amenities: rawProject.amenities || [],
          amenitiesCount: rawProject.amenitiesCount || "",
          floorPlansCount: rawProject.floorPlansCount || 0,
          configurations: rawProject.priceConfigurations || [],
          pricingRows: (rawProject.priceConfigurations || []).map((p: any) => ({
            type: p.configuration,
            area: p.carpetArea,
            facing: ""
          })),
          nearbyLocations: (rawProject.landmarks || []).map((l: any) => ({
            name: l.name || l.text,
            distance: l.distance || l.text,
            category: l.category || l.type || "Other"
          })),
          mapSrc: rawProject.mapSrc || rawProject.location, // Use address as fallback for map logic
          brochureUrl: rawProject.brochures?.[0]?.url || ""
        };

        setProject(mappedProject);
        setRelatedProjects(related);
        setError(null);
      } catch (err: any) {
        console.error("Error fetching project details:", err);
        setError("Project details could not be loaded.");
      } finally {
        setLoading(false);
      }
    };

    fetchProjectData();
  }, [id]);

  if (loading) {
    return (
      <div className="min-h-screen bg-white flex flex-col items-center justify-center">
        <Header />
        <Loader2 className="animate-spin text-[#711113] mb-4" size={48} />
        <p className="uppercase tracking-[0.25em] font-bold text-[10px] text-gray-400">Loading project details...</p>
      </div>
    );
  }

  if (error || !project) {
    return (
      <div className="min-h-screen bg-white flex flex-col items-center justify-center">
        <Header />
        <p className="text-red-500 font-bold uppercase tracking-widest text-xs">{error || "Project not found"}</p>
        <Link href="/projects" className="mt-4 text-[#711113] hover:underline uppercase text-xs font-bold tracking-widest">Back to All Projects</Link>
      </div>
    );
  }

  return (
    <main className="min-h-screen bg-white">
      <Header />

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

            <AmenitiesSection items={project.amenities} amenitiesCount={project.amenitiesCount} />

            <FloorPlansSection
              projectTitle={project.title}
              overviewImg={project.slides[0]?.image}
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

      <ContactFloating />
      <ScrollController />
      <Footer />
    </main>
  );
}
