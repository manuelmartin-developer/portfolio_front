import "@/styles/globals.scss";
import "@/styles/device.scss";
import "@/styles/emulator.scss";

import type { AppProps } from "next/app";
import { Analytics } from "@vercel/analytics/react";
import Layout from "../components/layout/Layout";
import { useEffect } from "react";
import PageTransition from "../components/transitions/PageTransition";
import Cursor from "../components/Cursor/Cursor";
import { useProjectsStore } from "../store/projectsStore";

export default function App({ Component, pageProps }: AppProps) {
  // Store
  const { projectSelected } = useProjectsStore();

  // Lifecycle component
  useEffect(() => {
    console.log(
      "%cHi dev! 👋",
      "font-family:monospace;font-size:1.5rem;font-weight:700;color:#fff;background-color:#3e3e3e;padding:0.3rem 0.8rem;border-radius:0.5rem;"
    );
    console.log(
      "%cIf you're here, you're probably interested in the code behind this website. You can find it here\nhttps://github.com/manuelmartin-developer/portfolio",
      "font-family:monospace;font-size:1.2rem;font-weight:400;color:#fff;background-color:#3e3e3e;padding:0.3rem 0.8rem;border-radius:0.5rem;"
    );
  }, []);

  useEffect(() => {
    //  If a project is selected change urk to /work/project-id
    if (projectSelected) {
      window.history.pushState(
        null,
        "",
        `/work/${projectSelected.title.toLowerCase()}`
      );
    } else {
      window.history.pushState(null, "", "/work");
    }
  }, [projectSelected]);

  return (
    <>
      <Layout>
        <Cursor />
        <PageTransition>
          <Component {...pageProps} />
          <Analytics />
        </PageTransition>
      </Layout>
    </>
  );
}
