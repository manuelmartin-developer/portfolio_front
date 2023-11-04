import { GetStaticProps, GetStaticPaths, NextPage } from "next";
import Work from ".";
import { useProjectsStore } from "../../store/projectsStore";
import { useEffect } from "react";
import axios from "axios";
import { Project } from "../../components/admin/Projects/AdminProjects";
import { useRouter } from "next/router";

const WorkProject: NextPage<any> = (props: { project: Project }) => {
  // Hooks
  const router = useRouter();

  // Store
  const { setProjectSelected } = useProjectsStore();

  // Lifecycle component
  useEffect(() => {
    if (!router.isReady) return;
    setProjectSelected(props.project);
  }, [router.isReady, props.project]);

  return <Work />;
};

export const getStaticPaths: GetStaticPaths = async () => {
  const onGetAllProjectTitles = async () => {
    const URL = `${process.env.NEXT_PUBLIC_API_URL}/projects/titles/`;

    try {
      const response = await axios.get(URL);
      if (response.status === 200) {
        return response.data.projects;
      }
    } catch (error) {
      console.log(error);
    }
  };
  const paths = await onGetAllProjectTitles();
  return {
    paths: paths.map((path: any) => {
      return {
        params: {
          project: path.title
        }
      };
    }),
    fallback: "blocking"
  };
};

export const getStaticProps: GetStaticProps = async (context) => {
  const projectTitle = context.params?.project;

  const onGetProjectDataByTitle = async () => {
    const URL = `${process.env.NEXT_PUBLIC_API_URL}/projects/titles/${projectTitle}/`;

    try {
      const response = await axios.get(URL);
      if (response.status === 200) {
        return response.data.project;
      }
    } catch (error) {
      console.log(error);
    }
  };

  const projectData = await onGetProjectDataByTitle();

  return {
    props: {
      project: projectData
    }
  };
};

export default WorkProject;
