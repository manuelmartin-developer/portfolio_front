import styles from "@/styles/Layout.module.scss";
import Hero from "../components/layout/Hero";
import { forwardRef } from "react";
import Head from "next/head";
import PageTransition from "../components/transitions/PageTransition";

type BlogPageProps = {};
type BlogPageRef = React.ForwardedRef<HTMLDivElement>;

function blog(props: BlogPageProps, ref: BlogPageRef) {
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
      <PageTransition ref={ref}>
        <div className={styles.container}>
          <Hero title="Blog" nextUnderscore="Tech" right="Dev" />
        </div>
      </PageTransition>
    </>
  );
}

export default forwardRef(blog);
