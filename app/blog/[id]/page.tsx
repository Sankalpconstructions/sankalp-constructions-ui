import { constructMetadata } from "@/lib/seo";
import { blogData } from "@/lib/data/blogs";
import BlogDetailsClient from "./BlogDetailsClient";
import type { Metadata } from "next";

interface Props {
  params: Promise<{ id: string }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const resolvedParams = await params;
  const id = resolvedParams.id;
  const blog = blogData[id];

  if (!blog) {
    return constructMetadata({
      title: "Blog Not Found | Sankalp Constructions",
      description: "The requested blog article or insight could not be found.",
    });
  }

  return constructMetadata({
    title: `${blog.title} | Sankalp Constructions Blog`,
    description: `Dive deeply into our comprehensive coverage of ${blog.title}, where our expert real estate associates bring you the most detailed insights available today. Exploring critical trends across the ${blog.category} sector, this comprehensive blog offers forward-thinking strategies and unique perspectives explicitly formulated for both new homebuyers and seasoned property investors. With a strong emphasis on architectural excellence, modern utility, economic factors, and long-term viability, Sankalp Constructions guarantees you receive actionable and precise knowledge to confidently navigate the ever-evolving premium residential and commercial markets. Join us as we uncover exactly what drives sustainable success and remarkable property value.`,
    openGraph: {
      images: [blog.image],
    },
  });
}

export default async function BlogDetailsServerPage() {
  return <BlogDetailsClient />;
}
