import Head from 'next/head'
import Header from '@/components/Header'
import Sidebar from '@/components/Sidebar'
import { getSession } from 'next-auth/react'
import Feed from '@/components/Feed'
import RightSideBar from '@/components/RightSideBar'
//import { useRouter } from 'next/router'
import Videos from '@/components/shortVideos/Videos'


export default function videos({session}) {
  //const router = useRouter()
  return (
    <>
      <Head>
        <title>Videos</title>
        <meta name="description" content="Simple blog app with sb and nextjs" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/icon.png" />

      </Head>
      <Header></Header>
      <main className='flex flex-grow justify-center h-screen bg-black '>

       <Videos/> 

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