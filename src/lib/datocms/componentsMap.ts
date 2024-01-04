import { ReactNode } from 'react'
import { HeroBlock } from '@/blocks/HeroBlock/HeroBlock'
import { DefaultFooterBlock } from '@/blocks/DefaultFooterBlock/DefaultFooterBlock'
import { DefaultHeaderBlock } from '@/blocks/DefaultHeaderBlock/DefaultHeaderBlock'
import { AnnouncementBannerBlock } from '@/blocks/AnnouncementBannerBlock/AnnouncementBannerBlock'
import { TwoColumnWithImageBlock } from '@/blocks/TwoColumnWithImageBlock/TwoColumnWithImageBlock'
import { AdBlock } from '@/blocks/AdBlock/AdBlock'
import { AdBannerBlock } from '@/blocks/AdBannerBlock/AdBannerBlock'
import { AdThreeColumnBlock } from '@/blocks/AdThreeColumnBlock/AdThreeColumnBlock'
import { CtaBlock } from '@/blocks/CtaBlock/CtaBlock'
import { DividerBlock } from '@/blocks/DividerBlock/DividerBlock'
import { CardsContainerBlock } from '@/blocks/CardsContainerBlock/CardsContainerBlock'
import { CardBlock } from '@/blocks/CardBlock/CardBlock'
import { TestimonialsBlock } from '@/blocks/TestimonialsBlock/TestimonialsBlock'
import { VideoBlock } from '@/blocks/VideoBlock/VideoBlock'
import { PageHeaderBlock } from '@/blocks/PageHeaderBlock/PageHeaderBlock'
import { PastConventionsBlock } from '@/blocks/PastConventionsBlock/PastConventionsBlock'
import { ConventionBlock } from '@/blocks/ConventionBlock/ConventionBlock'
import { StatisticsBlock } from '@/blocks/StatisticsBlock/StatisticsBlock'
import { FormBlock } from '@/blocks/FormBlock/FormBlock'
import { AccordionBlock } from '@/blocks/AccordionBlock/AccordionBlock'
import { OneColumnTextBlock } from '@/blocks/OneColumnTextBlock/OneColumnTextBlock'
import { SponsorListBlock } from '@/blocks/SponsorListBlock/SponsorListBlock'
import { ContactBlock } from '@/blocks/ContactBlock/ContactBlock'
import { ContactCardBlock } from '@/blocks/ContactCardBlock/ContactCardBlock'

export type ComponentsMap = {
  [key: string]: ReactNode
}

export const componentsMap = {
  hero_block: HeroBlock,
  default_header_block: DefaultHeaderBlock,
  announcement_banner_block: AnnouncementBannerBlock,
  two_column_with_image_block: TwoColumnWithImageBlock,
  ad_block: AdBlock,
  ad_banner_block: AdBannerBlock,
  default_footer_block: DefaultFooterBlock,
  ad_three_column_block: AdThreeColumnBlock,
  cta_block: CtaBlock,
  divider_block: DividerBlock,
  cards_container_block: CardsContainerBlock,
  card_block: CardBlock,
  testimonials_block: TestimonialsBlock,
  video_block: VideoBlock,
  page_header_block: PageHeaderBlock,
  past_conventions_block: PastConventionsBlock,
  convention_block: ConventionBlock,
  statistics_block: StatisticsBlock,
  form_block: FormBlock,
  accordion_block: AccordionBlock,
  one_column_text_block: OneColumnTextBlock,
  sponsor_list_block: SponsorListBlock,
  contact_block: ContactBlock,
  contact_card_block: ContactCardBlock,
}
