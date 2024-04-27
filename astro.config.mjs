import sitemap from "@astrojs/sitemap"
import tailwind from "@astrojs/tailwind"
import vercel from "@astrojs/vercel/serverless"
import { defineConfig } from "astro/config"
import { mainUrl } from "./src/site"

// https://astro.build/config
export default defineConfig({
	server: {
		host: true, // expose server to network
	},
	integrations: [tailwind(), sitemap()],
	image: {
		domains: ["ik.imagekit.io", "swiftshift.app", "1.gravatar.com/avatar", "vimcolors.org"],
	},
	build: {
		inlineStylesheets: "always",
	},
	compressHTML: true,
	prefetch: true,
	output: "server",
	adapter: vercel(),
	site: mainUrl,
	// redirects: {
	// External URLs are not supported in Astro https://github.com/withastro/roadmap/discussions/847
	// I'm using ./vercel.json for that
	// },
})
