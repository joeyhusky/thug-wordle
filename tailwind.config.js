module.exports = {
  content: ["./index.html", "./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      keyframes: {
        wiggle: {
          "0%, 100%": { transform: "translateX(-4px)" },
          "50%": { transform: "translateX(4px)" },
        },
      },
      animation: {
        wiggle: "wiggle .2s ease infinite",
      },
    },
  },
  plugins: [],
};
