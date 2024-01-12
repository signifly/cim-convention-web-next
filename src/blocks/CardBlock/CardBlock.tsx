import { CardBlockRecord, Maybe } from '@/types/generated'
import { Image as DatoImage } from 'react-datocms'
import Image from 'next/image'
import { CtaButton } from '@/components/CtaButton'

type CardBlockRecordExt = CardBlockRecord & {
  mobileLayout?: Maybe<string>
  cardBorders?: Maybe<boolean>
  background?: Maybe<string>
}

export function CardBlock(props: CardBlockRecordExt) {
  let {
    title,
    subtitle,
    paragraph,
    image,
    mobileLayout,
    cardBorders,
    background,
    buttons,
  } = props

  return (
    <div
      className={`flex min-h-[100%] flex-col overflow-hidden rounded-[8px] ${
        background === 'white' && !cardBorders
          ? 'bg-brand-grey-100'
          : 'bg-white'
      } ${cardBorders && 'border-[1px] border-brand-grey-200'}`}
    >
      {image && (
        <div
          className={`${
            mobileLayout === 'single' ? 'h-[285px]' : 'h-[136px]'
          } overflow-hidden md:h-[300px]`}
        >
          {image?.responsiveImage ? (
            <DatoImage
              data={image.responsiveImage}
              className="h-[100%] w-auto object-cover"
              pictureClassName="object-cover"
            />
          ) : (
            <Image src={image?.url || ''} alt={image?.alt || ''} fill />
          )}
        </div>
      )}

      {(title || subtitle || paragraph) && (
        <div className="p-3 md:p-[24px]">
          {title && (
            <div
              className="mb-1 text-16/[140%] font-semibold md:text-20/[140%]"
              dangerouslySetInnerHTML={{ __html: title }}
            ></div>
          )}
          {subtitle && (
            <p className="text-12/[130%] font-normal text-brand-grey-600 md:text-16/[140%]">
              {subtitle}
            </p>
          )}
          {paragraph && (
            <div
              className={`mt-3 space-y-4 text-12/[130%] font-normal text-brand-grey-600 ${
                image
                  ? 'md:mt-8'
                  : buttons && buttons.length > 0
                    ? 'md:mt-4'
                    : 'md:mt-6'
              } md:text-16/[140%]`}
              dangerouslySetInnerHTML={{ __html: paragraph || '' }}
            ></div>
          )}
          {buttons && buttons.length > 0 && (
            <div className="mt-[20px] flex w-[100%] flex-wrap gap-4 md:mt-6">
              {buttons.map((button, index) => {
                return (
                  <div key={index}>
                    <CtaButton {...button} />
                  </div>
                )
              })}
            </div>
          )}
        </div>
      )}
    </div>
  )
}
