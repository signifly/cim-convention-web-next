import type { Config } from 'tailwindcss'
import { brandColors } from './src/styles/brandColors'

const BASE_FONT_SIZE = 16
const rem = (px: number, key = px) => ({ [key]: `${px / BASE_FONT_SIZE}rem` })

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/blocks/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    screens: {
      sm: '640px',
      md: '768px',
      lg: '1024px',
      xl: '1264',
      '2xl': '1536px',
    },
    container: {
      padding: {
        DEFAULT: '24px',
      },
    },
    fontFamily: {
      sans: ['var(--euclid-circular-a)'],
    },
    extend: {
      colors: {
        ...brandColors,
      },
      backgroundImage: {
        'brand-gradient':
          'linear-gradient(to bottom right, #FFF000, #00A550, #00ADEF)',
        'brand-gradient-light':
          'linear-gradient(0deg, rgba(255, 255, 255, 0.60) 0%, rgba(255, 255, 255, 0.60) 100%), linear-gradient(109deg, #FFF000 -3.65%, #00A550 56.69%, #00ADEF 104.94%)',
      },
      boxShadow: {
        xs: '0px 1px 2px 0px rgba(16, 24, 40, 0.05)',
        skyblue: '0px 0px 0px 4px #00ADEF4D',
      },
      fontSize: {
        ...rem(11),
        ...rem(12),
        ...rem(14),
        ...rem(16),
        ...rem(18),
        ...rem(20),
        ...rem(24),
        ...rem(28),
        ...rem(32),
        ...rem(40),
        ...rem(48),
      },
    },
  },
  plugins: [],
}

export default config
