/** @type {import('next').NextConfig} */
const removeImports = require("next-remove-imports")();

const nextConfig = {
  reactStrictMode: false,
  webpack: function (config) {
    config.module.rules.push({
      test: /\.md$/,
      use: "raw-loader"
    });
    return config;
  },
  env: {
    NEXT_APP_ENV: process.env.NEXT_APP_ENV,
    NEXT_PUBLIC_MONITOR_WS_URL: process.env.NEXT_PUBLIC_MONITOR_WS_URL,
    NEXT_PUBLIC_API_URL: process.env.NEXT_PUBLIC_API_URL
  }
};

module.exports = removeImports(nextConfig);
