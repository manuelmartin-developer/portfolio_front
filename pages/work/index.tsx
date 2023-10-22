import Head from "next/head";
import styles from "@/styles/Layout.module.scss";
import Hero from "../../components/layout/Hero";
import ListCards from "../../components/cards/ListCards";
import { AnimatePresence } from "framer-motion";
import { useProjectsStore } from "../../store/projectsStore";
import Item from "../../components/cards/Item";
import { useEffect } from "react";

const Work = () => {
  // Store
  const { projectSelected, setProjectSelected } = useProjectsStore();

  // Lifecycle component
  useEffect(() => {
    if (!projectSelected) return;

    // Prevent that back button go to the previous page.
    window.addEventListener("popstate", () => {
      setProjectSelected(null);
    });

    return () => {
      window.removeEventListener("popstate", () => {
        setProjectSelected(null);
      });
    };
  }, [projectSelected]);

  useEffect(() => {
    projectSelected
      ? (document.body.style.overflow = "hidden")
      : (document.body.style.overflow = "unset");
  }, [projectSelected]);

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
        <Hero title="Dev" nextUnderscore="17 . 10 . 2023" right="v0.0.2" />
        <div className={styles.container_content}>
          <ListCards />
          <AnimatePresence mode="wait" initial={false}>
            {projectSelected && (
              <Item id={projectSelected.id} key={projectSelected.id} />
            )}
          </AnimatePresence>
        </div>
      </div>
    </>
  );
};

export default Work;
