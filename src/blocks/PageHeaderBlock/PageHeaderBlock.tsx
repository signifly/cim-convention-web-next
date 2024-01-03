import React from 'react'
import { GridContainer } from '@/components/GridContainer'
import { PageHeaderBlockRecord } from '@/types/generated'
import { Image as DatoImage } from 'react-datocms'
import { cn } from '@/utils/clsxMerge'
import Image from 'next/image'

export const PageHeaderBlock = (props: PageHeaderBlockRecord) => {
  const { title, subTitle, mainSponsor, mainSponsorLabel } = props

  return (
    <section className="bg-brand-gradient-light">
      <GridContainer className="flex flex-col gap-y-6 p-6 lg:flex-row lg:items-stretch lg:justify-between lg:py-12">
        <div className="">
          <h1 className="mb-2 text-12/[130%] font-normal uppercase tracking-[0.24px] lg:mb-4 lg:text-14/[140%] lg:tracking-[0.28px]">
            {title}
          </h1>
          <p className="text-20/[140%] font-semibold tracking-[-0.1px] lg:col-start-1 lg:text-32/[125%] lg:tracking-[-0.16px]">
            {subTitle}
          </p>
        </div>
        <div className="flex min-h-full flex-col gap-y-2">
          {mainSponsorLabel && (
            <p className="col-span-full whitespace-nowrap text-12/[130%] font-normal uppercase tracking-[0.24px] lg:col-span-2 lg:text-14/[140%] lg:tracking-[0.28px]">
              {mainSponsorLabel}
            </p>
          )}
          {mainSponsor && (
            <a
              href={mainSponsor.websiteUrl}
              target="_blank"
              className="relative block max-h-[58px]"
            >
              {mainSponsor.logo.responsiveImage && (
                <DatoImage
                  data={mainSponsor.logo.responsiveImage}
                  className={'max-h-[58px] object-contain'}
                  pictureClassName="max-h-[58px] object-contain object-left lg:object-right"
                  priority
                />
              )}
              {!mainSponsor.logo.responsiveImage && (
                <Image
                  src={mainSponsor.logo.url}
                  alt={mainSponsor.logo.alt || name || ''}
                  fill
                />
              )}
            </a>
          )}
        </div>
      </GridContainer>
    </section>
  )
}
