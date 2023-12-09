import createMiddleware from 'next-intl/middleware'

export const locales = ['en', 'fr']
export const defaultLocale = 'en'

export default createMiddleware({
    locales,
    defaultLocale,
})

export const config = {
    // Match only internationalized pathnames
    matcher: ['/', '/(en|fr)/:path*'],
}
