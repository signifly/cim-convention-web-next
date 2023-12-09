import { unstable_setRequestLocale } from 'next-intl/server'
import { useTranslations } from 'next-intl'
import { locales } from '@/middleware'

export default function Home({
  params: { slug, locale },
}: {
		params: { slug: string, locale: (typeof locales)[number] }
}) {
	console.log(slug, locale)
  unstable_setRequestLocale(locale)
  const t = useTranslations('Index')

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      {t('title')} {slug}
    </main>
  )
}
