import { unstable_setRequestLocale } from 'next-intl/server'
import { getPageBySlugQuery } from '@/lib/datocms/queries/getPageBySlugQuery'
import { ComponentParser, fetchDatoContent } from '@/lib/datocms'
import { locales } from '@/middleware'
import { notFound } from 'next/navigation'

import { getTranslations } from 'next-intl/server'

export default async function Home({
    params: { locale },
}: {
    params: { locale: string }
}) {
    unstable_setRequestLocale(locale)
    if (!locales.includes(locale as any)) notFound()

    const t = await getTranslations('Index')
    const { data: pageData } = await fetchDatoContent(
        getPageBySlugQuery({
            locale: locale,
            slug: '',
            isHomePage: true,
        }),
    )

    return (
        <main className="flex min-h-screen flex-col items-center justify-between p-24">
            <h1 className="text-5xl font-bold">Home Page</h1>
            <p className="text-xl">{t('title')}</p>
            <p className="text-xl">Locale: {locale}</p>
            {pageData?.homePage?.body?.map((block: any) => (
                <ComponentParser key={block.id} data={block} />
            ))}
        </main>
    )
}
