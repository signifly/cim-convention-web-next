import { gql } from 'graphql-request'

export const CARD_BLOCK_FRAGMENT = gql`
  fragment CardBlockFragment on CardBlockRecord {
    id
    _modelApiKey
    paragraph(markdown: true)
    subtitle
    title
    buttons {
      ...CtaButtonFragment
    }
    image {
      url
      alt
      responsiveImage(imgixParams: { auto: format }) {
        ...ResponsiveImageFragment
      }
    }
  }
`
