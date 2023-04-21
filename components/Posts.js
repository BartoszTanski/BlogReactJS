import { addAllPost, selectPost, selectUpdateTime, setUpdateTime, selectStoreTime, setStoreTime} from '@/public/src/features/postSlice';
import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import Post from './Post'
import SearchRegex from './SearchRegex';
import LoadingCircle from './LoadingCircle';
import ContentNotLoading from './ContentNotLoading';
import Link from 'next/link';
import { FaArrowUp } from 'react-icons/fa';

const Posts = ({tagId}) => {
  const SEARCH = tagId?"/tag/"+tagId:"";
  const [fetchFailure, setfetchFailure] = useState(false)
  const POSTS_API_ENDPOINT=`${process.env.NEXT_PUBLIC_PAGE_BASEURL}api/v1/posts${SEARCH}`;
  const [loading, setloading] = useState(false);
  const dispatch = useDispatch();
  const posts = useSelector(selectPost);
  {/*global posts update timer*/}
  const storeUpdateTime = useSelector(selectStoreTime);
  {/*current posts update timer*/}
  const localUpdateTime = useSelector(selectUpdateTime);

    useEffect(()=>{
      if(posts.length == 0 || localUpdateTime!=storeUpdateTime || tagId!==undefined){
      const fetchData = async () =>{
        setloading(true);
        const response = await axios.get(POSTS_API_ENDPOINT)
        .then((response)=>{
          dispatch(addAllPost(response.data));
          dispatch(setUpdateTime(storeUpdateTime));
          if(tagId!==undefined){dispatch(setStoreTime(1));}
          if(fetchFailure){setfetchFailure(false);}
          setloading(false)
        }).catch((error)=>{
          console.log(error);
          setfetchFailure(true);
          setloading(false)
        })
      };
      fetchData();}
    },[]);
  return (
    
    <div>
      <div className='bg-white rounded-md flex justify-between text-xs md:text-md pl-3 h-10 items-center mt-6'>
        <div id="first-section" className='hidden md:inline-flex  font-semibold text-lg'>Most recent Posts</div>
        <div id="second-section" className='lg:hidden'><SearchRegex/></div>
        {/*Go to TOP arrow button*/}
        <button className="fixed md:right-1/3 z-50 bottom-0 right-0 p-5 m-5">
          <Link className='scroll-smooth ' href={"/#first-section"}>
            <FaArrowUp className='md:h-14 text-gray-800 md:w-10 w-8 h-12' />
          </Link>   
        </button>
      </div>
      {/*While data fetching*/}
      {loading&&(<LoadingCircle/>)}
      {/*While posts fetched*/}
      {posts?.map((post, index) =>
        (<Post post={post} key={post.id} postIndex={index}/>))}
      {/*While data fetch failure*/}
      {fetchFailure&&(<ContentNotLoading/>)}
    </div>
    
  )
}

export default Posts