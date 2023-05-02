import { motion } from "framer-motion";
import styles from "./Card.module.scss";
import { useInView } from "framer-motion";
import { useRef } from "react";
import { useCursorStore } from "../../store/cursorStore";
import { useProjectsStore } from "../../store/projectsStore";
import { projectsData } from "../../public/assets/data/data";

const Card: React.FC<{
  id: number;
  category: string;
  title: string;
}> = ({ id, category, title }) => {
  // Refs
  const cardRef = useRef<HTMLLIElement>(null);

  // InView
  const isCardInView = useInView(cardRef, { once: true });

  // Store
  const { setCursorVariant } = useCursorStore();
  const { setProjectSelected } = useProjectsStore();

  // Methods
  const onEnterLink = () => {
    setCursorVariant("link_small");
  };

  const onLeaveLink = () => {
    setCursorVariant("default");
  };

  return (
    <li
      className={styles.card}
      ref={cardRef}
      style={{
        opacity: isCardInView ? 1 : 0,
        transform: isCardInView ? "translateY(0)" : "translateY(20px)"
      }}
      onMouseEnter={onEnterLink}
      onMouseLeave={onLeaveLink}
      onClick={() => {
        setProjectSelected(projectsData.find((item) => item.id === id) as any);
      }}
    >
      <div className={styles.card_content_container}>
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
        </motion.div>
      </div>
      {/* //? Comentado por problema en la animación de vuelta desde la página del proyecto */}
      {/* <Link
        href={`/projects/${id}`}
        className={styles.card_open_link}
        scroll={false}
      /> */}
    </li>
  );
};

export default Card;
