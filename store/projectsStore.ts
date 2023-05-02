import { create } from "zustand";
import { IProject } from "../public/assets/data/data";
import { projectsData } from "../public/assets/data/data";

interface ProjectsStore {
  projects: IProject[];
  setProjects: (projects: IProject[]) => void;
  categorySelected: string;
  setCategorySelected: (categorySelected: string) => void;
  projectSelected: IProject | null;
  setProjectSelected: (projectSelected: IProject | null) => void;
}

export const useProjectsStore = create<ProjectsStore>((set) => ({
  projects: projectsData,
  setProjects: (projects: IProject[]) => set({ projects }),
  categorySelected: "All",
  setCategorySelected: (categorySelected: string) => set({ categorySelected }),
  projectSelected: null,
  setProjectSelected: (projectSelected: IProject | null) =>
    set({ projectSelected })
}));
