import { unstable_setRequestLocale } from 'next-intl/server'
import { fetchDatoContent } from '@/lib/datocms'
import { getCourseBySlugQuery } from '@/lib/datocms/queries/getCourseBySlugQuery'
import { locales, Locale } from '@/navigation'
import { notFound } from 'next/navigation'
import { GridContainer } from '@/components/GridContainer'
import { StructuredText } from 'react-datocms'
import { CtaButton } from '@/components/CtaButton'
import { CtaButtonRecord, ShortCourseRecord } from '@/types/generated'

export type PageProps = {
  params: {
    locale: Locale
    slug: string
  }
}

export default async function Page({
  params: { slug, locale },
}: PageProps): Promise<JSX.Element | void> {
  unstable_setRequestLocale(locale)
  if (!locales.includes(locale as any)) notFound()

  const { data: courseData } = await fetchDatoContent(
    getCourseBySlugQuery({
      locale: locale,
      slug: slug,
    }),
  )

  if (!courseData?.shortCourse) return notFound()
  const { buttons } = courseData.shortCourse satisfies ShortCourseRecord
  console.log(courseData.shortCourse)

  return (
    <main className="bg-brand-grey-25">
      <GridContainer className="grid-cols-1 gap-y-10 py-10 lg:grid-cols-1 lg:gap-y-16 lg:py-16">
        <div className="structured-text">
          <StructuredText data={courseData.shortCourse.description.value} />
        </div>
        <div className="flex gap-x-6">
          {buttons.length > 0 &&
            buttons.map((button: CtaButtonRecord, index: number) => (
              <CtaButton key={index} {...button} />
            ))}
        </div>
      </GridContainer>
      <pre>{JSON.stringify(courseData.shortCourse, null, 2)}</pre>
    </main>
  )
}
