import { constructMetadata } from "@/lib/seo";
import CommercialClient from "./CommercialClient";

export const dynamic = "force-dynamic";

export const metadata = constructMetadata({
  title: "Commercial Projects for Rent | Sankalp Constructions",
  description: "Explore prime commercial spaces available for rent by Sankalp Constructions.",
});

import { redirect } from "next/navigation";

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3001";

export default async function CommercialPage() {
  try {
    const res = await fetch(`${API_BASE_URL}/api/config`, { cache: "no-store" });
    if (res.ok) {
      const config = await res.json();
      if (config.show_rental_commercial === false) {
        redirect("/");
      }
    }
  } catch (e) {
    console.error("Failed to check commercial config:", e);
  }

  return <CommercialClient />;
}
