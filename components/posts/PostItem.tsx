import { useRef } from "react";
import Link from "next/link";

import { motion, useInView } from "framer-motion";

import styles from "./Post.module.scss";

import { Post } from "../admin/Posts/AdminPosts";
import { useCursorStore } from "../../store/cursorStore";
import { AiOutlineArrowRight } from "@react-icons/all-files/ai/AiOutlineArrowRight";

const PostItem: React.FC<{ post: Post }> = ({ post }) => {
  // Constants
  const { id_post, title, excerpt, slug } = post;
  // Refs
  const cardRef = useRef<HTMLLIElement>(null);

  // InView
  const isCardInView = useInView(cardRef, { once: true });

  // Store
  const { setCursorVariant, setCursorText } = useCursorStore();

  // Methods
  const onEnterLink = (text?: string) => {
    text && setCursorText(text);
    setCursorVariant("link");
  };

  const onLeaveLink = () => {
    setCursorText("");
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
    >
      <motion.div
        className={styles.card_content_container}
        layoutId={`card-container-${id_post}`}
      >
        <div className={styles.card_content_container__title}>
          <Link
            href={`/blog/${slug}`}
            prefetch={false}
            onMouseEnter={() => onEnterLink("Leer más")}
            onMouseLeave={onLeaveLink}
            onClick={onLeaveLink}
          >
            <h3>{title}</h3>
          </Link>
        </div>
        <div className={styles.card_content_container__excerpt}>
          <p>{excerpt}</p>
        </div>
        <div className={styles.card_content_container__link}>
          <Link
            className={styles.link}
            href={`/blog/${slug}`}
            prefetch={false}
            onMouseEnter={() => onEnterLink()}
            onMouseLeave={onLeaveLink}
            onClick={onLeaveLink}
          >
            Leer más
            <motion.span
              initial={{ x: 0, opacity: 0 }}
              animate={{ x: 5, opacity: 1 }}
              transition={{ duration: 0.3 }}
              whileHover={{ x: 5, opacity: 1 }}
            >
              <AiOutlineArrowRight />
            </motion.span>
          </Link>
        </div>
      </motion.div>
    </motion.li>
  );
};

export default PostItem;
