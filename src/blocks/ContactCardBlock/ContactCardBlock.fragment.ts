import { gql } from 'graphql-request'
export const CONTACT_CARD_BLOCK_FRAGMENT = gql`
  fragment ContactCardBlockFragment on ContactCardBlockRecord {
    id
    _modelApiKey
    id
    name
    phone
    email
    description(markdown: true)
  }
`
