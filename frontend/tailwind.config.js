/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        h1: "var(--h1-font-family)",
        h2: "var(--h2-font-family)",
        h3: "var(--h3-font-family)",
        h4: "var(--h4-font-family)",
        logo: "var(--logo-font-family)",
        "paragraph-body-text": "var(--paragraph-body-text-font-family)",
        tagline: "var(--tagline-font-family)",
      },
      boxShadow: {
        "default-shadow": "var(--default-shadow)",
      },
      screens: {
        xs: "375px",
      },
    },
  },
  plugins: [],
};
