'use client'

import { Fragment, useState } from 'react'
import { Dialog, Disclosure, Popover, Transition } from '@headlessui/react'
import Image from 'next/image'
import { Link } from '@/navigation'
import { cn } from '@/utils/clsxMerge'
import { DefaultHeaderBlockRecord } from '@/types/generated'

import { Bars3Icon, XMarkIcon } from '@heroicons/react/24/outline'
import { ChevronDownIcon } from '@heroicons/react/20/solid'
import { StyledLink } from '@/components/StyledLink'

export function DefaultHeaderBlock(props: DefaultHeaderBlockRecord) {
  const { cimLogo, siteLogo, menu, ctaButtonLabel } = props
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  const SiteLogo = () => (
    <div className="flex h-[48px] w-1/2 lg:h-[64px] lg:flex-1">
      <Link href="/" className="relative h-full w-full lg:w-[215px]">
        <span className="sr-only">CIM Convention</span>
        <Image
          className="max-w-fit object-contain object-left"
          src={siteLogo.url}
          alt={siteLogo.alt}
          fill
        />
      </Link>
    </div>
  )

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

  const DesktopMenuContent = () => {
    return (
      <Popover.Group className="hidden lg:flex lg:gap-x-9">
        {menu?.menuItems.map((item) => {
          const { subMenuItems } = item
          if (subMenuItems.length > 0) {
            return (
              <Popover key={item.id} className="relative">
                <Popover.Button className="flex items-center gap-x-1 font-medium leading-6 text-gray-900">
                  {item.name}
                  <ChevronDownIcon
                    className="h-5 w-5 flex-none text-gray-400"
                    aria-hidden="true"
                  />
                </Popover.Button>

                <Transition
                  as={Fragment}
                  enter="transition ease-out duration-200"
                  enterFrom="opacity-0 translate-y-1"
                  enterTo="opacity-100 translate-y-0"
                  leave="transition ease-in duration-150"
                  leaveFrom="opacity-100 translate-y-0"
                  leaveTo="opacity-0 translate-y-1"
                >
                  <Popover.Panel className="absolute -left-8 top-full z-10 mt-3 w-screen max-w-md overflow-hidden rounded-3xl bg-white shadow-lg ring-1 ring-gray-900/5">
                    <div className="p-4">
                      {subMenuItems.map((subMenu) => {
                        return (
                          subMenu.linkTo && (
                            <div
                              key={subMenu.id}
                              className="group relative flex items-center gap-x-6 rounded-lg p-4 leading-6 hover:bg-gray-50"
                            >
                              <div className="flex-auto">
                                <Link
                                  href={{
                                    pathname: '/[...slug]',
                                    params: {
                                      slug: [subMenu.linkTo.slug],
                                    },
                                  }}
                                  className="block font-medium text-gray-900"
                                >
                                  {subMenu.name}
                                  <span className="absolute inset-0" />
                                </Link>
                              </div>
                            </div>
                          )
                        )
                      })}
                    </div>
                  </Popover.Panel>
                </Transition>
              </Popover>
            )
          } else {
            return item.linkTo ? (
              <Link
                key={item.id}
                href={{
                  pathname: '/[...slug]',
                  params: { slug: [item.linkTo.slug] },
                }}
                className="font-medium leading-6 text-gray-900"
              >
                {item.linkTo.title}
              </Link>
            ) : (
              <span
                key={item.id}
                className="font-medium leading-6 text-gray-900"
              >
                {item.name}
              </span>
            )
          }
        })}
      </Popover.Group>
    )
  }

  const MobileMenuDialog = () => (
    <Dialog
      as="div"
      className="lg:hidden"
      open={mobileMenuOpen}
      onClose={setMobileMenuOpen}
    >
      <div className="fixed inset-0 z-10" />
      <Dialog.Panel className="container fixed inset-y-0 right-0 z-10 w-full overflow-y-auto bg-white py-4 sm:max-w-sm sm:ring-1 sm:ring-gray-900/10">
        <div className="flex items-center justify-between">
          <Link href="/" className="relative h-[48px] w-1/2">
            <span className="sr-only">CIM Convention</span>
            <Image
              className="h-full w-auto object-contain object-left"
              src={siteLogo.url}
              alt={siteLogo.alt}
              fill
            />
          </Link>
          <button
            type="button"
            className="-m-2.5 rounded-md p-2.5 text-gray-700"
            onClick={() => setMobileMenuOpen(false)}
          >
            <span className="sr-only">Close menu</span>
            <XMarkIcon className="h-6 w-6" aria-hidden="true" />
          </button>
        </div>
        <div className="mt-6 flow-root">
          <div className="-my-6 divide-y divide-gray-500/10">
            <div className="space-y-2 py-6">
              {menu?.menuItems.map((item) => {
                if (item.subMenuItems.length > 0) {
                  return (
                    <Disclosure key={item.id} as="div" className="-mx-3">
                      {({ open }) => (
                        <>
                          <Disclosure.Button className="flex w-full items-center justify-between rounded-lg py-2 pl-3 pr-3.5 text-base/7 font-medium text-gray-900 hover:bg-gray-50">
                            {item.name}
                            <ChevronDownIcon
                              className={cn(
                                open ? 'rotate-180' : '',
                                'h-5 w-5 flex-none',
                              )}
                              aria-hidden="true"
                            />
                          </Disclosure.Button>
                          <Disclosure.Panel className="mt-2 space-y-2">
                            {item.subMenuItems.map((item) =>
                              item.linkTo ? (
                                <Disclosure.Button key={item.name} as="div">
                                  <Link
                                    href={{
                                      pathname: '/[...slug]',
                                      params: { slug: [item.linkTo.slug] },
                                    }}
                                    className="block rounded-lg py-2 pl-6 pr-3 font-medium leading-7 text-gray-900 hover:bg-gray-50"
                                  >
                                    {item.name}
                                  </Link>
                                </Disclosure.Button>
                              ) : (
                                <Disclosure.Button key={item.name} as="div">
                                  <span className="block rounded-lg py-2 pl-6 pr-3 font-medium leading-7 text-gray-900 hover:bg-gray-50">
                                    {item.name}
                                  </span>
                                </Disclosure.Button>
                              ),
                            )}
                          </Disclosure.Panel>
                        </>
                      )}
                    </Disclosure>
                  )
                } else {
                  return item.linkTo ? (
                    <Link
                      key={item.id}
                      href={{
                        pathname: '/[...slug]',
                        params: { slug: [item.linkTo.slug] },
                      }}
                      className="-mx-3 block rounded-lg px-3 py-2 text-base/7 font-medium text-gray-900 hover:bg-gray-50"
                    >
                      {item.name}
                    </Link>
                  ) : (
                    <span
                      key={item.id}
                      className="-mx-3 block rounded-lg px-3 py-2 text-base/7 font-medium text-gray-900 hover:bg-gray-50"
                    >
                      {item.name}
                    </span>
                  )
                }
              })}
            </div>
            <div className="py-6">
              {/* @TODO: replace this with actual CTA button  */}
              <a
                href="#"
                className="-mx-3 block rounded-lg px-3 py-2.5 text-base/7 font-medium text-gray-900 hover:bg-gray-50"
              >
                Log in
              </a>
            </div>
          </div>
        </div>
      </Dialog.Panel>
    </Dialog>
  )

  return (
    <header className="border-b border-brand-grey-300 bg-white">
      <nav
        className="container mx-auto box-border flex max-w-[1264px] items-center justify-between py-4  lg:py-6"
        aria-label="Global"
      >
        {/* Left side */}
        <div className="flex w-full items-center justify-between lg:w-max lg:gap-14">
          <SiteLogo />
          <MobileMenuButton />
          <DesktopMenuContent />
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
      <MobileMenuDialog />
    </header>
  )
}
