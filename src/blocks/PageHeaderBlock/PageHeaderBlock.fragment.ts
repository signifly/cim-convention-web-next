import { gql } from 'graphql-request'

export const PAGE_HEADER_BLOCK_FRAGMENT = gql`
  fragment PageHeaderBlockFragment on PageHeaderBlockRecord {
    id
    _modelApiKey
    title
    subTitle
  }
`
