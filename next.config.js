/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,
  env: {
    NEXT_APP_ENV: process.env.NEXT_APP_ENV,
    NEXT_PUBLIC_MONITOR_WS_URL: process.env.NEXT_PUBLIC_MONITOR_WS_URL,
    NEXT_PUBLIC_API_URL: process.env.NEXT_PUBLIC_API_URL
  }
};

module.exports = nextConfig;
