/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        crib: {
          red: '#C62828',
          'red-dark': '#8E1B1B',
          'red-light': '#E53935',
          'red-muted': '#FFEBEE',
          ink: '#0B0B0D',
          charcoal: '#17171A',
          cream: '#F4EFE7',
          'warm-gray': '#A8A29A',
          white: '#FFFFFF',
          card: '#1F1F24',
          border: '#2C2C33',
        },
        surface: {
          primary: '#0B0B0D',
          secondary: '#17171A',
          tertiary: '#1F1F24',
          card: '#1A1A1E',
          hover: '#26262C',
          border: '#2A2A30',
        },
      },
      fontFamily: {
        display: ['"Plus Jakarta Sans"', 'Inter', 'system-ui', 'sans-serif'],
        sans: ['"Plus Jakarta Sans"', 'Inter', 'system-ui', 'sans-serif'],
      },
      boxShadow: {
        subtle: '0 2px 10px rgba(0, 0, 0, 0.25)',
        elevated: '0 8px 30px rgba(0, 0, 0, 0.45)',
        red: '0 4px 20px rgba(198, 40, 40, 0.35)',
      },
      transitionDuration: {
        standard: '200ms',
      },
    },
  },
  plugins: [],
};
