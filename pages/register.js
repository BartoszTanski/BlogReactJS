import Head from 'next/head'
import Header from '@/containers/Header'
import Register from '@/components/Register'

export default function Registration() {
  return (
    <>
      <Head>
        <title>Register</title>
        <meta name="description" content="Simple blog app with sb and nextjs" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/resources/icon.png" />
      </Head>
      <Header/>
      <main className='flex h-screen justify-center items-stretch  bg-gray-100 '>
        <Register/>
      </main>
    </>
  )
}