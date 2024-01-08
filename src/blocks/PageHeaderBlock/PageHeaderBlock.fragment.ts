import { gql } from 'graphql-request'

export const PAGE_HEADER_BLOCK_FRAGMENT = gql`
  fragment PageHeaderBlockFragment on PageHeaderBlockRecord {
    id
    _modelApiKey
    title
    subTitle
    mainSponsor {
      id
      name
      logo {
        id
        url
        alt
        width
        height
        responsiveImage(imgixParams: { auto: format }) {
          ...ResponsiveImageFragment
        }
      }
      websiteUrl
    }
    mainSponsorLabel
    heroImage {
      url
      alt
      responsiveImage(imgixParams: { auto: format }) {
        ...ResponsiveImageFragment
      }
    }
  }
`
