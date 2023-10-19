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

const ByPage = (/*{tagId}*/) => {
  //const SEARCH = tagId?"/tag/"+tagId:"";
  const observerTarget = useRef(null);
  const [page,setPage] = useState(0);
  const [pagesCount,setPagesCount] = useState(0);

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
    /**
     * get the current user touch event data
     */
    const touch = e.targetTouches[0];
    /**
     * get the touch position on the screen's Y axis
     */
    const { screenY } = touch;
    /**
     * The length of the pull
     *
     * if the start touch position is lesser than the current touch position, calculate the difference, which gives the `pullLength`
     *
     * This tells us how much the user has pulled
     */
    let pullLength = startPoint < screenY ? Math.abs(screenY - startPoint) : 0;
    setPullChange(pullLength);
    console.log({ screenY, startPoint, pullLength, pullChange });
  };
  const endPull = (e) => {
    setStartPoint(0);
    setPullChange(0);
    if (pullChange > 280) initLoading();
  };
  const loads = {
    color: "black",
    backgroundColor: "DodgerBlue",
    padding: "10px",
    fontFamily: "Arial",
    visibility: "visible"

  };
  
  

useEffect(() => {
  const observer = new IntersectionObserver(
    entries => {
      if (entries[0].isIntersecting) {
        if(page<pagesCount||page==0)
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
  const [reloading, setreloading] = useState(false);
  const dispatch = useDispatch();
  const posts = useSelector(selectPost);


  async function getData() {
    if (loading) return;
    setloading(true);   
    try {
      const response = await axios.get(POSTS_API_ENDPOINT);
      console.log(response)
      console.log("Current page loaded: "+page);
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
    if (loading) return;
    console.log("posts in db: " +pagesCount)
    if (posts.length==0|posts.length+2<=pagesCount*2)
    fetchData();
  }, [page])
  
  const fetchData = async () =>{
    const res = await getData();
        if(res!=null){
        dispatch(addAllPost(res));;
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
      {/*While posts fetched*/}
      {posts?.map((post, index) =>
        (<Post post={post} key={post.id} postIndex={index}/>))}
      {/*While data fetching*/}
      {loading&&(<LoadingCircle className="text-center  pt-16 m-auto"/>)}
      {/*While data fetch failure*/}
      {fetchFailure&&(<ContentNotLoading/>)}
      <div ref={observerTarget} className='h-1'></div>
    </div>
    
  )
}

export default ByPage