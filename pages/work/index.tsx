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
          content="Manuel Martín | Fullstack web and mobile developer"
        />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org/",
            "@type": "CreativeWork",
            name: "Manuel Martín | Portfolio",
            description: "Manuel Martín | Fullstack web and mobile developer",
            image: "https://manuelmartin.dev/assets/img/commons/logo.png",
            url: "https://manuelmartin.dev",
            author: {
              "@type": "Person",
              name: "Manuel Martín"
            },
            creator: {
              "@type": "Person",
              name: "Manuel Martín"
            },
            publisher: {
              "@type": "Person",
              name: "Manuel Martín"
            },
            datePublished: "2023-11-03",
            dateModified: "2023-11-03",
            version: "v0.1.2",
            mainEntityOfPage: "https://manuelmartin.dev",
            license: "MIT",
            keywords:
              "Manuel Martín, Portfolio, developer, web, mobile, fullstack, javascript, typescript, react, nextjs, nodejs, express"
          })}
        </script>
        <meta name="robots" content="index, follow" />
        <meta name="author" content="Manuel Martín" />
        <meta
          name="keywords"
          content="Manuel Martín, Portfolio, developer, web, mobile, fullstack, javascript, typescript, react, nextjs, nodejs, express"
        />
        <meta property="og:title" content="Manuel Martín | Portfolio" />
        <meta
          property="og:description"
          content="Manuel Martín | Fullstack web and mobile developer"
        />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://manuelmartin.dev/work" />
        <meta
          property="og:image"
          content="https://manuelmartin.dev/assets/img/commons/logo.png"
        />
        <meta property="og:site_name" content="Manuel Martín | Portfolio" />
        <meta name="twitter:card" content="summary" />
        <meta name="twitter:title" content="Manuel Martín | Portfolio" />
        <meta
          name="twitter:description"
          content="Manuel Martín | Fullstack web and mobile developer"
        />
        <meta
          name="twitter:image"
          content="https://manuelmartin.dev/assets/img/commons/logo.png"
        />
        <meta name="twitter:site" content="@ManuelMartinDia" />
        <meta name="twitter:creator" content="@ManuelMartinDia" />
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
