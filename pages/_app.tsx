import "@/styles/globals.scss";
import "@/styles/device.scss";
import "@/styles/emulator.scss";

import type { AppProps } from "next/app";
import Layout from "../components/layout/Layout";
import { useEffect } from "react";
import PageTransition from "../components/transitions/PageTransition";
import Cursor from "../components/Cursor/Cursor";

export default function App({ Component, pageProps }: AppProps) {
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

  return (
    <>
      <Layout>
        <Cursor />
        <PageTransition>
          <Component {...pageProps} />
        </PageTransition>
      </Layout>
    </>
  );
}
