'use client'

import React from 'react'
import { Swiper, SwiperSlide } from 'swiper/react'
import { Pagination } from 'swiper/modules'

import 'swiper/css'
import 'swiper/css/pagination'

import {
  TestimonialsBlockRecord,
  TestimonialsBlockTestimonialRecord,
} from '@/types/generated'
import { brandColors } from '@/styles/brandColors'

export const TestimonialsBlock = (props: TestimonialsBlockRecord) => {
  const { anchorId, headline, textToHighlight, testimonials } = props
  const headlineText =
    typeof textToHighlight === 'string'
      ? headline.replace(
          textToHighlight,
          `<span class="bg-brand-gradient bg-clip-text text-transparent">${textToHighlight}</span>`,
        )
      : headline

  /* Swiper Styles exposed by Swiper React
	--swiper-pagination-color: var(--swiper-theme-color);
	--swiper-pagination-left: auto;
	--swiper-pagination-right: 8px;
	--swiper-pagination-bottom: 8px;
	--swiper-pagination-top: auto;
	--swiper-pagination-fraction-color: inherit;
	--swiper-pagination-progressbar-bg-color: rgba(0,0,0,0.25);
	--swiper-pagination-progressbar-size: 4px;
	--swiper-pagination-bullet-size: 8px;
	--swiper-pagination-bullet-width: 8px;
	--swiper-pagination-bullet-height: 8px;
	--swiper-pagination-bullet-border-radius: 50%;
	--swiper-pagination-bullet-inactive-color: #000;
	--swiper-pagination-bullet-inactive-opacity: 0.2;
	--swiper-pagination-bullet-opacity: 1;
	--swiper-pagination-bullet-horizontal-gap: 4px;
	--swiper-pagination-bullet-vertical-gap: 6px;
	*/

  return (
    <section
      id={anchorId || undefined}
      className="bg-brand-grey-100 py-8 text-center lg:py-20"
    >
      <h2
        dangerouslySetInnerHTML={{ __html: headlineText }}
        className="container mx-auto text-20/[140%] font-semibold tracking-[-0.1px] lg:text-32/[115%]"
      />
      <Swiper
        spaceBetween={16}
        slidesPerView={1.22}
        centeredSlides={true}
        loop={true}
        pagination={{
          clickable: true,
        }}
        modules={[Pagination]}
        breakpoints={{
          [1024]: {
            slidesPerView: 2,
            spaceBetween: 30,
          },
        }}
        style={{
          // @ts-ignore - Swiper types are not up to date
          '--swiper-pagination-color': brandColors['brand-grey-950'],
          '--swiper-pagination-bullet-inactive-color':
            brandColors['brand-grey-300'],
          '--swiper-pagination-bullet-inactive-opacity': '1',
          '--swiper-pagination-bullet-width': '28px',
          '--swiper-pagination-bullet-height': '4px',
          '--swiper-pagination-bullet-horizontal-gap': '6px',
          '--swiper-pagination-bottom': '0px',
          '--swiper-pagination-bullet-border-radius': '0%',
          width: '100%',
          height: '100%',
        }}
      >
        {testimonials.map(
          (testimonial: TestimonialsBlockTestimonialRecord, i: number) => (
            <SwiperSlide key={`${testimonial.id}}-${i}`}>
              <div className="py-8 lg:py-12">
                <blockquote className="rounded-lg bg-white p-4 text-16/[150%] font-normal text-brand-grey-950 lg:p-10 lg:text-20">
                  <p className="mb-4 lg:mb-10">
                    {testimonial.id}-{i}
                  </p>
                  <p className="mb-4 lg:mb-10">{testimonial.quote}</p>
                  <cite className="not-italic">
                    <p className="text-16/[140%] font-semibold tracking-[-0.08px] lg:text-20">
                      {testimonial.author}
                    </p>
                    <p className="text-14/[150%] text-brand-grey-600 lg:text-16">
                      {testimonial.company}
                    </p>
                  </cite>
                </blockquote>
              </div>
            </SwiperSlide>
          ),
        )}
      </Swiper>
    </section>
  )
}
