import "@/styles/globals.scss";
import type { AppProps } from "next/app";
import { Toaster } from "react-hot-toast";
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
      <Toaster
        position="bottom-left"
        reverseOrder={false}
        toastOptions={{
          style: {
            fontFamily: "Helvetica Neue, sans-serif",
            fontSize: "1.2rem"
          },
          duration: 5000
        }}
      />
      <Layout>
        <Cursor />
        <PageTransition>
          <Component {...pageProps} />
        </PageTransition>
      </Layout>
    </>
  );
}
