import type { Metadata } from "next";

interface SEOProps {
  title: string;
  description: string;
  openGraph?: {
    images?: string[];
  };
}

export function constructMetadata({
  title,
  description,
  openGraph,
}: SEOProps): Metadata {
  return {
    title,
    description,
    openGraph: {
      title,
      description,
      type: "website",
      siteName: "Sankalp Constructions",
      images: openGraph?.images || [
        {
          url: "/assets/sankalp-logo.png",
          width: 1200,
          height: 630,
        },
      ],
      ...openGraph,
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: openGraph?.images || ["/assets/sankalp-logo.png"],
    },
  };
}
