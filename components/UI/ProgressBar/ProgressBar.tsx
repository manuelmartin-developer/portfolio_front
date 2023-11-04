import { motion, useScroll } from "framer-motion";
import styles from "./ProgressBar.module.scss";

const ProgressBar = () => {
  // Hooks
  const { scrollYProgress } = useScroll();
  return (
    <motion.div
      transition={{
        type: "spring",
        damping: 10,
        stiffness: 100
      }}
      style={{
        scaleX: scrollYProgress
      }}
      className={styles.progress_bar}
    />
  );
};

export default ProgressBar;
