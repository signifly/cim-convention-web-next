import { unstable_setRequestLocale } from 'next-intl/server'
import { ComponentParser, fetchDatoContent } from '@/lib/datocms'
import { getPageBySlugQuery } from '@/lib/datocms/queries/getPageBySlugQuery'
import { locales, Locale } from '@/middleware'
import { notFound } from 'next/navigation'

export type PageProps = {
    params: {
        locale: Locale
        slug: string[]
    }
}

export default async function Home({
    params: { slug, locale },
}: {
    params: { slug: string; locale: string }
}) {
    unstable_setRequestLocale(locale)
    if (!locales.includes(locale as any)) notFound()

    const { data: pageData } = await fetchDatoContent(
        getPageBySlugQuery({
            locale: locale,
            slug: slug[0],
        }),
    )

    return (
        <main className="flex min-h-screen flex-col items-center justify-between p-24">
            <h1 className="text-5xl font-bold">Page: {slug}</h1>
            <p className="text-xl">Locale: {locale}</p>
            {pageData?.page?.body?.map((block: any) => (
                <ComponentParser key={block.id} data={block} />
            ))}
        </main>
    )
}
