import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        white: "var(--white)",
        ink: "var(--ink)",
        navy: {
          DEFAULT: "var(--navy)",
          mid: "var(--navy-mid)",
        },
        teal: {
          DEFAULT: "var(--teal)",
          light: "var(--teal-light)",
          dark: "var(--teal-dark)",
          pale: "var(--teal-pale)",
        },
        gray: {
          light: "var(--gray-light)",
          mid: "var(--gray-mid)",
          line: "var(--gray-line)",
          dark: "var(--gray-dark)",
          text: "var(--gray-text)",
        },
      },
    },
  },
  plugins: [],
};
export default config;
