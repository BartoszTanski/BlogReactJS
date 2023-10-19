import Head from 'next/head'
import Header from '@/components/Header'
import { getSession } from 'next-auth/react'
import { useRouter } from 'next/router'
import AboutMeMore from '@/staticContainers/AboutMeMore'


export default function Home({session}) {
  const router = useRouter()
  //if(!session) return <Login/>
  const tagId = router.query.tagId;
  return (
    <>
      <Head>
        <title>Blog Bartosz</title>
        <meta name="description" content="Simple blog app with sb and nextjs" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/resources/icon.png" />
      </Head>
      <Header></Header>
     
      <main className='flex bg-gray-100 '>
        {/* Left Sidebar */}
        {/* Feed Create Post and Posts */}
        <AboutMeMore/>
        {/* Right Sidebar */}
       
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