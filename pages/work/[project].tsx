import { GetStaticProps, GetStaticPaths, NextPage } from "next";
import Work from ".";
import { useProjectsStore } from "../../store/projectsStore";
import {
  getProjectDataByTitle,
  getAllProjectsTitles
} from "../../public/assets/data/data";
import { useEffect } from "react";

const WorkProject: NextPage<any> = (props: { project: string }) => {
  // Store
  const { setProjectSelected } = useProjectsStore();

  // Lifecycle component
  useEffect(() => {
    const selectedProject = getProjectDataByTitle(props.project);
    console.log(selectedProject);
    selectedProject && setProjectSelected(selectedProject);
  }, []);

  return <Work />;
};

export const getStaticPaths: GetStaticPaths = async () => {
  const paths = getAllProjectsTitles();
  return {
    paths: paths.map((path) => {
      return {
        params: {
          project: path.params.title
        }
      };
    }),
    fallback: false
  };
};

export const getStaticProps: GetStaticProps = async (context) => {
  const project = context.params?.project;
  return {
    props: {
      project
    }
  };
};

export default WorkProject;
