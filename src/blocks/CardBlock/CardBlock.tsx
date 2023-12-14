import { CardBlockRecord } from '@/types/generated'
import { Image as DatoImage } from 'react-datocms'
import Image from 'next/image'

export function CardBlock(props: CardBlockRecord) {
  let { title, subtitle, paragraph, image } = props
  return (
    <div className="flex flex-col overflow-hidden rounded-[8px] border-[1px] border-brand-grey-200 bg-white">
      <div className="h-[60%] overflow-hidden">
        {image &&
          (image?.responsiveImage ? (
            <DatoImage
              data={image.responsiveImage}
              className="w-auto object-cover"
            />
          ) : (
            <Image src={image?.url || ''} alt={image?.alt || ''} fill />
          ))}
      </div>
      <div className="h-[40%] p-[24px]">
        <p className="mb-[4px] text-[20px]/[140%] font-semibold">{title}</p>
        <p className="text-[16px]/[140%] font-normal text-brand-grey-600">
          {subtitle}
        </p>
        <div
          className="mt-[32px] text-[16px]/[140%] font-normal text-brand-grey-600"
          dangerouslySetInnerHTML={{ __html: paragraph || '' }}
        ></div>
      </div>
    </div>
  )
}
