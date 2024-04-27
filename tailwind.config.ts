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
	darkMode: "class",
	theme: {
		extend: {
			colors: {
				accent: getColorScale("teal"),
				accent2: getColorScale("iris"),
				neutral: getColorScale("slate"),
			},
			fontFamily: {
				sans: ["Lexend Variable", ...defaultTheme.fontFamily.sans],
				rubik: ["Rubik Variable", ...defaultTheme.fontFamily.sans],
				serif: ["Literata Variable", ...defaultTheme.fontFamily.serif],
			},
		},
	},
	plugins: [],
}

export default config
