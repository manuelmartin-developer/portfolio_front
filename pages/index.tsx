import { NextPage } from "next";
import styles from "@/styles/Layout.module.scss";
import Hero from "../components/layout/Hero";

const info: NextPage = () => {
  return (
    <div className={styles.container}>
      <Hero title="Info" nextUnderscore="FN: Manuel" right="LN: Martín" />
    </div>
  );
};

export default info;
