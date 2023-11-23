/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        primaryRed: '#DC3535',
        primaryOrange: '#D17842',
        primaryBlack: '#0C0F14',
        secondaryBlack: '#252A32',
        blackGradient: 'rgba(0,0,0,0.7)',
      },
      fontFamily: {
        poppins: ['"poppins"', 'san-serif'],
      },
    },
  },
  plugins: [],
};
