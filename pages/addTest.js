import Head from 'next/head'
import Header from '@/containers/Header'
import LeftSidebar from '@/containers/LeftSidebar'
import { getSession } from 'next-auth/react'
import Feed from '@/containers/Feed'
import RightSideBar from '@/containers/RightSideBar'
import { useRouter } from 'next/router'
import PostsByPage from '@/components/PostsByPage'


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
      <Header/>
      <main className='flex bg-gray-100 '>
        {/* Left Sidebar */}
        <LeftSidebar/>
        {/* Feed Create Post and Posts */}
        <Feed>
          <PostsByPage/>
        </Feed>
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