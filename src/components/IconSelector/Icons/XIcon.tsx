import React, { HTMLAttributes } from 'react'

const XIcon = ({ className }: HTMLAttributes<HTMLElement>) => {
  return (
    <svg
      width="20"
      height="20"
      viewBox="0 0 20 20"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      <path
        d="M11.8619 8.46864L19.1472 0H17.4208L11.095 7.3532L6.0425 0H0.215088L7.85539 11.1193L0.215088 20H1.94158L8.62187 12.2348L13.9576 20H19.785L11.8614 8.46864H11.8619ZM9.4972 11.2173L8.72307 10.1101L2.56366 1.29968H5.21545L10.1862 8.40994L10.9603 9.51718L17.4216 18.7594H14.7698L9.4972 11.2177V11.2173Z"
        fill="white"
      />
    </svg>
  )
}

export default XIcon
