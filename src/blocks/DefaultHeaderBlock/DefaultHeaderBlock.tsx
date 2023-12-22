'use client'

import { useState } from 'react'
import Image from 'next/image'
import { Link } from '@/navigation'
import { AltFileField, DefaultHeaderBlockRecord } from '@/types/generated'
import { DesktopMenuContent } from '@/blocks/DefaultHeaderBlock/DesktopMenuContent'
import { MobileMenuDialog } from '@/blocks/DefaultHeaderBlock/MobileMenuDialog'

import { Bars3Icon } from '@heroicons/react/24/outline'
import { StyledLink } from '@/components/StyledLink'

const SiteLogo = (props: AltFileField) => {
  const { url, alt } = props

  return (
    <div className="flex h-[48px] w-1/2 lg:h-[64px] lg:flex-1">
      <Link href="/" className="relative h-full w-full lg:w-[215px]">
        <span className="sr-only">CIM Convention</span>
        <Image
          className="max-w-fit object-contain object-left"
          src={url}
          alt={alt}
          fill
        />
      </Link>
    </div>
  )
}

export function DefaultHeaderBlock(props: DefaultHeaderBlockRecord) {
  const { cimLogo, siteLogo, menu, ctaButtonLabel } = props
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  const MobileMenuButton = () => (
    <div className="flex lg:hidden">
      <button
        type="button"
        className="-m-2.5 inline-flex items-center justify-center rounded-md p-2.5 text-gray-700"
        onClick={() => setMobileMenuOpen(true)}
      >
        <span className="sr-only">Open main menu</span>
        <Bars3Icon className="h-6 w-6" aria-hidden="true" />
      </button>
    </div>
  )

  return (
    <header className="border-b border-brand-grey-300 bg-white">
      <nav
        className="container mx-auto box-border flex max-w-[1264px] items-center justify-between py-4  lg:py-6"
        aria-label="Global"
      >
        {/* Left side */}
        <div className="flex w-full items-center justify-between lg:w-max lg:gap-14">
          <SiteLogo {...siteLogo} />
          <MobileMenuButton />
          {menu && <DesktopMenuContent menu={menu} />}
        </div>

        {/* Right side  */}
        <div className="hidden lg:flex lg:flex-1 lg:items-center lg:justify-end lg:gap-x-8">
          <div className="shrink-0">
            <StyledLink
              href={{
                pathname: '/[...slug]',
                params: { slug: ['register'] }, // @TODO: replace with actual slug
              }}
            >
              {ctaButtonLabel}
            </StyledLink>
          </div>
          <div className="h-full min-h-[56px] border border-brand-grey-300" />
          <div className="relative h-full min-h-[56px] w-[40px]">
            <Image src={cimLogo.url} alt={cimLogo.alt} fill />
          </div>
        </div>
      </nav>

      {/* Mobile menu Dialog */}
      {menu && (
        <MobileMenuDialog
          menu={menu}
          mobileMenuOpen={mobileMenuOpen}
          setMobileMenuOpen={setMobileMenuOpen}
          siteLogo={siteLogo}
        />
      )}
    </header>
  )
}
