import React, { HTMLAttributes } from 'react'

const YoutubeIcon = ({ className }: HTMLAttributes<HTMLElement>) => {
  return (
    <svg
      width="20"
      height="16"
      viewBox="0 0 20 16"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      <path
        d="M19.8008 4C19.8008 4 19.6055 2.62109 19.0039 2.01563C18.2422 1.21875 17.3906 1.21484 17 1.16797C14.2031 0.964844 10.0039 0.964844 10.0039 0.964844H9.99609C9.99609 0.964844 5.79688 0.964844 3 1.16797C2.60938 1.21484 1.75781 1.21875 0.996094 2.01563C0.394531 2.62109 0.203125 4 0.203125 4C0.203125 4 0 5.62109 0 7.23828V8.75391C0 10.3711 0.199219 11.9922 0.199219 11.9922C0.199219 11.9922 0.394531 13.3711 0.992187 13.9766C1.75391 14.7734 2.75391 14.7461 3.19922 14.832C4.80078 14.9844 10 15.0313 10 15.0313C10 15.0313 14.2031 15.0234 17 14.8242C17.3906 14.7773 18.2422 14.7734 19.0039 13.9766C19.6055 13.3711 19.8008 11.9922 19.8008 11.9922C19.8008 11.9922 20 10.375 20 8.75391V7.23828C20 5.62109 19.8008 4 19.8008 4ZM7.93359 10.5938V4.97266L13.3359 7.79297L7.93359 10.5938Z"
        fill="white"
      />
    </svg>
  )
}

export default YoutubeIcon
