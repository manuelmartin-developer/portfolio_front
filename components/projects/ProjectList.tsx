import { useEffect, useState } from "react";

import axios, { AxiosError } from "axios";
import { useSnackbar } from "notistack";
import { AnimatePresence } from "framer-motion";

import styles from "./Project.module.scss";

import ProjectItem from "./ProjectItem";
import { useProjectsStore } from "../../store/projectsStore";
import { useCursorStore } from "../../store/cursorStore";
import { Category } from "../admin/Categories/AdminCategories";
import { Project } from "../admin/Projects/AdminProjects";

const ProjectsList = () => {
  const { enqueueSnackbar } = useSnackbar();

  // Component states
  const [categories, setCategories] = useState<Category[]>([]);
  const [initialProjects, setInitialProjects] = useState<Project[]>([]);
  const [categorySelected, setCategorySelected] = useState<number>(0);

  // Store
  const { projects, setProjects } = useProjectsStore();
  const { setCursorVariant, setCursorText } = useCursorStore();

  // Methods
  const onGetProjectCategories = async () => {
    const URL = `${process.env.NEXT_PUBLIC_API_URL}/categories/?type=project`;
    const token = localStorage.getItem("admin_token");
    const config = {
      headers: { Authorization: `Bearer ${token}` }
    };

    try {
      const response = await axios.get(URL, config);
      if (response.status === 200) {
        setCategories(response.data.categories);
      }
    } catch (error) {
      const axiosError = error as AxiosError;
      if (axiosError && axiosError.response?.data) {
        const errorData: any = axiosError.response.data;
        enqueueSnackbar(errorData.message || "Ha ocurrido un error", {
          variant: "error"
        });
      }
    }
  };
  const onGetProjects = async () => {
    const URL = `${process.env.NEXT_PUBLIC_API_URL}/projects/${
      categorySelected ? `?id_category=${categorySelected}` : ""
    }`;
    const token = localStorage.getItem("admin_token");
    const config = {
      headers: { Authorization: `Bearer ${token}` }
    };

    try {
      const response = await axios.get(URL, config);
      if (response.status === 200) {
        setProjects(response.data.projects);
        !initialProjects.length && setInitialProjects(response.data.projects);
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

  const getCategoryCount = (id_category: number) => {
    return initialProjects
      .map((project) => {
        return project.categories?.filter(
          (category) => category.code === id_category
        );
      })
      .filter((project) => project.length > 0).length;
  };

  const onEnterLink = () => {
    setCursorVariant("link");
  };

  const onEnterSelected = () => {
    setCursorVariant("link");
    setCursorText("Clear filter");
  };

  const onLeaveLink = () => {
    setCursorVariant("default");
    setCursorText("");
  };

  // Component Lifecycle
  useEffect(() => {
    onGetProjectCategories();
  }, []);

  useEffect(() => {
    onGetProjects();
  }, [categorySelected]);

  return (
    <>
      <div className={styles.filters}>
        {categories?.map((category) => (
          <button
            aria-label="Filter projects"
            className={`${styles.filters_item} ${
              category.id_category === categorySelected
                ? styles.filters_item_active
                : ""
            }`}
            key={category.id_category}
            onClick={() => {
              category.id_category !== categorySelected
                ? setCategorySelected(category.id_category)
                : setCategorySelected(0);
            }}
            onMouseEnter={
              category.id_category === categorySelected
                ? onEnterSelected
                : onEnterLink
            }
            onMouseLeave={onLeaveLink}
          >
            {category.name}
            <span className={styles.filters_item__count}>
              {category.id_category !== 0
                ? getCategoryCount(category.id_category)
                : projects.length}
            </span>
          </button>
        ))}
      </div>
      <ul className={styles.card_list}>
        <AnimatePresence mode="popLayout">
          {projects.map((project) => (
            <ProjectItem key={project.id_project} project={project} />
          ))}
        </AnimatePresence>
      </ul>
    </>
  );
};

export default ProjectsList;
