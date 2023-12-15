import React, { ComponentPropsWithoutRef } from 'react'
import { GridContainer } from '@/components/GridContainer'
import {
  TwoColumnWithImageBlockRecord,
  TwoColumnWithImageBlockModelTextContentField,
  TwoColumnWithImageBlockDefaultRecord,
  TwoColumnWithImageBlockWithFeatureListRecord,
  TwoColumnWithImageBlockWithHeadingHighlightRecord,
  CtaButtonRecord,
} from '@/types/generated'
import { StructuredText } from 'react-datocms'
import { Image as DatoImage } from 'react-datocms'
import { cn } from '@/utils/clsxMerge'
import { CtaButton } from '@/components/CtaButton'
import { CheckIcon } from '@heroicons/react/20/solid'

const TextDefault = (props: TwoColumnWithImageBlockDefaultRecord) => {
  const { structuredText } = props

  return (
    <div className="structured-text">
      {/* @ts-ignore - type mismatch from generated types */}
      <StructuredText data={structuredText} />
    </div>
  )
}

const TextWithFeatureList = (
  props: TwoColumnWithImageBlockWithFeatureListRecord,
) => {
  const { featureList } = props

  return (
    <ul className="grid grid-cols-1 gap-6 lg:grid-cols-2 lg:gap-8">
      {featureList.map((feature) => {
        return (
          <li key={feature.id} className="flex gap-x-4">
            <CheckIcon
              className="h-[20px] w-[20px] text-brand-green"
              aria-hidden
            />
            <div className="text-16 lg:text-18">
              <h2 className="font-medium leading-[125%] text-brand-grey-950 lg:leading-[140%]">
                {feature.name}
              </h2>
              <p className="font-normal leading-[150%] text-brand-grey-600 lg:leading-[155%]">
                {feature.description}
              </p>
            </div>
          </li>
        )
      })}
    </ul>
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
    <div className="space-y-6 lg:space-y-8">
      <h2
        dangerouslySetInnerHTML={{ __html: headlineText }}
        className="text-20/[140%] font-semibold tracking-tight text-brand-grey-950 lg:text-32"
      />
      <p className="text-16/[150%] font-normal text-brand-grey-600 lg:text-20/[155%]">
        {body}
      </p>
    </div>
  )
}

const CtaButtons = ({
  buttons,
  className,
}: { buttons: CtaButtonRecord[] } & ComponentPropsWithoutRef<'div'>) => {
  return (
    <div
      className={cn(
        'mt-6 flex flex-wrap items-start justify-start gap-4 lg:col-span-full lg:col-start-6 lg:mt-10 lg:flex-row lg:gap-x-6',
        className,
      )}
    >
      {buttons.map((button) => {
        return <CtaButton key={button.id} {...button} />
      })}
    </div>
  )
}

const TextContentWrapper = ({
  className,
  block,
  ctaButtons,
}: {
  block: TwoColumnWithImageBlockModelTextContentField
  ctaButtons: CtaButtonRecord[]
} & ComponentPropsWithoutRef<'div'>) => {
  const defaultStyle =
    'col-span-4 mb-8 lg:col-span-7 lg:col-start-6 lg:flex lg:flex-col lg:items-start lg:justify-center lg:px-10 lg:mb-0'

  const variations = {
    two_column_with_image_block_default: TextDefault,
    two_column_with_image_block_with_feature_list: TextWithFeatureList,
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
      <CtaButtons buttons={ctaButtons} />
    </div>
  )
}

export const TwoColumnWithImageBlock = (
  props: TwoColumnWithImageBlockRecord,
) => {
  const {
    anchorId,
    image,
    textContent,
    mobileLayout,
    desktopLayout,
    ctaButtons,
    backgroundColor,
  } = props

  const backgroundStyle =
    backgroundColor === 'grey' ? 'bg-brand-grey-100' : 'bg-brand-grey-25'

  return (
    <section id={anchorId} className={cn('py-8 lg:py-16', backgroundStyle)}>
      <GridContainer>
        <TextContentWrapper
          block={textContent[0]}
          className={cn(
            mobileLayout === 'image_above' && 'mb-0',
            desktopLayout === 'image_right' && 'lg:col-start-1',
          )}
          ctaButtons={ctaButtons}
        />
        <DatoImage
          data={image.responsiveImage}
          className={cn(
            'col-span-4 aspect-square rounded-lg lg:col-span-5 lg:row-start-1',
            mobileLayout === 'image_above' && 'row-start-1 mb-8',
            desktopLayout === 'image_right' && 'lg:col-start-8',
          )}
        />
      </GridContainer>
    </section>
  )
}
