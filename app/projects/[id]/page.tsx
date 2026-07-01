import { constructMetadata } from "@/lib/seo";
import { projectData } from "@/lib/data/projects";
import ProjectDetailsClient from "./ProjectDetailsClient";
import type { Metadata } from "next";

interface Props {
  params: Promise<{ id: string }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const resolvedParams = await params;
  const id = resolvedParams.id;

  const baseUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001';
  let project = null;

  try {
    const res = await fetch(`${baseUrl}/api/projects/${id}`);
    if (res.ok) {
      project = await res.json();
    }
  } catch (error) {
    console.error("Error fetching project metadata:", error);
  }

  if (!project) {
    return constructMetadata({
      title: "Project Not Found | Sankalp Constructions",
      description: "The requested project could not be found.",
    });
  }

  const title = project.title || "Project";
  const type = project.type || "Properties";
  const location = project.location || "Prime Location";
  const description = project.description || `Immerse yourself in the exceptional lifestyle offered by ${title}, our premier real estate development located in the highly sought-after area of ${location}. Showcasing masterfully engineered ${type} properties, this project goes far beyond traditional housing to provide a comprehensive, ultra-modern living environment tailored for perfection. Whether you are actively looking for an ideal primary residence or a highly lucrative investment opportunity, you will profoundly appreciate our state-of-the-art structural specifications, meticulously curated green landscapes, and world-class integrated amenities. Enjoy comprehensive, multi-tiered security, effortless modern conveniences, and a vibrant community atmosphere that perfectly reflects Sankalp Constructions' unwavering commitment to ultimate residential luxury, long-lasting sustainability, and extraordinary architectural quality.`;
  const image = project.banners?.[0] || project.image || "";

  return constructMetadata({
    title: `${title} - ${type} in ${location} | Sankalp Constructions`,
    description,
    openGraph: {
      images: [image],
    },
  });
}

export default async function ProjectDetailsServerPage({ params }: Props) {
  const resolvedParams = await params;
  const id = resolvedParams.id;
  const baseUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001';

  let project = null;
  let relatedProjects = [];

  try {
    // 1. Fetch specific project
    const res = await fetch(`${baseUrl}/api/projects/${id}`, { cache: 'no-store' });
    if (res.ok) {
      const data = await res.json();
      project = {
        ...data,
        id: data._id,
        slides: data.banners?.map((b: string, i: number) => ({ image: b, mobileImage: data.mobileBanners?.[i] })) || [{ image: data.image || "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=1600" }],
        gallery: data.gallery || [],
        pricingRows: (data.priceConfigurations || [])
          .filter((pc: any) => 
            pc.configuration?.trim() || pc.carpetArea?.trim() || pc.superBuiltUpArea?.trim() || pc.udsSqYards?.trim()
          )
          .map((pc: any) => ({
            type: pc.configuration,
            area: pc.carpetArea,
            superBuiltUpArea: pc.superBuiltUpArea,
            udsSqYards: pc.udsSqYards,
            facing: pc.price
          })),
        configurations: data.priceConfigurations || [],
        floorPlans: data.floorPlans || [],
        nearbyLocations: data.landmarks?.map((lm: any) => ({
          name: lm.text,
          distance: "",
          category: lm.type
        })) || [],
        floorPlansCount: data.floorPlans?.length || 0,
        brochureUrl: data.brochures?.[0]?.url || "",
        address: data.address || data.location
      };
    }

    // 2. Fetch related projects
    const allRes = await fetch(`${baseUrl}/api/projects?minimal=true`, { cache: 'no-store' });
    if (allRes.ok) {
      const allData = await allRes.json();
      relatedProjects = allData
        .filter((p: any) => p._id !== id)
        .slice(0, 3)
        .map((p: any) => ({
          id: p._id,
          title: p.title,
          location: p.location,
          type: p.type,
          image: p.banners?.[0] || p.image || "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=1600",
        }));
    }
  } catch (err) {
    console.error("Error fetching project data in server component:", err);
  }

  return <ProjectDetailsClient initialProject={project} initialRelated={relatedProjects} />;
}
