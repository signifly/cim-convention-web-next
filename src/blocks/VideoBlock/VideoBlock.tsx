import { GridContainer } from '@/components/GridContainer'
import { VideoBlockRecord } from '@/types/generated'

export function VideoBlock(props: VideoBlockRecord) {
  let { title, video } = props

  const videoUrl = video
    ? video.provider === 'youtube' && video.providerUid
      ? `https://www.youtube.com/embed/${video.providerUid}`
      : video.url
    : null

  if (!videoUrl) return null

  return (
    <div className="bg-brand-gradient-light py-8 md:py-20">
      <GridContainer className="gap-8">
        {title && (
          <div className="col-span-full flex justify-center">
            <h1 className="text-32/[125%] font-semibold">{title}</h1>
          </div>
        )}
        <div className="col-span-full col-start-1 lg:col-span-10 lg:col-start-2">
          <iframe
            className="h-[320px] w-[100%] md:h-[566px]"
            src={videoUrl}
          ></iframe>
        </div>
      </GridContainer>
    </div>
  )
}
