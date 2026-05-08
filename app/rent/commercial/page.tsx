import { constructMetadata } from "@/lib/seo";
import CommercialClient from "./CommercialClient";

export const metadata = constructMetadata({
  title: "Commercial Projects for Rent | Sankalp Constructions",
  description: "Explore prime commercial spaces available for rent by Sankalp Constructions.",
});

export default function CommercialPage() {
  return <CommercialClient />;
}
