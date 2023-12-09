import { Config } from 'next-i18n-router/dist/types'

const i18nConfig: Config = {
    locales: ['en', 'fr'],
    defaultLocale: 'en',
}

export type Locale = (typeof i18nConfig.locales)[number]

export default i18nConfig
