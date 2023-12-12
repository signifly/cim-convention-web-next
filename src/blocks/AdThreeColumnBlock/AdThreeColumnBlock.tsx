import { GridContainer } from '@/components/GridContainer'
import { AdThreeColumnBlockRecord } from '@/types/generated'
import { Image as DatoImage } from 'react-datocms'
import React from 'react'

export const AdThreeColumnBlock = (props: AdThreeColumnBlockRecord) => {
  const { anchorId, images } = props
  return (
    <section
      id={anchorId || ''}
      className="py-6 lg:py-16"
      aria-label="advertising"
    >
      <GridContainer className="grid-cols-1">
        <div className="mx-10 flex flex-col gap-12 lg:col-span-10 lg:col-start-2 lg:mx-0 lg:flex-row">
          {images.map((each) => {
            return <DatoImage key={each.id} data={each.responsiveImage} />
          })}
        </div>
      </GridContainer>
    </section>
  )
}
