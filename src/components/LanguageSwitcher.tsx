'use client'

import React from 'react'
import { useLocale } from 'next-intl'
import { StringMultiLocaleField } from '@/types/generated'
import { Popover, PopoverContent, PopoverTrigger } from '@/components/Popover'
import { Link } from '@/navigation'
import { ChevronDownIcon } from '@heroicons/react/20/solid'

export function LanguageSwitcher({
  _allSlugLocales,
}: {
  _allSlugLocales: StringMultiLocaleField[]
}) {
  const currentLocale = useLocale()

  // @todo: add prefix for short courses
  // @todo: add to mobile menu

  return (
    <Popover>
      <PopoverTrigger className="group flex items-center gap-x-1 uppercase">
        {currentLocale}
        <ChevronDownIcon className="h-5 w-5 text-brand-grey-400 transition-transform group-[&[data-state=open]]:rotate-180" />
      </PopoverTrigger>
      <PopoverContent className="flex flex-col gap-y-2 bg-white px-2 uppercase">
        {_allSlugLocales.map((l) => (
          <Link
            key={l.locale}
            href={`/${l.value}`}
            locale={l.locale || 'en'}
            className="pl-2 pr-8 hover:bg-brand-grey-200"
          >
            {l.locale}
          </Link>
        ))}
      </PopoverContent>
    </Popover>
  )
}
