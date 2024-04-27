import tailwind from "@astrojs/tailwind"
import { defineConfig } from "astro/config"

import sitemap from "@astrojs/sitemap"

// https://astro.build/config
export default defineConfig({
	server: {
		host: true, // expose server to network
	},
	integrations: [tailwind(), sitemap()],
	image: {
		domains: ["ik.imagekit.io", "swiftshift.app", "1.gravatar.com/avatar", "vimcolors.org"],
	},
	output: "static",
	build: {
		redirects: false,
	},
	redirects: {
		"/count.js": "https://gc.zgo.at/count.js",
		"/goat": "https://pablopunk.goatcounter.com/count",
		"/es": "/",
		"/cv": "https://cv.pablopunk.com",
		"/books": "https://www.notion.so/Books-9de297d7668e4498a9769421d29889b8",
		"/illustrations": "https://www.notion.so/pablopunk/Drawings-0c241704f0ea48d39591ca3bf1483966",
		"/drawings": "https://www.notion.so/pablopunk/Drawings-0c241704f0ea48d39591ca3bf1483966",
		"/photos": "https://www.pexels.com/@pablopunk",
		"/gear": "https://www.notion.so/pablopunk/Gear-I-use-11cee5aed9a349309ef30a72f6923f37",
		"/healthi-app": "https://pablopunk.github.io/healthi-app/",
		"/iga": "https://github.com/pablopunk/iga",
		"/favicon.ico": "/favicon/favicon.ico",
		"/admin": "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
		"/admin.php": "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
		"/wp-admin/includes": "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
		"/wp-content": "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
		"/wp-login.php": "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
		"/es/posts/otro-starter-kit-para-nextjs-a-mi-manera":
			"/posts/yet-another-next-js-starter-kit-my-way-",
		"/es/posts/buscador-de-archivos-y-texto-vim-sin-plugins":
			"/posts/file-finder-and-project-search-in-vim-without-any-plugins",
		"/posts/Programar-nextjs-cms-es-muy-lento-aqui-esta-la-solucion":
			"/posts/developing-nextjs-cms-is-slow-here-s-the-fix",
		"/posts/como-crear-una-interfaz-en-tiempo-real-usando-nextjs-y-supabase":
			"/posts/how-to-create-a-real-time-ui-with-nextjs-and-supabase",
		"/posts/como-reemplazar-text-en-vim-solo-dentro-de-un-patron-concreto":
			"/posts/how-to-replace-text-in-vim-only-inside-a-specific-search",
		"/posts/la-mejor-camara-que-cabe-en-tu-bolsillo-no-es-tu-smartphone":
			"/the-best-camera-that-fits-in-your-pocket-is-not-your-smartphone",
	},
})
