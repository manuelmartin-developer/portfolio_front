import { motion } from "framer-motion";
import styles from "./Projects.module.scss";
import Link from "next/link";
import { FiExternalLink } from "react-icons/fi";
import { BsApple, BsGooglePlay } from "react-icons/bs";
import { useCursorStore } from "../../store/cursorStore";
import { IoLogoIonic } from "react-icons/io5";
import { TbBrandNextjs } from "react-icons/tb";
import { FaReact } from "react-icons/fa";

const Project1 = () => {
  // Store
  const { setCursorVariant } = useCursorStore();

  // Methods
  const onEnterLink = () => {
    setCursorVariant("link");
  };

  const onLeaveLink = () => {
    setCursorVariant("default");
  };
  return (
    <>
      <div className={styles.title}>
        <h1>Touryme</h1>
        <Link
          className={styles.linkBtn}
          href="https://touryme.com"
          target="_blank"
          onMouseEnter={onEnterLink}
          onMouseLeave={onLeaveLink}
        >
          <FiExternalLink />
        </Link>
      </div>
      <h3>
        Client project carried out in{" "}
        <Link
          onMouseEnter={onEnterLink}
          onMouseLeave={onLeaveLink}
          className={styles.link}
          href="https://roymo.es"
          target="_blank"
        >
          Rommel & Montgommery
        </Link>{" "}
        agency
      </h3>
      <motion.div
        className="line"
        initial={{ width: 0 }}
        transition={{ duration: 0.5, delay: 1 }}
        whileInView={{ width: "100%" }}
        viewport={{ once: true }}
        style={{ backgroundColor: "#fff", height: "1px", margin: "1rem 0" }}
      ></motion.div>
      <p className={styles.paragraph}>
        Touryme is a web application that allows users to create custom tours
        and share them with other users.
      </p>
      <p className={styles.paragraph}>
        Touryme was born as a web application, but it was decided to create a
        mobile application so that users could enjoy the experience in a more
        comfortable way.
      </p>
      <motion.div
        className={styles.icons}
        whileInView={{ opacity: 1 }}
        initial={{ opacity: 0 }}
        transition={{ duration: 0.5, delay: 1 }}
        viewport={{ once: true }}
      >
        <Link
          href="https://apps.apple.com/es/app/touryme/id6443578378"
          onMouseEnter={onEnterLink}
          onMouseLeave={onLeaveLink}
          target="_blank"
        >
          <BsApple size="2rem" />
        </Link>
        <Link
          href="https://play.google.com/store/apps/details?id=com.touryme.app"
          onMouseEnter={onEnterLink}
          onMouseLeave={onLeaveLink}
          target="_blank"
        >
          <BsGooglePlay size="2rem" />
        </Link>
      </motion.div>
      <motion.div
        className={styles.imgContainer}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        initial={{ opacity: 0 }}
        transition={{ duration: 0.5, delay: 1 }}
        style={{
          position: "relative"
        }}
      >
        <img
          className={styles.img}
          src="/assets/img/projects/1_1.png"
          alt="touryme image"
        />
      </motion.div>
      <h3>Role</h3>
      <p className={styles.paragraph}>
        I was in charge of development for frontend in web and mobile
        applications.
      </p>
      <h3>Technologies</h3>
      <motion.div
        className={styles.chipTechnologies}
        whileInView={{ opacity: 1 }}
        initial={{ opacity: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
      >
        <motion.div
          className={styles.chip}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          initial={{ opacity: 0 }}
          transition={{ duration: 0.5, delay: 0.5 }}
          style={{
            backgroundColor: "#000",
            color: "#fff"
          }}
        >
          <TbBrandNextjs size="2rem" />
          <p
            style={{
              position: "relative",
              top: "1px"
            }}
          >
            Next.js
          </p>
        </motion.div>
        <motion.div
          className={styles.chip}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          initial={{ opacity: 0 }}
          transition={{ duration: 0.5, delay: 0.75 }}
          style={{
            backgroundColor: "#176bff",
            color: "#fff"
          }}
        >
          <IoLogoIonic size="2rem" />
          <p
            style={{
              position: "relative",
              top: "1px"
            }}
          >
            Ionic
          </p>
        </motion.div>
        <motion.div
          className={styles.chip}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          initial={{ opacity: 0 }}
          transition={{ duration: 0.5, delay: 1 }}
          style={{
            backgroundColor: "#119FCD",
            color: "#fff"
          }}
        >
          <FaReact size="2rem" />
          <p
            style={{
              position: "relative",
              top: "1px"
            }}
          >
            React
          </p>
        </motion.div>
      </motion.div>
    </>
  );
};

export default Project1;
