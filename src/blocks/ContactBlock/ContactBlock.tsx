import { ContactBlockRecord } from '@/types/generated'
import { ContactCardBlock } from '../ContactCardBlock/ContactCardBlock'
import { GridContainer } from '@/components/GridContainer'

export function ContactBlock(props: ContactBlockRecord) {
  let { title, subtitle, cards } = props
  return (
    <div className="flex min-h-[50vh] bg-brand-grey-100">
      <GridContainer>
        <div className="col-span-3">
          <h2>{subtitle}</h2>
          <h1>{title}</h1>
        </div>
        <div className="col-span-8 col-start-4">
          {cards.map((card, i) => (
            <div key={i}>
              <ContactCardBlock {...card} />
            </div>
          ))}
        </div>
      </GridContainer>
    </div>
  )
}
