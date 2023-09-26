/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic": "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
        "google-btn-normal": "url('/images/btn_google_signin_light_normal_web.png')",
        "google-btn-hover": "url('/images/btn_google_signin_light_focus_web.png')",
        "google-btn-active": "url('/images/btn_google_signin_light_pressed_web.png')",
      },
    },
  },
  plugins: [require("@tailwindcss/line-clamp")],
};
