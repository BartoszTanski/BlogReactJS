import Head from 'next/head'
import Login from '@/components/Login'
import Header from '@/components/Header'
import { getSession } from 'next-auth/react'

export default function Home({session}) {
  if(!session) return <Login/>
  return (
    <>
      <Head>
        <title>Blog Bartosz</title>
        <meta name="description" content="Simple blog app with sb and nextjs" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/icon.png" />
      </Head>
      <Header></Header>
      <main className='flex h-screen bg-gray-100 '>
        <div className='flex-grow h-full pt-10 mr-6 ml-6 overflow-y-auto no-scrollbar'>
            <div className='mx-auto max-w-md h-5/6 bg-white rounded-md p-3 md:max-w-2xl lg:max-w-3xl'>
               <div className='flex p-1'>
                    <div className='flex flex-col flex-grow justify-center '>
                        <p className='font-semibold text-center p-3 text-4xl'>User Settings</p>
                        <div className='p-2 flex flex-row justify-center text-lg font-semibold'>
                            <div className='pr-4 md:pr-20'>
                                <p>Email: </p>
                                <p>Username: </p>
                                <p>To Delete your user data - contact:</p>
                            </div>
                            <div>
                                <p>Some email</p>
                                <p>Some username</p>
                                <p>b.t4nsky@gmail.com</p>
                            </div>
                        </div>
                    </div>
               </div>
            </div>
        </div>
       
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