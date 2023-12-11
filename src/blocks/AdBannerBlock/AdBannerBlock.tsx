import { AdBannerBlockRecord } from '@/types/generated'
import { Image as DatoImage } from 'react-datocms'
import { GridContainer } from '@/components/GridContainer'
import React from 'react'

export const AdBannerBlock = (props: AdBannerBlockRecord) => {
  const { anchorId, image } = props

  return (
    image.responsiveImage && (
      <section id={anchorId} className="bg-brand-grey-25 py-10 lg:py-16">
        <GridContainer className="lg:place-items-center">
          <div className="col-span-4 lg:col-span-8 lg:col-start-3 lg:px-8">
            <DatoImage data={image?.responsiveImage} />
          </div>
        </GridContainer>
      </section>
    )
  )
}
