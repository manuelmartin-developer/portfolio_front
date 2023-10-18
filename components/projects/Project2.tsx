import { motion } from "framer-motion";
import styles from "./Projects.module.scss";
import Link from "next/link";
import { FiExternalLink } from "react-icons/fi";
import { FaNodeJs } from "react-icons/fa";
import { SiExpress } from "react-icons/si";
import { useCursorStore } from "../../store/cursorStore";
import { IoLogoIonic } from "react-icons/io5";
import { TbBrandNextjs } from "react-icons/tb";
import { FaReact } from "react-icons/fa";

const Project2 = () => {
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
        <h1>ConbdeBoda</h1>
        <Link
          className={styles.linkBtn}
          href="https://conbdeboda.es"
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
        Conbdeboda is a web application that allows users to organize their
        wedding in a simple way. It has a blog with articles about weddings, a
        directory of suppliers and a wedding planner.
      </p>
      <p className={styles.paragraph}>
        Conbdeboda is a quite complex project. SEO was a very important part of
        the project, so I had to take care of it. I also had to implement a
        server-side rendering system to improve the loading speed of the web
        application and the SEO.
      </p>
      <motion.div
        className={styles.imgContainer}
        whileInView={{ opacity: 1 }}
        initial={{ opacity: 0 }}
        transition={{ duration: 0.5, delay: 1 }}
        viewport={{ once: true }}
      >
        <img src="/assets/img/projects/2_1.png" alt="Conbdeboda" />
      </motion.div>
      <p className={styles.paragraph}>
        I had to develop a server exclusively to manage SEO it can be changed
        from the administration panel.
      </p>
      <motion.div
        className={styles.imgContainer}
        whileInView={{ opacity: 1 }}
        initial={{ opacity: 0 }}
        transition={{ duration: 0.5, delay: 1 }}
        viewport={{ once: true }}
      >
        <img src="/assets/img/projects/2_2.png" alt="Conbdeboda" />
      </motion.div>
      <h3>Role</h3>
      <p className={styles.paragraph}>
        I was in charge of development for frontend and backend.
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
          transition={{ duration: 0.5, delay: 0.25 }}
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
          transition={{ duration: 0.5, delay: 0.5 }}
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
          transition={{ duration: 0.5, delay: 0.75 }}
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
        <motion.div
          className={styles.chip}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          initial={{ opacity: 0 }}
          transition={{ duration: 0.5, delay: 1 }}
          style={{
            backgroundColor: "#93C746",
            color: "#fff"
          }}
        >
          <FaNodeJs size="2rem" />
          <p
            style={{
              position: "relative",
              top: "1px"
            }}
          >
            Node.js
          </p>
        </motion.div>
        <motion.div
          className={styles.chip}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          initial={{ opacity: 0 }}
          transition={{ duration: 0.5, delay: 1.25 }}
          style={{
            backgroundColor: "#F3E02A",
            color: "#000"
          }}
        >
          <SiExpress size="2rem" />
          <p
            style={{
              position: "relative",
              top: "1px"
            }}
          >
            Express
          </p>
        </motion.div>
      </motion.div>
    </>
  );
};

export default Project2;
