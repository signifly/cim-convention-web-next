import { ReactNode } from 'react'
import { HeroBlock } from '@/blocks/HeroBlock/HeroBlock'

export type ComponentsMap = {
    [key: string]: ReactNode
}

export const componentsMap = {
    hero_block: HeroBlock,
}
