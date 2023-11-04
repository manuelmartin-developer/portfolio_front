import Link from "next/link";

import { motion } from "framer-motion";
import { Gallery, Item } from "react-photoswipe-gallery";

import "photoswipe/dist/photoswipe.css";
import styles from "./Projects.module.scss";

import { FiExternalLink } from "react-icons/fi";
import { BsApple, BsGooglePlay } from "react-icons/bs";
import { useCursorStore } from "../../store/cursorStore";
import { IoLogoIonic } from "react-icons/io5";
import { TbBrandNextjs } from "react-icons/tb";
import { FaReact } from "react-icons/fa";
import { useProjectsStore } from "../../store/projectsStore";

const Project = () => {
  // Store
  const { setCursorVariant, setCursorText } = useCursorStore();
  const { projectSelected } = useProjectsStore();

  // Methods
  const onEnterLink = (text: string) => {
    setCursorText(text);
    setCursorVariant("link");
  };

  const onLeaveLink = () => {
    setCursorText("");
    setCursorVariant("default");
  };

  return (
    <>
      <div className={styles.title}>
        <h1>{projectSelected?.title}</h1>
        <Link
          className={styles.linkBtn}
          href={projectSelected?.url || "#"}
          target="_blank"
          onMouseEnter={() => onEnterLink("Visit")}
          onMouseLeave={onLeaveLink}
        >
          <FiExternalLink />
        </Link>
      </div>
      {!projectSelected?.isSideProject && (
        <h3 className={styles.subtitle}>
          Client project carried out in{" "}
          <Link
            onMouseEnter={() => onEnterLink("")}
            onMouseLeave={onLeaveLink}
            className={styles.link}
            href="https://roymo.es"
            target="_blank"
          >
            Rommel & Montgommery
          </Link>{" "}
          agency
        </h3>
      )}
      {projectSelected?.isSideProject && (
        <h3 className={styles.subtitle}>Side project</h3>
      )}
      <motion.div
        className="line"
        initial={{ width: 0 }}
        transition={{ duration: 0.5, delay: 1 }}
        whileInView={{ width: "100%" }}
        viewport={{ once: true }}
        style={{
          backgroundColor: projectSelected?.color,
          height: "1px",
          marginBottom: "1rem"
        }}
      ></motion.div>
      {projectSelected?.paragraphs?.map((paragraph, index) => (
        <p key={index} className={styles.paragraph}>
          {paragraph}
        </p>
      ))}
      {projectSelected?.id_project === 1 && (
        <motion.div
          className={styles.icons}
          whileInView={{ opacity: 1 }}
          initial={{ opacity: 0 }}
          transition={{ duration: 0.5, delay: 1 }}
          viewport={{ once: true }}
        >
          <Link
            href="https://apps.apple.com/es/app/touryme/id6443578378"
            onMouseEnter={() => onEnterLink("App Store")}
            onMouseLeave={onLeaveLink}
            target="_blank"
          >
            <BsApple size="2rem" />
          </Link>
          <Link
            href="https://play.google.com/store/apps/details?id=com.touryme.app"
            onMouseEnter={() => onEnterLink("Google Play")}
            onMouseLeave={onLeaveLink}
            target="_blank"
          >
            <BsGooglePlay size="2rem" />
          </Link>
        </motion.div>
      )}
      {projectSelected?.gallery && projectSelected?.gallery.length > 0 && (
        <>
          <h3 className={styles.subtitle}>Gallery</h3>
          <motion.div
            className={`${styles.imgContainer} ${
              styles[`project_${projectSelected?.id_project}`]
            }`}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            initial={{ opacity: 0 }}
            transition={{ duration: 0.5, delay: 1 }}
            style={{
              position: "relative"
            }}
          >
            <Gallery
              options={{
                loop: false
              }}
            >
              {projectSelected?.gallery.map((image, index) => (
                <Item
                  key={index}
                  original={image.url}
                  thumbnail={image.url}
                  width={image.width || 626}
                  height={image.height || 825}
                >
                  {({ ref, open }) => (
                    <img
                      ref={ref as React.RefObject<HTMLImageElement>}
                      onClick={open}
                      className={styles.img}
                      src={image.url}
                      alt={`${projectSelected?.title} image ${index}`}
                      onMouseEnter={() => onEnterLink("Zoom")}
                      onMouseLeave={onLeaveLink}
                      loading="lazy"
                    />
                  )}
                </Item>
              ))}
            </Gallery>
          </motion.div>
        </>
      )}
      {projectSelected?.role && (
        <>
          <h3 className={styles.subtitle}>Role</h3>
          <p className={styles.paragraph}>{projectSelected?.role}</p>
        </>
      )}
      <h3 className={styles.subtitle}>Technologies</h3>
      <motion.div
        className={styles.chipTechnologies}
        whileInView={{ opacity: 1 }}
        initial={{ opacity: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
      >
        {projectSelected?.technologies &&
          projectSelected?.technologies.map((technology, index) => (
            <motion.div
              key={index}
              className={styles.chip}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              initial={{ opacity: 0 }}
              transition={{ duration: 0.5, delay: 0.25 * index }}
              style={{
                backgroundColor: "#000",
                color: "#fff"
              }}
            >
              {technology.name === "Next.js" && <TbBrandNextjs size="1.5rem" />}
              {technology.name === "Ionic" && <IoLogoIonic size="1.5rem" />}
              {technology.name === "React" && <FaReact size="1.5rem" />}
              <p
                style={{
                  position: "relative",
                  top: "1px"
                }}
              >
                {technology.name}
              </p>
            </motion.div>
          ))}
      </motion.div>
    </>
  );
};

export default Project;
