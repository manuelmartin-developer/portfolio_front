import { create } from "zustand";
import { ProjectData } from "../public/assets/data/data";
import { projectsData } from "../public/assets/data/data";

interface ProjectsStore {
  projects: ProjectData[];
  setProjects: (projects: ProjectData[]) => void;
  categorySelected: string;
  setCategorySelected: (categorySelected: string) => void;
  projectSelected: ProjectData | null;
  setProjectSelected: (projectSelected: ProjectData | null) => void;
}

export const useProjectsStore = create<ProjectsStore>((set) => ({
  projects: projectsData,
  setProjects: (projects: ProjectData[]) => set({ projects }),
  categorySelected: "All",
  setCategorySelected: (categorySelected: string) => set({ categorySelected }),
  projectSelected: null,
  setProjectSelected: (projectSelected: ProjectData | null) =>
    set({ projectSelected })
}));
