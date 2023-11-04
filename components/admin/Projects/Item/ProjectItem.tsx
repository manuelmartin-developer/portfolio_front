import ConfirmTooltip from "../../../UI/Tooltips/ConfirmTooltip";
import styles from "./ProjectItem.module.scss";
import { AiFillDelete } from "react-icons/ai";
import { AiFillEdit } from "react-icons/ai";
import axios, { AxiosError } from "axios";
import { useSnackbar } from "notistack";
import { useCursorStore } from "../../../../store/cursorStore";
import { motion } from "framer-motion";
import { Project } from "../AdminProjects";

const ProjectItem: React.FC<{
  project: Project;
  setProjects: React.Dispatch<React.SetStateAction<Project[] | undefined>>;
  setIsEditingProject: React.Dispatch<React.SetStateAction<boolean>>;
  setProjectInFocus: React.Dispatch<React.SetStateAction<Project | null>>;
}> = ({ project, setProjects, setProjectInFocus, setIsEditingProject }) => {
  // Hooks
  const { enqueueSnackbar } = useSnackbar();

  // Store
  const { setCursorVariant } = useCursorStore();

  // Methods
  const onEnterButton = () => {
    setCursorVariant("dot");
  };

  const onLeave = () => {
    setCursorVariant("default");
  };

  const onHandleDelete = async () => {
    const URL = `${process.env.NEXT_PUBLIC_API_URL}/projects/${project?.code}`;
    const token = localStorage.getItem("admin_token");
    const config = {
      headers: { Authorization: `Bearer ${token}` }
    };

    try {
      const response = await axios.delete(URL, config);
      if (response.status === 200) {
        setProjects(response.data.projects);
        enqueueSnackbar("Proyecto eliminado", { variant: "success" });
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

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3 }}
      className={`${styles.projectItem} ${
        project.isDraft ? styles.projectItem__draft : ""
      }`}
    >
      <h3 className={styles.projectItem__title}>{project.title}</h3>
      <p className={styles.projectItem__categories}>
        {project &&
          project.categories &&
          project.categories.length > 0 &&
          project.categories?.map((category) => (
            <span key={category.code} style={{ marginRight: "0.5rem" }}>
              {category.name}
            </span>
          ))}
      </p>
      <p className={styles.projectItem__date}>
        <span>Fecha de creación: </span>
        {new Date(project.createdAt).toLocaleDateString()}
      </p>
      <p className={styles.projectItem__date}>
        <span>Última actualización: </span>
        {new Date(project.updatedAt).toLocaleDateString()}
      </p>
      <div className={styles.projectItem__actions}>
        <button
          className={styles.projectItem__button}
          onMouseEnter={onEnterButton}
          onMouseLeave={onLeave}
          onClick={() => {
            setProjectInFocus(project);
            setIsEditingProject(true);
          }}
        >
          <AiFillEdit />
        </button>
        <ConfirmTooltip
          confirmText="¿Estás seguro de eliminar este project?"
          onConfirm={() => onHandleDelete()}
        >
          <button
            className={styles.projectItem__button}
            onMouseEnter={onEnterButton}
            onMouseLeave={onLeave}
          >
            <AiFillDelete />
          </button>
        </ConfirmTooltip>
      </div>
    </motion.div>
  );
};

export default ProjectItem;
