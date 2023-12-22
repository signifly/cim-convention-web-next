import React from 'react'
import { unstable_setRequestLocale } from 'next-intl/server'
import { Locale } from '@/navigation'
import { ComponentParser, fetchDatoContent } from '@/lib/datocms'
import { getPageBySlugQuery } from '@/lib/datocms/queries/getPageBySlugQuery'

console.log(
  '[WARN] - (home-page)/page.tsx: Update revalidate interval before pushing to production',
)
export const revalidate = 10

export default async function HomePageLayout({
  children,
  params: { locale },
}: {
  children: React.ReactNode
  params: { locale: Locale }
}) {
  unstable_setRequestLocale(locale)
  const { data: pageData } = await fetchDatoContent(
    getPageBySlugQuery({
      locale: locale,
      slug: '',
      isHomePage: true,
    }),
  )

  return (
    <>
      {pageData?.homePage?.header?.blocks.map(
        (block: any) =>
          block.id && <ComponentParser key={block.id} data={block} />,
      )}
      {children}
      {pageData?.homePage?.footer?.blocks.map(
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
