import { CardBlockRecord, Maybe } from '@/types/generated'
import { Image as DatoImage } from 'react-datocms'
import Image from 'next/image'

type CardBlockRecordExt = CardBlockRecord & { mobileLayout?: Maybe<string> }

export function CardBlock(props: CardBlockRecordExt) {
  let { title, subtitle, paragraph, image, mobileLayout } = props

  return (
    <div className="flex min-h-[100%] flex-col overflow-hidden rounded-[8px] border-[1px] border-brand-grey-200 bg-white">
      <div
        className={`${
          mobileLayout === 'single' ? 'h-[285px]' : 'h-[136px]'
        } overflow-hidden md:h-[300px]`}
      >
        {image &&
          (image?.responsiveImage ? (
            <DatoImage
              data={image.responsiveImage}
              className="h-[100%] w-auto object-cover"
              pictureClassName="object-cover"
            />
          ) : (
            <Image src={image?.url || ''} alt={image?.alt || ''} fill />
          ))}
      </div>
      <div className="p-[12px] md:p-[24px]">
        {title && (
          <p className="mb-[4px] text-16/[140%] font-semibold md:text-20/[140%]">
            {title}
          </p>
        )}
        {subtitle && (
          <p className="text-12/[130%] font-normal text-brand-grey-600 md:text-16/[140%]">
            {subtitle}
          </p>
        )}
        {paragraph && (
          <div
            className="mt-[12px] text-12/[130%] font-normal text-brand-grey-600 md:mt-8 md:text-16/[140%]"
            dangerouslySetInnerHTML={{ __html: paragraph || '' }}
          ></div>
        )}
      </div>
    </div>
  )
}
