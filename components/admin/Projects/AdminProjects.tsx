import { useEffect, useState } from "react";
import dynamic from "next/dynamic";

import axios, { AxiosError } from "axios";
import { useSnackbar } from "notistack";
import TextButton from "../../UI/Buttons/TextButton";
// Dynamic imports
const ProjectList = dynamic(() => import("../Projects/List/ProjectList"));
const ProjectForm = dynamic(() => import("../Projects/Form/ProjectForm"));

export type ProjectImage = {
  url: string;
  name: string;
  size: number;
  width?: number;
  height?: number;
};

export interface Project {
  code: string;
  id_project: number;
  title: string;
  categories: {
    code: number;
    name: string;
  }[];

  backgroundColor: string;
  color: string;
  isSideProject: boolean;
  hasComponent: boolean;
  url: string;
  paragraphs: string[];
  role: string;
  featuredImage: { url: string; name: string; size: number };
  gallery: {
    url: string;
    name: string;
    size: number;
    width: number;
    height: number;
  }[];
  technologies: {
    code: string;
    name: string;
  }[];
  isDraft: boolean;
  createdAt: string;
  updatedAt: string;
}

const AdminProjects: React.FC<{
  isAddingProject: boolean;
  setIsAddingProject: React.Dispatch<React.SetStateAction<boolean>>;
}> = ({ isAddingProject, setIsAddingProject }) => {
  // Hooks
  const { enqueueSnackbar } = useSnackbar();

  // Component states
  const [projects, setProjects] = useState<Project[]>();
  const [isEditingProject, setIsEditingProject] = useState<boolean>(false);
  const [projectInFocus, setProjectInFocus] = useState<Project | null>(null);

  // Methods
  const onGetProjects = async () => {
    const URL = `${process.env.NEXT_PUBLIC_API_URL}/projects/admin`;
    const token = localStorage.getItem("admin_token");
    const config = {
      headers: { Authorization: `Bearer ${token}` }
    };

    try {
      const response = await axios.get(URL, config);
      if (response.status === 200) {
        setProjects(response.data.projects);
      }
    } catch (error) {
      const axiosError = error as AxiosError;
      if (axiosError && axiosError.response?.data) {
        const errorData: any = axiosError.response.data;
        enqueueSnackbar(
          errorData.errorData?.message || "Ha ocurrido un error",
          { variant: "error" }
        );
      }
    }
  };

  const onAddEmptyProyect = async () => {
    const URL = `${process.env.NEXT_PUBLIC_API_URL}/projects`;
    const token = localStorage.getItem("admin_token");
    const config = {
      headers: { Authorization: `Bearer ${token}` }
    };

    const payload = {
      title: "",
      code: "",
      categories: [],
      backgroundColor: "",
      color: "",
      isSideProject: false,
      url: "",
      paragraphs: [],
      role: "",
      featuredImage: {},
      gallery: [],
      technologies: [],
      isDraft: true
    };

    try {
      const response = await axios.post(URL, payload, config);
      if (response.status === 201) {
        enqueueSnackbar("Borrador de proyecto creado", { variant: "success" });
        setProjectInFocus(response.data.project);
        setIsAddingProject(true);
      }
    } catch (error) {
      const axiosError = error as AxiosError;
      if (axiosError && axiosError.response?.data) {
        const errorData: any = axiosError.response.data;
        enqueueSnackbar(
          errorData.errorData?.message || "Ha ocurrido un error",
          { variant: "error" }
        );
      }
    }
  };

  // Component Lifecycle
  useEffect(() => {
    !isAddingProject && !isEditingProject && onGetProjects();
  }, [isAddingProject, isEditingProject]);
  return (
    <>
      {!isAddingProject && !isEditingProject && (
        <TextButton
          text="Agregar proyecto"
          onClick={() => !isAddingProject && onAddEmptyProyect()}
          isDisabled={isAddingProject || isEditingProject}
        />
      )}

      {!isAddingProject && !isEditingProject && (
        <ProjectList
          projects={projects}
          setProjects={setProjects}
          setIsEditingProject={setIsEditingProject}
          setProjectInFocus={setProjectInFocus}
        />
      )}
      {(isAddingProject || isEditingProject) && (
        <ProjectForm
          projectInFocus={projectInFocus}
          isAddingProject={isAddingProject}
          setIsAddingProject={setIsAddingProject}
          isEditingProject={isEditingProject}
          setIsEditingProject={setIsEditingProject}
        />
      )}
    </>
  );
};

export default AdminProjects;
