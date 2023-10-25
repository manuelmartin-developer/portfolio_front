import "@/styles/globals.scss";
import "@/styles/device.scss";
import "@/styles/emulator.scss";

import type { AppProps } from "next/app";
import { Analytics } from "@vercel/analytics/react";
import Layout from "../components/layout/Layout";
import { useEffect } from "react";
import Cursor from "../components/Cursor/Cursor";
import { useProjectsStore } from "../store/projectsStore";
import { Toaster } from "react-hot-toast";
import { useRouter } from "next/router";
import axios, { AxiosError } from "axios";
import { useAdminStore } from "../store/adminStore";
import toast from "react-hot-toast";
import { AnimatePresence } from "framer-motion";

export default function App({ Component, pageProps }: AppProps) {
  // Hooks
  const router = useRouter();

  // Constants
  const pageKey = router.asPath;

  // Store
  const { projectSelected } = useProjectsStore();
  const { setAdminLoggedIn } = useAdminStore();

  // Methods
  const verifyAdminToken = async () => {
    const admin_token = localStorage.getItem("admin_token");
    if (!admin_token) {
      return;
    }

    const URL = `${process.env.NEXT_PUBLIC_API_URL}/auth/verify`;

    const payload = {
      token: admin_token
    };

    const headers = {
      "Content-Type": "application/json",
      Authorization: `Bearer ${admin_token}`
    };

    try {
      const response = await axios.post(URL, payload, { headers });
      if (response.status === 200) {
        setAdminLoggedIn(true);
        toast.success(response.data.message);
      }
    } catch (error) {
      const err = error as AxiosError;
      if (err && err.response?.data) {
        const errorData: any = err.response.data;
        toast.error(errorData.message);
      } else {
        toast.error("Ha existido un error en el servidor");
      }
      setAdminLoggedIn(false);
      localStorage.removeItem("admin_token");
      return error;
    }
  };

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

    verifyAdminToken();
  }, []);

  useEffect(() => {
    if (projectSelected && router.pathname !== "/work/[slug]") {
      window.history.pushState(
        null,
        "",
        `/work/${projectSelected.title.toLowerCase()}`
      );
    } else if (
      !projectSelected &&
      router.pathname !== "/work/[slug]" &&
      router.pathname.startsWith("/work")
    ) {
      window.history.pushState(null, "", `/work`);
    }
  }, [projectSelected]);

  return (
    <>
      <Toaster
        position="bottom-left"
        containerClassName="toastContainer"
        toastOptions={{
          duration: 5000
        }}
      />
      <Cursor />
      <Analytics />
      <AnimatePresence mode="popLayout" initial={false}>
        <Layout>
          <Component key={pageKey} {...pageProps} />
        </Layout>
      </AnimatePresence>
    </>
  );
}
