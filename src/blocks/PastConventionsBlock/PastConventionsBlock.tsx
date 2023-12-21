import { PastConventionsBlockRecord } from '@/types/generated'
import { ConventionBlock } from '../ConventionBlock/ConventionBlock'
import { GridContainer } from '@/components/GridContainer'

export function PastConventionsBlock(props: PastConventionsBlockRecord) {
  let { title, conventions } = props

  return (
    <div className="bg-white py-16">
      <GridContainer>
        <div className="col-span-full mb-[56px] flex justify-center">
          {title && <h2 className="m-auto text-32 font-semibold">{title}</h2>}
        </div>
        <div className="col-span-full m-auto flex max-w-[850px] flex-wrap items-start justify-center gap-8 gap-y-14 md:gap-y-8">
          {conventions.map((convention) => {
            return (
              <div key={convention.id}>
                <ConventionBlock {...convention} />
              </div>
            )
          })}
        </div>
      </GridContainer>
    </div>
  )
}
