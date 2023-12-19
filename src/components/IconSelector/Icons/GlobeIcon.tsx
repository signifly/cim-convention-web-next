import React, { ComponentPropsWithoutRef } from 'react'
import { cn } from '@/utils/clsxMerge'

const GlobeIcon = (props: ComponentPropsWithoutRef<'svg'>) => {
  const { className } = props
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={cn('text-white', className)}
    >
      <path
        d="M15.5 2.9578C14.553 2.66035 13.5452 2.5 12.5 2.5C6.97715 2.5 2.5 6.97715 2.5 12.5C2.5 18.0228 6.97715 22.5 12.5 22.5C18.0228 22.5 22.5 18.0228 22.5 12.5C22.5 10.7847 22.0681 9.17022 21.3071 7.75945M17.5 6.25H17.505M11.0001 22.3883L11.0002 20.1849C11.0002 20.0656 11.0429 19.9502 11.1205 19.8596L13.6063 16.9594C13.8106 16.7211 13.7473 16.3556 13.4748 16.1999L10.6185 14.5677C10.5409 14.5234 10.4766 14.4591 10.4323 14.3814L8.57046 11.1186C8.47356 10.9488 8.28657 10.8511 8.09183 10.8684L2.56418 11.3607M21.5 6.5C21.5 8.70914 19.5 10.5 17.5 12.5C15.5 10.5 13.5 8.70914 13.5 6.5C13.5 4.29086 15.2909 2.5 17.5 2.5C19.7091 2.5 21.5 4.29086 21.5 6.5ZM17.75 6.25C17.75 6.38807 17.6381 6.5 17.5 6.5C17.3619 6.5 17.25 6.38807 17.25 6.25C17.25 6.11193 17.3619 6 17.5 6C17.6381 6 17.75 6.11193 17.75 6.25Z"
        stroke="currentColor"
        stroke-width="2"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
    </svg>
  )
}

export default GlobeIcon
