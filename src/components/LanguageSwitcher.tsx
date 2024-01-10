'use client'

import React from 'react'
import { useLocale } from 'next-intl'
import { StringMultiLocaleField } from '@/types/generated'
import { Popover, PopoverContent, PopoverTrigger } from '@/components/Popover'
import { Link } from '@/navigation'
import { ChevronDownIcon } from '@heroicons/react/20/solid'
import { locales, dynamicPathSegments } from '@/navigation'
import { usePathname } from 'next/navigation'

export function LanguageSwitcher({
  _allSlugLocales,
}: {
  _allSlugLocales: StringMultiLocaleField[]
}) {
  const currentLocale = useLocale()
  const pathname = usePathname()
  const firstSegment = pathname
    .split('/')
    .filter((p) => locales.includes(p as any))[0]
  const isDynamicPath = dynamicPathSegments.includes(firstSegment as any)
  const dynamicPath = isDynamicPath ? `${firstSegment}/` : ''

  // @todo: add to mobile menu

  return (
    <Popover>
      <PopoverTrigger className="group flex items-center gap-x-1 uppercase">
        {currentLocale}
        <ChevronDownIcon className="h-5 w-5 text-brand-grey-400 transition-transform group-[&[data-state=open]]:rotate-180" />
      </PopoverTrigger>
      <PopoverContent className="flex flex-col gap-y-2 bg-white px-2 uppercase">
        {locales.map((l) => {
          const slug = _allSlugLocales.find((s) => s.locale === l)?.value
          const href = `/${dynamicPath}${slug ?? ''}` // if there's no slug for this language, link to the homepage

          return (
            <Link
              key={l}
              href={href}
              locale={l}
              className="pl-2 pr-8 hover:bg-brand-grey-200"
              replace={Boolean(slug)} // if there is a slug, replace the current history entry
            >
              {l}
            </Link>
          )
        })}
      </PopoverContent>
    </Popover>
  )
}
