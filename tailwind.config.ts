import type { Config } from "tailwindcss"

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: "#ff9660",
      },
      width: {
        "modal-lg": "520px",
        "modal-md": "343px",
        signUp: "300px",
        cancel: "450px",
      },
      boxShadow: {
        expand: "0px 10px 10px -5px rgba(0,0,0,0.04), 0px -10px 10px -5px rgba(0,0,0,0.04)",
      },
      fontFamily: {
        tmoneyRoundWind: ["var(--font-tmoneyRoundWind)"],
      },
    },
  },
  plugins: [],
}
export default config
