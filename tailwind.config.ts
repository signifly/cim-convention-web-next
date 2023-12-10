import type { Config } from 'tailwindcss'

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
    container: {
      padding: {
        DEFAULT: '1.5rem',
        lg: '2rem',
        xl: '5rem',
        '2xl': '6rem',
      },
    },
    fontFamily: {
      sans: ['var(--euclid-circular-a)'],
    },
    extend: {
      colors: {
        'brand-yellow': '#FFF000',
        'brand-green': '#00A550',
        'brand-blue': '#00ADEF',
        'brand-red': '#980003',
        'brand-grey-25': '#FCFCFD',
        'brand-grey-50': '#F9FAFB',
        'brand-grey-100': '#F2F4F7',
        'brand-grey-200': '#EAECF0',
        'brand-grey-300': '#D0D5DD',
        'brand-grey-400': '#98A2B3',
        'brand-grey-500': '#667085',
        'brand-grey-600': '#475467',
        'brand-grey-700': '#344054',
        'brand-grey-800': '#1D2939',
        'brand-grey-900': '#101828',
        'brand-grey-950': '#0C111D',
      },
      backgroundImage: {
        'brand-gradient':
          'linear-gradient(to bottom right, #FFF000, #00A550, #00ADEF)',
      },
      boxShadow: {
        xs: '0px 1px 2px 0px rgba(16, 24, 40, 0.05)',
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
