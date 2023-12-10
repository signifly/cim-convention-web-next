import { ReactNode } from 'react'
import { HeroBlock } from '@/blocks/HeroBlock/HeroBlock'
import { DefaultHeaderBlock } from '@/blocks/DefaultHeaderBlock/DefaultHeaderBlock'

export type ComponentsMap = {
    [key: string]: ReactNode
}

export const componentsMap = {
    hero_block: HeroBlock,
    default_header_block: DefaultHeaderBlock,
}
