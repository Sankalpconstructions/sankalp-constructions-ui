import { constructMetadata } from "@/lib/seo";
import BlogClient from "./BlogClient";
import { Suspense } from "react";

export const metadata = constructMetadata({
  title: "Blog & Insights | Sankalp Constructions",
  description: "Delve into the vibrant world of premium real estate, modern architecture, and strategic property investments by exploring the official Sankalp Constructions Blog and Insights page. Stay fully informed with our comprehensively researched articles, up-to-date market trend analyses, and practical, step-by-step home buying guides tailored meticulously for first-time buyers and seasoned investors alike. From dissecting the future of urban living, smart home technologies, and sustainable building materials to offering actionable advice on selecting the perfect luxury apartment or identifying high-yield commercial hubs, our carefully curated content equips you with all the vital knowledge required to make highly rewarding and intelligent real estate decisions.",
});

export default function BlogPage() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-gray-50 pt-24 animate-pulse"><div className="h-20 bg-gray-200"></div></div>}>
      <BlogClient />
    </Suspense>
  );
}
