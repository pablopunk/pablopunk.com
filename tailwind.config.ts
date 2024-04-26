import type { Config } from "tailwindcss"
import defaultTheme from "tailwindcss/defaultTheme"

function getColorScale(name: string) {
	const scale = {} as Record<string, string>

	for (let i = 1; i <= 12; i++) {
		scale[i] = `var(--${name}-${i})`
		// next line only needed if using alpha values
		// scale[`a${i}`] = `var(--${name}-a${i})`
	}

	return scale
}

const config: Config = {
	content: ["./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}"],
	darkMode: ["class", "[data-theme='dark']"],
	theme: {
		extend: {
			colors: {
				accent: getColorScale("teal"),
				accent2: getColorScale("indigo"),
				neutral: getColorScale("slate"),
			},
			fontFamily: {
				sans: ["Inter", ...defaultTheme.fontFamily.sans],
				serif: ["\"DM Serif Display\"", ...defaultTheme.fontFamily.serif],
				rubik: ["\"Rubik\"", ...defaultTheme.fontFamily.sans],
			},
		},
	},
	plugins: [],
}

export default config
