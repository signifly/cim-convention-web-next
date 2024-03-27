import { AdRecord } from '@/types/generated'
import { Image as DatoImage } from 'react-datocms'
import Image from 'next/image'

export const Ad = (props: AdRecord & { googleAdHtml?: string }) => {
  // Make googleAdHtml prop optional
  const { image, url, googleAdHtml } = props
  const commonClasses = 'relative flex flex-1 items-center justify-center'
  const imageElement =
    image && image.responsiveImage ? (
      <DatoImage data={image.responsiveImage} />
    ) : (
      <Image src={image?.url ?? ''} alt={image?.alt ?? ''} fill />
    )
  return (
    <>
      {url ? (
        <a href={url} target="_blank" className={commonClasses}>
          {googleAdHtml ? (
            <div
              className="google-ad-box"
              style={{ backgroundColor: '#f5f5f585' }}
              dangerouslySetInnerHTML={{ __html: googleAdHtml }}
            />
          ) : (
            imageElement
          )}
        </a>
      ) : (
        <div className={commonClasses}>
          {googleAdHtml ? (
            <div
              className="google-ad-box"
              style={{ backgroundColor: '#f5f5f585' }}
              dangerouslySetInnerHTML={{ __html: googleAdHtml }}
            />
          ) : (
            imageElement
          )}
        </div>
      )}
    </>
  )
}
