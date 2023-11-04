import Head from "next/head";
import dynamic from "next/dynamic";
import { forwardRef, useEffect, useState } from "react";
import { GetStaticPaths, GetStaticProps } from "next";

import axios from "axios";

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

const ConfettiExplosion = dynamic(
  () => import("react-confetti-explosion").then((mod) => mod.default),
  { ssr: false }
);

type BlogPostPageProps = {
  post: Post;
};
type BlogPostPageRef = React.ForwardedRef<HTMLDivElement>;

enum ConfettiLevel {
  ZERO = 0,
  ONE = 1,
  TWO = 2,
  THREE = 3,
  FOUR = 4,
  FIVE = 5
}

interface ConfettiState {
  [key: number]: {
    colors: string[];
    particleCount: number;
    force: number;
  };
}

const confettiConfig: ConfettiState = {
  1: {
    colors: ["#000", "#333", "#666"],
    particleCount: 30,
    force: 0.1
  },
  2: {
    colors: ["#000", "#f00"],
    particleCount: 60,
    force: 0.3
  },
  3: {
    colors: ["#f00", "#0f0", "#00f"],
    particleCount: 100,
    force: 0.5
  },
  4: {
    colors: ["#f00", "#0f0", "#00f", "#ff0", "#0ff"],
    particleCount: 200,
    force: 0.7
  },
  5: {
    colors: [
      "#a864fd",
      "#29cdff",
      "#78ff44",
      "#ff718d",
      "#fdff6a",
      "#a864fd",
      "#29cdff",
      "#78ff44",
      "#ff718d",
      "#fdff6a"
    ],
    particleCount: 300,
    force: 0.9
  }
};

function BlogPostPage(props: BlogPostPageProps, ref: BlogPostPageRef) {
  // Componet states
  const [isConfettiActive, setIsConfettiActive] = useState<boolean>(false);
  const [confettiLevel, setConfettiLevel] = useState<ConfettiLevel>(
    ConfettiLevel.ZERO
  );
  const [likes, setLikes] = useState<number>(props.post.likes);

  // Store
  const { setCursorVariant, setCursorText } = useCursorStore();

  // Methods
  const onEnterConfettiButton = () => {
    setCursorVariant("party");
    setCursorText("¡Fiesta!");
  };

  const onLeaveConfettiButton = () => {
    setCursorVariant("default");
    setCursorText("");
  };

  const onHandleLike = async () => {
    const URL = `${process.env.NEXT_PUBLIC_API_URL}/posts/like/${props.post.id_post}/`;

    const payload = {
      likes
    };

    try {
      const response = await axios.post(URL, payload);
      if (response.status === 200) {
        setIsConfettiActive(true);
        setLikes(response.data.post.likes);
        setConfettiLevel(confettiLevel + 1);
        localStorage.setItem(
          `confetti-level-${props.post.id_post.toString()}`,
          (confettiLevel + 1).toString()
        );
      }
    } catch (error) {
      console.log(error);
    }
  };

  // Component Lifecycle
  useEffect(() => {
    if (confettiLevel === ConfettiLevel.FIVE) {
      setCursorVariant("default");
      setCursorText("");
    }
  }, [confettiLevel]);

  useEffect(() => {
    const confettiLevelStorage = localStorage.getItem(
      `confetti-level-${props.post.id_post.toString()}`
    );

    confettiLevelStorage
      ? setConfettiLevel(Number(confettiLevelStorage) as ConfettiLevel)
      : setConfettiLevel(ConfettiLevel.ZERO);
  }, [confettiLevel]);

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
                <span className={styles.container_hero__date}>
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
                <motion.div
                  className={styles.container__confetti}
                  initial={{ opacity: 0, x: -100 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.5, delay: 1 }}
                >
                  {isConfettiActive && (
                    <ConfettiExplosion
                      force={confettiConfig[confettiLevel].force}
                      duration={2000}
                      onComplete={() => setIsConfettiActive(false)}
                      particleCount={
                        confettiConfig[confettiLevel].particleCount
                      }
                      width={window.innerWidth}
                      colors={confettiConfig[confettiLevel].colors}
                    />
                  )}

                  <AnimatePresence mode="sync">
                    {confettiLevel !== ConfettiLevel.FIVE && (
                      <motion.button
                        key="confettiButton"
                        onMouseEnter={onEnterConfettiButton}
                        onMouseLeave={onLeaveConfettiButton}
                        className={`${styles.container__confetti__button} ${
                          confettiLevel === 1
                            ? styles.container__confetti__button__level1
                            : confettiLevel === 2
                            ? styles.container__confetti__button__level2
                            : confettiLevel === 3
                            ? styles.container__confetti__button__level3
                            : confettiLevel === 4
                            ? styles.container__confetti__button__level4
                            : confettiLevel !== 0
                            ? styles.container__confetti__button__level5
                            : ""
                        }`}
                        onClick={() => {
                          if (!isConfettiActive) {
                            onHandleLike();
                          }
                        }}
                      >
                        🎉
                        <AnimatePresence mode="wait">
                          {confettiLevel !== ConfettiLevel.ZERO && (
                            <motion.h6
                              key="confettiButtonLikes"
                              initial={{ opacity: 0 }}
                              animate={{ opacity: 1 }}
                              exit={{ opacity: 0 }}
                              transition={{ duration: 0.5 }}
                            >
                              +{likes} {likes === 1 ? "like" : "likes"}
                            </motion.h6>
                          )}
                        </AnimatePresence>
                      </motion.button>
                    )}
                  </AnimatePresence>
                </motion.div>
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
    }
  };
};
