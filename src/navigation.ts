import {
    createLocalizedPathnamesNavigation,
    Pathnames,
} from 'next-intl/navigation'

export const locales = ['en', 'fr'] as const
export const localePrefix = 'as-needed'
export const defaultLocale = 'en'
export type Locale = (typeof locales)[number]

export const pathnames = {
    '/': '/',
    '/[locale]': '/[locale]',
} satisfies Pathnames<typeof locales>

export const { Link, redirect, usePathname, useRouter } =
    createLocalizedPathnamesNavigation({ locales, localePrefix, pathnames })
