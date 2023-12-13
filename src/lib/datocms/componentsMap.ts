import { ReactNode } from 'react'
import { HeroBlock } from '@/blocks/HeroBlock/HeroBlock'
import { DefaultHeaderBlock } from '@/blocks/DefaultHeaderBlock/DefaultHeaderBlock'
import { AnnouncementBannerBlock } from '@/blocks/AnnouncementBannerBlock/AnnouncementBannerBlock'
import { TwoColumnWithImageBlock } from '@/blocks/TwoColumnWithImageBlock/TwoColumnWithImageBlock'
import { AdBannerBlock } from '@/blocks/AdBannerBlock/AdBannerBlock'
import { AdThreeColumnBlock } from '@/blocks/AdThreeColumnBlock/AdThreeColumnBlock'

export type ComponentsMap = {
  [key: string]: ReactNode
}

export const componentsMap = {
  hero_block: HeroBlock,
  default_header_block: DefaultHeaderBlock,
  announcement_banner_block: AnnouncementBannerBlock,
  two_column_with_image_block: TwoColumnWithImageBlock,
  ad_banner_block: AdBannerBlock,
  ad_three_column_block: AdThreeColumnBlock,
}
