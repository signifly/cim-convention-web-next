import React from 'react'
import type { Metadata } from 'next'

// i18n
import type { Locale } from '@/i18nConfig'
import i18nConfig from '@/i18nConfig'
import { Providers } from '@/components/Providers'

export function generateStaticParams() {
  const locales = i18nConfig.locales.map((locale: Locale) => ({ locale }))
  return locales
}

export const metadata: Metadata = {
  //TODO: add metaData
}

export default function HomePageLayout({
  children,
  params,
}: {
  children: React.ReactNode
  params: { locale: Locale }
}) {
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
