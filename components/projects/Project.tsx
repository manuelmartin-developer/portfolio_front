import Link from "next/link";

import { motion } from "framer-motion";
import { Gallery, Item } from "react-photoswipe-gallery";

import "photoswipe/dist/photoswipe.css";
import styles from "./Projects.module.scss";

import { ProjectData } from "../../public/assets/data/data";
import { FiExternalLink } from "react-icons/fi";
import { BsApple, BsGooglePlay } from "react-icons/bs";
import { useCursorStore } from "../../store/cursorStore";
import { IoLogoIonic } from "react-icons/io5";
import { TbBrandNextjs } from "react-icons/tb";
import { FaReact } from "react-icons/fa";

const Project: React.FC<{ data: ProjectData }> = ({ data }) => {
  // Store
  const { setCursorVariant, setCursorText } = useCursorStore();

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
        <h1>{data.title}</h1>
        <Link
          className={styles.linkBtn}
          href={data.url}
          target="_blank"
          onMouseEnter={() => onEnterLink("Visit")}
          onMouseLeave={onLeaveLink}
        >
          <FiExternalLink />
        </Link>
      </div>
      {!data.isSideProject && (
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
      {data.isSideProject && <h3 className={styles.subtitle}>Side project</h3>}
      <motion.div
        className="line"
        initial={{ width: 0 }}
        transition={{ duration: 0.5, delay: 1 }}
        whileInView={{ width: "100%" }}
        viewport={{ once: true }}
        style={{
          backgroundColor: data.color,
          height: "1px",
          marginBottom: "1rem"
        }}
      ></motion.div>
      {data.paragraphs.map((paragraph, index) => (
        <p key={index} className={styles.paragraph}>
          {paragraph}
        </p>
      ))}
      {data.id === 1 && (
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
      <h3 className={styles.subtitle}>Gallery</h3>
      {data.gallery && (
        <motion.div
          className={`${styles.imgContainer} ${styles[`project_${data.id}`]}`}
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
            {data.gallery.map((image, index) => (
              <Item
                key={index}
                original={`/assets/img/projects/project_${data.id}/${image.original}`}
                thumbnail={`/assets/img/projects/project_${data.id}/${image.thumbnail}`}
                width={image.width}
                height={image.height}
              >
                {({ ref, open }) => (
                  <img
                    ref={ref as React.RefObject<HTMLImageElement>}
                    onClick={open}
                    className={styles.img}
                    src={`/assets/img/projects/project_${data.id}/${image.thumbnail}`}
                    alt={`${data.title} image ${index}`}
                    onMouseEnter={() => onEnterLink("Zoom")}
                    onMouseLeave={onLeaveLink}
                  />
                )}
              </Item>
            ))}
          </Gallery>
        </motion.div>
      )}
      {data.role && (
        <>
          <h3 className={styles.subtitle}>Role</h3>
          <p className={styles.paragraph}>{data.role}</p>
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
        {data.technologies &&
          data.technologies.map((technology, index) => (
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
              {technology === "Next.js" && <TbBrandNextjs size="1.5rem" />}
              {technology === "Ionic" && <IoLogoIonic size="1.5rem" />}
              {technology === "React" && <FaReact size="1.5rem" />}
              <p
                style={{
                  position: "relative",
                  top: "1px"
                }}
              >
                {technology}
              </p>
            </motion.div>
          ))}
      </motion.div>
    </>
  );
};

export default Project;
