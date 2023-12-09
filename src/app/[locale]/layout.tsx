import React from 'react'
import type { Metadata } from 'next'
import { notFound } from 'next/navigation'

// i18n
import { Providers } from '@/components/Providers'
import { locales } from '@/middleware'

export function generateStaticParams() {
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
  params: { locale: (typeof locales)[number] }
}) {
  // if locale is invalid, return 404
  if (!locales.includes(params.locale as any)) notFound()
  console.log(params.locale)

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
