export function HeroBlock(props: any) {
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
