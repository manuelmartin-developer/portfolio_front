import { useRef } from "react";

import { AnimatePresence, motion, useInView } from "framer-motion";

import styles from "./Project.module.scss";

import { useCursorStore } from "../../store/cursorStore";
import { useProjectsStore } from "../../store/projectsStore";
import { Project } from "../admin/Projects/AdminProjects";
import Image from "next/image";

const ProjectItem: React.FC<{
  project: Project;
}> = ({ project }) => {
  // Const
  const { id_project, title, categories, color } = project;
  // Refs
  const cardRef = useRef<HTMLLIElement>(null);

  // InView
  const isCardInView = useInView(cardRef, { once: true });

  // Store
  const { setCursorVariant } = useCursorStore();
  const { projectSelected, setProjectSelected } = useProjectsStore();

  // Methods
  const onEnterLink = () => {
    setCursorVariant("link_small");
  };

  const onLeaveLink = () => {
    setCursorVariant("default");
  };

  return (
    <motion.li
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 20 }}
      transition={{ duration: 0.3 }}
      className={styles.card}
      ref={cardRef}
      style={{
        opacity: isCardInView ? 1 : 0,
        transform: isCardInView ? "translateY(0)" : "translateY(20px)"
      }}
      onMouseEnter={onEnterLink}
      onMouseLeave={onLeaveLink}
      onClick={() => {
        setProjectSelected(project);
      }}
    >
      <div className={styles.card_content_container}>
        <motion.div
          className={styles.card_content}
          layoutId={`card-container-${id_project}`}
        >
          <motion.div
            className={styles.card_image_container}
            layoutId={`card-image-container-${id_project}`}
          >
            <Image
              className={styles.card_image}
              src={project.featuredImage?.url}
              alt={project.title}
              width={800}
              height={450}
            />
          </motion.div>
          <AnimatePresence mode="wait">
            {!projectSelected && (
              <motion.div
                className={styles.title_container}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.5, delay: 0.5 }}
              >
                <span
                  className={styles.category}
                  style={{
                    color: color ? color : ""
                  }}
                >
                  {categories &&
                    categories.length > 0 &&
                    categories.map((category) => category.name).join(" / ")}
                </span>
                <h2
                  style={{
                    color: color ? color : ""
                  }}
                >
                  {title}
                </h2>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      </div>
    </motion.li>
  );
};

export default ProjectItem;
