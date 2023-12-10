import React from 'react'
import { unstable_setRequestLocale } from 'next-intl/server'

import { fetchDatoContent } from '@/lib/datocms'
import { getAllPagesSlugQuery } from '@/lib/datocms/queries/getAllPagesSlugQuery'
import { Header } from '@/blocks/Header/Header'
import { Footer } from '@/blocks/Footer/Footer'
import { PageProps } from './page'
import { Locale } from '@/navigation'

export async function generateStaticParams({ params }: PageProps) {
  const res = await fetchDatoContent(
    getAllPagesSlugQuery({ locale: params.locale }),
  )
  const result = res.data?.allPages?.map((page: any) => {
    return { slug: [page.slug] }
  })

  return result
}

export default function HomePageLayout({
  children,
  params,
}: {
  children: React.ReactNode
  params: { locale: Locale }
}) {
  unstable_setRequestLocale(params.locale)
  return (
    <>
      <Header />
      {children}
      <Footer />
    </>
  )
}
