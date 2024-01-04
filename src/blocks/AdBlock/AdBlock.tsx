import { GridContainer } from '@/components/GridContainer'
import { AdBlockRecord } from '@/types/generated'
import { Ad } from '@/components/Ad'

export const AdBlock = (props: AdBlockRecord) => {
  const { anchorId, banner, ad, ads } = props

  let sectionClasses = 'py-6 lg:py-16'
  let gridClasses = 'grid-cols-1'
  let divClasses =
    'mx-10 flex flex-col gap-12 lg:col-span-10 lg:col-start-2 lg:mx-0 lg:flex-row'

  if (banner) {
    sectionClasses = 'bg-brand-grey-25 py-10 lg:py-16'
    gridClasses = 'lg:place-items-center'
    divClasses = 'col-span-4 lg:col-span-8 lg:col-start-3 lg:px-8'
  }

  return (
    <section id={anchorId || ''} className={sectionClasses}>
      <GridContainer className={gridClasses}>
        <div className={divClasses}>
          {banner
            ? ad && <Ad {...ad} />
            : ads && ads.map((each) => <Ad key={each.id} {...each} />)}
        </div>
      </GridContainer>
    </section>
  )
}
