import { constructMetadata } from "@/lib/seo";
import RentClient from "../RentClient";

export const metadata = constructMetadata({
  title: "Commercial Projects for Rent | Sankalp Constructions",
  description: "Explore prime commercial spaces and projects for rent by Sankalp Constructions.",
});

export default function CommercialPage() {
  return <RentClient rentType="commercial" />;
}
