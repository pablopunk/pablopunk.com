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
  async redirects() {
    return [
      {
        source: "/es",
        destination: "/",
      },
      {
        source: "/cv",
        destination: "https://cv.pablopunk.com",
      },
      {
        source: "/books",
        destination:
          "https://www.notion.so/Books-9de297d7668e4498a9769421d29889b8",
      },
      {
        source: "/illustrations",
        destination:
          "https://www.notion.so/pablopunk/Drawings-0c241704f0ea48d39591ca3bf1483966",
      },
      {
        source: "/drawings",
        destination:
          "https://www.notion.so/pablopunk/Drawings-0c241704f0ea48d39591ca3bf1483966",
      },
      {
        source: "/photos",
        destination: "https://www.pexels.com/@pablopunk",
      },
      {
        source: "/gear",
        destination:
          "https://www.notion.so/pablopunk/Gear-I-use-11cee5aed9a349309ef30a72f6923f37",
      },
      {
        source: "/healthi-app",
        destination: "https://pablopunk.github.io/healthi-app/",
      },
      {
        source: "/iga",
        destination: "https://github.com/pablopunk/iga",
      },
      {
        source: "/favicon.ico",
        destination: "/favicon/favicon.ico",
      },
      {
        source: "/admin",
        destination: "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
      },
      {
        source: "/admin.php",
        destination: "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
      },
      {
        source: "/wp-admin/includes",
        destination: "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
      },
      {
        source: "/wp-content",
        destination: "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
      },
      {
        source: "/wp-login.php",
        destination: "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
      },
      {
        source: "/es/posts/otro-starter-kit-para-nextjs-a-mi-manera",
        destination: "/posts/yet-another-next-js-starter-kit-my-way-",
      },
      {
        source: "/es/posts/buscador-de-archivos-y-texto-vim-sin-plugins",
        destination:
          "/posts/file-finder-and-project-search-in-vim-without-any-plugins",
      },
      {
        source:
          "/posts/Programar-nextjs-cms-es-muy-lento-aqui-esta-la-solucion",
        destination: "/posts/developing-nextjs-cms-is-slow-here-s-the-fix",
      },
      {
        source:
          "/posts/como-crear-una-interfaz-en-tiempo-real-usando-nextjs-y-supabase",
        destination:
          "/posts/how-to-create-a-real-time-ui-with-nextjs-and-supabase",
      },
      {
        source:
          "/posts/como-reemplazar-text-en-vim-solo-dentro-de-un-patron-concreto",
        destination:
          "/posts/how-to-replace-text-in-vim-only-inside-a-specific-search",
      },
      {
        source:
          "/posts/la-mejor-camara-que-cabe-en-tu-bolsillo-no-es-tu-smartphone",
        destination:
          "/the-best-camera-that-fits-in-your-pocket-is-not-your-smartphone",
      },
    ];
  },
};

module.exports = withMDX(nextConfig);
