import Head from 'next/head'
import Header from '@/containers/Header'
import LeftSidebar from '@/containers/LeftSidebar'
import { getSession } from 'next-auth/react'
import Feed from '@/containers/Feed'
import RightSideBar from '@/containers/RightSideBar'
import { useRouter } from 'next/router'
import PostsByTag from '@/components/PostsByTag'


export default function Home() {
  const router = useRouter()
  const tagId = router?.query.tagId;
  return (
    <>
      <Head>
        <title>Recent posts about {tagId}</title>
        <meta name="description" content="Simple blog app with sb and nextjs" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/resources/icon.png" />
      </Head>
      <Header/>
      {tagId &&(
      <main className='flex bg-gray-100 '>
        <LeftSidebar/>
        <Feed>
          <PostsByTag tagId={tagId}/>
        </Feed>
        <RightSideBar/>
       
      </main>)}
    </>
  )
}

export async function getServerSideProps(context){
  const session = await getSession(context);
  return {
    props: {session,},
  }
}