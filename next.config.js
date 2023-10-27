/* eslint-disable */
const withMDX = require("@next/mdx")({
  extension: /\.mdx?$/,
});

/** @type {import('next').NextConfig} */
const nextConfig = {
  pageExtensions: ["js", "jsx", "mdx", "ts", "tsx"],
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "ik.imagekit.io",
      },
    ],
  },
  async rewrites() {
    return [
      {
        source: "/count.js",
        destination: "https://gc.zgo.at/count.js",
      },
      {
        source: "/goat",
        destination: "https://pablopunk.goatcounter.com/count",
      },
    ];
  },
};

module.exports = withMDX(nextConfig);
