import React from 'react'
import TopPosts from '../components/TopPosts';

const RightSideBar = () => {
  return (
    <div className='hidden lg:inline-flex my-2 bg-gray-50 flex-col max-w-[250px] pt-4 px-2 rounded-md md:min-w-[200px] lg:min-w-[250px]'>
      <TopPosts/>
    </div>
  )
}

export default RightSideBar