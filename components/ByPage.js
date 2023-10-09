import { addAllPost, selectPost, selectUpdateTime, setUpdateTime, selectStoreTime, setStoreTime} from '@/public/src/features/postSlice';
import axios from 'axios';
import React, { useEffect, useState, useRef } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import Post from './Post'
import SearchRegex from './SearchRegex';
import LoadingCircle from './LoadingCircle';
import ContentNotLoading from './ContentNotLoading';
import Link from 'next/link';
import { FaArrowUp } from 'react-icons/fa';

const ByPage = (/*{tagId}*/) => {
  //const SEARCH = tagId?"/tag/"+tagId:"";
  const observerTarget = useRef(null);
  const [page,setPage] = useState(0);
  const [pagesCount,setPagesCount] = useState(0);

useEffect(() => {
  const observer = new IntersectionObserver(
    entries => {
      if (entries[0].isIntersecting) {
        setPage(prevPage => prevPage + 1)
      }
    },
    { threshold: 1 }
  );

  if (observerTarget.current) {
    observer.observe(observerTarget.current);
  }

  return () => {
    if (observerTarget.current) {
      observer.unobserve(observerTarget.current);
    }
  };
}, [observerTarget]);

  const [fetchFailure, setfetchFailure] = useState(false)
  //const POSTS_API_ENDPOINT=`${process.env.NEXT_PUBLIC_PAGE_BASEURL}api/v1/posts${SEARCH}`;
  const POSTS_API_ENDPOINT=`${process.env.NEXT_PUBLIC_PAGE_BASEURL}api/v1/posts/page/${page}`;
  const [loading, setloading] = useState(false);
  const dispatch = useDispatch();
  const posts = useSelector(selectPost);
  {/*global posts update timer*/}
  const storeUpdateTime = useSelector(selectStoreTime);
  {/*current posts update timer*/}
  const localUpdateTime = useSelector(selectUpdateTime);

  async function getData() {
    setloading(true);
    try {
      const response = await axios.get(POSTS_API_ENDPOINT);
      console.log(response)
      console.log(page);
      setPagesCount(response.data.size);
      return response.data.posts;
    }
    catch(error){
      console.log("Error: "+error.message);
      setfetchFailure(true);
      return null;
    }
    finally {
      setloading(false);
    }
  }
  useEffect(() => {
    console.log(posts.length)
    if (posts.length==0|posts.length<=pagesCount)
    fetchData();
  }, [page])
  
  const fetchData = async () =>{
    const res = await getData();
        if(res!=null){
        dispatch(addAllPost(res));
        dispatch(setUpdateTime(storeUpdateTime));
        }
        if(fetchFailure){setfetchFailure(false);}
  };
    
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
      {loading&&(<LoadingCircle className="text-center absolute top-1/2 left-1/2 m-auto"/>)}
      {/*While posts fetched*/}
      {posts?.map((post, index) =>
        (<Post post={post} key={post.id} postIndex={index}/>))}
      {/*While data fetch failure*/}
      {fetchFailure&&(<ContentNotLoading/>)}
      {loading&&(<LoadingCircle className="text-center pl-10  pt-16 m-auto"/>)}
      <div ref={observerTarget} className='h-1'></div>
    </div>
    
  )
}

export default ByPage