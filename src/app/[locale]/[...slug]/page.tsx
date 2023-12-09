import { unstable_setRequestLocale } from 'next-intl/server'
import { Locale } from '@/middleware'

export type PageProps = {
    params: {
        locale: Locale
        slug: string[]
    }
}

export default function Home({
    params: { slug, locale },
}: {
    params: { slug: string; locale: string }
}) {
    unstable_setRequestLocale(locale)

    return (
        <main className="flex min-h-screen flex-col items-center justify-between p-24">
            <h1 className="text-5xl font-bold">Page: {slug}</h1>
            <p className="text-xl">Locale: {locale}</p>
        </main>
    )
}
