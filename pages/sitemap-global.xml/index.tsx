import { getServerSideSitemap } from "next-sitemap";
import { GetServerSideProps } from "next";

export const getServerSideProps: GetServerSideProps = async (ctx: any) => {
  let urls: any[] = [];

  const publicPages = [
    {
      loc: "https://manuelmartin.dev/",
      lastmod: new Date().toISOString()
    },
    {
      loc: "https://manuelmartin.dev/work",
      lastmod: new Date().toISOString()
    },
    {
      loc: "https://manuelmartin.dev/blog",
      lastmod: new Date().toISOString()
    }
  ];

  urls.push(...publicPages);

  return getServerSideSitemap(ctx, urls);
};

export default function SiteMapIndex() {}
