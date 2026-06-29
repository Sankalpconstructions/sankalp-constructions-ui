"use client";
import { useState, useEffect } from "react";
import { MapPin, Phone, MessageCircle, Building2, Maximize, Compass, Home } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import PageBanner from "@/components/PageBanner";

interface ResaleProperty {
  id: string;
  title: string;
  location: string;
  image: string;
  sqft: string;
  facing: string;
  bhk?: string;
  phone: string;
  whatsapp: string;
  status: "available" | "sold";
}


export default function ResidentialClient() {
  const [properties, setProperties] = useState<ResaleProperty[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProperties = async () => {
      setLoading(true);
      try {
        const baseUrl = process.env.NEXT_PUBLIC_API_URL || (typeof window !== "undefined" ? `${window.location.protocol}//${window.location.hostname}:3001` : 'http://localhost:3001');
        const res = await fetch(`${baseUrl}/api/resale?type=residential`);
        const data = await res.json();
        // The API returns MongoDB models with _id, mapping it to id for the frontend
        const formattedData = Array.isArray(data) ? data.map(item => ({
          ...item,
          id: item._id || item.id
        })) : [];
        setProperties(formattedData);
      } catch (error) {
        console.error("Failed to fetch residential resale properties:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProperties();
  }, []);

  return (
    <div className="bg-[#f8f5f0] text-gray-900 min-h-screen">
      <PageBanner
        title={<>Residential <span className="text-[#29B1D2]">Resale</span></>}
        subtitle="Discover premium residential properties available for resale, designed to elevate your everyday living with world-class amenities."
        image="https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=1600"
        breadcrumbs={[
          { label: "Resale" },
          { label: "Residential" }
        ]}
      />

      <div className="container mx-auto px-4 lg:px-8 py-14">
        {loading ? (
          <div className="py-24 flex flex-col items-center justify-center text-gray-400">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#711113] mb-4"></div>
            <p className="uppercase tracking-[0.2em] font-bold text-xs text-[#711113]">Loading residential resale properties...</p>
          </div>
        ) : (
          <AnimatePresence mode="popLayout">
            {properties.length > 0 ? (
              <motion.div
                layout
                className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16"
              >
                {properties.map((property, index) => (
                  <motion.div
                    key={property.id}
                    layout
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.92 }}
                    transition={{ duration: 0.4, delay: index * 0.1 }}
                    className="bg-white rounded-2xl shadow-[0_4px_20px_-4px_rgba(0,0,0,0.05)] hover:shadow-[0_8px_30px_-4px_rgba(113,17,19,0.15)] transition-all duration-500 overflow-hidden group flex flex-col border border-gray-100"
                  >
                    <div className="relative h-64 overflow-hidden">
                      <img
                        src={property.image}
                        alt={property.title}
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700 ease-in-out"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />
                      
                      <span className="absolute top-4 left-4 bg-emerald-500 text-white text-[10px] font-bold uppercase tracking-widest px-3 py-1.5 rounded-full shadow-lg backdrop-blur-sm">
                        Available
                      </span>
                      
                      <div className="absolute bottom-4 left-4 right-4 flex items-center text-white/90 text-sm">
                        <MapPin size={14} className="text-[#29B1D2] mr-1.5 flex-shrink-0" />
                        <span className="truncate font-medium drop-shadow-md">{property.location}</span>
                      </div>
                    </div>

                    <div className="p-6 flex-1 flex flex-col">
                      <h3 className="text-xl font-extrabold text-gray-900 group-hover:text-[#711113] transition-colors mb-4 line-clamp-2">
                        {property.title}
                      </h3>
                      
                      <div className="grid grid-cols-2 gap-y-3 gap-x-2 mb-6 mt-auto">
                        <div className="flex items-center text-sm text-gray-600 bg-gray-50 py-2 px-3 rounded-lg border border-gray-100">
                          <Maximize size={14} className="text-[#711113] mr-2 opacity-70 flex-shrink-0" />
                          <span className="font-semibold truncate">{property.sqft}</span>
                        </div>
                        <div className="flex items-center text-sm text-gray-600 bg-gray-50 py-2 px-3 rounded-lg border border-gray-100">
                          <Compass size={14} className="text-[#711113] mr-2 opacity-70 flex-shrink-0" />
                          <span className="font-semibold truncate">{property.facing}</span>
                        </div>
                        {property.bhk && (
                          <div className="flex items-center text-sm text-gray-600 bg-gray-50 py-2 px-3 rounded-lg border border-gray-100 col-span-2">
                            <Home size={14} className="text-[#711113] mr-2 opacity-70 flex-shrink-0" />
                            <span className="font-semibold">{property.bhk} Type</span>
                          </div>
                        )}
                      </div>

                      <div className="grid grid-cols-2 gap-3 pt-4 border-t border-gray-100">
                        <a
                          href={`tel:${property.phone}`}
                          className="flex items-center justify-center gap-2 bg-[#f8f5f0] hover:bg-[#711113] text-[#711113] hover:text-white font-bold text-xs py-3 rounded-xl transition-all duration-300 shadow-sm"
                        >
                          <Phone size={14} /> Call Now
                        </a>
                        <a
                          href={`https://wa.me/${property.whatsapp.replace(/\+/g, "")}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center justify-center gap-2 bg-[#e8f7f0] hover:bg-[#25D366] text-[#128C7E] hover:text-white font-bold text-xs py-3 rounded-xl transition-all duration-300 shadow-sm"
                        >
                          <MessageCircle size={14} /> WhatsApp
                        </a>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </motion.div>
            ) : (
              <motion.div
                key="empty"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="py-32 text-center flex flex-col items-center justify-center gap-6 bg-white rounded-3xl shadow-sm border border-gray-100 max-w-2xl mx-auto"
              >
                <div className="w-24 h-24 bg-gray-50 rounded-full flex items-center justify-center">
                  <Building2 size={40} className="text-gray-300" />
                </div>
                <div>
                  <h3 className="text-2xl font-bold text-gray-800 mb-2">No Properties Available</h3>
                  <p className="text-gray-500 max-w-md mx-auto">
                    There are currently no residential properties listed for resale. Please check back later.
                  </p>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        )}
      </div>
    </div>
  );
}
