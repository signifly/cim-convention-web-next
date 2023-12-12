import { gql } from 'graphql-request'

export const TWO_COLUMN_WITH_IMAGE_BLOCK_FRAGMENT = gql`
  fragment TwoColumnWithImageBlockFragment on TwoColumnWithImageBlockRecord {
    id
    _modelApiKey
    anchorId
    image {
      responsiveImage(imgixParams: { auto: format }) {
        ...ResponsiveImageFragment
      }
    }
    textContent {
      ... on TwoColumnWithImageBlockWithHeadingHighlightRecord {
        id
        _modelApiKey
        headline
        textToHighlight
        body
      }
      ... on TwoColumnWithImageBlockDefaultRecord {
        id
        _modelApiKey
        structuredText {
          value
        }
      }
    }
    ctaButtons {
      ...CtaButtonFragment
    }
    mobileLayout
    desktopLayout
    backgroundColor
  }
`
