import Head from 'next/head'
import Header from '@/containers/Header'
import PrivacyPolicy from '@/staticContainers/PrivacyPolicy'

export default function Home() {
  return (
    <>
      <Head>
        <title>Blog Bartosz</title>
        <meta name="description" content="Simple blog app with sb and nextjs" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/resources/icon.png" />
      </Head>
      <Header/>
      <main className='flex bg-gray-100 '>
        <PrivacyPolicy/>   
      </main>
    </>
  )
}