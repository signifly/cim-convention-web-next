import { NextFont } from 'next/dist/compiled/@next/font'
import localFont from 'next/font/local'
import type { CSSProperties } from 'react'

export const EuclidCircularA: NextFont = localFont({
  // TODO: convert otf to woff2 and replace path
  src: [
    // semi-bold
    {
      path: '../../public/fonts/Euclid Circular A SemiBold.ttf',
      weight: '300',
      style: 'normal',
    },
    // semi-bold italic
    {
      path: '../../public/fonts/Euclid Circular A SemiBold Italic.ttf',
      weight: '300',
      style: 'italic',
    },
    // regular
    {
      path: '../../public/fonts/Euclid Circular A Regular.ttf',
      weight: '400',
      style: 'normal',
    },
    // regular italic
    {
      path: '../../public/fonts/Euclid Circular A Italic.ttf',
      weight: '400',
      style: 'italic',
    },
    // medium
    {
      path: '../../public/fonts/Euclid Circular A Medium.ttf',
      weight: '600',
      style: 'normal',
    },
    // medium italic
    {
      path: '../../public/fonts/Euclid Circular A Medium Italic.ttf',
      weight: '600',
      style: 'italic',
    },
    // light
    {
      path: '../../public/fonts/Euclid Circular A Light.ttf',
      weight: '700',
      style: 'normal',
    },
    // light italic
    {
      path: '../../public/fonts/Euclid Circular A Light Italic.ttf',
      weight: '700',
      style: 'italic',
    },
    // bold
    {
      path: '../../public/fonts/Euclid Circular A Bold.ttf',
      weight: '800',
      style: 'normal',
    },
    // bold italic
    {
      path: '../../public/fonts/Euclid Circular A Bold Italic.ttf',
      weight: '800',
      style: 'italic',
    },
  ],
  variable: '--euclid-circular-a',
})
