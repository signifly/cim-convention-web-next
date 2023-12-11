import { gql } from 'graphql-request'

export const AD_BANNER_BLOCK_FRAGMENT = gql`
  fragment AdBannerBlockFragment on AdBannerBlockRecord {
    id
    _modelApiKey
    anchorId
    image {
      responsiveImage(imgixParams: { auto: format }) {
        ...ResponsiveImageFragment
      }
    }
  }
`
