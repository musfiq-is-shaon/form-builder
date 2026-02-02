/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
    "./public/index.html"
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        lime: {
          50: '#f7fee7',
          100: '#ecfccb',
          200: '#d9f99d',
          300: '#bef264',
          400: '#a3e635',
          450: '#94d82d',
          500: '#84cc16',
          600: '#65a30d',
          700: '#4d7c0f',
          800: '#3f6212',
          900: '#365314',
          950: '#1a2e06',
        },
        primary: {
          50: '#f0fdf4',
          100: '#dcfce7',
          200: '#bbf7d0',
          300: '#86efac',
          400: '#4ade80',
          500: '#22c55e',
          600: '#16a34a',
          700: '#15803d',
          800: '#166534',
          900: '#14532d',
        },
        secondary: {
          50: '#fafafa',
          100: '#f4f4f5',
          200: '#e4e4e7',
          300: '#d4d4d8',
          400: '#a1a1aa',
          500: '#71717a',
          600: '#52525b',
          700: '#3f3f46',
          800: '#27272a',
          900: '#18181b',
        },
        dark: {
          50: '#0f1f05',
          100: '#142707',
          200: '#1a2e06',
          300: '#1f3608',
          400: '#243e09',
          500: '#29460a',
          600: '#2e4e0b',
          700: '#385d0e',
          800: '#426b10',
          900: '#4d7912',
        },
        neon: {
          lime: '#ccff00',
          green: '#39ff14',
        }
      },
      boxShadow: {
        'soft': '0 2px 15px -3px rgba(0, 0, 0, 0.07), 0 10px 20px -2px rgba(0, 0, 0, 0.04)',
        'card': '0 0 0 1px rgba(0, 0, 0, 0.05), 0 2px 4px rgba(0, 0, 0, 0.05)',
        'glow': '0 0 20px rgba(132, 204, 22, 0.3)',
        'glow-lg': '0 0 40px rgba(132, 204, 22, 0.4)',
        'glow-neon': '0 0 20px rgba(204, 255, 0, 0.4), 0 0 40px rgba(204, 255, 0, 0.2)',
      },
      animation: {
        'fade-in': 'fadeIn 0.2s ease-out',
        'slide-up': 'slideUp 0.3s ease-out',
        'slide-down': 'slideDown 0.3s ease-out',
        'slide-in': 'slideIn 0.3s ease-out',
        'pulse-soft': 'pulseSoft 2s infinite',
        'spin-slow': 'spin 3s linear infinite',
        'bounce-soft': 'bounceSoft 1s infinite',
        'shimmer': 'shimmer 2s infinite',
        'float': 'float 3s ease-in-out infinite',
        'pulse-glow': 'pulseGlow 2s ease-in-out infinite',
        'neon-pulse': 'neonPulse 2s ease-in-out infinite',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideUp: {
          '0%': { opacity: '0', transform: 'translateY(10px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        slideDown: {
          '0%': { opacity: '0', transform: 'translateY(-10px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        slideIn: {
          '0%': { opacity: '0', transform: 'translateX(-10px)' },
          '100%': { opacity: '1', transform: 'translateX(0)' },
        },
        pulseSoft: {
          '0%, 100%': { opacity: '1' },
          '50%': { opacity: '0.7' },
        },
        bounceSoft: {
          '0%, 100%': { transform: 'translateY(-5%)' },
          '50%': { transform: 'translateY(0)' },
        },
        shimmer: {
          '0%': { backgroundPosition: '-200% 0' },
          '100%': { backgroundPosition: '200% 0' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-10px)' },
        },
        pulseGlow: {
          '0%, 100%': { boxShadow: '0 0 20px rgba(132, 204, 22, 0.3)' },
          '50%': { boxShadow: '0 0 40px rgba(132, 204, 22, 0.6)' },
        },
        neonPulse: {
          '0%, 100%': { boxShadow: '0 0 20px rgba(204, 255, 0, 0.4), 0 0 40px rgba(204, 255, 0, 0.2)' },
          '50%': { boxShadow: '0 0 30px rgba(204, 255, 0, 0.6), 0 0 60px rgba(204, 255, 0, 0.3)' },
        },
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'shimmer': 'linear-gradient(90deg, transparent, rgba(255,255,255,0.1), transparent)',
        'mesh': 'radial-gradient(at 40% 20%, hsla(80, 80%, 80%, 1) 0px, transparent 50%), radial-gradient(at 80% 0%, hsla(180, 80%, 80%, 1) 0px, transparent 50%), radial-gradient(at 80% 100%, hsla(240, 80%, 80%, 1) 0px, transparent 50%)',
        'gradient-dark': 'linear-gradient(135deg, #1a2e06 0%, #142707 50%, #0f1f05 100%)',
      },
      borderRadius: {
        'xl': '1rem',
        '2xl': '1.5rem',
        '3xl': '2rem',
      },
      fontFamily: {
        sans: ['Roboto Mono', 'monospace'],
        display: ['Roboto Mono', 'monospace'],
        mono: ['Roboto Mono', 'monospace'],
      },
    },
  },
  plugins: [],
}

