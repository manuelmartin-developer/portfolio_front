import dynamic from "next/dynamic";

import { motion } from "framer-motion";
import { DeviceFrameset } from "react-device-frameset";

import styles from "./Project.module.scss";
import { useProjectsStore } from "../../store/projectsStore";
import { CgClose } from "@react-icons/all-files/cg/CgClose";

// Dynamic imports
const Project = dynamic(() => import("./Project"), { ssr: false });

const ProjectContent = () => {
  // Store
  const { projectSelected, setProjectSelected } = useProjectsStore();

  return (
    <motion.div className={`${styles.card_content_container} ${styles.open}`}>
      <motion.div
        className={styles.card_content}
        layoutId={`card-container-${projectSelected?.id_project}`}
        style={{
          backgroundColor: projectSelected?.backgroundColor
        }}
      >
        <motion.button
          className={styles.closeBtn}
          onClick={() => setProjectSelected(null)}
          whileHover={{ scale: 1.2, rotate: 90 }}
          whileTap={{
            scale: 0.8,
            rotate: -90,
            borderRadius: "100%"
          }}
          style={{
            borderColor: projectSelected?.color || ""
          }}
        >
          <CgClose
            color={projectSelected?.color || "rgba(255, 255, 255, 0.5)"}
          />
        </motion.button>
        <motion.div
          className={`${styles.card_image_container} ${styles.open}`}
          layoutId={`card-image-container-${projectSelected?.id_project}`}
        >
          <img
            className={styles.card_image}
            src={projectSelected?.featuredImage.url}
            alt={projectSelected?.title}
          />
        </motion.div>
        <motion.div
          className={`${styles.title_container} ${styles.open}`}
          layoutId={`title-container-${projectSelected?.id_project}`}
        >
          <motion.span
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.5 }}
            style={{
              color: projectSelected?.color || ""
            }}
          >
            {projectSelected?.categories &&
              projectSelected?.categories.length > 0 &&
              projectSelected?.categories.map((category, index) => {
                return (
                  <span key={category.code}>
                    {category.name}
                    {index < projectSelected?.categories.length - 1 && (
                      <span> / </span>
                    )}
                  </span>
                );
              })}
          </motion.span>
          <motion.h2
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.5 }}
            style={{
              color: projectSelected?.color || ""
            }}
          >
            {projectSelected?.title}
          </motion.h2>
          <motion.div
            initial={{ opacity: 0, width: 0 }}
            whileInView={{ opacity: 1, width: "100%" }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 1 }}
            style={{
              backgroundColor: projectSelected?.color || "",
              height: "1px"
            }}
          ></motion.div>
        </motion.div>
        <motion.div
          className={styles.content_container}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.5 }}
        >
          <motion.div
            className={styles.content_container__description}
            style={{
              color: projectSelected?.color || ""
            }}
          >
            {<Project />}
          </motion.div>
          <motion.div
            className={styles.content_container__phone}
            onMouseEnter={() => {
              document.querySelector(".cursor")?.classList.add("hidden");
            }}
            onMouseLeave={() => {
              document.querySelector(".cursor")?.classList.remove("hidden");
            }}
          >
            <DeviceFrameset device={"iPhone X"}>
              <iframe
                className={`${styles.phoneIframe} ${
                  styles[`project_${projectSelected?.id_project}`]
                }`}
                src={projectSelected?.url}
                title={projectSelected?.title}
                width="100%"
                height="100%"
                allow="camera; geolocation;"
              ></iframe>
            </DeviceFrameset>
          </motion.div>
        </motion.div>
      </motion.div>
    </motion.div>
  );
};

export default ProjectContent;
