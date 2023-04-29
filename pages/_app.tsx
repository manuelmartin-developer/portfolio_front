import "@/styles/globals.scss";
import type { AppProps } from "next/app";
import { Toaster } from "react-hot-toast";
import Layout from "../components/layout/Layout";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <Toaster
        position="bottom-left"
        reverseOrder={false}
        toastOptions={{
          style: {
            fontFamily: "Open Sans, sans-serif",
            fontSize: "1.2rem"
          },
          duration: 5000
        }}
      />
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </>
  );
}
