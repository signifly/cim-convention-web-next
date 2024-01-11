import React from 'react'
import { Metadata } from 'next'
import { unstable_setRequestLocale } from 'next-intl/server'
import { toNextMetadata } from 'react-datocms/seo'
import { ComponentParser, fetchDatoContent } from '@/lib/datocms'
import { getAllPagesSlugQuery } from '@/lib/datocms/queries/getAllPagesSlugQuery'
import { Locale } from '@/navigation'
import { getPageBySlugQuery } from '@/lib/datocms/queries/getPageBySlugQuery'
import { PageProps } from './page'

// console.log('[WARN]: comment this out before pushing to production')
// export const revalidate = 10

type LayoutProps = {
  children: React.ReactNode
  params: { slug: string; locale: Locale }
}

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

export const generateMetadata = async ({
  params: { locale },
}: LayoutProps): Promise<Metadata> => {
  const { data } = await fetchDatoContent(
    getPageBySlugQuery({
      locale: locale,
      slug: '',
      isHomePage: true,
    }),
  )
  return !data.page ? {} : toNextMetadata([...data.page._seoMetaTags])
}

export default async function PageLayout({
  children,
  params: { slug, locale },
}: LayoutProps) {
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
          block.id && (
            <ComponentParser
              key={block.id}
              data={{
                ...block,
                _allSlugLocales: pageData.page._allSlugLocales,
              }}
            />
          ),
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
