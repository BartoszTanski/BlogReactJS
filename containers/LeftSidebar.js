import React from 'react'
import { useSession } from 'next-auth/react'
import AdTest from '../staticContainers/AdTest'



const LeftSidebar = () => {
  return (
    <div className='hidden lg:inline-flex flex-col py-2 pl-2 max-w-[250px] px-2 rounded-md md:min-w-[200px] lg:min-w-[250px]'> 
        <AdTest/>
    </div>
  )
}

export default LeftSidebar