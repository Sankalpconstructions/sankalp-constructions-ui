import { constructMetadata } from "@/lib/seo";
import CSRClient from "./CSRClient";

export const metadata = constructMetadata({
  title: "Company Events & Life at Sankalp | Sankalp Constructions",
  description: "Discover life at Sankalp Constructions. Explore our official record of internal company activities, annual strategy meetings, festive celebrations, project launches, and team-building events. We believe that a strong, vibrant, and connected internal culture leads to exemplary exterior success. Browse through our event galleries, updates, and highlights that capture the true essence of our dynamic and engaged corporate family.",
});

export default function CSRPage() {
  return <CSRClient />;
}
