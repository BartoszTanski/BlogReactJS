import React from 'react'
import Header from '@/containers/Header';
import LeftSidebar from '@/containers/LeftSidebar';
import RightSideBar from '@/containers/RightSideBar';
import Login from '@/components/Login';
import { getSession } from 'next-auth/react';
import Head from 'next/head';
import EditPost from '@/components/EditPost';
import { useRouter } from 'next/router';

export default function Edit ({session}) {
  const router = useRouter();
   if(!session) return <Login/>
   const postId = router.query.postId;
  return (
    <>
     <Head>
        <title>Post Editor</title>
        <meta name="description" content="Creating new posts form" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/resources/icon.png" />
      </Head>
   <div>
      <Header/>
    <main className='flex bg-gray-100 '>
      {/* Left Sidebar */}
      <LeftSidebar/> 
        <div className='flex-grow h-screen pt-6 mr-6 ml-6 overflow-y-auto no-scrollbar'>
          <div className='mx-auto max-w-md md:max-w-xl lg:max-w-2xl'>
          <EditPost postId={postId}/>
          </div>
        </div>
      <RightSideBar/>
    </main>
    </div>
  </>
  )
}

export async function getServerSideProps(context){
  const session = await getSession(context);
  return {
    props: {session,},
  }
}