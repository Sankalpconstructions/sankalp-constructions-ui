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

export default async function ProjectDetailsServerPage() {
  return <ProjectDetailsClient />;
}
