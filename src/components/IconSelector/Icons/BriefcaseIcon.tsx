import React, { ComponentPropsWithoutRef } from 'react'
import { cn } from '@/utils/clsxMerge'

const BriefcaseIcon = (props: ComponentPropsWithoutRef<'svg'>) => {
  const { className } = props

  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={cn('text-white', className)}
    >
      <path
        d="M8.5 21.5V7.5C8.5 6.57003 8.5 6.10504 8.60222 5.72354C8.87962 4.68827 9.68827 3.87962 10.7235 3.60222C11.105 3.5 11.57 3.5 12.5 3.5C13.43 3.5 13.895 3.5 14.2765 3.60222C15.3117 3.87962 16.1204 4.68827 16.3978 5.72354C16.5 6.10504 16.5 6.57003 16.5 7.5V21.5M5.7 21.5H19.3C20.4201 21.5 20.9802 21.5 21.408 21.282C21.7843 21.0903 22.0903 20.7843 22.282 20.408C22.5 19.9802 22.5 19.4201 22.5 18.3V10.7C22.5 9.57989 22.5 9.01984 22.282 8.59202C22.0903 8.21569 21.7843 7.90973 21.408 7.71799C20.9802 7.5 20.4201 7.5 19.3 7.5H5.7C4.57989 7.5 4.01984 7.5 3.59202 7.71799C3.21569 7.90973 2.90973 8.21569 2.71799 8.59202C2.5 9.01984 2.5 9.57989 2.5 10.7V18.3C2.5 19.4201 2.5 19.9802 2.71799 20.408C2.90973 20.7843 3.21569 21.0903 3.59202 21.282C4.01984 21.5 4.5799 21.5 5.7 21.5Z"
        stroke="currentColor"
        stroke-width="2"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
    </svg>
  )
}

export default BriefcaseIcon
