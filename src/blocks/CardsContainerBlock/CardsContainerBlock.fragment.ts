import { gql } from 'graphql-request'
export const CARDS_CONTAINER_BLOCK_FRAGMENT = gql`
  fragment CardsContainerBlockFragment on CardsContainerBlockRecord {
    id
    _modelApiKey
    anchorId
    title
    background
    mobileLayout
    cards {
      ...CardBlockFragment
    }
  }
`
