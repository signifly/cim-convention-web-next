import { GridContainer } from '@/components/GridContainer'
import { PageHeaderBlockRecord } from '@/types/generated'
import React from 'react'

export const PageHeaderBlock = (props: PageHeaderBlockRecord) => {
  const { title, subTitle } = props

  return (
    <section className="bg-brand-gradient-light">
      <GridContainer className="grid-cols-1 p-6 lg:py-12">
        <h1 className="mb-2 text-12/[130%] font-normal uppercase tracking-[0.24px] lg:col-span-full lg:mb-4 lg:text-14/[140%] lg:tracking-[0.28px]">
          {title}
        </h1>
        <p className="text-20/[140%] font-semibold tracking-[-0.1px] lg:col-span-full lg:col-start-1 lg:text-32/[125%] lg:tracking-[-0.16px]">
          {subTitle}
        </p>
      </GridContainer>
    </section>
  )
}
