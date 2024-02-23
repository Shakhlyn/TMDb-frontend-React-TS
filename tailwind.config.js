/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  // theme: {
  //   extend: {},
  // },
  theme: {
    extend: {
      screens: {
        xs: "500px",
        mobile: "300px",
      },

      fontSize: {
        mobile: ".6rem",
      },
    },
  },
  plugins: [],
};
