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
        "profile-sm": "url('/img/profile_bg/profile-bg-sm.png')",
        "profile-md": "url('/img/profile_bg/profile-bg-md.png')",
        "profile-lg": "url('/img/profile_bg/profile-bg-lg.png')",
        editBtn: "url('/img/profile/editBtn.jpg')",
      },
      width: {
        "profile-sm": "343px",
        "profile-md": "696px",
        "profile-lg": "996px",
        "modal-lg": "520px",
        "modal-md": "343px",
        signUp: "300px",
        cancel: "450px",
      },
      boxShadow: {
        expand: "0px 10px 10px -5px rgba(0,0,0,0.04), 0px -10px 10px -5px rgba(0,0,0,0.04)",
      },
    },
  },
  plugins: [],
}
export default config
