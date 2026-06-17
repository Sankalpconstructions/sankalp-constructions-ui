import { constructMetadata } from "@/lib/seo";
import CSRClient from "./CSRClient";

export const dynamic = "force-dynamic";

export const metadata = constructMetadata({
  title: "Company Events & Life at Sankalp | Sankalp Constructions",
  description: "Discover life at Sankalp Constructions. Explore our official record of internal company activities, annual strategy meetings, festive celebrations, project launches, and team-building events. We believe that a strong, vibrant, and connected internal culture leads to exemplary exterior success. Browse through our event galleries, updates, and highlights that capture the true essence of our dynamic and engaged corporate family.",
});

import { redirect } from "next/navigation";

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3001";

export default async function CSRPage() {
  try {
    const res = await fetch(`${API_BASE_URL}/api/config`, { cache: "no-store" });
    if (res.ok) {
      const config = await res.json();
      if (config.show_csr_page === false) {
        redirect("/");
      }
    }
  } catch (e) {
    console.error("Failed to check CSR config:", e);
  }

  return <CSRClient />;
}
