module.exports = {
  content: ["./src/**/*.{js,jsx}"],
  theme: {
    extend: {
      colors: {
        primary: "#4f46e5", // Indigo
        danger: "#ef4444",  // Red
      },
    },
  },
  plugins: [require("@tailwindcss/forms")],
};