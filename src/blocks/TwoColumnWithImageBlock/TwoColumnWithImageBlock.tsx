import React from 'react'
import { GridContainer } from '@/components/GridContainer'
import {
  TwoColumnWithImageBlockRecord,
  TwoColumnWithImageBlockModelTextContentField,
  TwoColumnWithImageBlockWithHeadingHighlightRecord,
  TwoColumnWithImageBlockDefaultRecord,
} from '@/types/generated'
import { StructuredText } from 'react-datocms'
import { Image as DatoImage } from 'react-datocms'

const TextDefault = (props: TwoColumnWithImageBlockDefaultRecord) => {
  const { structuredText } = props

  return (
    <div className="col-span-4 mb-8 space-y-6 lg:col-span-7 lg:col-start-6 lg:flex lg:flex-col lg:items-start lg:justify-center lg:px-10">
      <StructuredText data={structuredText} />
    </div>
  )
}

const TextWithHeadingHighlight = (
  props: TwoColumnWithImageBlockWithHeadingHighlightRecord,
) => {
  const { headline, textToHighlight, body } = props
  const headlineText =
    typeof textToHighlight === 'string'
      ? headline.replace(
          textToHighlight,
          `<span class="bg-brand-gradient text-transparent bg-clip-text">${textToHighlight}</span>`,
        )
      : headline

  return (
    <div className="col-span-4 mb-8 space-y-6 lg:col-span-7 lg:col-start-6 lg:flex lg:flex-col lg:items-start lg:justify-center lg:px-10">
      <h2
        dangerouslySetInnerHTML={{ __html: headlineText }}
        className="text-20 font-semibold leading-[140%] tracking-tight text-brand-grey-950 lg:text-32"
      />
      <p>{body}</p>
    </div>
  )
}

const TextContent = ({
  block,
}: {
  block: TwoColumnWithImageBlockModelTextContentField
}) => {
  if (
    block._modelApiKey === 'two_column_with_image_block_with_heading_highlight'
  ) {
    // @ts-ignore
    return <TextWithHeadingHighlight {...block} />
  }
  if (block._modelApiKey === 'two_column_with_image_block_default') {
    // @ts-ignore
    return <TextDefault {...block} />
  }
}

export const TwoColumnWithImageBlock = (
  props: TwoColumnWithImageBlockRecord,
) => {
  const { anchorId, image, textContent } = props

  return (
    <section id={anchorId} className="bg-grey-25 py-8 lg:py-16">
      <GridContainer>
        <TextContent block={textContent[0]} />
        <DatoImage
          data={image.responsiveImage}
          className="col-span-4 aspect-square rounded-lg lg:col-span-5 lg:row-start-1"
        />
      </GridContainer>
    </section>
  )
}
