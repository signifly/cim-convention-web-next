import { gql } from 'graphql-request'
import { HERO_BLOCK_FRAGMENT } from '@/blocks/HeroBlock/HeroBlock.fragment'
// import { RESPONSIVE_IMAGE_FRAGMENT } from '../fragments/responsiveImage'
import { locales, defaultLocale, Locale } from '@/middleware'

type Params = {
    locale: Locale
    slug: string
    isHomePage?: boolean
}

export const getPageBySlugQuery = ({
    locale,
    slug,
    isHomePage,
}: Params): string => {
    const l = locales.includes(locale) ? locale : defaultLocale

    const queryType = isHomePage ? 'homePage' : 'page'
    const filter = isHomePage ? '' : `filter: { slug: { eq: "${slug}" } }`

    return gql`
    ${HERO_BLOCK_FRAGMENT}

      query PageQuery {
        _site {
            favicon {
                alt
                url
            }
        }

        ${queryType}(locale: ${l} ${filter}) {
            _seoMetaTags {
                attributes
                tag
                content
            }
            body {
                ...HeroBlockFragment
            }
        }
      }
`
}
