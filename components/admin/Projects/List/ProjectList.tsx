import { AnimatePresence, motion } from "framer-motion";
import styles from "./ProjectList.module.scss";
import ProjectItem from "../Item/ProjectItem";
import { Project } from "../AdminProjects";

const ProjectList: React.FC<{
  projects: Project[] | undefined;
  setProjects: React.Dispatch<React.SetStateAction<Project[] | undefined>>;
  setIsEditingProject: React.Dispatch<React.SetStateAction<boolean>>;
  setProjectInFocus: React.Dispatch<React.SetStateAction<Project | null>>;
}> = ({ projects, setProjects, setProjectInFocus, setIsEditingProject }) => {
  return (
    <div className={styles.projectList_container}>
      <AnimatePresence mode="popLayout">
        {projects &&
          projects?.length > 0 &&
          projects.map((project: any) => (
            <ProjectItem
              key={project.code}
              project={project}
              setProjects={setProjects}
              setProjectInFocus={setProjectInFocus}
              setIsEditingProject={setIsEditingProject}
            />
          ))}
        {projects?.length === 0 && (
          <motion.p
            key="empty"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className={styles.projectList_container__empty}
          >
            No hay proyectos
          </motion.p>
        )}
      </AnimatePresence>
    </div>
  );
};

export default ProjectList;
