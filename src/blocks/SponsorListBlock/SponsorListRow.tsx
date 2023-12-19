import React from 'react'
import { SponsorListBlockRowRecord } from '@/types/generated'
import Image from 'next/image'
import { Image as DatoImage } from 'react-datocms'

export const SponsorListRow = (props: SponsorListBlockRowRecord) => {
  const { title, logos } = props

  return (
    <div className="col-span-full border-t border-brand-grey-300 py-3">
      <h3 className="mb-6">{title}</h3>
      <ul>
        {logos.map((logo) => (
          <li key={logo.id}>
            {/* {logo.responsiveImage && ( */}
            {/*   <DatoImage data={logo.responsiveImage} className="h-24 w-24" /> */}
            {/* )} */}
            {/* {!logo.responsiveImage && ( */}
            {/*   <Image */}
            {/*     src={logo.url} */}
            {/*     alt={logo.alt} */}
            {/*     width={logo.width} */}
            {/*     height={logo.height} */}
            {/*     className="h-24 w-24" */}
            {/*   /> */}
            {/* )} */}
          </li>
        ))}
      </ul>
    </div>
  )
}
