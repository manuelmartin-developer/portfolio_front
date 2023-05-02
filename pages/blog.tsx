import { NextPage } from "next";
import styles from "@/styles/Layout.module.scss";
import Hero from "../components/layout/Hero";

const blog: NextPage = () => {
  return (
    <div className={styles.container}>
      <Hero title="Blog" nextUnderscore="Tech" right="Dev" />
    </div>
  );
};

export default blog;
