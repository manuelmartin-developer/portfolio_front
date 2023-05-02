/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,
  env: {
    NEXT_APP_ENV: process.env.NEXT_APP_ENV,
    NEXT_PUBLIC_MONITOR_WS_URL: process.env.NEXT_PUBLIC_MONITOR_WS_URL
  },
  experimental: {
    scrollRestoration: true
  }
};

module.exports = nextConfig;
