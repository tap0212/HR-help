import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        black: {
          DEFAULT: '#000000',
          10: '#E1E1E1',
          20: '#A5A5A5',
          30: '#555555',
          40: '#4C4C4C',
          50: '#333333',
          60: '#212121',
          70: '#1a1a1a',
          80: '#141414',
          90: '#0d0f0f',
          transparent: '#000000C0',
        },
        secondary: {
          DEFAULT: '#F9F1E7',
          silver: '#A5A5A5',
          darkElevated: '#2C2C2E',
        },
        white: {
          DEFAULT: '#ffffff',
        },
        metal: {
          DEFAULT: '#FAF1E7',
        },
        red: {
          DEFAULT: '#FF6575',
        },
        green: {
          DEFAULT: '#71FFC3',
        },
        yellow: {
          DEFAULT: '#FFB75E',
        },
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic':
          'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
      },
    },
  },
  plugins: [],
}
export default config
