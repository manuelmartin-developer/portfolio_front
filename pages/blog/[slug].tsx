import Head from "next/head";
import dynamic from "next/dynamic";
import { forwardRef, useEffect, useState } from "react";
import { GetStaticPaths, GetStaticProps } from "next";

import axios from "axios";
import confetti from "canvas-confetti";

import styles from "@/styles/Layout.module.scss";
import "@uiw/react-markdown-preview/markdown.css";

import { Post } from "../../components/admin/Posts/AdminPosts";
import ProgressBar from "../../components/UI/ProgressBar/ProgressBar";
import PageTransition from "../../components/transitions/PageTransition";
import { AnimatePresence, motion } from "framer-motion";
import { useCursorStore } from "../../store/cursorStore";

// Dynamic imports
const Markdown = dynamic(
  () => import("@uiw/react-markdown-preview").then((mod) => mod.default),
  { ssr: false }
);

type BlogPostPageProps = {
  post: Post;
};
type BlogPostPageRef = React.ForwardedRef<HTMLDivElement>;

function BlogPostPage(props: BlogPostPageProps, ref: BlogPostPageRef) {
  // Componet states
  const [likes, setLikes] = useState<number>(props.post.likes);
  const [liked, setLiked] = useState<boolean>(false);

  // Store
  const { setCursorVariant, setCursorText } = useCursorStore();

  // Methods

  const onHandleStorage = () => {
    const storagedLikes = localStorage.getItem("liked");
    if (!storagedLikes) {
      localStorage.setItem(
        "liked",
        JSON.stringify([{ id: props.post.id_post }])
      );
    } else {
      const parsedStoragedLikes = JSON.parse(storagedLikes);
      parsedStoragedLikes.push({ id: props.post.id_post });
      localStorage.setItem("liked", JSON.stringify(parsedStoragedLikes));
    }
  };

  const onHandleLike = async () => {
    const URL = `${process.env.NEXT_PUBLIC_API_URL}/posts/like/${props.post.id_post}/`;

    const payload = {
      likes
    };

    try {
      const response = await axios.post(URL, payload);
      if (response.status === 200) {
        setLikes(response.data.post.likes);
        setLiked(true);
        onHandleStorage();
        onHandleConfetti();
      }
    } catch (error) {
      console.log(error);
    }
  };

  const onHandleConfetti = () => {
    confetti({
      particleCount: 100,
      spread: 70,
      origin: { y: 0.6 }
    });
  };

  // Component Lifecycle
  useEffect(() => {
    const liked = JSON.parse(localStorage.getItem("liked") || "[]");
    if (!liked || liked.length === 0) return;

    const isLiked = liked.find((like: any) => like.id === props.post.id_post);
    isLiked && setLiked(true);
  }, []);

  return (
    <>
      <Head>
        <title>Manuel Martín | Portfolio</title>
        <meta
          name="description"
          content="Manuel Martín | Fullstack web and mobile developer"
        />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
        <script type="application/ld+json">
          {"{" +
            '"@context": "https://schema.org",' +
            '"@type": "BlogPosting",' +
            `"headline": "${props.post.title}",` +
            `"image": ["https://manuelmartin.dev/assets/img/commons/logo.png"],` +
            `"author": "Manuel Martín",` +
            `"datePublished": "${props.post.createdAt}",` +
            `"dateModified": "${props.post.updatedAt}",` +
            `"description": "${props.post.excerpt}",` +
            `"mainEntityOfPage": "True",` +
            `"publisher": "Manuel Martín",` +
            `"url": "https://manuelmartin.dev/blog/${props.post.slug}"` +
            "}"}
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
          content={`https://manuelmartin.dev/blog/${props.post.slug}`}
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
      </Head>
      <PageTransition ref={ref} layoutId="blog-post-page">
        <ProgressBar />
        <div className={styles.container}>
          <motion.div
            className={styles.container_content}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
          >
            <div className={styles.container_hero}>
              <div className={styles.container_hero__subtitle}>
                {props.post.title}
                <div className={styles.container_hero__date}>
                  <span className={styles.container_hero__date__likes}>
                    <button
                      className={`${styles.btn} ${
                        liked ? styles.liked : styles.not_liked
                      }`}
                      onMouseEnter={() => {
                        setCursorVariant("dot");
                      }}
                      onMouseLeave={() => {
                        setCursorVariant("default");
                      }}
                      onClick={() => {
                        onHandleLike();
                      }}
                    >
                      🎉 {likes}
                    </button>
                  </span>
                  <span>
                    {new Date(props.post.createdAt) ===
                    new Date(props.post.updatedAt)
                      ? new Date(props.post.createdAt).toLocaleDateString(
                          "es-ES",
                          {
                            year: "numeric",
                            month: "long",
                            day: "numeric"
                          }
                        )
                      : "Actualizado " +
                        new Date(props.post.updatedAt).toLocaleDateString(
                          "es-ES",
                          {
                            year: "numeric",
                            month: "long",
                            day: "numeric"
                          }
                        )}
                  </span>
                </div>
                <motion.div
                  className="line"
                  initial={{ width: 0 }}
                  transition={{ duration: 0.5, delay: 1 }}
                  whileInView={{ width: "100%" }}
                  viewport={{ once: true }}
                  style={{
                    backgroundColor: "#94a3b8",
                    height: "1px",
                    margin: "1rem 0"
                  }}
                ></motion.div>
              </div>
            </div>

            <Markdown source={props.post.content} />
          </motion.div>
        </div>
      </PageTransition>
    </>
  );
}

export default forwardRef(BlogPostPage);

export const getStaticPaths: GetStaticPaths = async () => {
  const getAllPostsSlugs = async () => {
    const URL = `${process.env.NEXT_PUBLIC_API_URL}/posts/slug/`;

    try {
      const response = await axios.get(URL);
      if (response.status === 200) {
        return response.data.posts;
      }
    } catch (error) {
      console.log(error);
    }
  };

  const paths = await getAllPostsSlugs();

  return {
    paths: paths.map((path: any) => {
      return {
        params: {
          slug: path.slug
        }
      };
    }),
    fallback: "blocking"
  };
};

export const getStaticProps: GetStaticProps = async (context: any) => {
  const slug = context.params?.slug;

  const getPostBySlug = async () => {
    const URL = `${process.env.NEXT_PUBLIC_API_URL}/posts/slug/${slug}/`;

    try {
      const response = await axios.get(URL);
      if (response.status === 200) {
        return response.data.post;
      }
    } catch (error) {
      console.log(error);
    }
  };

  const post = await getPostBySlug();

  return {
    props: {
      post
    },
    revalidate: 1
  };
};
