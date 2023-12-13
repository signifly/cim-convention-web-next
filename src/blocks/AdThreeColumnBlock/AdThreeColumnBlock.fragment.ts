import { gql } from 'graphql-request'

export const AD_THREE_COLUMN_BLOCK_FRAGMENT = gql`
  fragment AdThreeColumnBlockFragment on AdThreeColumnBlockRecord {
    id
    _modelApiKey
    anchorId
    images {
      url
      alt
      responsiveImage(imgixParams: { auto: format }) {
        ...ResponsiveImageFragment
      }
    }
  }
`
