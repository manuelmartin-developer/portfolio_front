import Head from "next/head";
import styles from "@/styles/Layout.module.scss";
import Hero from "../components/layout/Hero";
import ListCards from "../components/cards/ListCards";
import { AnimatePresence } from "framer-motion";
import { useProjectsStore } from "../store/projectsStore";
import Item from "../components/cards/Item";
import { useEffect } from "react";

export default function Home() {
  // Store
  const { projectSelected, setProjectSelected } = useProjectsStore();

  // Methods

  const onChangeBackButtonBehavior = (e: Event) => {
    e.preventDefault();
    setProjectSelected(null);
  };

  // Lifecycle component
  useEffect(() => {
    if (!projectSelected) return;
    window.addEventListener("popstate", onChangeBackButtonBehavior);
    return () => {
      window.removeEventListener("popstate", onChangeBackButtonBehavior);
    };
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
        <Hero title="Dev" nextUnderscore="30 . 04 . 2023" right="v1.0.0" />
        <div className={styles.container_content}>
          <ListCards />
          <AnimatePresence>
            {projectSelected && (
              <Item id={projectSelected.id} key={projectSelected.id} />
            )}
          </AnimatePresence>
        </div>
      </div>
    </>
  );
}
