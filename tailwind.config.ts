import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './app/**/*.{ts,tsx}',
    './components/**/*.{ts,tsx}',
    './lib/**/*.{ts,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          DEFAULT: '#e09900',
          50: '#fff8eb',
          100: '#ffeac7',
          200: '#ffd28a',
          300: '#ffb74d',
          400: '#f4a623',
          500: '#e09900',
          600: '#c47b00',
          700: '#9a5b02',
          800: '#7d4708',
          900: '#683b0b',
          soft: '#f0a84e',
        },
        coral: {
          DEFAULT: '#D25E35',
          400: '#e25a3c',
          500: '#D25E35',
          600: '#b94a26',
          700: '#9a3a1d',
        },
        ink: {
          DEFAULT: '#1a1817',
          dark: '#141312',
          deep: '#0d0c0b',
          soft: '#2a2725',
          mute: '#9a8b7c',
        },
        cream: {
          DEFAULT: '#f4f1ec',
          100: '#f9f7f3',
          200: '#eeeae4',
        },
      },
      fontFamily: {
        sans: ['var(--font-sans)', 'system-ui', 'sans-serif'],
        // display / serif quedan como alias del sans — todo es Montserrat.
        // El acento elegante se logra con weight + italic, no con otra familia.
        display: ['var(--font-sans)', 'system-ui', 'sans-serif'],
        serif: ['var(--font-sans)', 'system-ui', 'sans-serif'],
      },
      maxWidth: {
        page: '1280px',
      },
      letterSpacing: {
        wider2: '0.18em',
        widest2: '0.28em',
      },
      animation: {
        'fade-in': 'fade-in 1s ease-out forwards',
        'fade-up': 'fade-up 0.9s cubic-bezier(0.22,1,0.36,1) forwards',
        'slow-zoom': 'slow-zoom 18s ease-out forwards',
      },
      keyframes: {
        'fade-in': {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        'fade-up': {
          '0%': { opacity: '0', transform: 'translateY(20px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        'slow-zoom': {
          '0%': { transform: 'scale(1.08)' },
          '100%': { transform: 'scale(1.0)' },
        },
      },
      backdropBlur: {
        xs: '2px',
      },
    },
  },
  plugins: [],
};

export default config;
