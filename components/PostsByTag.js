import { addAllPost, selectPost} from '@/public/src/features/postSlice';
import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import Post from './Post'
import SearchRegex from './SearchRegex';
import LoadingCircle from './LoadingCircle';
import ContentNotLoading from './ContentNotLoading';
import Link from 'next/link';
import { FaArrowUp } from 'react-icons/fa';

const PostsByTag = ({tagId}) => {
  const tag = tagId;
  const POSTS_BY_TAG_API_ENDPOINT=`${process.env.NEXT_PUBLIC_PAGE_BASEURL}api/v1/posts/tag/${tag}`;
  const [loading, setloading] = useState(false);
  const [fetchFailure, setfetchFailure] = useState(false)
  const [posts, setposts] = useState(null);

  const fetchData = async () =>{
    setloading(true);
    await axios.get(POSTS_BY_TAG_API_ENDPOINT)
    .then((response)=>{
      setposts(response.data)
      if (fetchFailure) setfetchFailure(false);
      setloading(false)
    }).catch((error)=>{
      console.log(error);
      setfetchFailure(true);
      setloading(false)
    })
  }

    useEffect(()=>{
      if (posts==null&&tag!=null&&!loading)
        fetchData()
    },[tag]);
  return (
    
    <div>
      <div className='absolute top-0 hidden' id="home"></div>
      <div className='bg-white rounded-md flex justify-between text-xs md:text-md pl-3 h-10 items-center mt-6'>
        <div className='hidden md:inline-flex  font-semibold text-lg'>Most recent Posts on Tag {tagId}</div>
        <div className='lg:hidden'><SearchRegex/></div>
        {/*Go to TOP arrow button*/}
        <button className="fixed md:right-1/3 z-50 bottom-0 right-0 p-5 m-5">
          <Link className='scroll-smooth ' href={"/#home"}>
            <FaArrowUp className='md:h-14 text-gray-800 md:w-10 w-8 h-12' />
          </Link>   
        </button>
      </div>
      {/*While data fetching*/}
      {loading&&(<LoadingCircle className="text-center absolute top-1/2 left-1/2 m-auto"/>)}
      {/*While posts fetched*/}
      {posts?.map((post, index) =>
        (<Post post={post} key={post.id} postIndex={index}/>))}
      {/*While data fetch failure*/}
      {fetchFailure&&(<ContentNotLoading/>)}
    </div>
    
  )
}

export default PostsByTag