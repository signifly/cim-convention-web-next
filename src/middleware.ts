import createMiddleware from 'next-intl/middleware'

export const locales = ['en', 'fr']
export const defaultLocale = 'en'

export default createMiddleware({
	locales,
	defaultLocale,
})

export const config = {
	matcher: ['/', '/(fr|en)/:path*'],
}
