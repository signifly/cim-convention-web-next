import { AnnouncementBannerRecord } from '@/types/generated'
import React from 'react'

export const AnnouncementBannerBlock = (props: AnnouncementBannerRecord) => {
  const { text } = props

  return (
    <section className="bg-brand-grey-800 py-[10px] text-center text-11 leading-[140%] text-white lg:text-14">
      <div className="container mx-auto">{text}</div>
    </section>
  )
}
