import React from 'react'
import Posts from './Posts';
import BottomOfThePage from './BottomOfThePage';
import ByPage from './ByPage';

const Feed=
 ({tagId}) => {
  return (
    <div className='flex-grow h-screen pt-6 mr-6 ml-6 overflow-y-auto no-scrollbar'>
        <div className='mx-auto max-w-md md:max-w-xl lg:max-w-2xl'>
            {/*Create Post Box
            <CreatePost newPost={newPost} setnewPost={setnewPost}/>
            Post*/}
            {/*<Posts tagId={tagId} />*/}
            <ByPage/>
            <BottomOfThePage/>
        </div>
    </div>
  )
}

export default Feed;
