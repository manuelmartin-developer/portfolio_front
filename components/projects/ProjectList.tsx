import { useEffect, useRef, useState } from "react";

import axios, { AxiosError } from "axios";
import { useSnackbar } from "notistack";
import { AnimatePresence } from "framer-motion";
import { useDraggable } from "react-use-draggable-scroll";

import styles from "./Project.module.scss";

import ProjectItem from "./ProjectItem";
import { useCursorStore } from "../../store/cursorStore";
import { Category } from "../admin/Categories/AdminCategories";
import { Project } from "../admin/Projects/AdminProjects";

const ProjectsList: React.FC<{
  data: Project[];
  categories: Category[];
}> = ({ data, categories }) => {
  // Refs
  const filtersButtonsRef = useRef<HTMLDivElement>(null);
  // Hooks
  const { enqueueSnackbar } = useSnackbar();
  const { events } = useDraggable(filtersButtonsRef as any);

  // Component states
  const [categorySelected, setCategorySelected] = useState<number | null>(null);
  const [projects, setProjects] = useState<Project[]>(data);

  // Store
  const { setCursorVariant, setCursorText } = useCursorStore();

  // Methods
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
    categorySelected !== null && onGetProjects();
  }, [categorySelected]);

  return (
    <>
      <div className={styles.filters}>
        <div
          className={styles.filters__buttons}
          ref={filtersButtonsRef}
          {...events}
        >
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
                {category.project_count || 0}
              </span>
            </button>
          ))}
        </div>
        <span className={styles.filters__overlay}></span>
      </div>
      <ul className={styles.card_list}>
        <AnimatePresence mode="popLayout">
          {projects?.map((project) => (
            <ProjectItem key={project.id_project} project={project} />
          ))}
        </AnimatePresence>
      </ul>
    </>
  );
};

export default ProjectsList;
