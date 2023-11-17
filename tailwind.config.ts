import type { Config } from "tailwindcss";

const cssColors = (selection: string[]) => {
  const result: { [key: string]: string } = {};

  for (const color of selection) {
    for (let i = 1; i <= 10; i++) {
      const shade = `${color}-${i}`;
      result[shade] = `var(--color-${shade})`;
    }
  }

  return result;
};

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        ...cssColors(["neutral", "accent"]),
      },
    },
  },
  plugins: [],
};
export default config;
