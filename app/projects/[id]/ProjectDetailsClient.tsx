"use client";
import { useParams } from "next/navigation";
import Link from "next/link";
import AmenitiesSection from "@/components/AmenitiesSection";
import FloorPlansSection from "@/components/FloorPlansSection";
import ProjectBannerCarousel from "@/components/project-detail/ProjectBannerCarousel";
import ProjectDescription from "@/components/project-detail/ProjectDescription";
import ProjectPriceTable from "@/components/project-detail/ProjectPriceTable";
import ProjectGallery from "@/components/project-detail/ProjectGallery";
import ProjectLocation from "@/components/project-detail/ProjectLocation";
import ProjectSidebar from "@/components/project-detail/ProjectSidebar";

// ─── Static Project Data ─────────────────────────────────────────────────────
const projects = [
  {
    id: "1",
    title: "Sankalp Heights",
    location: "Banjara Hills, Hyderabad",
    address: "Road No. 12, Banjara Hills, Hyderabad",
    type: "Luxury Apartments",
    status: "Ongoing",
    possessionDate: "Dec 2026",
    totalFloors: "15",
    totalUnits: "120",
    rera: "P02400001234",
    description:
      "Sankalp Heights is a premium residential development designed for modern urban living with luxury amenities and elegant architecture.",
    highlights: [
      "Premium Clubhouse",
      "Swimming Pool",
      "Children Play Area",
      "24/7 Security",
    ],
    slides: [
      {
        image:
          "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=1600",
      },
      {
        image:
          "https://images.unsplash.com/photo-1600585154526-990dced4db0d?w=1600",
      },
    ],
    gallery: [
      "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=1600",
      "https://images.unsplash.com/photo-1600585154526-990dced4db0d?w=1600",
      "https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?w=1600",
    ],
    amenities: [
      "Gym",
      "Swimming Pool",
      "Clubhouse",
      "Indoor Games",
      "Landscaped Gardens",
    ],
    amenitiesCount: "25+",
    floorPlansCount: 4,
    configurations: [
      {
        configuration: "2 BHK",
        carpetArea: "1250 Sq.ft",
      },
      {
        configuration: "3 BHK",
        carpetArea: "1850 Sq.ft",
      },
    ],
    pricingRows: [
      {
        type: "2 BHK",
        area: "1250 Sq.ft",
        facing: "East",
      },
      {
        type: "3 BHK",
        area: "1850 Sq.ft",
        facing: "West",
      },
    ],
    nearbyLocations: [
      {
        name: "Metro Station",
        distance: "2 Km",
        category: "Transport",
      },
      {
        name: "International School",
        distance: "1.5 Km",
        category: "Education",
      },
    ],
    mapSrc: "Banjara Hills Hyderabad",
    brochureUrl: "/brochure.pdf",
  },
];

// ─── Page ─────────────────────────────────────────────────────────────────────
export default function ProjectDetailsPage() {
  const params = useParams();
  const id = params?.id as string;

  const project = projects.find((p) => p.id === id);

  const relatedProjects = projects
    .filter((p) => p.id !== id)
    .map((p) => ({
      id: p.id,
      title: p.title,
      location: p.location,
      type: p.type,
      image: p.slides[0]?.image,
    }));

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
    </div>
  );
}