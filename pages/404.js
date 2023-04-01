import React from 'react'
import Link from 'next/link'

const NotFoundPage = () => {
   
  return (
    <div className="flex flex-col bg-gray-900 overflow-hidden items-center justify-center h-screen">
        <div className='items-center justify-center'>
            <div className='text-center font-bold text-7xl text-white'>404</div>
            <div className=' text-5xl font-semibold text-white '>Page not Found :(</div>
             <Link href={{
                  pathname: "/",
                  }} >
              <div className=' h-16 mt-8 min-w-fit text-white text-bold text-2xl text-center items-center bg-blue-600 rounded-2xl p-4'>
              <div className=''>
                  Back to Homepage
              </div>
            </div>
            </Link>
       </div>
        
    </div>
  )
}

export default NotFoundPage