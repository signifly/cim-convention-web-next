import React from 'react'
import { unstable_setRequestLocale } from 'next-intl/server'

import { ComponentParser, fetchDatoContent } from '@/lib/datocms'
import { getAllPagesSlugQuery } from '@/lib/datocms/queries/getAllPagesSlugQuery'
import { Footer } from '@/blocks/Footer/Footer'
import { PageProps } from './page'
import { Locale } from '@/navigation'
import { getPageBySlugQuery } from '@/lib/datocms/queries/getPageBySlugQuery'

export async function generateStaticParams({ params }: PageProps) {
  const res = await fetchDatoContent(
    getAllPagesSlugQuery({ locale: params.locale }),
  )
  const result = res.data?.allPages?.map((page: any) => {
    return { slug: [page.slug] }
  })

  return result
}

export default async function HomePageLayout({
  children,
  params: { slug, locale },
}: {
  children: React.ReactNode
  params: { slug: string; locale: Locale }
}) {
  unstable_setRequestLocale(locale)
  const { data: pageData } = await fetchDatoContent(
    getPageBySlugQuery({
      locale,
      slug,
    }),
  )

  return (
    <>
      {pageData?.page?.header.map((block: any) => (
        <ComponentParser key={block.id} data={block} />
      ))}
      {children}
      <Footer />
    </>
  )
}
