import tailwind from "@astrojs/tailwind";
import { defineConfig } from "astro/config";

import sitemap from "@astrojs/sitemap";

// https://astro.build/config
export default defineConfig({
  server: {
    host: true // expose server to network
  },
  integrations: [tailwind(), sitemap()],
  image: {
    domains: ["ik.imagekit.io", "swiftshift.app"]
  }
});