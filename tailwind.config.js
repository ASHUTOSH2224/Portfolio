/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        // Light theme grays
        light: {
          50: '#ffffff',
          100: '#f9fafb',
          200: '#f3f4f6',
          300: '#e5e7eb',
          400: '#d1d5db',
          500: '#9ca3af',
          600: '#6b7280',
          700: '#4b5563',
          800: '#374151',
          900: '#1f2937',
          950: '#111827',
        },
        // Orange primary colors
        primary: {
          50: '#fff7ed',
          100: '#ffedd5',
          200: '#fed7aa',
          300: '#fdba74',
          400: '#fb923c',
          500: '#f97316', // Main orange
          600: '#ea580c',
          700: '#c2410c',
          800: '#9a3412',
          900: '#7c2d12',
        },
        // Updated accent colors for light theme
        accent: {
          primary: '#f97316',    // Orange primary
          secondary: '#8b5cf6',  // Purple accent
          tertiary: '#06b6d4',   // Cyan accent
          coral: '#ff6b6b',      // Coral accent
          purple: '#8b5cf6',     // Purple accent
          cyan: '#06b6d4',       // Cyan accent
          emerald: '#10b981',    // Success green
          amber: '#f59e0b',      // Warning amber
          terminal: '#f97316',   // Orange terminal
          vscode: '#007acc',     // Keep VS Code blue for syntax
          github: '#24292e',     // GitHub dark
          typescript: '#3178c6', // TypeScript blue
          javascript: '#f7df1e', // JavaScript yellow
          react: '#61dafb',      // React cyan
          node: '#8cc84b',       // Node.js green
          python: '#3776ab',     // Python blue
          git: '#f05032',        // Git orange
          docker: '#2496ed',     // Docker blue
          aws: '#ff9900',        // AWS orange
          mongodb: '#47a248',    // MongoDB green
        },
        // Light theme surfaces
        surface: {
          primary: '#ffffff',
          secondary: '#f9fafb',
          tertiary: '#f3f4f6',
          border: '#e5e7eb',
          'border-light': '#d1d5db',
          card: '#ffffff',
          hover: '#f9fafb',
          elevated: '#ffffff',
          accent: '#fff7ed',
        },
        // Light theme text colors
        text: {
          primary: '#1f2937',
          secondary: '#374151',
          muted: '#6b7280',
          'muted-dark': '#9ca3af',
          terminal: '#f97316',
          syntax: '#007acc',
          comment: '#6b7280',
          string: '#059669',
          keyword: '#7c3aed',
          number: '#dc2626',
        },
        // Light theme glow effects
        glow: {
          orange: '#f97316',
          purple: '#8b5cf6',
          cyan: '#06b6d4',
          coral: '#ff6b6b',
          terminal: '#f97316',
          primary: '#f97316',
        },
        // Light theme terminal colors
        terminal: {
          bg: '#ffffff',
          text: '#1f2937',
          bright: '#000000',
          orange: '#f97316',
          blue: '#007acc',
          yellow: '#f59e0b',
          red: '#dc2626',
          purple: '#8b5cf6',
          cyan: '#06b6d4',
        },
        // Light theme editor colors
        editor: {
          bg: '#ffffff',
          sidebar: '#f9fafb',
          selection: '#fef3c7',
          cursor: '#f97316',
          line: '#f3f4f6',
          gutter: '#6b7280',
        }
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
        mono: ['Fira Code', 'monospace'],
      },
      animation: {
        'fade-in': 'fadeIn 0.8s ease-in-out',
        'fade-in-up': 'fadeInUp 0.8s ease-out',
        'fade-in-down': 'fadeInDown 0.8s ease-out',
        'fade-in-left': 'fadeInLeft 0.8s ease-out',
        'fade-in-right': 'fadeInRight 0.8s ease-out',
        'slide-up': 'slideUp 0.6s ease-out',
        'slide-down': 'slideDown 0.6s ease-out',
        'scale-in': 'scaleIn 0.5s ease-out',
        'glow-pulse': 'glowPulse 3s ease-in-out infinite',
        'float': 'float 6s ease-in-out infinite',
        'rotate-slow': 'rotateSlow 20s linear infinite',
        'gradient-shift': 'gradientShift 8s ease-in-out infinite',
        'typewriter': 'typewriter 3s steps(40) infinite',
        'blink': 'blink 1s step-end infinite',
        'matrix-rain': 'matrixRain 10s linear infinite',
        'shine': 'shine 3s ease-in-out infinite',
        'pulse-slow': 'pulseSlow 4s ease-in-out infinite',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        fadeInUp: {
          '0%': { opacity: '0', transform: 'translateY(30px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        fadeInDown: {
          '0%': { opacity: '0', transform: 'translateY(-30px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        fadeInLeft: {
          '0%': { opacity: '0', transform: 'translateX(-30px)' },
          '100%': { opacity: '1', transform: 'translateX(0)' },
        },
        fadeInRight: {
          '0%': { opacity: '0', transform: 'translateX(30px)' },
          '100%': { opacity: '1', transform: 'translateX(0)' },
        },
        slideUp: {
          '0%': { transform: 'translateY(100%)' },
          '100%': { transform: 'translateY(0)' },
        },
        slideDown: {
          '0%': { transform: 'translateY(-100%)' },
          '100%': { transform: 'translateY(0)' },
        },
        scaleIn: {
          '0%': { transform: 'scale(0.8)', opacity: '0' },
          '100%': { transform: 'scale(1)', opacity: '1' },
        },
        glowPulse: {
          '0%, 100%': { 
            boxShadow: '0 0 20px rgba(249, 115, 22, 0.3), 0 0 40px rgba(249, 115, 22, 0.1)' 
          },
          '50%': { 
            boxShadow: '0 0 30px rgba(249, 115, 22, 0.5), 0 0 60px rgba(249, 115, 22, 0.2)' 
          },
        },
        pulseSlow: {
          '0%, 100%': { opacity: '0.8' },
          '50%': { opacity: '1' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-20px)' },
        },
        rotateSlow: {
          '0%': { transform: 'rotate(0deg)' },
          '100%': { transform: 'rotate(360deg)' },
        },
        gradientShift: {
          '0%, 100%': { backgroundPosition: '0% 50%' },
          '25%': { backgroundPosition: '100% 50%' },
          '50%': { backgroundPosition: '100% 100%' },
          '75%': { backgroundPosition: '0% 100%' },
        },
        typewriter: {
          '0%': { width: '0' },
          '50%': { width: '100%' },
          '100%': { width: '0' },
        },
        blink: {
          '0%, 50%': { opacity: '1' },
          '51%, 100%': { opacity: '0' },
        },
        matrixRain: {
          '0%': { transform: 'translateY(-100vh)', opacity: '0' },
          '10%': { opacity: '1' },
          '90%': { opacity: '1' },
          '100%': { transform: 'translateY(100vh)', opacity: '0' },
        },
        shine: {
          '0%': { transform: 'translateX(-100%)' },
          '100%': { transform: 'translateX(100%)' },
        },
      },
      backdropBlur: {
        'xs': '2px',
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic': 'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
        'grid-pattern': 'linear-gradient(rgba(249, 115, 22, 0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(249, 115, 22, 0.1) 1px, transparent 1px)',
      },
      boxShadow: {
        'glow-sm': '0 0 10px rgba(249, 115, 22, 0.3)',
        'glow': '0 0 20px rgba(249, 115, 22, 0.4)',
        'glow-lg': '0 0 30px rgba(249, 115, 22, 0.5)',
        'glow-xl': '0 0 40px rgba(249, 115, 22, 0.6)',
        'glow-orange': '0 0 20px rgba(249, 115, 22, 0.4), 0 0 40px rgba(249, 115, 22, 0.2)',
        'inner-glow': 'inset 0 0 20px rgba(249, 115, 22, 0.1)',
        'card': '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
        'card-hover': '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05), 0 0 20px rgba(249, 115, 22, 0.3)',
      },
    },
  },
  plugins: [],
};
