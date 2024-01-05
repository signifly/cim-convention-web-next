import React from 'react'
import { AccordionBlock } from '../AccordionBlock/AccordionBlock'
import { AccordionGroupBlockRecord } from '@/types/generated'
import { GridContainer } from '@/components/GridContainer'

export const AccordionGroupBlock = (props: AccordionGroupBlockRecord) => {
  const { displayAnchorLinks, sections, supportText } = props

  return (
    <div className="pb-12 lg:pb-16">
      {displayAnchorLinks && (
        <GridContainer className="flex gap-x-2 overflow-scroll py-4 lg:gap-x-4">
          {sections.map((section) => {
            return (
              <a
                key={section.id}
                href={`#${section.anchorId}`}
                className="whitespace-nowrap rounded border border-brand-grey-300 px-4 py-[10px] lg:px-6 lg:text-16/[125%]"
              >
                {section.title}
              </a>
            )
          })}
        </GridContainer>
      )}
      {sections.map((section, index) => {
        return <AccordionBlock key={index} {...section} />
      })}
      <GridContainer className="structured-text mt-8 grid-cols-1 lg:mt-16">
        {supportText && (
          <div
            dangerouslySetInnerHTML={{ __html: supportText }}
            className="col-span-full"
          />
        )}
      </GridContainer>
    </div>
  )
}
