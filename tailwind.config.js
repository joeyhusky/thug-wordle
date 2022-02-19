module.exports = {
  content: ["./index.html", "./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      keyframes: {
        wiggle: {
          "0%, 100%": { transform: "translateY(-4px)" },
          "50%": { transform: "translateY(4px)" },
        },
      },
      animation: {
        wiggle: "wiggle 1.5s ease infinite",
      },
    },
  },
  plugins: [],
};
