import { CardBlockRecord, CardsContainerBlockRecord } from '@/types/generated'
import { CardBlock } from '../CardBlock/CardBlock'
import { GridContainer } from '@/components/GridContainer'

export function CardsContainerBlock(props: CardsContainerBlockRecord) {
  let { cards, title, mobileLayout, background } = props

  return (
    <div
      className={`${
        background === 'solid' ? 'bg-brand-grey-25' : 'bg-brand-gradient-light'
      } py-8 md:py-20`}
    >
      <GridContainer>
        {title && (
          <h1 className="col-span-full mb-[32px] text-[20px]/[140%] font-semibold md:mb-[48px] md:text-[32px]/[125%]">
            {title}
          </h1>
        )}
      </GridContainer>
      {cards.length && (
        <GridContainer className="auto-rows-[1fr] gap-[16px] md:gap-[32px]">
          {cards.map((card: CardBlockRecord) => {
            return (
              <div
                key={card.id}
                className={`${
                  mobileLayout === 'single' ? 'col-span-full' : 'col-span-2'
                } md:col-span-2 lg:col-span-4`}
              >
                <CardBlock {...{ ...card, mobileLayout }}></CardBlock>
              </div>
            )
          })}
        </GridContainer>
      )}
    </div>
  )
}
