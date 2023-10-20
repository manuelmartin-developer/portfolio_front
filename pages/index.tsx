import { NextPage } from "next";
import Head from "next/head";
import styles from "@/styles/Layout.module.scss";
import Hero from "../components/layout/Hero";
import { motion } from "framer-motion";
import Link from "next/link";
import { useCursorStore } from "../store/cursorStore";

const info: NextPage = () => {
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
              Hi there! I'm{" "}
              <motion.span
                initial={{ opacity: 0, y: 0 }}
                animate={{ opacity: 1, y: 20 }}
                transition={{ duration: 0.5, delay: 1 }}
                className={styles.container_content_title__name}
              >
                Manuel Martin
              </motion.span>
              , a fullstack web and mobile developer.
            </h2>
          </motion.div>
          <motion.div
            className={styles.container_content_description}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
          >
            <p>
              I'm a advocate of the open source movement and I love to learn
              about new technologies.
            </p>
            <p>
              Currently working in an incredible audio startup project -
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
          </motion.div>
        </div>
      </div>
    </>
  );
};

export default info;
