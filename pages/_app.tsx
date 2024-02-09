import '@/styles/globals.scss';
import '@/styles/device.scss';
import '@/styles/emulator.scss';
import 'tippy.js/dist/tippy.css';
import 'mapbox-gl/dist/mapbox-gl.css';

import type { AppProps } from 'next/app';
import { Analytics } from '@vercel/analytics/react';
import { useEffect } from 'react';
import { useRouter } from 'next/router';
import { SpeedInsights } from '@vercel/speed-insights/next';

import axios, { AxiosError } from 'axios';
import { SnackbarProvider, useSnackbar } from 'notistack';
import { AnimatePresence } from 'framer-motion';

import Layout from '../components/layout/Layout';
import Cursor from '../components/Cursor/Cursor';
import { useProjectsStore } from '../store/projectsStore';
import { useAdminStore } from '../store/adminStore';

export default function App({ Component, pageProps }: AppProps) {
  // Hooks
  const router = useRouter();
  const { enqueueSnackbar } = useSnackbar();

  // Constants
  const pageKey = router.asPath;

  // Store
  const { projectSelected } = useProjectsStore();
  const { setAdminLoggedIn } = useAdminStore();

  // Methods
  const verifyAdminToken = async () => {
    const admin_token = localStorage.getItem('admin_token');
    if (!admin_token) {
      return;
    }

    const URL = `${process.env.NEXT_PUBLIC_API_URL}/auth/verify`;

    const payload = {
      token: admin_token
    };

    const headers = {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${admin_token}`
    };

    try {
      const response = await axios.post(URL, payload, { headers });
      if (response.status === 200) {
        setAdminLoggedIn(true);
        enqueueSnackbar(response.data.message, { variant: 'success' });
      }
    } catch (error) {
      const err = error as AxiosError;
      if (err && err.response?.data) {
        const errorData: any = err.response.data;
        enqueueSnackbar(
          errorData.errorData?.message || 'Ha ocurrido un error',
          { variant: 'error' }
        );
      }
      setAdminLoggedIn(false);
      localStorage.removeItem('admin_token');
      return error;
    }
  };

  // Lifecycle component
  useEffect(() => {
    console.log(
      '%cHi dev! 👋',
      'font-family:monospace;font-size:1.5rem;font-weight:700;color:#fff;background-color:#3e3e3e;padding:0.3rem 0.8rem;border-radius:0.5rem;'
    );
    console.log(
      "%cIf you're here, you're probably interested in the code behind this website. You can find it here\nhttps://github.com/manuelmartin-developer/portfolio",
      'font-family:monospace;font-size:1.2rem;font-weight:400;color:#fff;background-color:#3e3e3e;padding:0.3rem 0.8rem;border-radius:0.5rem;'
    );

    verifyAdminToken();
  }, []);

  useEffect(() => {
    if (projectSelected && router.pathname !== '/work/[project]') {
      window.history.pushState(
        null,
        '',
        `/work/${projectSelected.title.toLowerCase()}`
      );
    } else if (
      !projectSelected &&
      router.pathname !== '/work/[project]' &&
      router.pathname.startsWith('/work')
    ) {
      window.history.pushState(null, '', `/work`);
    }
  }, [projectSelected]);
  return (
    <>
      <Cursor />
      <Analytics />
      <AnimatePresence mode="popLayout">
        <SnackbarProvider
          maxSnack={5}
          anchorOrigin={{
            vertical: 'bottom',
            horizontal: 'left'
          }}
          autoHideDuration={3000}
        >
          <Layout>
            <Component key={pageKey} {...pageProps} />
            <SpeedInsights />
          </Layout>
        </SnackbarProvider>
      </AnimatePresence>
    </>
  );
}
