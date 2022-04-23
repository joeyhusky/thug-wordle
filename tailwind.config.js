module.exports = {
  content: ["./index.html", "./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      keyframes: {
        wiggle: {
          "0%, 100%": { transform: "translateX(-4px)" },
          "50%": { transform: "translateX(4px)" },
        },
        breathe: {
          "0%, 100%": { transform: "scale(1)" },
          "50%": { transform: "scale(1.1)" },
        },
      },
      animation: {
        wiggle: "wiggle .2s ease infinite",
        breathe: "breathe .2s ease infinite",
      },
    },
  },
  plugins: [],
};
