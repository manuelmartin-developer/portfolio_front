import { create } from "zustand";
import { Project } from "../components/admin/Projects/AdminProjects";

interface ProjectsStore {
  projectSelected: Project | null;
  setProjectSelected: (projectSelected: Project | null) => void;
}

export const useProjectsStore = create<ProjectsStore>((set) => ({
  projectSelected: null,
  setProjectSelected: (projectSelected: Project | null) =>
    set({ projectSelected })
}));
