import { gql } from 'graphql-request'
export const CONTACT_BLOCK_FRAGMENT = gql`
  fragment ContactBlockFragment on ContactBlockRecord {
    id
    _modelApiKey
    subtitle
    title
    cards {
      ...ContactCardBlockFragment
    }
  }
`
