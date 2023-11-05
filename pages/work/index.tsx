import Head from "next/head";
import { forwardRef, useEffect } from "react";

import styles from "@/styles/Layout.module.scss";

import Hero from "../../components/layout/Hero";
import ProjectsList from "../../components/projects/ProjectList";
import { useProjectsStore } from "../../store/projectsStore";
import ProjectContent from "../../components/projects/ProjectContent";
import PageTransition from "../../components/transitions/PageTransition";
import { GetStaticProps } from "next";
import axios from "axios";
import { Project } from "../../components/admin/Projects/AdminProjects";
import { Category } from "../../components/admin/Categories/AdminCategories";

type WorkPageProps = {
  projects: Project[];
  categories: Category[];
};
type WorkPageRef = React.ForwardedRef<HTMLDivElement>;

function Work(props: WorkPageProps, ref: WorkPageRef) {
  // Store
  const { projectSelected, setProjectSelected } = useProjectsStore();

  // Lifecycle component
  useEffect(() => {
    projectSelected
      ? (document.body.style.overflow = "hidden")
      : (document.body.style.overflow = "unset");

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
            <ProjectsList data={props.projects} categories={props.categories} />
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

export const getStaticProps: GetStaticProps = async () => {
  const onGetProjects = async () => {
    const URL = `${process.env.NEXT_PUBLIC_API_URL}/projects/`;

    try {
      const response = await axios.get(URL);
      if (response.status === 200) {
        return {
          projects: response.data.projects
        };
      }
    } catch (error) {
      console.log(error);
    }
  };

  const onGetCategories = async () => {
    const URL = `${process.env.NEXT_PUBLIC_API_URL}/categories/?type=project`;

    try {
      const response = await axios.get(URL);
      if (response.status === 200) {
        return {
          categories: response.data.categories
        };
      }
    } catch (error) {
      console.log(error);
    }
  };

  const projects = await onGetProjects();
  const categories = await onGetCategories();

  return {
    props: {
      ...projects,
      ...categories
    },
    revalidate: 60
  };
};
