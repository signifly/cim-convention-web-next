import { HeroBlockRecord } from '@/types/generated'

export function HeroBlock(props: HeroBlockRecord) {
    const { emphasizedText, restOfHeadline } = props

    return (
        <div>
            <h1>
                <span>{emphasizedText}</span>
                {restOfHeadline}
                <button className="bg-brand-gradient">Button</button>
            </h1>
        </div>
    )
}
