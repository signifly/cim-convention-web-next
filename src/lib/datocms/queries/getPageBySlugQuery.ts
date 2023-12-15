import { gql } from 'graphql-request'
import { locales, defaultLocale, Locale } from '@/navigation'

import { HERO_BLOCK_FRAGMENT } from '@/blocks/HeroBlock/HeroBlock.fragment'
import { DEFAULT_FOOTER_BLOCK_FRAGMENT } from '@/blocks/DefaultFooterBlock/DefaultFooterBlock.fragment'
import { DEFAULT_HEADER_BLOCK_FRAGMENT } from '@/blocks/DefaultHeaderBlock/DefaultHeaderBlock.fragment'
import { ANNOUNCEMENT_BANNER_BLOCK_FRAGMENT } from '@/blocks/AnnouncementBannerBlock/AnnouncementBannerBlock.fragment'
import { TWO_COLUMN_WITH_IMAGE_BLOCK_FRAGMENT } from '@/blocks/TwoColumnWithImageBlock/TwoColumnWithImageBlock.fragment'
import { AD_BANNER_BLOCK_FRAGMENT } from '@/blocks/AdBannerBlock/AdBannerBlock.fragment'
import { AD_THREE_COLUMN_BLOCK_FRAGMENT } from '@/blocks/AdThreeColumnBlock/AdThreeColumnBlock.fragment'
import { CTA_BLOCK_FRAGMENT } from '@/blocks/CtaBlock/CtaBlock.fragment'
import { DIVIDER_BLOCK_FRAGMENT } from '@/blocks/DividerBlock/DividerBlock.fragment'
import { TESTIMONIALS_BLOCK_FRAGMENT } from '@/blocks/TestimonialsBlock/TestimonialsBlock.fragment'

import { RESPONSIVE_IMAGE_FRAGMENT } from '../fragments/responsiveImage'
import { CTA_BUTTON_FRAGMENT } from '../fragments/ctaButton'
import { CARDS_CONTAINER_BLOCK_FRAGMENT } from '@/blocks/CardsContainerBlock/CardsContainerBlock.fragment'
import { CARD_BLOCK_FRAGMENT } from '@/blocks/CardBlock/CardBlock.fragment'

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
		${TWO_COLUMN_WITH_IMAGE_BLOCK_FRAGMENT}
		${AD_BANNER_BLOCK_FRAGMENT}
		${AD_THREE_COLUMN_BLOCK_FRAGMENT}
		${CTA_BLOCK_FRAGMENT}
		${DIVIDER_BLOCK_FRAGMENT}
		${CARDS_CONTAINER_BLOCK_FRAGMENT}
		${CARD_BLOCK_FRAGMENT}
		${TESTIMONIALS_BLOCK_FRAGMENT}
		${DEFAULT_FOOTER_BLOCK_FRAGMENT}
		${DEFAULT_HEADER_BLOCK_FRAGMENT}
		${ANNOUNCEMENT_BANNER_BLOCK_FRAGMENT}

		${RESPONSIVE_IMAGE_FRAGMENT}
		${CTA_BUTTON_FRAGMENT}

      query PageQuery {
        _site {
            favicon {
                alt
                url
            }
        }

        ${queryType} (locale: ${l} ${filter}) {
            _seoMetaTags {
                attributes
                tag
                content
            }
            header {
              blocks {
                ...DefaultHeaderBlockFragment
							  ...AnnouncementBannerBlockFragment
              }
            }
            body {
                ...HeroBlockFragment
								...TwoColumnWithImageBlockFragment
								...AdBannerBlockFragment
								...AdThreeColumnBlockFragment
								...CtaBlockFragment
								...DividerBlockFragment
								...CardsContainerBlockFragment
								...TestimonialsBlockFragment
            }
            footer {
              blocks {
                ...DefaultFooterBlockFragment
              }
            }
        }

        socialLink {
          facebook
          instagram
          linkedin
          twitter
          youtube
        }
      }
`
}
