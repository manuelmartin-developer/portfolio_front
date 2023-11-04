import Head from "next/head";
import { forwardRef, useEffect } from "react";

import styles from "@/styles/Layout.module.scss";

import Hero from "../../components/layout/Hero";
import ProjectsList from "../../components/projects/ProjectList";
import { useProjectsStore } from "../../store/projectsStore";
import ProjectContent from "../../components/projects/ProjectContent";
import PageTransition from "../../components/transitions/PageTransition";

type WorkPageProps = {};
type WorkPageRef = React.ForwardedRef<HTMLDivElement>;

function Work(props: WorkPageProps, ref: WorkPageRef) {
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
      <PageTransition ref={ref} layoutId="work-page">
        <div className={styles.container}>
          <Hero title="Dev" nextUnderscore="03 . 11 . 2023" right="v0.1.2" />
          <div className={styles.container_content}>
            <ProjectsList />
            {projectSelected && (
              <ProjectContent key={projectSelected.id_project} />
            )}
          </div>
        </div>
      </PageTransition>
    </>
  );
}

export default forwardRef(Work);
