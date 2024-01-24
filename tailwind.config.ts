import tailwindCssTypography from "@tailwindcss/typography";
import type { Config } from "tailwindcss";
import tailwindCssAnimate from "tailwindcss-animate";
import { fontFamily } from "tailwindcss/defaultTheme";

const tailwindCssConfig: Config = {
  content: ["./src/**/*.{js,jsx,mdx,ts,tsx}"],
  plugins: [tailwindCssAnimate, tailwindCssTypography],
  theme: {
    extend: {
      fontFamily: {
        sans: ["var(--font-inter)", ...fontFamily.sans],
      },
      screens: {
        "2xs": "360px",
        xs: "480px",
      },
    },
  },
};

export default tailwindCssConfig;
