"use client";
import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  useRef,
} from "react";

const API_BASE_URL =
  process.env.NEXT_PUBLIC_API_URL || (typeof window !== "undefined" ? `${window.location.protocol}//${window.location.hostname}:3001` : "http://localhost:3001");

// ─── Types ────────────────────────────────────────────────────────────────────

export interface Project {
  _id: string;
  id: string;
  title: string;
  location: string;
  image: string;
  mobileImage?: string;
  type: string;
  status: string;
  configurations: string[];
}

export interface Testimonial {
  _id: string;
  name: string;
  role: string;
  quote: string;
  rating: number;
  avatar: string;
}

export interface TeamMember {
  _id: string;
  name: string;
  role: string;
  image: string;
}

interface AppDataContextType {
  projects: Project[];
  testimonials: Testimonial[];
  team: TeamMember[];
  /** true once ALL prefetch calls have settled (success or error) */
  isReady: boolean;
}

// ─── Context ──────────────────────────────────────────────────────────────────

const AppDataContext = createContext<AppDataContextType>({
  projects: [],
  testimonials: [],
  team: [],
  isReady: false,
});

// ─── Provider ─────────────────────────────────────────────────────────────────

export const AppDataProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [projects, setProjects] = useState<Project[]>([]);
  const [testimonials, setTestimonials] = useState<Testimonial[]>([]);
  const [team, setTeam] = useState<TeamMember[]>([]);
  const [isReady, setIsReady] = useState(false);

  // Prevent double-fetch in StrictMode
  const hasFetched = useRef(false);

  useEffect(() => {
    if (hasFetched.current) return;
    hasFetched.current = true;

    const fetchProjects = fetch(`${API_BASE_URL}/api/projects?minimal=true`)
      .then((r) => (r.ok ? r.json() : []))
      .then((data: any[]) => {
        const formatted: Project[] = data.map((p) => ({
          _id: p._id || p.id,
          id: p._id || p.id,
          title: p.title,
          location: p.location,
          image:
            (p.mobileBanners && p.mobileBanners.length > 0 ? p.mobileBanners[0] : null) ||
            p.mainImage ||
            p.image ||
            "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=800",
          type: p.type,
          status: p.status,
          configurations:
            p.priceConfigurations?.map((pc: any) => pc.configuration) || [],
        }));
        setProjects(formatted);
      })
      .catch((err) => console.error("[AppData] projects fetch failed:", err));

    const fetchTestimonials = fetch(`${API_BASE_URL}/api/testimonials`)
      .then((r) => (r.ok ? r.json() : []))
      .then((data: Testimonial[]) => setTestimonials(data))
      .catch((err) =>
        console.error("[AppData] testimonials fetch failed:", err)
      );

    const fetchTeam = fetch(`${API_BASE_URL}/api/team`)
      .then((r) => (r.ok ? r.json() : []))
      .then((data: TeamMember[]) => setTeam(data))
      .catch((err) => console.error("[AppData] team fetch failed:", err));

    // When ALL three settle → mark ready
    Promise.allSettled([fetchProjects, fetchTestimonials, fetchTeam]).then(
      () => setIsReady(true)
    );
  }, []);

  return (
    <AppDataContext.Provider value={{ projects, testimonials, team, isReady }}>
      {children}
    </AppDataContext.Provider>
  );
};

// ─── Hook ─────────────────────────────────────────────────────────────────────

export const useAppData = () => useContext(AppDataContext);
