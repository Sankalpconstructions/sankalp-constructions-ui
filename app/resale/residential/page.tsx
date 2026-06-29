import { constructMetadata } from "@/lib/seo";
import ResidentialClient from "./ResidentialClient";

export const dynamic = "force-dynamic";

export const metadata = constructMetadata({
  title: "Residential Projects for Resale | Sankalp Constructions",
  description: "Explore premium residential projects for resale by Sankalp Constructions.",
});

import { redirect } from "next/navigation";

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3001";

export default async function ResidentialPage() {
  try {
    const res = await fetch(`${API_BASE_URL}/api/config`, { cache: "no-store" });
    if (res.ok) {
      const config = await res.json();
      if (config.show_resale_residential === false) {
        redirect("/");
      }
    }
  } catch (e) {
    console.error("Failed to check residential resale config:", e);
  }

  return <ResidentialClient />;
}
