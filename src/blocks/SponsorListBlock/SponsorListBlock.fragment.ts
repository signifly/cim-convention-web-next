import { gql } from 'graphql-request'

export const SPONSOR_LIST_BLOCK_FRAGMENT = gql`
  fragment SponsorListBlockFragment on SponsorListBlockRecord {
    id
    _modelApiKey
    anchorId
    headline
    previousYearLinkLabel
    previousYearLinkUrl
    rows {
      id
      _modelApiKey
      title
      logos {
        id
        url
        alt
        width
        height
        responsiveImage(imgixParams: { auto: format }) {
          ...ResponsiveImageFragment
        }
      }
    }
  }
`
