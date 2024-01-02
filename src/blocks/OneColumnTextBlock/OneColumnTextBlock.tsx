import { GridContainer } from '@/components/GridContainer'
import { OneColumnTextBlockRecord } from '@/types/generated'
import React from 'react'

export const OneColumnTextBlock = (props: OneColumnTextBlockRecord) => {
  const { text, anchorId } = props

  return (
    <div className="bg-brand-grey-25 py-8 lg:py-16" id={anchorId}>
      <GridContainer>
        <div
          dangerouslySetInnerHTML={{ __html: text }}
          className="col-span-full text-16/[150%] text-brand-grey-600 lg:text-18/[155%] [&_a]:hover:underline"
        />
      </GridContainer>
    </div>
  )
}
