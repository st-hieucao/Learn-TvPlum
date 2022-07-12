module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {},
  },
  plugins: [],
}

// ------------ if u want use aspect-ratio, line-clamp or something like that,
//  ----------- u must install some package from tailwind
// Example:
// "@tailwindcss/aspect-ratio": "^0.3.0",
// "@tailwindcss/line-clamp": "^0.2.2",