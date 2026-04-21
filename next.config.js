/** @type {import('next').NextConfig} */
/* eslint-disable @typescript-eslint/no-var-requires, no-undef */

const { i18n } = require("./next-i18next.config");

const settings = {
  i18n,
  staticPageGenerationTimeout: 20000,
  output: "standalone",
  // Generate source maps in production for better debugging
  productionBrowserSourceMaps: true,
  // https://github.com/vercel/next.js/issues/48748#issuecomment-1578374105
  modularizeImports: {
    "@heroicons/react/outline/?(((\\w*)?/?)*)": {
      transform: "@heroicons/react/outline/{{ matches.[1] }}/{{member}}",
    },
    "@heroicons/react/solid/?(((\\w*)?/?)*)": {
      transform: "@heroicons/react/solid/{{ matches.[1] }}/{{member}}",
    },
  },
  images: {
    remotePatterns: [],
    // Optimize images
    formats: ["image/avif", "image/webp"],
    // Cache images for 1 year in production
    minimumCacheTTL: 31536000,
  },
  // Compress JavaScript in production
  compress: true,
  // Enable optimized imports
  experimental: {
    optimizePackageImports: ["@heroicons/react"],
  },
};

module.exports = settings;
