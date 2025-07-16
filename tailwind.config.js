/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        surface: {
          primary: '#ffffff',
          secondary: '#f8f9fa',
          accent: '#e9ecef',
          card: '#ffffff',
          border: '#dee2e6',
        },
        text: {
          primary: '#212529',
          secondary: '#495057',
          muted: '#adb5bd',
        },
        accent: {
          primary: '#007bff',
          secondary: '#6c757d',
          tertiary: '#17a2b8',
        },
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
      },
    },
  },
  plugins: [],
};
