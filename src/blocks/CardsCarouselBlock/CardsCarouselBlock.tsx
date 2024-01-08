'use client'

import { CardBlockRecord, CardsCarouselBlockRecord } from '@/types/generated'
import { CardBlock } from '../CardBlock/CardBlock'
import { GridContainer } from '@/components/GridContainer'
import { CtaButton } from '@/components/CtaButton'
import '@splidejs/react-splide/css/core'

// @ts-ignore - Splidejs needs to update their package.json: https://github.com/Splidejs/splide/issues/1248
import { Splide, SplideSlide } from '@splidejs/react-splide'

export function CardsCarouselBlock(props: CardsCarouselBlockRecord) {
  const { cards, anchorId, title, background } = props

  let sectionBg = ''

  switch (background) {
    case 'gradient':
      sectionBg = 'bg-brand-gradient-light'
      break
    case 'white':
      sectionBg = 'bg-white'
      break
    case 'dark_gray':
      sectionBg = 'bg-brand-grey-100'
      break
    case 'gray':
      sectionBg = 'bg-brand-grey-25'
      break
    default:
      sectionBg = 'bg-brand-grey-25'
  }

  let paddingPercentage

  if (window) {
    let contentPercentage = (1216 * 100) / window.innerWidth
    paddingPercentage = 100 - contentPercentage
  }

  const options = {
    breakpoints: {
      '768': {
        gap: '16px',
        perPage: 2,
        padding: '24px',
      },
    },
    arrows: false,
    pagination: false,
    type: 'slide',
    padding: paddingPercentage ? `${paddingPercentage / 2}%` : '7.5%',
    gap: '16px',
    perPage: 3,
    rewind: true,
    rewindSpeed: 1000,
    autoplay: true,
    interval: 3000,
    trimSpace: false,
    focus: 'center',
  }

  return (
    <section className={`${sectionBg} py-8 md:py-20`} id={anchorId || ''}>
      <h2 className="mb-16 text-center text-32/[125%] font-semibold">
        {title}
      </h2>

      <Splide aria-labelledby="sponsor-list-title" options={options}>
        {cards.map((card: CardBlockRecord) => {
          return (
            <SplideSlide
              key={card.id}
              className="relative flex h-full items-center justify-center py-8 lg:py-12"
            >
              <CardBlock
                {...{ ...card, cardBorders: background === 'white' }}
              />
            </SplideSlide>
          )
        })}
      </Splide>
    </section>
  )
}
