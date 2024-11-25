module.exports = {
  content: [
    "./src/**/*.{html,js,jsx,ts,tsx}", // İlgili dosyaların belirtildiğinden emin olun
  ],
  plugins: [
    require("@tailwindcss/forms"), // Form plugin'i ekleyin
  ],
};
