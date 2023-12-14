import { CardBlockRecord, CardsContainerBlockRecord } from '@/types/generated'
import { CardBlock } from '../CardBlock/CardBlock'
import { GridContainer } from '@/components/GridContainer'

export function CardsContainerBlock(props: CardsContainerBlockRecord) {
  let { cards, title, mobileLayout, background } = props
  return (
    <div className="bg-brand-grey-25 p-4">
      <GridContainer>
        {title && (
          <h1 className="col-span-full mb-[48px] text-[32px]/[125%] font-semibold">
            {title}
          </h1>
        )}
      </GridContainer>
      {cards.length && (
        <GridContainer>
          {cards.map((card: CardBlockRecord) => {
            return (
              <div
                key={card.id}
                className={`${
                  mobileLayout === 'single' ? 'col-span-full' : 'col-span-2'
                } md:col-span-2 lg:col-span-4`}
              >
                <CardBlock {...card}></CardBlock>
              </div>
            )
          })}
        </GridContainer>
      )}
    </div>
  )
}
