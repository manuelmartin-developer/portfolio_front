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
          content="Manuel Martín | Fullstack web and mobile developer"
        />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <script type="application/ld+json">
          {`
          [{
            "@context": "https://schema.org",
            "@type": "Blog",
            "mainEntityOfPage": {
              "@type": "WebPage",
              "@id": "https://manuelmartin.dev/blog"
            },
            "headline": "Manuel Martín | Blog",
            "description": "Manuel Martín | Fullstack web and mobile developer",
            "image": "https://manuelmartin.dev/assets/img/commons/logo.png",
            "author": {
              "@type": "Person",
              "name": "Manuel Martín"
            },
            "publisher": {
              "@type": "Organization",
              "name": "Manuel Martín",
              "logo": {
                "@type": "ImageObject",
                "url": "https://manuelmartin.dev/assets/img/commons/logo.png"
              }
            },
            "datePublished": "${new Date().toLocaleDateString()}",
            "dateModified": "${new Date().toLocaleDateString()}"
          }]
        `}
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
        <meta
          property="og:url"
          content={`https://manuelmartin.dev/blog/${props.categoryName}`}
        />
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
        <link rel="canonical" href="https://manuelmartin.dev" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <PageTransition ref={ref} layoutId="blog-category-page">
        <div className={styles.container}>
          <Hero
            title={props.categoryName?.charAt(0).toUpperCase() || "Blog"}
            nextUnderscore="Tech"
            right="Dev"
          />
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
      ...posts,
      categoryName
    },
    revalidate: 1
  };
};
