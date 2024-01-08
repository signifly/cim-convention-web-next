import { gql } from 'graphql-request'

const PageFields = `id slug _modelApiKey`

export const SCHEDULE_BlOCK_FRAGMENT = gql`
  fragment ScheduleBlockFragment on ScheduleBlockRecord {
    id
    _modelApiKey
    anchorId
    displayAnchorLinks
		linkSupportLabel
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
          ... on HomePageRecord {
						${PageFields}
          }
          ... on PageRecord {
						${PageFields}
          }
          ... on ShortCourseRecord {
						${PageFields}
          }
        }
				useExternalLink 
				externalLink
      }
    }
  }
`
