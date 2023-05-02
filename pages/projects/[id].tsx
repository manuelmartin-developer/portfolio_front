import { NextPage } from "next";
import ListCards from "../../components/cards/ListCards";
import Item from "../../components/cards/Item";
import Hero from "../../components/layout/Hero";
import styles from "../../styles/Layout.module.scss";
import Head from "next/head";
import { useEffect } from "react";
import { projectsData } from "../../public/assets/data/data";

const ProjectDetail: NextPage = (props: any) => {
  const { id } = props;

  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "unset";
    };
  }, []);
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
          <Item id={Number(id)} />
        </div>
      </div>
    </>
  );
};

export default ProjectDetail;

export const getStaticPaths = async () => {
  const paths = projectsData.map((project) => ({
    params: { id: project.id.toString() }
  }));

  return {
    paths,
    fallback: false
  };
};

export async function getStaticProps({ params }: any) {
  return {
    props: {
      id: params.id
    },
    revalidate: 300
  };
}
