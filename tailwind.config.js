/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        // Apple Color System
        apple: {
          white: '#ffffff',
          black: '#000000',
          gray: {
            50: '#f9f9f9',
            100: '#f5f5f7',
            200: '#e8e8ed',
            300: '#d2d2d7',
            400: '#86868b',
            500: '#515154',
            600: '#424245',
            700: '#1d1d1f',
            800: '#161617',
            900: '#101011',
          },
          blue: {
            DEFAULT: '#007aff',
            dark: '#0051d5',
            light: '#5ac8fa',
          },
          green: {
            DEFAULT: '#30d158',
            dark: '#248a3d',
            light: '#63e6e2',
          },
          orange: {
            DEFAULT: '#ff9500',
            dark: '#c7750a',
            light: '#ffcc02',
          },
          purple: {
            DEFAULT: '#af52de',
            dark: '#8944ab',
            light: '#bf5af2',
          },
          red: {
            DEFAULT: '#ff3b30',
            dark: '#d70015',
            light: '#ff6961',
          },
          pink: {
            DEFAULT: '#ff2d92',
            dark: '#d70065',
            light: '#ff6ac1',
          },
          yellow: {
            DEFAULT: '#ffcc02',
            dark: '#c7a500',
            light: '#ffd60a',
          },
        },
      },
      fontFamily: {
        'sf-pro-display': ['SF Pro Display', '-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'Roboto', 'sans-serif'],
        'sf-pro-text': ['SF Pro Text', '-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'Roboto', 'sans-serif'],
        'display': ['SF Pro Display', '-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'Roboto', 'sans-serif'],
        'body': ['SF Pro Text', '-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'Roboto', 'sans-serif'],
      },
      fontSize: {
        'display-large': ['clamp(48px, 8vw, 96px)', { lineHeight: '1.05', letterSpacing: '-0.015em' }],
        'display-medium': ['clamp(32px, 6vw, 64px)', { lineHeight: '1.08', letterSpacing: '-0.015em' }],
        'display-small': ['clamp(24px, 4vw, 40px)', { lineHeight: '1.1', letterSpacing: '-0.015em' }],
        'headline': ['clamp(21px, 3vw, 32px)', { lineHeight: '1.125', letterSpacing: '0.007em' }],
        'subheadline': ['clamp(19px, 2.5vw, 24px)', { lineHeight: '1.33', letterSpacing: '0.012em' }],
        'body': ['17px', { lineHeight: '1.47', letterSpacing: '-0.022em' }],
        'caption': ['14px', { lineHeight: '1.43', letterSpacing: '-0.016em' }],
      },
      spacing: {
        '18': '4.5rem',
        '88': '22rem',
        '128': '32rem',
        '144': '36rem',
        '160': '40rem',
        '176': '44rem',
        '192': '48rem',
      },
      borderRadius: {
        'apple-sm': '6px',
        'apple-md': '12px',
        'apple-lg': '18px',
        'apple-xl': '24px',
        'apple-2xl': '30px',
      },
      boxShadow: {
        'apple-sm': '0 1px 3px rgba(0, 0, 0, 0.1)',
        'apple-md': '0 4px 6px rgba(0, 0, 0, 0.1)',
        'apple-lg': '0 10px 15px rgba(0, 0, 0, 0.1)',
        'apple-xl': '0 20px 25px rgba(0, 0, 0, 0.1)',
        'apple-2xl': '0 25px 50px rgba(0, 0, 0, 0.15)',
      },
      animation: {
        'fade-in-up': 'fadeInUp 0.8s ease-out forwards',
        'fade-in': 'fadeIn 0.6s ease-out forwards',
        'scale-in': 'scaleIn 0.6s ease-out forwards',
        'float': 'float 6s ease-in-out infinite',
        'pulse-slow': 'pulse 3s ease-in-out infinite',
      },
      keyframes: {
        fadeInUp: {
          '0%': { opacity: '0', transform: 'translateY(30px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        scaleIn: {
          '0%': { opacity: '0', transform: 'scale(0.95)' },
          '100%': { opacity: '1', transform: 'scale(1)' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-10px)' },
        },
      },
      backdropBlur: {
        'apple': '20px',
      },
      transitionTimingFunction: {
        'apple': 'cubic-bezier(0.25, 0.1, 0.25, 1)',
      },
      screens: {
        'xs': '480px',
      },
    },
  },
  plugins: [],
};