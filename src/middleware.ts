import createMiddleware from 'next-intl/middleware'

export const locales = ['en', 'fr']
export const defaultLocale = 'en'
export type Locale = (typeof locales)[number]

export default createMiddleware({
    locales,
    defaultLocale,
    localePrefix: 'as-needed',
})

export const config = {
    // Match only internationalized pathnames
    matcher: ['/((?!api|_next|_ipx|.*\\..*).*)'],
}
