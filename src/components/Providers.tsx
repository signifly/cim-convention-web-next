// import { ThemeProvider } from '@/components/ThemeProvider'
import { locales } from '@/middleware'

type ProviderProps = {
  children: React.ReactNode
  params: { locale: (typeof locales)[number] }
}

export async function Providers({ children, params }: ProviderProps) {
  //TODO: fetch i18n messages from Dato instead

  return (
    <>
      {/* <ThemeProvider> */}
      {children}
      {/* </ThemeProvider> */}
    </>
  )
}
