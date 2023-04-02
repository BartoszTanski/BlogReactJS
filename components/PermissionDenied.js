import React from 'react'
import Link from 'next/link'
import { useSession } from 'next-auth/react';


const PermissionDenied = () => {
  const {data: session} = useSession();
  return (
    <div className='flex flex-col justify-center items-center mx-auto min-h-screen text-center bg-gray-100'>
    <div className=' h-1/6 w-2/5 text-white text-bold text-3xl bg-red-600 rounded-3xl p-4'>Permission denied!
    <div className=' text-lg'>User: {session?.user.email} doesn&apos;t have permission to add new posts</div></div>
    <div className=' h-14 w-56  mt-3 justify-center text-white text-bold text-xl bg-blue-600 rounded-2xl p-4'>
        <Link href={{
            pathname: "/",
            
            }} >
        <div>
            Back to Homepage
        </div>
        </Link>
    </div>
    </div>
  )
}

export default PermissionDenied