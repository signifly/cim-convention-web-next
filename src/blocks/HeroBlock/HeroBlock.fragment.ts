import { gql } from 'graphql-request'

export const HERO_BLOCK_FRAGMENT = gql`
  fragment HeroBlockFragment on HeroBlockRecord {
    id
    _modelApiKey
    anchorId
    image {
      responsiveImage(imgixParams: { auto: format }) {
        ...ResponsiveImageFragment
      }
    }
    location
    date
    emphasizedHeadlineText
    restOfHeadline
    subHeadline
    sponsorHeading
    sponsorLogo {
      responsiveImage(imgixParams: { auto: format }) {
        ...ResponsiveImageFragment
      }
    }
  }
`
