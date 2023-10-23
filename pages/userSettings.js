import Head from 'next/head'
import Login from '@/components/Login'
import Header from '@/containers/Header'
import { getSession } from 'next-auth/react'
import { FiMoreHorizontal } from 'react-icons/fi';

export default function Home({session}) {

  if(!session) return <Login/>
  return (
    <>
      <Head>
        <title>Blog Bartosz</title>
        <meta name="description" content="Simple blog app with sb and nextjs" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/resources/icon.png" />
      </Head>
      <Header/>
      <main className='flex h-screen bg-gray-100 '>
        <div className='flex-grow h-full pt-10 mr-6 ml-6 overflow-y-auto no-scrollbar'>
            <div className='mx-auto max-w-md h-5/6 bg-white rounded-md p-3 md:max-w-2xl lg:max-w-3xl'>
               <div className='flex p-1'>
                    <div className='flex flex-col flex-grow justify-center '>
                        <p className='font-semibold text-center p-3 text-4xl'>User Settings</p>
                        <div className='p-2 flex flex-row justify-center lg:text-lg text-sm font-semibold'>
                            <style>{`
                              .myowncss table{
                                font-family: arial, sans-serif;
                                border-collapse: collapse;
                                width: 100%;
                                padding: 5px;
                              }
                              .myowncss tr{
                              }
                              .myowncss tr:nth-child(even) {
                                background-color: #dddddd;
                              }
                              .myowncss td{ 
                                  text-align:left;
                                  padding: 5px;
                                  border: 1px solid #dddddd;
                              }`}
                            </style>
                            <table className="myowncss">
                              <tr>
                                <td>Username:</td>
                                <td>{session.user.name}</td>
                                <td className='hover:text-rose-900'><FiMoreHorizontal/></td>
                              </tr>
                              <tr>
                                <td>Email:</td>
                                <td>{session.user.email}</td>
                                <td className='hover:text-rose-900'><FiMoreHorizontal/></td>
                              </tr>
                              <tr>
                                <td>Password:</td>
                                <td>*********</td>
                                <td className='hover:text-rose-900'><FiMoreHorizontal/></td>
                              </tr>
                            </table>
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