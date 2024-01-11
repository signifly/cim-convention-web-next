'use client'

import React from 'react'
import { SponsorRecord } from '@/types/generated'
import { Image as DatoImage } from 'react-datocms'
import Image from 'next/image'
import { cn } from '@/utils/clsxMerge'

// @ts-ignore - Splidejs needs to update their package.json: https://github.com/Splidejs/splide/issues/1248
import { Splide, SplideSlide } from '@splidejs/react-splide'
import { AutoScroll } from '@splidejs/splide-extension-auto-scroll'

export const OtherSponsorsCarousel = (props: {
  otherSponsorsLabel: string
  otherSponsors: SponsorRecord[]
}) => {
  const { otherSponsorsLabel, otherSponsors: sponsors } = props

  const generateSplideBreakpoints = ([...breakpoints]: {
    px: string
    maxItems: number
  }[]): {
    [key: string]: any
  } => {
    const breakpointsObject: {
      [key: string]: any
    } = {}

    breakpoints.forEach((each) => {
      const isOverflowing = sponsors.length > each.maxItems
      breakpointsObject[each.px] = {
        // Show the number of logos or the max number of logos per breakpoint, whichever is smaller
        perPage: Math.min(sponsors.length, each.maxItems),
        // If there are more logos than the max number of logos per breakpoint, enable autoscroll
        autoScroll: {
          autoStart: isOverflowing,
          pauseOnHover: isOverflowing,
          speed: isOverflowing ? 1 : 0,
        },
        fixedWidth: `${
          (parseInt(each.px) - (each.maxItems - 1) * 32) / each.maxItems // (breakpoint width - num of gaps * gap length) / numof logos
        }px`,
        type: isOverflowing ? 'loop' : 'slide',
      }
    })

    return breakpointsObject
  }

  const options = {
    perPage: 1,
    drag: 'free',
    pagination: false,
    arrows: false,
    mediaQuery: 'min',
    autoScroll: {
      pauseOnHover: true,
      rewind: false,
      speed: 0.25,
    },
    fixedHeight: '58px',
    width: '176px',
    height: '58px',
    direction: 'ttb',
    type: sponsors.length > 2 ? 'loop' : 'slide',
  }

  return (
    <div className="flex min-h-full flex-col gap-y-2 lg:items-end">
      <p className="col-span-full whitespace-nowrap text-12/[130%] font-normal uppercase tracking-[0.24px] lg:col-span-2 lg:text-14/[140%] lg:tracking-[0.28px]">
        {otherSponsorsLabel}
      </p>
      <Splide
        aria-labelledby="sponsor-list-title"
        options={options}
        extensions={{ AutoScroll }}
      >
        {sponsors.map(({ id, logo, name, websiteUrl }) => {
          return (
            <SplideSlide key={id} className="">
              <a href={websiteUrl} target="_blank">
                {logo.responsiveImage && (
                  <DatoImage
                    data={logo.responsiveImage}
                    className={cn('max-h-[58px] object-contain')}
                    pictureClassName="object-cover object-left lg:object-right"
                    priority
                  />
                )}
                {!logo.responsiveImage && (
                  <Image src={logo.url} alt={logo.alt || name || ''} fill />
                )}
              </a>
            </SplideSlide>
          )
        })}
      </Splide>
    </div>
  )
}
