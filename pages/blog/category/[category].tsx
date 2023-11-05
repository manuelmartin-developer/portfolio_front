import { forwardRef } from "react";
import Head from "next/head";
import { GetStaticProps, GetStaticPaths } from "next";

import axios from "axios";

import styles from "@/styles/Layout.module.scss";

import Hero from "../../../components/layout/Hero";
import PageTransition from "../../../components/transitions/PageTransition";
import PostList from "../../../components/posts/PostList";
import { BlogPageProps } from "../index";

type BlogCategoryPageRef = React.ForwardedRef<HTMLDivElement>;

function BlogCategoryPage(props: BlogPageProps, ref: BlogCategoryPageRef) {
  return (
    <>
      <Head>
        <title>Manuel Martín | Blog</title>
        <meta
          name="description"
          content="Portfolio de Manuel Martín, desarrollador web fullstack."
        />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <PageTransition ref={ref} layoutId="blog-category-page">
        <div className={styles.container}>
          <Hero title="Blog" nextUnderscore="Tech" right="Dev" />
          <div className={styles.container_content}>
            <PostList data={props} hasCategoriesFilters={false} />
          </div>
        </div>
      </PageTransition>
    </>
  );
}

export default forwardRef(BlogCategoryPage);

export const getStaticPaths: GetStaticPaths = async () => {
  const onGetAllCategories = async () => {
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
  const paths = await onGetAllCategories();
  return {
    paths: paths.map((path: any) => {
      return {
        params: {
          category: path.name.toLowerCase()
        }
      };
    }),
    fallback: "blocking"
  };
};

export const getStaticProps: GetStaticProps = async (context) => {
  const categoryName = context.params?.category as string;

  const onGetPostsByCategory = async () => {
    const URL = `${process.env.NEXT_PUBLIC_API_URL}/posts/?name_category=${categoryName}`;

    try {
      const response = await axios.get(URL);
      if (response.status === 200) {
        return {
          posts: response.data.posts,
          mostPopular: response.data.mostPopular,
          count: response.data.count
        };
      }
    } catch (error) {
      console.log(error);
    }
  };

  const posts = await onGetPostsByCategory();

  return {
    props: {
      ...posts
    },
    revalidate: 1
  };
};
