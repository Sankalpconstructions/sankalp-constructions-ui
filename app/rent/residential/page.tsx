import { constructMetadata } from "@/lib/seo";
import ResidentialClient from "./ResidentialClient";

export const metadata = constructMetadata({
  title: "Residential Projects for Rent | Sankalp Constructions",
  description: "Explore premium residential projects for rent by Sankalp Constructions.",
});

export default function ResidentialPage() {
  return <ResidentialClient />;
}
