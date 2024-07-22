import type { Config } from "tailwindcss"

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        "profile-sm": "url('/img/profile/profileHeader-sm.jpg')",
        "profile-md": "url('/img/profile/profileHeader-md.jpg')",
        "profile-lg": "url('/img/profile/profileHeader-lg.jpg')",
        editBtn: "url('/img/profile/editBtn.jpg')",
      },
      width: {
        "profile-sm": "343px",
        "profile-md": "696px",
        "profile-lg": "996px",
        "profileEdit-lg": "520px",
        "profileEdit-md": "343px",
      },
    },
  },
  plugins: [],
}
export default config
