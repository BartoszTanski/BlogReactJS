import React from 'react'
import BottomOfThePage from '../components/BottomOfThePage';
import PostsByPage from '../components/PostsByPage';

const Feed=({ children }) => {
  return (
    <div className='flex-grow h-screen pt-6 mr-6 ml-6 overflow-y-auto no-scrollbar'>
        <div className='mx-auto max-w-md md:max-w-xl lg:max-w-2xl'>
            {children}
            <BottomOfThePage/>
        </div>
    </div>
  )
}

export default Feed;
