import { getServerSideSitemap } from "next-sitemap";
import { GetServerSideProps } from "next";
import axios from "axios";

export const getServerSideProps: GetServerSideProps = async (ctx: any) => {
  let urls: any[] = [];

  const getProjects = async () => {
    const URL = `${process.env.NEXT_PUBLIC_API_URL}/projects/`;

    try {
      const response = await axios.get(URL);
      if (response.status === 200) {
        return response.data.projects;
      }
    } catch (error) {
      console.log(error);
    }
  };

  const projects = await getProjects();

  projects.forEach((project: any) => {
    urls.push({
      loc: `https://manuelmartin.dev/work/${project.title.toLowerCase()}`,
      lastmod: new Date(project.updatedAt).toISOString()
    });
  });

  return getServerSideSitemap(ctx, urls);
};

export default function SiteMapIndex() {}
