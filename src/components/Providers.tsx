import { Locale } from '@/i18nConfig'
import ClientIntlProvider from './ClientIntlProvider'
import getIntl from '@/messages/getIntl'
// import { ThemeProvider } from '@/components/ThemeProvider'

type ProviderProps = {
  children: React.ReactNode
  params: { locale: Locale }
}

export async function Providers({ children, params }: ProviderProps) {
  //TODO: fetch i18n messages from Dato instead
  const intl = await getIntl(params.locale)

  return (
    <>
      {/* <ThemeProvider> */}
      <ClientIntlProvider messages={intl.messages} locale={params.locale}>
        {children}
      </ClientIntlProvider>
      {/* </ThemeProvider> */}
    </>
  )
}
