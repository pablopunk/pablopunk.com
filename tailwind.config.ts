import type { Config } from "tailwindcss"
import tailwindcssRadixColors from "tailwindcss-radix-colors"
import defaultTheme from "tailwindcss/defaultTheme"

const config: Config = {
	content: ["./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}"],
	darkMode: ["class", "[data-theme='dark']"],
	theme: {
		extend: {
			fontFamily: {
				sans: ["Inter", ...defaultTheme.fontFamily.sans],
				serif: ['"DM Serif Display"', ...defaultTheme.fontFamily.serif],
				rubik: ['"Rubik"', ...defaultTheme.fontFamily.sans],
			},
		},
	},
	plugins: [tailwindcssRadixColors],
}

export default config
