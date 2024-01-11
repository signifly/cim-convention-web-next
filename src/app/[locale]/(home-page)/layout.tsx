import React from 'react'
import { Metadata } from 'next'
import { unstable_setRequestLocale } from 'next-intl/server'
import { Locale } from '@/navigation'
import { ComponentParser, fetchDatoContent } from '@/lib/datocms'
import { getPageBySlugQuery } from '@/lib/datocms/queries/getPageBySlugQuery'
import { toNextMetadata } from 'react-datocms/seo'

// console.log(
//   '[WARN] - (home-page)/page.tsx: Update revalidate interval before pushing to production',
// )
// export const revalidate = 10

type HomePageProps = {
  children: React.ReactNode
  params: { locale: Locale }
}

export const generateMetadata = async ({
  params: { locale },
}: HomePageProps): Promise<Metadata> => {
  const { data } = await fetchDatoContent(
    getPageBySlugQuery({
      locale: locale,
      slug: '',
      isHomePage: true,
    }),
  )
  return !data.homePage ? {} : toNextMetadata([...data.homePage._seoMetaTags])
}

export default async function HomePageLayout({
  children,
  params: { locale },
}: HomePageProps) {
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
          block.id && (
            <ComponentParser
              key={block.id}
              data={{
                ...block,
                _allSlugLocales: pageData.homePage._allSlugLocales,
              }}
            />
          ),
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
