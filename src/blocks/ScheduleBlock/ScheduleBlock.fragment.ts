import { gql } from 'graphql-request'

const PageFields = `id slug _modelApiKey`

export const SCHEDULE_BlOCK_FRAGMENT = gql`
  fragment ScheduleBlockFragment on ScheduleBlockRecord {
    id
    _modelApiKey
    anchorId
    displayAnchorLinks
    days {
      id
      date
      timeSlots {
        id
        startTime
        endTime
        title
        description
        linkTo {
          ... on PageRecord {
						${PageFields}
          }
          ... on PageRecord {
						${PageFields}
          }
          ... on PageRecord {
						${PageFields}
          }
        }
      }
    }
  }
`
