import styles from "../../styles/Layout.module.scss";
import { m, LazyMotion, domAnimation } from "framer-motion";

const Hero: React.FC<{
  title: string;
  nextUnderscore: string;
  right: string;
}> = ({ nextUnderscore, right, title }) => {
  return (
    <LazyMotion features={domAnimation} strict>
      <div className={styles.container_hero}>
        <h1 className={styles.container_hero__title}>{title}</h1>
        <m.span
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5, delay: 0.5 }}
          className={styles.container_hero__title__underscore}
        ></m.span>
        <m.span
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5, delay: 0.5 }}
          className={styles.container_hero__title__nextUnderscore}
        >
          {nextUnderscore}
        </m.span>
        <m.span
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5, delay: 0.5 }}
          className={styles.container_hero__title__right}
        >
          {right}
        </m.span>
      </div>
    </LazyMotion>
  );
};

export default Hero;
