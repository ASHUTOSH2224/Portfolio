/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        // Vercel Color System
        vercel: {
          white: '#ffffff',
          black: '#000000',
          gray: {
            50: '#fafafa',
            100: '#f5f5f5',
            200: '#e5e5e5',
            300: '#d4d4d4',
            400: '#a3a3a3',
            500: '#737373',
            600: '#525252',
            700: '#404040',
            800: '#262626',
            900: '#171717',
            950: '#0a0a0a',
          },
          blue: {
            DEFAULT: '#0070f3',
            dark: '#0051d5',
            light: '#3291ff',
          },
          green: {
            DEFAULT: '#0070f3',
            dark: '#0051d5',
            light: '#3291ff',
          },
          purple: {
            DEFAULT: '#7928ca',
            dark: '#5a1c8a',
            light: '#a855f7',
          },
          pink: {
            DEFAULT: '#ff0080',
            dark: '#cc0066',
            light: '#ff4da6',
          },
          orange: {
            DEFAULT: '#f5a524',
            dark: '#d97706',
            light: '#fbbf24',
          },
          red: {
            DEFAULT: '#e00000',
            dark: '#b80000',
            light: '#ff3333',
          },
          yellow: {
            DEFAULT: '#f5a524',
            dark: '#d97706',
            light: '#fbbf24',
          },
        },
        // Background colors
        bg: {
          primary: '#000000',
          secondary: '#111111',
          tertiary: '#1a1a1a',
          elevated: '#262626',
        },
      },
      fontFamily: {
        'inter': ['Inter', '-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'Roboto', 'sans-serif'],
        'display': ['Inter', '-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'Roboto', 'sans-serif'],
        'body': ['Inter', '-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'Roboto', 'sans-serif'],
      },
      fontSize: {
        'display-large': ['clamp(48px, 8vw, 96px)', { lineHeight: '1.1', letterSpacing: '-0.02em' }],
        'display-medium': ['clamp(32px, 6vw, 64px)', { lineHeight: '1.15', letterSpacing: '-0.02em' }],
        'display-small': ['clamp(24px, 4vw, 40px)', { lineHeight: '1.2', letterSpacing: '-0.01em' }],
        'headline': ['clamp(21px, 3vw, 32px)', { lineHeight: '1.3', letterSpacing: '-0.01em' }],
        'subheadline': ['clamp(19px, 2.5vw, 24px)', { lineHeight: '1.4', letterSpacing: '-0.01em' }],
        'body': ['16px', { lineHeight: '1.6', letterSpacing: '-0.01em' }],
        'caption': ['14px', { lineHeight: '1.5', letterSpacing: '-0.01em' }],
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
        'vercel-sm': '6px',
        'vercel-md': '8px',
        'vercel-lg': '12px',
        'vercel-xl': '16px',
        'vercel-2xl': '24px',
      },
      boxShadow: {
        'vercel-sm': '0 1px 2px rgba(0, 0, 0, 0.05)',
        'vercel-md': '0 4px 6px rgba(0, 0, 0, 0.1)',
        'vercel-lg': '0 10px 15px rgba(0, 0, 0, 0.1)',
        'vercel-xl': '0 20px 25px rgba(0, 0, 0, 0.15)',
        'vercel-2xl': '0 25px 50px rgba(0, 0, 0, 0.25)',
      },
      animation: {
        'fade-in-up': 'fadeInUp 0.8s ease-out forwards',
        'fade-in': 'fadeIn 0.6s ease-out forwards',
        'scale-in': 'scaleIn 0.6s ease-out forwards',
        'float': 'float 6s ease-in-out infinite',
        'pulse-slow': 'pulse 3s ease-in-out infinite',
        'gradient': 'gradient 15s ease infinite',
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
          '50%': { transform: 'translateY(-20px)' },
        },
        gradient: {
          '0%': { backgroundPosition: '0% 50%' },
          '50%': { backgroundPosition: '100% 50%' },
          '100%': { backgroundPosition: '0% 50%' },
        },
      },
      backdropBlur: {
        'vercel': '20px',
      },
      transitionTimingFunction: {
        'vercel': 'cubic-bezier(0.25, 0.1, 0.25, 1)',
      },
      screens: {
        'xs': '480px',
      },
    },
  },
  plugins: [],
};