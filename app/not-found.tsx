import Link from "next/link";
import { Home } from "lucide-react";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Page Not Found | Sankalp Constructions",
  description: "The page you are looking for could not be found.",
};

export default function NotFound() {
  return (
    <div className="flex-grow flex items-center justify-center bg-gray-50 py-32 px-4 min-h-[70vh] relative overflow-hidden">
      
      {/* Decorative Background Elements */}
      <div className="absolute top-0 left-0 w-full h-1/2 bg-gradient-to-b from-white to-transparent pointer-events-none"></div>
      <div className="absolute -top-40 -right-40 w-96 h-96 bg-[#711113]/5 rounded-full blur-3xl pointer-events-none"></div>
      <div className="absolute -bottom-40 -left-40 w-96 h-96 bg-[#F5C33C]/5 rounded-full blur-3xl pointer-events-none"></div>

      <div className="max-w-2xl w-full text-center space-y-8 relative z-10">
        
        <h1 className="text-[8rem] md:text-[12rem] font-bold text-[#711113] leading-none tracking-tighter select-none">
          404
        </h1>
        
        <div className="space-y-4">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900">
            Page Not Found
          </h2>
          <p className="text-gray-600 max-w-md mx-auto text-lg">
            We couldn&apos;t find the page you&apos;re looking for. It might have been moved, deleted, or perhaps never existed.
          </p>
        </div>
        
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-center gap-4">
          <Link 
            href="/" 
            className="flex items-center gap-2 px-8 py-4 bg-[#711113] text-white font-medium hover:bg-[#520c0d] transition-all rounded-sm uppercase tracking-widest text-sm shadow-xl shadow-[#711113]/20 hover:shadow-[#711113]/40 hover:-translate-y-0.5"
          >
            <Home size={18} />
            Back to Home
          </Link>
        </div>

      </div>
    </div>
  );
}
