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
  const project = projectData[id];

  if (!project) {
    return constructMetadata({
      title: "Project Not Found | Sankalp Constructions",
      description: "The requested project could not be found.",
    });
  }

  return constructMetadata({
    title: `${project.title} - ${project.type} in ${project.location} | Sankalp Constructions`,
    description: `Immerse yourself in the exceptional lifestyle offered by ${project.title}, our premier real estate development located in the highly sought-after area of ${project.location}. Showcasing masterfully engineered ${project.type} properties, this project goes far beyond traditional housing to provide a comprehensive, ultra-modern living environment tailored for perfection. Whether you are actively looking for an ideal primary residence or a highly lucrative investment opportunity, you will profoundly appreciate our state-of-the-art structural specifications, meticulously curated green landscapes, and world-class integrated amenities. Enjoy comprehensive, multi-tiered security, effortless modern conveniences, and a vibrant community atmosphere that perfectly reflects Sankalp Constructions' unwavering commitment to ultimate residential luxury, long-lasting sustainability, and extraordinary architectural quality.`,
    openGraph: {
      images: [project.slides[0]?.image || ""],
    },
  });
}

export default async function ProjectDetailsServerPage() {
  return <ProjectDetailsClient />;
}
