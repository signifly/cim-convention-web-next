import {
  createLocalizedPathnamesNavigation,
  Pathnames,
} from 'next-intl/navigation'

// @todo: enable fr locale for Monday launch
export const locales =
  process.env.ENABLE_I18N === 'true'
    ? (['en', 'fr'] as const)
    : (['en'] as const)
export const dynamicPathSegments = ['course']

export const localePrefix = 'as-needed'
export const defaultLocale = 'en'
export type Locale = (typeof locales)[number]

export const pathnames = {
  '/': '/',
  '/[locale]': '/[locale]',
  '/[locale]/[...slug]': '/[locale]/[...slug]',
  '/[...slug]': '/[...slug]',

  '[locale]/course/[slug]':
    process.env.ENABLE_I18N === 'true'
      ? {
          en: '/course/[slug]',
          // @todo: enable fr locale for Monday launch
          fr: '/cours/[slug]',
        }
      : '/course/[slug]',
} satisfies Pathnames<typeof locales> & Record<string & {}, string | {}>

export const { Link, redirect, usePathname, useRouter } =
  createLocalizedPathnamesNavigation({
    locales,
    localePrefix,
    pathnames: pathnames as typeof pathnames & Record<string & {}, string>,
  })
