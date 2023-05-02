import { motion } from "framer-motion";
import React from "react";
import { projectsData } from "../../public/assets/data/data";
import styles from "./Card.module.scss";
import { AnimatePresence } from "framer-motion";
import { useProjectsStore } from "../../store/projectsStore";

const Item: React.FC<{ id?: number }> = ({ id }) => {
  // Store
  const { setProjectSelected } = useProjectsStore();

  if (!id) return null;
  const { category, title } = projectsData.find((item) => item.id === id)!;

  return (
    <AnimatePresence mode="wait" initial>
      <motion.div className={`${styles.card_content_container} ${styles.open}`}>
        <motion.div
          className={styles.card_content}
          layoutId={`card-container-${id}`}
        >
          <motion.div
            className={styles.card_image_container}
            layoutId={`card-image-container-${id}`}
          >
            <img
              className={styles.card_image}
              src={`/assets/img/projects/${id}.jpeg`}
              alt=""
            />
          </motion.div>
          <motion.div
            className={styles.title_container}
            layoutId={`title-container-${id}`}
          >
            <span className={styles.category}>{category}</span>
            <h2>{title}</h2>
          </motion.div>
          <motion.div className={styles.content_container} animate>
            <button onClick={() => setProjectSelected(null)}>
              <span className="sr-only">Close</span>
            </button>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Ex nostrum
            tempore sed, assumenda ipsam inventore culpa voluptatum saepe,
            accusamus facere harum alias reprehenderit quis ad magnam distinctio
            architecto, voluptatem blanditiis. Lorem ipsum dolor sit, amet
            consectetur adipisicing elit. Enim quae corporis, voluptates neque
            aspernatur odit rem nobis iure sit itaque ut officia voluptatum at
            facere voluptatem nostrum sunt iusto velit.
          </motion.div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};

export default Item;
