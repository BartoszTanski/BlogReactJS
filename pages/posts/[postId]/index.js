import SinglePost from '@/components/SinglePost';
import { useRouter } from 'next/router'
import React from 'react'
import Header from '@/containers/Header';
import LeftSidebar from '@/containers/LeftSidebar';
import RightSideBar from '@/containers/RightSideBar';
import { getSession } from 'next-auth/react';
import Head from 'next/head';

export default function Index ({session}) {
  const router = useRouter();
    const postId = router.query.postId;
    const postIndex = router.query.postIndex;
  return (
    <>
     <Head>
        <title>Blog Bartosz Tański</title>
        <meta name="description" content="Simple blog app with sb and nextjs" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/resources/icon.png" />
      </Head>
   {postId !=null &&(<div>
      <Header/>
    <main className='flex bg-gray-100 '>
      <LeftSidebar/> 
        <div className='flex-grow h-screen pt-6 mr-6 ml-6 overflow-y-auto no-scrollbar'>
          <div className='mx-auto max-w-md md:max-w-xl lg:max-w-2xl'>
          <SinglePost postId={postId} postIndex={postIndex}/>
          </div>
        </div>
      <RightSideBar/>
    </main>
    </div>)}
  </>
  )
}

export async function getServerSideProps(context){
  const session = await getSession(context);
  return {
    props: {session,},
  }
}