import React from 'react'
import { unstable_setRequestLocale } from 'next-intl/server'

import { ComponentParser, fetchDatoContent } from '@/lib/datocms'
import { getAllCoursesSlugQuery } from '@/lib/datocms/queries/getAllCoursesBySlugQuery'
import { PageProps } from './page'
import { Locale } from '@/navigation'
import { getCourseBySlugQuery } from '@/lib/datocms/queries/getCourseBySlugQuery'

console.log(
  '[WARN] - [...slug]/page.tsx: Update revalidate interval before pushing to production',
)
export const revalidate = 10

export async function generateStaticParams({ params }: PageProps) {
  const res = await fetchDatoContent(
    getAllCoursesSlugQuery({ locale: params.locale }),
  )
  // @todo: filter null values
  const result = res.data?.allShortCourses
    ?.map((page: any) => ({ slug: page.slug }))
    // filter falsy values from N/A locales
    .filter(({ slug }: { slug: string | null }) => Boolean(slug))

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
  const { data: courseData } = await fetchDatoContent(
    getCourseBySlugQuery({
      locale,
      slug,
    }),
  )

  return (
    <>
      {/* Header */}
      {courseData?.shortCourse?.header?.blocks.map(
        (block: any) =>
          block.id && (
            <ComponentParser
              key={block.id}
              data={{
                ...block,
                _allSlugLocales: courseData.shortCourse._allSlugLocales,
              }}
            />
          ),
      )}

      {children}

      {/* Footer */}
      {courseData?.shortCourse?.footer?.blocks.map(
        (block: any) =>
          block.id && (
            <ComponentParser
              key={block.id}
              data={{ ...block, socialLinks: courseData.socialLink }}
            />
          ),
      )}
    </>
  )
}
