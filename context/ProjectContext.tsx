"use client";
import React, { createContext, useContext } from "react";
import { useAppData } from "@/context/AppDataContext";
import type { Project } from "@/context/AppDataContext";

// Re-export Project type for backwards compatibility
export type { Project };

interface ProjectContextType {
  projects: Project[];
  loading: boolean;
}

const ProjectContext = createContext<ProjectContextType>({
  projects: [],
  loading: true,
});

export const ProjectProvider = ({ children }: { children: React.ReactNode }) => {
  // Delegate to AppDataContext — no duplicate fetch!
  const { projects, isReady } = useAppData();

  return (
    <ProjectContext.Provider value={{ projects, loading: !isReady }}>
      {children}
    </ProjectContext.Provider>
  );
};

export const useProjects = () => useContext(ProjectContext);

