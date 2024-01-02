import { CardBlockRecord, CardsContainerBlockRecord } from '@/types/generated'
import { CardBlock } from '../CardBlock/CardBlock'
import { GridContainer } from '@/components/GridContainer'

export function CardsContainerBlock(props: CardsContainerBlockRecord) {
  let {
    cards,
    anchorId,
    title,
    paragraph,
    textAlignment,
    cardBorders,
    desktopLayout,
    mobileLayout,
    background,
  } = props

  let sectionBg = ''

  switch (background) {
    case 'solid':
      sectionBg = 'bg-brand-grey-25'
      break
    case 'gradient':
      sectionBg = 'bg-brand-gradient-light'
      break
    case 'white':
      sectionBg = 'bg-white'
      break
    case 'gray':
      sectionBg = 'bg-brand-grey-25'
      break
    default:
      sectionBg = 'bg-brand-grey-25'
  }

  let textAligned = `text-${textAlignment}`

  return (
    <section className={`${sectionBg} py-8 md:py-20`} id={anchorId}>
      <GridContainer>
        {title && (
          <h2
            className={`col-span-full ${
              paragraph ? 'mb-4 md:mb-4' : 'mb-8 md:mb-12'
            } text-20/[140%] font-semibold md:text-32/[125%] ${textAligned}`}
          >
            {title}
          </h2>
        )}
        {paragraph && (
          <div
            className={`col-span-full mb-12 text-14/[150%] md:text-18/[155%] ${textAligned}`}
            dangerouslySetInnerHTML={{ __html: paragraph || '' }}
          ></div>
        )}
      </GridContainer>
      {cards.length && (
        <GridContainer className="auto-rows-[1fr] gap-[16px] md:gap-8">
          {cards.map((card: CardBlockRecord) => {
            return (
              <div
                key={card.id}
                className={`${
                  mobileLayout === 'single' ? 'col-span-full' : 'col-span-2'
                } md:col-span-2 ${
                  desktopLayout === 'three-col'
                    ? 'lg:col-span-4'
                    : 'lg:col-span-3'
                }`}
              >
                <CardBlock
                  {...{ ...card, mobileLayout, cardBorders, background }}
                ></CardBlock>
              </div>
            )
          })}
        </GridContainer>
      )}
    </section>
  )
}
