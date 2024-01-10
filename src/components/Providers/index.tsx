// import { ThemeProvider } from '@/components/ThemeProvider'
import { NextIntlClientProvider, useMessages } from 'next-intl'

type ProviderProps = {
  children: React.ReactNode
  params: { locale: string }
}

export function Providers({ children }: ProviderProps) {
  const messages = useMessages()
  //@TODO: fetch i18n messages from Dato instead

  return (
    <>
      {/* <ThemeProvider> */}
      {/* <NextIntlClientProvider messages={messages}> */}
      {children}
      {/* </ThemeProvider> */}
      {/* </NextIntlClientProvider> */}
    </>
  )
}
