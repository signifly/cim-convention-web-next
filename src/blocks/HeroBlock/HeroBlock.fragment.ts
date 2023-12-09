import { gql } from 'graphql-request'

export const HERO_BLOCK_FRAGMENT = gql`
    fragment HeroBlockFragment on HeroBlockRecord {
        id
        _modelApiKey
        emphasizedText
        restOfHeadline
    }
`
