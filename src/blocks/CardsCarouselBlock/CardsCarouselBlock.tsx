'use client'

import { CardBlockRecord, CardsCarouselBlockRecord } from '@/types/generated'
import { CardBlock } from '../CardBlock/CardBlock'
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

  // Matching max-width from other components using GridContainer with the padding of the carousel
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
      <h2 className="mb-8 text-center text-20/[140%] font-semibold md:mb-16 md:text-32/[125%]">
        {title}
      </h2>

      <Splide aria-labelledby="sponsor-list-title" options={options}>
        {cards.map((card: CardBlockRecord) => {
          return (
            <SplideSlide key={card.id}>
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
