'use client'

import React, { useState } from 'react'
import { RegistrationTierBlockRecord } from '@/types/generated'
import { CtaButton } from './CtaButton'
import { GridContainer } from './GridContainer'
import IconSelector from './IconSelector/IconSelector'

export const RegistrationTier = (
  props: RegistrationTierBlockRecord & {
    registrationPeriod: string
    lateLabel: string
    earlyLabel: string
    blockIndex: number
  },
) => {
  const {
    earlyPrice,
    latePrice,
    title,
    details,
    lateButton,
    earlyButton,
    registrationPeriod,
    earlyLabel,
    lateLabel,
    blockIndex,
  } = props

  const [openDetails, setOpenDetails] = useState<boolean>(blockIndex === 0)

  const toggleDetails = () => {
    setOpenDetails(!openDetails)
  }

  return (
    <GridContainer className="rounded-lg bg-brand-grey-100 p-[20px] lg:px-8 lg:py-6">
      {/* Details */}
      <div className="col-span-full col-start-1 lg:col-span-6">
        <div
          onClick={toggleDetails}
          className="flex w-[100%] cursor-pointer justify-between"
        >
          <h3 className="text-24/[140%] font-medium">{title}</h3>
          <div className="h-[calc(24px * 1.4)] flex items-center justify-center p-2">
            <IconSelector
              selectorId="chevron_icon"
              className={` text-black ${
                openDetails ? 'rotate-0' : 'rotate-180'
              }`}
            />
          </div>
        </div>
        <div
          className={`grid pt-6 transition-all duration-300 ${
            openDetails ? 'grid-rows-[1fr]' : 'grid-rows-[0fr]'
          }`}
        >
          <div
            dangerouslySetInnerHTML={{ __html: details }}
            className="registration-tier-details overflow-hidden"
          />
        </div>
      </div>
      {/* Pricing */}
      <div className="col-span-full col-start-1 justify-start lg:col-span-6">
        <div className="flex flex-col lg:flex-row">
          {/* Early */}
          <div className="flex w-[100%] grow flex-row items-center justify-between border-t border-brand-grey-300 py-2 pl-0 lg:w-[50%] lg:flex-col lg:items-start lg:justify-normal lg:border-l lg:border-t-0 lg:py-0 lg:pl-8">
            <div className="flex flex-col">
              <p className="mb-2 font-medium text-brand-green">{earlyPrice}</p>
              <p className="text-14/[140%] uppercase text-brand-grey-600">
                {earlyLabel}
              </p>
            </div>
            {registrationPeriod === 'early' && (
              <div className="mt-0 lg:mt-6">
                <CtaButton {...earlyButton[0]} />
              </div>
            )}
          </div>
          {/* Late */}
          <div className="flex w-[100%] grow flex-row items-center justify-between border-t border-brand-grey-300 py-2 pl-0 lg:w-[50%] lg:flex-col lg:items-start lg:justify-normal lg:border-l lg:border-t-0 lg:py-0 lg:pl-8">
            <div className="flex flex-col">
              <p className="mb-2 font-medium">{latePrice}</p>
              <p className="text-14/[140%] uppercase text-brand-grey-600">
                {lateLabel}
              </p>
            </div>
            {registrationPeriod === 'late' && (
              <div className="mt-0 lg:mt-6">
                <CtaButton {...lateButton[0]} />
              </div>
            )}
          </div>
        </div>
      </div>
    </GridContainer>
  )
}
