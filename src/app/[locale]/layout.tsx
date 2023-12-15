import { unstable_setRequestLocale } from 'next-intl/server'
import React from 'react'
import { EuclidCircularA } from '@/styles/typography'
import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { cn } from '@/utils/clsxMerge'

// i18n
import { Providers } from '@/components/Providers'
import { Locale, locales } from '@/navigation'

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }))
}

export const metadata: Metadata = {
  // @TODO: add metaData
}

export default function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode
  params: { locale: Locale }
}) {
  // if locale is invalid, return 404
  if (!locales.includes(params.locale as any)) notFound()
  unstable_setRequestLocale(params.locale)

  return (
    <html
      lang={params.locale}
      className={cn('h-full antialiased', EuclidCircularA.className)}
      suppressHydrationWarning
    >
      <body className="flex h-full bg-zinc-50 dark:bg-black">
        <Providers params={params}>
          <div className="relative flex w-full flex-col">{children}</div>
        </Providers>
      </body>
    </html>
  )
}
