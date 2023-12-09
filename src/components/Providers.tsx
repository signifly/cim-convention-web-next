// import { ThemeProvider } from '@/components/ThemeProvider'

type ProviderProps = {
    children: React.ReactNode
    params: { locale: string }
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
