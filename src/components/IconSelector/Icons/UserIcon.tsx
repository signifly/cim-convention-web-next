import React, { ComponentPropsWithoutRef } from 'react'
import { cn } from '@/utils/clsxMerge'

const UserIcon = (props: ComponentPropsWithoutRef<'svg'>) => {
  const { className } = props
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={cn('text-white', className)}
    >
      <path
        d="M12.4999 15.5C9.32977 15.5 6.51065 17.0306 4.71585 19.406C4.32956 19.9172 4.13641 20.1728 4.14273 20.5183C4.14761 20.7852 4.31521 21.1219 4.52522 21.2867C4.79704 21.5 5.17372 21.5 5.92708 21.5H19.0726C19.826 21.5 20.2027 21.5 20.4745 21.2867C20.6845 21.1219 20.8521 20.7852 20.857 20.5183C20.8633 20.1728 20.6701 19.9172 20.2839 19.406C18.4891 17.0306 15.6699 15.5 12.4999 15.5Z"
        stroke="currentColor"
        stroke-width="2"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
      <path
        d="M12.4999 12.5C14.9851 12.5 16.9999 10.4853 16.9999 8C16.9999 5.51472 14.9851 3.5 12.4999 3.5C10.0146 3.5 7.99985 5.51472 7.99985 8C7.99985 10.4853 10.0146 12.5 12.4999 12.5Z"
        stroke="currentColor"
        stroke-width="2"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
    </svg>
  )
}

export default UserIcon
