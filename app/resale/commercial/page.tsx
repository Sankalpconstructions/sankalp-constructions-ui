import { constructMetadata } from "@/lib/seo";
import CommercialClient from "./CommercialClient";

export const dynamic = "force-dynamic";

export const metadata = constructMetadata({
  title: "Commercial Projects for Resale | Sankalp Constructions",
  description: "Explore prime commercial spaces available for resale by Sankalp Constructions.",
});

import { redirect } from "next/navigation";

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3001";

export default async function CommercialPage() {
  try {
    const res = await fetch(`${API_BASE_URL}/api/config`, { cache: "no-store" });
    if (res.ok) {
      const config = await res.json();
      if (config.show_resale_commercial === false) {
        redirect("/");
      }
    }
  } catch (e) {
    console.error("Failed to check commercial resale config:", e);
  }

  return <CommercialClient />;
}
