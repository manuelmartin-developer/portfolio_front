import { forwardRef } from "react";
import Head from "next/head";
import { GetStaticProps } from "next";

import axios from "axios";

import styles from "@/styles/Layout.module.scss";

import Hero from "../../components/layout/Hero";
import PageTransition from "../../components/transitions/PageTransition";
import PostList from "../../components/posts/PostList";
import { Post } from "../../components/admin/Posts/AdminPosts";

export type BlogPageProps = {
  posts: Post[];
  mostPopular: {
    title: string;
    slug: string;
    likes: number;
  }[];
  count: number;
};
type BlogPageRef = React.ForwardedRef<HTMLDivElement>;

function Blog(props: BlogPageProps, ref: BlogPageRef) {
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
      <PageTransition ref={ref} layoutId="blog-page">
        <div className={styles.container}>
          <Hero title="Blog" nextUnderscore="Tech" right="Dev" />
          <div className={styles.container_content}>
            <PostList data={props} categoriesFilters={true} />
          </div>
        </div>
      </PageTransition>
    </>
  );
}

export default forwardRef(Blog);

export const getStaticProps: GetStaticProps = async () => {
  const onGetAllPosts = async () => {
    const URL = `${process.env.NEXT_PUBLIC_API_URL}/posts/`;

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

  const posts = await onGetAllPosts();

  return {
    props: {
      ...posts
    },
    revalidate: 1
  };
};
