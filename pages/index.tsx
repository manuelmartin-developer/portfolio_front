import Head from "next/head";
import styles from "@/styles/Layout.module.scss";
import Hero from "../components/layout/Hero";
import { motion } from "framer-motion";
import Link from "next/link";
import { useCursorStore } from "../store/cursorStore";
import { NextPage } from "next";
import { CiLinkedin } from "react-icons/ci";
import { RiGithubLine } from "@react-icons/all-files/ri/RiGithubLine";
import { RiTwitterXFill } from "react-icons/ri";
import { MdOutlineEmail } from "react-icons/md";

const Home: NextPage = () => {
  // Store
  const { setCursorVariant, setCursorText } = useCursorStore();

  // Methods
  const onEnterLink = (text: string) => {
    setCursorVariant("link");
    setCursorText(text);
  };

  const onLeaveLink = () => {
    setCursorText("");
    setCursorVariant("default");
  };
  const onEnterSpotify = () => {
    setCursorVariant("hide");
  };
  return (
    <>
      <Head>
        <title>Manuel Martín | Portfolio</title>
        <meta
          name="description"
          content="Portfolio de Manuel Martín, desarrollador web fullstack."
        />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className={styles.container}>
        <Hero title="Info" nextUnderscore="FN: Manuel" right="LN: Martín" />
        <div className={styles.container_content}>
          <motion.div
            className={styles.container_content_title}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
          >
            <h2>
              Hi there! I&apos;m{" "}
              <motion.span
                initial={{ opacity: 0, y: 0 }}
                animate={{ opacity: 1, y: 20 }}
                transition={{ duration: 0.5, delay: 1 }}
                className={styles.container_content_title__name}
              >
                Manuel Martin
              </motion.span>
              , a fullstack web and mobile developer. I&apos;m advocate of
              clean, efficient and scalable code. I love to learn new
              technologies and to share my knowledge with others.
            </h2>
          </motion.div>
          <motion.div
            className={styles.container_content_description}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
          >
            <p>
              My work currently consist of a full time job as a fullstack
              software engineer at{" "}
              <Link
                className={styles.container_content_description__link}
                href="https://earscloud.io/"
                onMouseEnter={() => onEnterLink("Earscloud")}
                onMouseLeave={onLeaveLink}
                target="_blank"
              >
                Earscloud
              </Link>
            </p>
            <p>
              But...always working on side projects, learning new technologies
              and trying to improve my skills.
            </p>
          </motion.div>
          <motion.div
            className={styles.container_content_social}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
          >
            <h3>Find me on:</h3>
            <div className={styles.container_content_social__links}>
              <Link
                href="https://github.com/manuelmartin-developer"
                onMouseEnter={() => onEnterLink("Github")}
                onMouseLeave={onLeaveLink}
                target="_blank"
              >
                <RiGithubLine size={30} color="#94a3b8" />
              </Link>
              <Link
                href="https://www.linkedin.com/in/manuel-martin-developer/"
                onMouseEnter={() => onEnterLink("Linkedin")}
                onMouseLeave={onLeaveLink}
                target="_blank"
              >
                <CiLinkedin size={30} color="#94a3b8" />
              </Link>
              <Link
                href="https://twitter.com/ManuelMartinDia"
                onMouseEnter={() => onEnterLink("Twitter")}
                onMouseLeave={onLeaveLink}
                target="_blank"
              >
                <RiTwitterXFill size={30} color="#94a3b8" />
              </Link>
              <Link
                href="mailto:hola@manuelmartin.dev"
                onMouseEnter={() => onEnterLink("Email")}
                onMouseLeave={onLeaveLink}
                target="_blank"
              >
                <MdOutlineEmail size={30} color="#94a3b8" />
              </Link>
            </div>
          </motion.div>
        </div>
      </div>
    </>
  );
};

export default Home;
