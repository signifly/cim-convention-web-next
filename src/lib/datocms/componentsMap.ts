import { ReactNode } from 'react'
import { HeroBlock } from '@/blocks/HeroBlock/HeroBlock'
import { DefaultFooterBlock } from '@/blocks/DefaultFooterBlock/DefaultFooterBlock'
import { DefaultHeaderBlock } from '@/blocks/DefaultHeaderBlock/DefaultHeaderBlock'
import { AnnouncementBannerBlock } from '@/blocks/AnnouncementBannerBlock/AnnouncementBannerBlock'
import { TwoColumnWithImageBlock } from '@/blocks/TwoColumnWithImageBlock/TwoColumnWithImageBlock'
import { AdBannerBlock } from '@/blocks/AdBannerBlock/AdBannerBlock'
import { AdThreeColumnBlock } from '@/blocks/AdThreeColumnBlock/AdThreeColumnBlock'
import { CtaBlock } from '@/blocks/CtaBlock/CtaBlock'
import { DividerBlock } from '@/blocks/DividerBlock/DividerBlock'
import { CardsContainerBlock } from '@/blocks/CardsContainerBlock/CardsContainerBlock'
import { CardBlock } from '@/blocks/CardBlock/CardBlock'
import { TestimonialsBlock } from '@/blocks/TestimonialsBlock/TestimonialsBlock'
import { PageHeaderBlock } from '@/blocks/PageHeaderBlock/PageHeaderBlock'
import { StatisticsBlock } from '@/blocks/StatisticsBlock/StatisticsBlock'

export type ComponentsMap = {
  [key: string]: ReactNode
}

export const componentsMap = {
  hero_block: HeroBlock,
  default_header_block: DefaultHeaderBlock,
  announcement_banner_block: AnnouncementBannerBlock,
  two_column_with_image_block: TwoColumnWithImageBlock,
  ad_banner_block: AdBannerBlock,
  default_footer_block: DefaultFooterBlock,
  ad_three_column_block: AdThreeColumnBlock,
  cta_block: CtaBlock,
  divider_block: DividerBlock,
  cards_container_block: CardsContainerBlock,
  card_block: CardBlock,
  testimonials_block: TestimonialsBlock,
  page_header_block: PageHeaderBlock,
  statistics_block: StatisticsBlock,
}
