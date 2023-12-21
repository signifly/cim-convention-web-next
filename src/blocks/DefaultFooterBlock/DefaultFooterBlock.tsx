import { StyledLink } from '@/components/StyledLink'
import { DefaultFooterBlockRecord, SocialLinkRecord } from '@/types/generated'
import { Image as DatoImage } from 'react-datocms'
import Image from 'next/image'
import SocialMedia from '@/components/SocialMedia'

type DefaultFooterBlockRecordExt = DefaultFooterBlockRecord & {
  socialLinks: SocialLinkRecord
}

export function DefaultFooterBlock(props: DefaultFooterBlockRecordExt) {
  const {
    contactButtonLabel,
    contactButtonLink,
    contactParagraph,
    contactTitle,
    copyright,
    newsletterButtonLabel,
    newsletterInputPlaceholder,
    newsletterParagraph,
    newsletterTitle,
    sponsorLogo,
    sponsorLink,
    sponsorTitle,
    socialLinks,
  } = props

  return (
    <footer className="flex-none bg-gray-800 text-sm text-white">
      <div className="container mx-auto grid max-w-[1264px] grid-cols-4 items-center justify-between gap-x-4 gap-y-4 py-4 lg:grid-cols-12 lg:gap-x-8 lg:gap-y-[20px] lg:py-6">
        {/* Contact */}
        <div className="col-span-full col-start-1 flex h-[100%] flex-col items-start justify-start gap-8 lg:col-span-3">
          <h6 className="uppercase">{contactTitle}</h6>
          <div className="flex w-[100%] lg:w-auto">
            <StyledLink
              className="items-centermiddle flex w-[100%] max-w-[568px] justify-center lg:w-auto"
              href={{
                pathname: '/[...slug]',
                params: { slug: [`/${contactButtonLink}`] }, // @TODO: replace with actual slug
              }}
            >
              {contactButtonLabel}
            </StyledLink>
          </div>
          <div className="text-gray-400">{contactParagraph}</div>
          <div className="flex gap-[40px]">
            {socialLinks &&
              Object.keys(socialLinks).map(
                (key: string, index: number) =>
                  socialLinks[key as keyof SocialLinkRecord] && (
                    <SocialMedia
                      key={index}
                      socialMediaName={key}
                      socialMediaURL={
                        socialLinks[key as keyof SocialLinkRecord]
                      }
                    ></SocialMedia>
                  ),
              )}
          </div>
        </div>
        {/* Newsletter */}
        <div className="relative col-span-full col-start-1 flex h-[100%] flex-col items-start justify-start gap-8 border-t-[1px] border-gray-700 pt-[20px] lg:col-span-5 lg:col-start-5 lg:border-t-0  lg:pt-0  lg:after:absolute lg:after:left-[-24px] lg:after:top-[50%] lg:after:h-[100%] lg:after:w-[1px] lg:after:translate-y-[-50%] lg:after:bg-gray-700 lg:after:content-['']">
          <h6 className="uppercase">{newsletterTitle}</h6>
          <div className="flex w-[100%] flex-col gap-[16px] lg:flex-row">
            <input
              type="text"
              placeholder={newsletterInputPlaceholder || ''}
              className="h-[100%] max-w-[568px] grow rounded bg-gray-700 px-[16px] py-[14px] leading-[125%] text-gray-400 focus:shadow-skyblue focus:outline-none"
            />
            <button className="h-[100%] max-w-[568px] rounded bg-white px-[24px] py-[10px] font-medium leading-[150%] text-gray-950">
              {newsletterButtonLabel}
            </button>
          </div>
          <div className=" text-gray-400">{newsletterParagraph}</div>
        </div>
        {/* Sponsor */}
        <div className="relative col-span-full col-start-1 flex h-[100%] flex-col items-start justify-start gap-8 border-t-[1px] border-gray-700 pt-[20px] lg:col-span-2 lg:col-start-11 lg:border-t-0  lg:pt-0  lg:after:absolute lg:after:left-[-24px] lg:after:top-[50%] lg:after:h-[100%] lg:after:w-[1px] lg:after:translate-y-[-50%] lg:after:bg-gray-700 lg:after:content-['']">
          <h6 className=" uppercase">{sponsorTitle}</h6>
          <div className="flex">
            <a href={sponsorLink || ''}>
              <div className="relative h-[77px] w-[56px]">
                {sponsorLogo?.responsiveImage ? (
                  <DatoImage
                    data={sponsorLogo.responsiveImage}
                    className="lg:col-span-3 lg:col-start-1 lg:h-9 lg:w-24"
                    pictureClassName="h-8 w-20 object-contain object-left lg:w-24 lg:h-9"
                  />
                ) : (
                  <Image
                    src={sponsorLogo?.url || ''}
                    alt={sponsorLogo?.alt || ''}
                    fill
                  />
                )}
              </div>
            </a>
          </div>
        </div>
        {/* Copyright */}
        <div className="col-span-full mt-[40px] flex h-[100%] flex-col items-start justify-start border-t-[1px] border-gray-700 pb-[40px] pt-[24px]">
          <p className="text-gray-400">{copyright}</p>
        </div>
      </div>
    </footer>
  )
}
