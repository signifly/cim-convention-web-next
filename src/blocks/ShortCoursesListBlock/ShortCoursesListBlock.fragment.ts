import { gql } from 'graphql-request'

export const SHORT_COURSES_LIST_BLOCK_FRAGMENT = gql`
  fragment ShortCoursesListBlockFragment on ShortCoursesListBlockRecord {
    id
    _modelApiKey
    anchorId
    title
    sections {
      duration
      dates
      time
      shortCourses {
        id
        slug
        courseTitle
      }
    }
  }
`
