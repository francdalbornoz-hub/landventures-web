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
        },
        coral: {
          DEFAULT: '#e25a3c',
          500: '#e25a3c',
          600: '#c84727',
        },
        ink: {
          DEFAULT: '#3a3a3a',
          dark: '#2a2a2a',
          deep: '#1a1a1a',
          soft: '#4a4a4a',
          mute: '#9a9a9a',
        },
        cream: {
          DEFAULT: '#f4f1ec',
          100: '#f9f7f3',
          200: '#eeeae4',
        },
      },
      fontFamily: {
        sans: ['var(--font-sans)', 'system-ui', 'sans-serif'],
        display: ['var(--font-display)', 'Georgia', 'serif'],
        serif: ['var(--font-display)', 'Georgia', 'serif'],
      },
      maxWidth: {
        page: '1280px',
      },
      letterSpacing: {
        wider2: '0.18em',
      },
    },
  },
  plugins: [],
};

export default config;
