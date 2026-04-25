import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { ProjectProvider } from "@/context/ProjectContext";
import ScrollToTop from "@/components/ScrollToTop";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Sankalp Constructions | Premium Real Estate",
  description: "Discover the unparalleled excellence of Sankalp Constructions, where we craft premium, future-ready real estate properties designed to elevate your everyday living. Boasting a robust and versatile portfolio spanning luxurious residential apartments, peaceful eco-friendly villas, and state-of-the-art commercial hubs, our developments seamlessly combine cutting-edge modern design, sustainable architecture, and exclusive, resort-like amenities. We are relentlessly committed to delivering dynamic, vibrant structural spaces that cater specifically to the sophisticated lifestyle demands of modern families and professionals, ensuring that every investment not only provides immense comfort and unparalleled security but also guarantees exceptional long-term financial growth and holistic community well-being.",
  keywords: "real estate, premium apartments, Sankalp Constructions, properties, modern homes",
  icons: {
    icon: "/favicon.ico",
    apple: "/favicon.ico",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${geistSans.variable} ${geistMono.variable} scroll-smooth antialiased h-full`}>
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1" />
      </head>
      <body className="min-h-full flex flex-col bg-white text-gray-900 override">
        <ProjectProvider>
          <ScrollToTop />
          {children}
        </ProjectProvider>
      </body>
    </html>
  );
}
