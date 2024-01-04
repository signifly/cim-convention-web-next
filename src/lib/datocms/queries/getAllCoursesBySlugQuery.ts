import { gql } from 'graphql-request'
import { locales, defaultLocale, Locale } from '@/navigation'

type Params = {
  locale: Locale
}

export const getAllCoursesSlugQuery = ({ locale }: Params): string => {
  const l = locales.includes(locale) ? locale : defaultLocale

  const result = gql`
    query AllShortCoursesQuery {
      allShortCourses (locale: ${l}) {
        id
        courseTitle
        _status
        _firstPublishedAt
        slug
      }
    }
  `

  return result
}
