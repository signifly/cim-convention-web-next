import React, { Dispatch, SetStateAction } from 'react'
import { Dialog, Disclosure } from '@headlessui/react'
import { cn } from '@/utils/clsxMerge'
import { XMarkIcon } from '@heroicons/react/24/outline'
import { ChevronDownIcon } from '@heroicons/react/20/solid'
import { AltFileField, MenuRecord } from '@/types/generated'
import { Link } from '@/navigation'
import Image from 'next/image'

type Props = {
  menu: MenuRecord
  mobileMenuOpen: boolean
  setMobileMenuOpen: Dispatch<SetStateAction<boolean>>
  siteLogo: AltFileField
}

export const MobileMenuDialog = (props: Props) => {
  const { menu, mobileMenuOpen, setMobileMenuOpen, siteLogo } = props

  return (
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
}
