/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,ts,jsx,tsx,mdx}", // ← Esto escanea todos los archivos dentro de src
    "./app/**/*.{js,ts,jsx,tsx,mdx}", // ← Si usas la carpeta app, también escaneará aquí
  ],
  theme: {
    extend: {},
  },
  plugins: [],
};
