import React from 'react'
import CreatePost from './CreatePost';
import Posts from './Posts';
import { useState } from 'react';
import BottomOfThePage from './BottomOfThePage';

const Feed=
 ({tagId, key}) => {
  const [newPost, setnewPost] = useState(false);
  return (
    <div className='flex-grow h-screen pt-6 mr-6 ml-6 overflow-y-auto no-scrollbar'>
        <div className='mx-auto max-w-md md:max-w-xl lg:max-w-2xl'>
            {/*Create Post Box
            <CreatePost newPost={newPost} setnewPost={setnewPost}/>
            Post*/}
            <Posts tagId={tagId} setnewPost={setnewPost} />
            <BottomOfThePage/>
        </div>
    </div>
  )
}

export default Feed;
