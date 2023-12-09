/* This is the IntlProvider component that wraps the client
 * components and provides the translations to them. */
'use client'

import { IntlProvider, MessageFormatElement } from 'react-intl'
import { ReactNode } from 'react'

export default function ClientIntlProvider({
  messages,
  locale,
  children,
}: {
  messages: Record<string, MessageFormatElement[]> | Record<string, string>
  locale: string
  children: ReactNode
}) {
  return (
    <IntlProvider messages={messages} locale={locale}>
      {children}
    </IntlProvider>
  )
}
