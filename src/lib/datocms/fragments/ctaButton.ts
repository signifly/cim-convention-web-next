import { gql } from 'graphql-request'

export const CTA_BUTTON_FRAGMENT = gql`
  fragment CtaButtonFragment on CtaButtonRecord {
    id
    _modelApiKey
    label
    useExternalLink
    linkTo {
      id
      slug
      title
    }
    externalLink
    stylingOption
  }
`
