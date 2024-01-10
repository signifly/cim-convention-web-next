import React from 'react'
import { unstable_setRequestLocale } from 'next-intl/server'

import { ComponentParser, fetchDatoContent } from '@/lib/datocms'
import { getAllPagesSlugQuery } from '@/lib/datocms/queries/getAllPagesSlugQuery'
import { PageProps } from './page'
import { Locale } from '@/navigation'
import { getPageBySlugQuery } from '@/lib/datocms/queries/getPageBySlugQuery'

// console.log(
//   '[WARN] - [...slug]/page.tsx: Update revalidate interval before pushing to production',
// )
// export const revalidate = 10

export async function generateStaticParams({ params }: PageProps) {
  const res = await fetchDatoContent(
    getAllPagesSlugQuery({ locale: params.locale }),
  )
  const result = res.data?.allPages
    ?.map((page: any) => ({ slug: [page.slug] }))
    // filter falsy values from N/A locales
    .filter(({ slug }: { slug: string[] }) => Boolean(slug[0]))

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
      {pageData?.page?.header?.blocks.map(
        (block: any) =>
          block.id && <ComponentParser key={block.id} data={block} />,
      )}
      {children}
      {pageData?.page?.footer?.blocks.map(
        (block: any) =>
          block.id && (
            <ComponentParser
              key={block.id}
              data={{ ...block, socialLinks: pageData.socialLink }}
            />
          ),
      )}
    </>
  )
}
