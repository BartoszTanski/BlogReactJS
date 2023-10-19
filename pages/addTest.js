import Head from 'next/head'
import Header from '@/components/Header'
import Sidebar from '@/components/Sidebar'
import { getSession } from 'next-auth/react'
import Feed from '@/components/Feed'
import RightSideBar from '@/components/RightSideBar'
import { useRouter } from 'next/router'


export default function AddTest({session}) {
  const router = useRouter()
  return (
    <>
      <Head>
        <title>Blog Bartosz</title>
        <meta name="description" content="Simple blog app with sb and nextjs" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/resources/icon.png" />
        <script async src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-9210340803689418"
     crossOrigin="anonymous"></script>
      </Head>
      <Header></Header>
      <main className='flex bg-gray-100 '>
        {/* Left Sidebar */}
        <Sidebar></Sidebar>
        {/* Feed Create Post and Posts */}
        <Feed></Feed>
        {/* Right Sidebar */}
        <RightSideBar/>
       
      </main>
    </>
  )
}

export async function getServerSideProps(context){
  const session = await getSession(context);
  return {
    props: {session,},
  }
}