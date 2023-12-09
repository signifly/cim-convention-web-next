export default function Home({
  params: { locale },
}: {
  params: { locale: string }
}) {
  //test changes with husky

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <h1 className="text-5xl font-bold">Home Page</h1>
      <p className="text-xl">Locale: {locale}</p>
    </main>
  )
}
