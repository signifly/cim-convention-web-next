import { GridContainer } from '@/components/GridContainer'
import { HeroBlockRecord } from '@/types/generated'
import { Image as DatoImage } from 'react-datocms'

export function HeroBlock(props: HeroBlockRecord) {
  const {
    anchorId,
    image,
    location,
    date,
    emphasizedHeadlineText,
    restOfHeadline,
    subHeadline,
    sponsorHeading,
    sponsorLogo,
  } = props

  return (
    <section id={anchorId} className="relative bg-brand-grey-100">
      <GridContainer className="z-10 block pt-8 lg:grid">
        <div className="mb-6 flex h-min items-center justify-start text-[18px]">
          <p className="border-r-2 border-brand-grey-300 pr-4 text-brand-green">
            {location}
          </p>
          <p className="pl-4 text-brand-grey-400">{date}</p>
        </div>
        <h1 className="mb-4 text-[2rem] font-[600] leading-[125%] tracking-tight">
          <span className="bg-brand-gradient bg-clip-text text-transparent">
            {emphasizedHeadlineText}
          </span>{' '}
          {restOfHeadline}
        </h1>
        <p className="mb-10 leading-[150%] text-brand-grey-600">
          {subHeadline}
        </p>
        <div className="mb-4 text-xs text-brand-grey-600">{sponsorHeading}</div>
        {sponsorLogo?.responsiveImage && (
          <DatoImage
            data={sponsorLogo.responsiveImage}
            pictureClassName="h-8 w-20 object-contain object-left"
          />
        )}
      </GridContainer>
      {/* <div className="relative lg:absolute lg:right-0 lg:top-0"> */}
      {/*   <DatoImage data={image.responsiveImage} className="relative" /> */}
      {/*   <div className="absolute left-0 right-0 top-0 h-1/2 border-green-400 bg-gradient-to-b from-brand-grey-100 to-transparent" /> */}
      {/* </div> */}
    </section>
  )
}
