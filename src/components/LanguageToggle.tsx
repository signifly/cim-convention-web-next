'use client'

import { useRouter, usePathname } from 'next/navigation'
import { useCurrentLocale } from 'next-i18n-router/client'
import i18nConfig from '@/i18nConfig'
import { cn } from '@/utils/clsxMerge'

export function LanguageToggle(
  props: React.ComponentPropsWithoutRef<'button'>,
) {
  const router = useRouter()
  const currentPathname = usePathname()
  const currentLocale = useCurrentLocale(i18nConfig)

  const handleClick = () => {
    const newLocale = currentLocale === 'en' ? 'fr' : 'en'

    // set cookie for next-i18n-router
    const days = 30
    const date = new Date()
    date.setTime(date.getTime() + days * 24 * 60 * 60 * 1000)
    const expires = `expires=${date.toUTCString()}`
    document.cookie = `NEXT_LOCALE=${newLocale};${expires};path=/`

    if (
      currentLocale === i18nConfig.defaultLocale &&
      !i18nConfig.prefixDefault
    ) {
      router.push('/' + newLocale + currentPathname)
    } else {
      router.push(currentPathname.replace(`/${currentLocale}`, `/${newLocale}`))
    }

    router.refresh()
  }

  return (
    <button
      onClick={handleClick}
      {...props}
      className={cn(
        'font-bold tracking-tight text-zinc-800 dark:text-zinc-100',
        props.className,
      )}
    >
      {currentLocale === 'en' ? 'Français' : 'English'}
    </button>
  )
}
