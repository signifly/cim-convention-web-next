import { gql } from 'graphql-request'

export const FOOTER_BLOCK_FRAGMENT = gql`
  fragment FooterBlockFragment on FooterBlockRecord {
    id
    _modelApiKey
    contactButtonLabel
    contactButtonLink
    contactParagraph
    contactTitle
    copyright
    newsletterButtonLabel
    newsletterInputPlaceholder
    newsletterParagraph
    newsletterTitle
    sponsorTitle
    sponsorLogo {
      responsiveImage(imgixParams: { auto: format }) {
        ...ResponsiveImageFragment
      }
    }
  }
`
