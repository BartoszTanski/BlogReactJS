import Head from 'next/head'
import Header from '@/containers/Header'
import Videos from '@/components/shortVideos/Videos'


export default function videos() {
  return (
    <>
      <Head>
        <title>Videos</title>
        <meta name="description" content="Simple blog app with sb and nextjs" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/resources/icon.png" />
      </Head>
      <Header/>
      <main className='flex flex-grow justify-center h-screen bg-black '>
        <Videos/> 
      </main>
    </>
  )
}