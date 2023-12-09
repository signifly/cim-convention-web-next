import React from 'react'
import type { Metadata } from 'next'
import { notFound } from 'next/navigation'

// i18n
import { Providers } from '@/components/Providers'
import i18nConfig from '@/i18nConfig'

export function generateStaticParams() {
  return i18nConfig.locales.map((locale) => ({ locale }))
}

export const metadata: Metadata = {
  //TODO: add metaData
}

export default function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode
  params: { locale: string }
}) {
  // if locale is invalid, return 404
  if (!i18nConfig.locales.includes(params.locale as any)) notFound()

  return (
    <html
      lang={params.locale}
      className="h-full antialiased"
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
