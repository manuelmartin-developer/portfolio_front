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
    NEXT_PUBLIC_API_URL: process.env.NEXT_PUBLIC_API_URL,
    NEXT_PUBLIC_MAPBOX_TOKEN: process.env.NEXT_PUBLIC_MAPBOX_TOKEN
  },
  images: {
    domains: [
      "localhost",
      "manuelmartin.dev",
      "manuelmartin-media.s3.eu-west-3.amazonaws.com"
    ]
  }
};

module.exports = removeImports(nextConfig);
