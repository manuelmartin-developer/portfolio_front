import { create } from "zustand";
import { Project } from "../components/admin/Projects/AdminProjects";

interface ProjectsStore {
  projects: Project[];
  setProjects: (projects: Project[]) => void;
  projectSelected: Project | null;
  setProjectSelected: (projectSelected: Project | null) => void;
}

export const useProjectsStore = create<ProjectsStore>((set) => ({
  projects: [],
  setProjects: (projects: Project[]) => set({ projects }),
  projectSelected: null,
  setProjectSelected: (projectSelected: Project | null) =>
    set({ projectSelected })
}));
