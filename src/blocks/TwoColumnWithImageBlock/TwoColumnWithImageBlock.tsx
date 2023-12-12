import React, { ComponentPropsWithoutRef } from 'react'
import { GridContainer } from '@/components/GridContainer'
import {
  TwoColumnWithImageBlockRecord,
  TwoColumnWithImageBlockModelTextContentField,
  TwoColumnWithImageBlockDefaultRecord,
  TwoColumnWithImageBlockWithHeadingHighlightRecord,
} from '@/types/generated'
import { StructuredText } from 'react-datocms'
import { Image as DatoImage } from 'react-datocms'
import { cn } from '@/utils/clsxMerge'

const TextDefault = (props: TwoColumnWithImageBlockDefaultRecord) => {
  const { structuredText } = props

  return (
    <div
      className={cn(
        '[&_h2]:mb-2 [&_h2]:text-18 [&_h2]:font-medium',
        '[&_p:last-of-type]:mb-0 [&_p]:mb-10',
      )}
    >
      {/* @ts-ignore - type mismatch from generated types */}
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
    <div>
      <h2
        dangerouslySetInnerHTML={{ __html: headlineText }}
        className="text-20 font-semibold leading-[140%] tracking-tight text-brand-grey-950 lg:text-32"
      />
      <p>{body}</p>
    </div>
  )
}

const TextContentWrapper = ({
  className,
  block,
}: {
  block: TwoColumnWithImageBlockModelTextContentField
} & ComponentPropsWithoutRef<'div'>) => {
  const defaultStyle =
    'col-span-4 mb-8 space-y-6 lg:col-span-7 lg:col-start-6 lg:flex lg:flex-col lg:items-start lg:justify-center lg:px-10'

  const variations = {
    two_column_with_image_block_default: TextDefault,
    two_column_with_image_block_with_heading_highlight:
      TextWithHeadingHighlight,
  }

  const Component = variations[block._modelApiKey as keyof typeof variations]

  if (!Component) {
    return null
  }

  return (
    <div className={cn(defaultStyle, className)}>
      {<Component {...(block as any)} />}
    </div>
  )
}

export const TwoColumnWithImageBlock = (
  props: TwoColumnWithImageBlockRecord,
) => {
  const { anchorId, image, textContent, mobileLayout, desktopLayout } = props

  const defaultStyle =
    'col-span-4 aspect-square rounded-lg lg:col-span-5 lg:row-start-1'

  return (
    <section id={anchorId} className="bg-brand-grey-25 py-8 lg:py-16">
      <GridContainer>
        <TextContentWrapper
          block={textContent[0]}
          className={cn(desktopLayout === 'image_right' && 'lg:col-start-1')}
        />
        <DatoImage
          data={image.responsiveImage}
          className={cn(
            defaultStyle,
            mobileLayout === 'image_above' && 'row-start-1 mb-8',
            desktopLayout === 'image_right' && 'lg:col-start-8',
          )}
        />
      </GridContainer>
    </section>
  )
}
