import { addAllPost, selectPost, selectUpdateTime, setUpdateTime, selectStoreTime, setStoreTime} from '@/public/src/features/postSlice';
import axios from 'axios';
import React, { useEffect,useRef, useState } from 'react'
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
  const firstSection = useRef(0)
  const dispatch = useDispatch();
  const posts = useSelector(selectPost);
  const storeUpdateTime = useSelector(selectStoreTime);
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
        ;
      };
      fetchData();}
    },[]);
  return (
    
    <div>
      <div className='bg-white rounded-md flex justify-between text-xs md:text-md pl-3 h-10 items-center mt-6'>
        <div id="first-section" className='hidden md:inline-flex  font-semibold text-lg'>Posts</div>
        <div id="second-section" className='lg:hidden'><SearchRegex/></div>
        {/* <div className='pr-3 flex bg-gray-200 space-x-2 hover:bg-gray-300 cursor-pointer rounded-lg flex-row w-20 m-1 text-sm pt-1'>
          <div className='w-5 px-2'>
          <FiFilter size={18} className="mx-auto"/>
          </div>
          <p>Filters</p>
        </div>  TO DO*/} 
         <button className="fixed md:right-1/3 z-50 bottom-0 right-0 p-5 m-5">
          <Link className='scroll-smooth ' href={"/#first-section"}>
            <FaArrowUp className='md:h-14 text-gray-800 md:w-10 w-8 h-12' />
          </Link>   
        </button>
      </div>
      {posts.map((post, index) =>
        (<Post post={post} key={post.id} postIndex={index}/>))}
        {loading&&(<LoadingCircle/>)}
        {fetchFailure&&(<ContentNotLoading/>
          )}
    </div>
    
  )
}

export default Posts