import { gql } from 'graphql-request'

export const ACCORDION_GROUP_BLOCK_FRAGMENT = gql`
  fragment AccordionGroupBlockFragment on AccordionGroupBlockRecord {
    id
    _modelApiKey
    displayAnchorLinks
    sections {
      ...AccordionBlockFragment
    }
    supportText
  }
`
