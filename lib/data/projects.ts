export const projectData: Record<string, {
  title: string;
  location: string;
  address: string;
  type: string;
  status: string;
  possessionDate: string;
  totalFloors: string;
  totalUnits: string;
  rera: string;
  description: string;
  highlights: string[];
  slides: { image: string }[];
  gallery: { src: string; title: string; description?: string }[];
  pricingRows: { type: string; area: string; facing?: string }[];
  nearbyLocations: { name: string; distance: string; category: string }[];
  mapSrc: string;
}> = {
  "1": {
    title: "Sankalp Heights",
    location: "Pune West",
    address: "Survey No. 42, Baner Road, Pune West, Maharashtra 411045",
    type: "3 BHK Premium",
    status: "Under Construction",
    possessionDate: "December 2026",
    totalFloors: "G + 22",
    totalUnits: "240 Units",
    rera: "P52100045678",
    description: "Sankalp Heights defines modern urban living. Enjoy breathtaking views of the city skyline, coupled with world-class amenities and premium finishes in every corner of your home. Meticulously planned for the discerning homeowner who values both comfort and aesthetics.",
    highlights: [
      "Earthquake Resistant RCC Structure",
      "100% Power Backup",
      "Vastu Compliant Layouts",
      "Premium Italian Marble Flooring",
      "Smart Home Automation",
      "Private Sky Decks",
      "EV Charging Stations",
      "Rooftop Infinity Pool",
    ],
    slides: [
      { image: "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=1600" },
      { image: "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=1600" },
      { image: "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=1600" },
    ],
    gallery: [
      { src: "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=800", title: "Exterior View", description: "Stunning tower facade at dusk" },
      { src: "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=800", title: "Living Room", description: "Spacious 3 BHK living area" },
      { src: "https://images.unsplash.com/photo-1631049307264-da0ec9d70304?w=800", title: "Master Bedroom", description: "Premium finishes and ample light" },
      { src: "https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=800", title: "Modular Kitchen", description: "Fully equipped with appliances" },
      { src: "https://images.unsplash.com/photo-1600585154526-990dced4db0d?w=800", title: "Terrace Garden", description: "Landscaped relaxation zone" },
      { src: "https://images.unsplash.com/photo-1568605114967-8130f3a36994?w=800", title: "Building Lobby", description: "Grand entrance with 24/7 concierge" },
    ],
    pricingRows: [
      { type: "2 BHK", area: "1,050 – 1,150 sq.ft." },
      { type: "3 BHK Compact", area: "1,350 – 1,450 sq.ft." },
      { type: "3 BHK Premium", area: "1,550 – 1,700 sq.ft." },
      { type: "3.5 BHK", area: "1,800 sq.ft." },
    ],
    nearbyLocations: [
      { name: "Symbiosis International University", distance: "1.2 km", category: "School" },
      { name: "Ruby Hall Clinic", distance: "2.5 km", category: "Hospital" },
      { name: "Phoenix Marketcity", distance: "3.0 km", category: "Mall" },
      { name: "Baner Bus Stop", distance: "0.4 km", category: "Transport" },
      { name: "Mainland China Restaurant", distance: "0.8 km", category: "Restaurant" },
      { name: "Pune International Airport", distance: "18 km", category: "Transport" },
    ],
    mapSrc: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d121059.04360434052!2d73.79292695574514!3d18.52460355325785!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bc2bf2e67461101%3A0x828d43bf9d9ee343!2sPune%2C%20Maharashtra!5e0!3m2!1sen!2sin!4v1711204052445!5m2!1sen!2sin",
  },
  "2": {
    title: "Sankalp Oasis",
    location: "Pune East",
    address: "Wagholi, Pune East, Maharashtra 412207",
    type: "2 & 3 BHK Apartments",
    status: "Ready to Move",
    possessionDate: "March 2025",
    totalFloors: "G + 18",
    totalUnits: "320 Units",
    rera: "P52100056781",
    description: "A seamless blend of nature and architecture. Sankalp Oasis provides a refreshing escape from the hustle of the city, featuring serene landscapes and eco-friendly designs.",
    highlights: [
      "Landscaped Central Garden",
      "Eco-Friendly Construction",
      "Rainwater Harvesting",
      "Solar Powered Common Areas",
      "Jogging & Cycling Track",
      "Senior Citizen Zone",
      "Kids Play Area",
      "Organic Waste Management",
    ],
    slides: [
      { image: "https://images.unsplash.com/photo-1515263487990-61b07816b324?w=1600" },
      { image: "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=1600" },
    ],
    gallery: [
      { src: "https://images.unsplash.com/photo-1515263487990-61b07816b324?w=800", title: "Green Facade" },
      { src: "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=800", title: "Living Area" },
      { src: "https://images.unsplash.com/photo-1631049307264-da0ec9d70304?w=800", title: "Bedroom" },
    ],
    pricingRows: [
      { type: "2 BHK", area: "950 – 1,050 sq.ft." },
      { type: "3 BHK", area: "1,250 – 1,450 sq.ft." },
    ],
    nearbyLocations: [
      { name: "Delhi Public School", distance: "1.0 km", category: "School" },
      { name: "Sahyadri Hospital", distance: "3.0 km", category: "Hospital" },
      { name: "Inorbit Mall Viman Nagar", distance: "5.0 km", category: "Mall" },
      { name: "Wagholi Bus Depot", distance: "0.5 km", category: "Transport" },
    ],
    mapSrc: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d121059.04360434052!2d73.79292695574514!3d18.52460355325785!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bc2bf2e67461101%3A0x828d43bf9d9ee343!2sPune%2C%20Maharashtra!5e0!3m2!1sen!2sin!4v1711204052445!5m2!1sen!2sin",
  },
  "3": {
    title: "Sankalp Residency",
    location: "Central Pune",
    address: "Camp Area, Camp, Pune, Maharashtra 411001",
    type: "4 BHK Luxury",
    status: "Under Construction",
    possessionDate: "June 2027",
    totalFloors: "G + 30",
    totalUnits: "180 Units",
    rera: "P52100067890",
    description: "Located in the heart of the city, Sankalp Residency offers unmatched connectivity without compromising on peace and luxury. Designed for those who demand the finest.",
    highlights: [
      "Central Location",
      "Concierge Service",
      "Helipad on Rooftop",
      "Private Elevators",
      "Temperature Controlled Pool",
      "Wine Cellar & Lounge",
      "Smart Security System",
      "Personal Parking",
    ],
    slides: [
      { image: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=1600" },
      { image: "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=1600" },
    ],
    gallery: [
      { src: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800", title: "Luxury Exterior" },
      { src: "https://images.unsplash.com/photo-1608429835892-30be51ea4d6c?w=800", title: "Penthouse Living" },
    ],
    pricingRows: [
      { type: "3 BHK", area: "1,800 – 2,000 sq.ft." },
      { type: "4 BHK", area: "2,200 – 2,500 sq.ft." },
      { type: "Penthouse", area: "3,500+ sq.ft." },
    ],
    nearbyLocations: [
      { name: "Bishop's School", distance: "0.8 km", category: "School" },
      { name: "KEM Hospital", distance: "1.5 km", category: "Hospital" },
      { name: "Dorabjee's Mall", distance: "0.6 km", category: "Mall" },
      { name: "Pune Railway Station", distance: "2.0 km", category: "Transport" },
    ],
    mapSrc: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d121059.04360434052!2d73.79292695574514!3d18.52460355325785!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bc2bf2e67461101%3A0x828d43bf9d9ee343!2sPune%2C%20Maharashtra!5e0!3m2!1sen!2sin!4v1711204052445!5m2!1sen!2sin",
  },
  "4": {
    title: "Sankalp Greens",
    location: "Hinjewadi",
    address: "Phase 1, Hinjewadi, Pune, Maharashtra 411057",
    type: "2 BHK Smart Homes",
    status: "Under Construction",
    possessionDate: "September 2026",
    totalFloors: "G + 14",
    totalUnits: "450 Units",
    rera: "P52100078901",
    description: "Step into the future with Sankalp Greens. Boasting fully integrated smart home technologies, this property is the perfect choice for the modern IT professional.",
    highlights: [
      "Smart Home Automation",
      "Proximity to IT Hubs",
      "High-Speed Internet",
      "Shuttle to Tech Parks",
      "Co-Working Space",
      "EV Charging Points",
      "Grocery & Cafe On-site",
      "Gym & Sports Facilities",
    ],
    slides: [
      { image: "https://images.unsplash.com/photo-1628611225249-6c3c7c689552?w=1600" },
    ],
    gallery: [
      { src: "https://images.unsplash.com/photo-1628611225249-6c3c7c689552?w=800", title: "Smart Home Interior" },
    ],
    pricingRows: [
      { type: "1 BHK", area: "600 – 700 sq.ft." },
      { type: "2 BHK", area: "900 – 1,050 sq.ft." },
    ],
    nearbyLocations: [
      { name: "Orchid School", distance: "1.5 km", category: "School" },
      { name: "Jupiter Hospital", distance: "4.0 km", category: "Hospital" },
      { name: "Westend Mall", distance: "3.5 km", category: "Mall" },
      { name: "Hinjewadi Phase 1 Bus Stop", distance: "0.3 km", category: "Transport" },
    ],
    mapSrc: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d121059.04360434052!2d73.79292695574514!3d18.52460355325785!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bc2bf2e67461101%3A0x828d43bf9d9ee343!2sPune%2C%20Maharashtra!5e0!3m2!1sen!2sin!4v1711204052445!5m2!1sen!2sin",
  },
  "5": {
    title: "Sankalp Villas",
    location: "Lonavala",
    address: "Kusgaon Budruk, Lonavala, Maharashtra 410401",
    type: "5 BHK Villas",
    status: "Ready to Move",
    possessionDate: "Available Now",
    totalFloors: "G + 2 (Individual Villas)",
    totalUnits: "42 Villas",
    rera: "P52100089012",
    description: "Your private retreat in the hills. Sankalp Villas offer ultra-luxury living spaces complete with private pools, expansive gardens, and uninterrupted mountain views.",
    highlights: [
      "Private Swimming Pool",
      "Sprawling Garden",
      "Mountain & Valley Views",
      "24/7 Gated Security",
      "Home Theatre Room",
      "Private Garage (4-car)",
      "Staff Quarters",
      "Fully Equipped Modular Kitchen",
    ],
    slides: [
      { image: "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=1600" },
      { image: "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=1600" },
    ],
    gallery: [
      { src: "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=800", title: "Villa Exterior" },
      { src: "https://images.unsplash.com/photo-1540518614846-7eded433c457?w=800", title: "Private Pool" },
    ],
    pricingRows: [
      { type: "4 BHK Villa", area: "3,500 sq.ft." },
      { type: "5 BHK Villa", area: "4,500 sq.ft." },
      { type: "6 BHK Grand Villa", area: "6,000+ sq.ft." },
    ],
    nearbyLocations: [
      { name: "Lonavala Market", distance: "2.0 km", category: "Mall" },
      { name: "Bhushi Dam", distance: "3.5 km", category: "Restaurant" },
      { name: "Lonavala Railway Station", distance: "1.8 km", category: "Transport" },
      { name: "Yashwantrao Chavan Hospital", distance: "4.0 km", category: "Hospital" },
    ],
    mapSrc: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d121059.04360434052!2d73.79292695574514!3d18.52460355325785!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bc2bf2e67461101%3A0x828d43bf9d9ee343!2sPune%2C%20Maharashtra!5e0!3m2!1sen!2sin!4v1711204052445!5m2!1sen!2sin",
  },
};

export const ALL_PROJECTS = [
  { id: "1", title: "Sankalp Heights", location: "Pune West", type: "3 BHK Premium", image: "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=800" },
  { id: "2", title: "Sankalp Oasis", location: "Pune East", type: "2 & 3 BHK", image: "https://images.unsplash.com/photo-1515263487990-61b07816b324?w=800" },
  { id: "3", title: "Sankalp Residency", location: "Central Pune", type: "4 BHK Luxury", image: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800" },
  { id: "4", title: "Sankalp Greens", location: "Hinjewadi", type: "2 BHK Smart Homes", image: "https://images.unsplash.com/photo-1628611225249-6c3c7c689552?w=800" },
  { id: "5", title: "Sankalp Villas", location: "Lonavala", type: "5 BHK Villas", image: "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=800" },
];
