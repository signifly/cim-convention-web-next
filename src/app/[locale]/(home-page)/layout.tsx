import React from 'react'

import { Header } from '@/blocks/Header/Header'
import { Footer } from '@/blocks/Footer/Footer'
import { Locale } from '@/navigation'
import { ComponentParser, fetchDatoContent } from '@/lib/datocms'
import { getPageBySlugQuery } from '@/lib/datocms/queries/getPageBySlugQuery'

export default async function HomePageLayout({
    children,
    params: { locale },
}: {
    children: React.ReactNode
    params: { locale: Locale }
}) {
    const { data: pageData } = await fetchDatoContent(
        getPageBySlugQuery({
            locale: locale,
            slug: '',
            isHomePage: true,
        }),
    )

    return (
        <>
            {pageData?.homePage?.header.map((block: any) => (
                <ComponentParser key={block.id} data={block} />
            ))}
            {children}
            <Footer />
        </>
    )
}
