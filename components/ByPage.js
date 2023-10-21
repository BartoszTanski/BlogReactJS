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
import { BsThreeDotsVertical } from 'react-icons/bs';

const ByPage = () => {
  const observerTarget = useRef(null);
  const [startPoint, setStartPoint] = useState(0);
  const [pullChange, setPullChange] = useState();
  const refreshCont = useRef(0);
  useEffect(() => {
    window.addEventListener("touchstart", pullStart);
    window.addEventListener("touchmove", pull);
    window.addEventListener("touchend", endPull);
    return () => {
      window.removeEventListener("touchstart", pullStart);
      window.removeEventListener("touchmove", pull);
      window.removeEventListener("touchend", endPull);
    };
  });

  const initLoading = () => {
    setreloading(true);
    setTimeout(() => {
      window.location.reload();
    }, 1000);
  };
  const pullStart = (e) => {
    const { screenY } = e.targetTouches[0];
    setStartPoint(screenY);
  };
  const pull = (e) => {
    const touch = e.targetTouches[0];
    const { screenY } = touch;
    let pullLength = startPoint < screenY ? Math.abs(screenY - startPoint) : 0;
    setPullChange(pullLength);
  };
  const endPull = (e) => {
    setStartPoint(0);
    setPullChange(0);
    if (pullChange > 280) initLoading();
  };
  

useEffect(() => {
  const observer = new IntersectionObserver(
    entries => {
      if (entries[0].isIntersecting) {
          if (!loading)
          setPage(prevPage => prevPage+1)
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

  const posts = useSelector(selectPost);
  const POSTS_IN_PAGE = 2;
  const [page,setPage] = useState(posts?.length==0?0:Math.ceil(posts?.length/POSTS_IN_PAGE-1));
  const [pagesCount,setPagesCount] = useState(null);
  const [fetchFailure, setfetchFailure] = useState(false)
  const POSTS_API_ENDPOINT=`${process.env.NEXT_PUBLIC_PAGE_BASEURL}api/v1/posts/page/${page}`;
  const [loading, setloading] = useState(false);
  const [reloading, setreloading] = useState(false);
  const dispatch = useDispatch();

  useEffect(() => {
    if (loading) return;
    // If we dont have any post || have less pages than in db || dont know how many pages are in db
    if (posts.length==0||posts.length+POSTS_IN_PAGE<=pagesCount*POSTS_IN_PAGE||pagesCount==null)
      fetchData();
  }, [page])
  
  const fetchData = async () =>{
    const res = await getData();
        if (res!=null) {
          dispatch(addAllPost(res));
        }
  }
  async function getData() {
    setloading(true);
    if (fetchFailure) setfetchFailure(false);   
    try {
      const response = await axios.get(POSTS_API_ENDPOINT);
      setPagesCount(response.data.size);
      return response.data.posts;
    } 
    catch(error){
      console.log(error);
      console.log(error.response?.data);
      setfetchFailure(true);
      return null;
    }
    finally {
      setloading(false);
    }
  }
    
  return (
    
    <div>
      <div className='absolute top-0 hidden' id="home"></div>
      <div className='bg-white rounded-md flex justify-between text-xs md:text-md pl-3 h-10 items-center mt-6'>
        <div id="first-section" className='hidden md:inline-flex  font-semibold text-lg'>Most recent Posts</div>
        <div id="second-section" className='lg:hidden'><SearchRegex/></div>
        {/*Go to TOP arrow button*/}
        <button className="fixed md:right-1/3 z-50 bottom-0 right-0 p-5 m-5">
          <Link className='scroll-smooth ' href={"/#home"}>
            <FaArrowUp className='md:h-14 text-gray-800 md:w-10 w-8 h-12' />
          </Link>   
        </button>
      </div>
      <div
        ref={refreshCont}
        className="refresh-container w-fit -mt-10 m-auto"
        style={{ marginTop: pullChange / 3.118 -40 || "",
        visibility: pullChange?"visible":"hidden" }}
      >
        <div className="refresh-icon text-gray-800 p-2 rounded-full">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="w-6 h-6"
            style={{ transform: `rotate(${pullChange}deg)` }}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0l3.181 3.183a8.25 8.25 0 0013.803-3.7M4.031 9.865a8.25 8.25 0 0113.803-3.7l3.181 3.182m0-4.991v4.99"
            />
          </svg>
        </div>
      </div>
      {reloading&&(<LoadingCircle className="text-center absolute  left-0 right-0  z-50  py-12 m-auto"/>)}
      {/*If posts fetched*/}
      {posts?.map((post, index) =>
        (<Post post={post} key={post.id} postIndex={index}/>))}
      {/*If data fetching*/}
      {loading&&(<LoadingCircle className="text-center  py-16 m-auto"/>)}
      {/*If data fetch failure*/}
      {fetchFailure&&(<ContentNotLoading reload = {()=>fetchData()}/>)}
      <div ref={observerTarget} className='h-1'></div>
    </div>
    
  )
}

export default ByPage