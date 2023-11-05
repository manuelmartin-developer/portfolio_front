import { getServerSideSitemap } from "next-sitemap";
import { GetServerSideProps } from "next";
import axios from "axios";

export const getServerSideProps: GetServerSideProps = async (ctx: any) => {
  let urls: any[] = [];

  const getPosts = async () => {
    const URL = `${process.env.NEXT_PUBLIC_API_URL}/posts/`;

    try {
      const response = await axios.get(URL);
      if (response.status === 200) {
        return response.data.posts;
      }
    } catch (error) {
      console.log(error);
    }
  };

  const getPostCategories = async () => {
    const URL = `${process.env.NEXT_PUBLIC_API_URL}/categories/?type=post`;

    try {
      const response = await axios.get(URL);
      if (response.status === 200) {
        return response.data.categories;
      }
    } catch (error) {
      console.log(error);
    }
  };

  const posts = await getPosts();
  const categories = await getPostCategories();

  posts.forEach((post: any) => {
    urls.push({
      loc: `https://manuelmartin.dev/blog/${post.title.toLowerCase()}`,
      lastmod: new Date(post.updatedAt).toISOString()
    });
  });

  categories.forEach((category: any) => {
    urls.push({
      loc: `https://manuelmartin.dev/blog/category/${category.name.toLowerCase()}`,
      lastmod: new Date(category.updatedAt).toISOString()
    });
  });

  return getServerSideSitemap(ctx, urls);
};

export default function SiteMapIndex() {}
