import { gql } from 'graphql-request'

export const TWO_COLUMN_WITH_IMAGE_BLOCK_FRAGMENT = gql`
  fragment TwoColumnWithImageBlockFragment on TwoColumnWithImageBlockRecord {
    id
    _modelApiKey
    anchorId
  }
`
