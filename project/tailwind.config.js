/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,jsx}"
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        primary: {
          50: '#f0f5ff',
          100: '#e0eaff',
          200: '#c7d6fe',
          300: '#a5b9fb',
          400: '#8094f6',
          500: '#6371ec',
          600: '#4c51de',
          700: '#3f40c4',
          800: '#36389f',
          900: '#30357e',
          950: '#1e1f4a'
        },
        secondary: {
          50: '#f3f1ff',
          100: '#ebe5ff',
          200: '#d9ceff',
          300: '#c0a7ff',
          400: '#a279ff',
          500: '#8a4dff',
          600: '#7929ff',
          700: '#6819ee',
          800: '#5716c6',
          900: '#48159e',
          950: '#2b0c67'
        },
        accent: {
          50: '#f0fbfd',
          100: '#d0f3fa',
          200: '#a4e6f5',
          300: '#6bd2ec',
          400: '#35b6db',
          500: '#1a97c0',
          600: '#1479a1',
          700: '#156183',
          800: '#17506b',
          900: '#19445b',
          950: '#0b2c3d'
        },
        success: {
          50: '#ecfdf5',
          500: '#10b981',
          700: '#047857'
        },
        warning: {
          50: '#fffbeb',
          500: '#f59e0b',
          700: '#b45309'
        },
        error: {
          50: '#fef2f2',
          500: '#ef4444',
          700: '#b91c1c'
        }
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
        mono: ['JetBrains Mono', 'monospace']
      },
      spacing: {
        '128': '32rem',
        '144': '36rem',
      },
      animation: {
        'fade-in': 'fadeIn 0.5s ease-in-out',
        'slide-up': 'slideUp 0.5s ease-out',
        'bounce-slow': 'bounce 3s infinite'
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' }
        },
        slideUp: {
          '0%': { transform: 'translateY(20px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' }
        }
      }
    }
  },
  plugins: []
}