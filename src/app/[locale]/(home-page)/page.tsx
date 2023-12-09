import { ExampleClientComponent } from '@/components/ExampleClientComponent'
import { LanguageToggle } from '@/components/LanguageToggle'

export default function Home({
  params: { locale },
}: {
  params: { locale: string }
}) {
  // Hello Husky 3: Oopsie I forgot is-ci

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <h1 className="text-5xl font-bold">Home Page</h1>
      <ExampleClientComponent />
      <LanguageToggle />
      <p className="text-xl">Locale: {locale}</p>
    </main>
  )
}
