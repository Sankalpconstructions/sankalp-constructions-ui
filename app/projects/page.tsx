import { constructMetadata } from "@/lib/seo";
import ProjectsClient from "./ProjectsClient";

export const metadata = constructMetadata({
  title: "Explore Premium Real Estate Projects | Sankalp Constructions",
  description: "Browse our expansive and exclusive portfolio of premium residential and commercial real estate projects designed to elevate your everyday living. At Sankalp Constructions, we blend world-class architectural standards with thoughtful urban planning. Whether you are looking for luxurious multi-bedroom apartments, expansive standalone villas offering private pools and uninterrupted nature views, or forward-thinking smart homes equipped with the latest automation technology, you will find a project that resonates with your aspirations. Dive into comprehensive property details, master plans, pricing insights, possession timelines, and world-class integrated amenities built directly within the premises to provide residents with an ecosystem of ultimate physical wellness, holistic relaxation, and absolute community engagement.",
});

export default function ProjectsPage() {
  return <ProjectsClient />;
}
