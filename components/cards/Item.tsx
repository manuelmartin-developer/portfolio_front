import dynamic from "next/dynamic";
import { motion } from "framer-motion";
import { projectsData } from "../../public/assets/data/data";
import styles from "./Card.module.scss";
import { useProjectsStore } from "../../store/projectsStore";
import { CgClose } from "react-icons/cg";
import { DeviceFrameset } from "react-device-frameset";
import Project2 from "../projects/Project2";
import { useRef } from "react";
// Dynamic imports
const Project1 = dynamic(() => import("../projects/Project1"), { ssr: false });

const Item: React.FC<{ id?: number }> = ({ id }) => {
  // Constants
  const { category, title, backgroundColor, color, url } = projectsData.find(
    (item) => item.id === id
  )!;

  // Store
  const { setProjectSelected } = useProjectsStore();

  return (
    <motion.div className={`${styles.card_content_container} ${styles.open}`}>
      <motion.div
        className={styles.card_content}
        layoutId={`card-container-${id}`}
        animate={{ backgroundColor }}
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
            borderColor: color ? color : ""
          }}
        >
          <CgClose color={color ? color : "rgba(255, 255, 255, 0.5)"} />
        </motion.button>
        <motion.div
          className={`${styles.card_image_container} ${styles.open}`}
          layoutId={`card-image-container-${id}`}
        >
          <img
            className={styles.card_image}
            src={`/assets/img/projects/${id}.jpeg`}
            alt=""
          />
        </motion.div>
        <motion.div
          className={`${styles.title_container} ${styles.open}`}
          layoutId={`title-container-${id}`}
        >
          <motion.span
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.5 }}
            style={{
              color: color ? color : ""
            }}
          >
            {category.join(" - ")}
          </motion.span>
          <motion.h2
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.5 }}
            style={{
              color: color ? color : ""
            }}
          >
            {title}
          </motion.h2>
          <motion.div
            initial={{ opacity: 0, width: 0 }}
            whileInView={{ opacity: 1, width: "100%" }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 1 }}
            style={{ backgroundColor: color ? color : "", height: "1px" }}
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
              color: color ? color : ""
            }}
          >
            {id && id === 1 && <Project1 />}
            {id && id === 2 && <Project2 />}
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
                className={styles.phoneIframe}
                src={url}
                title={title}
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

export default Item;
