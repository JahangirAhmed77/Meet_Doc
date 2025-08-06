/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors:{
        'primary':"#044343"
      },
      gridTemplateColumns: {
        'auto-fill-200': 'repeat(auto-fill, minmax(200px, 1fr))' 
      }
    }
  },
  plugins: [],
}