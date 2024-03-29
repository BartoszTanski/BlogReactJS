import { addAllPost, selectPost} from '@/public/src/features/postSlice';
import axios from 'axios';
import React, { useEffect, useState, useRef, useCallback } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import Post from './Post'
import SearchRegex from './SearchRegex';
import LoadingCircle from './pageControlls/LoadingCircle';
import ContentNotLoading from './pageControlls/ContentNotLoading';
import { GoToTopArrow } from './pageControlls/GoToTopArrow';
import { useSession } from 'next-auth/react';

const PostsByPage = () => {
  const observerTarget = useRef(null);
  const posts = useSelector(selectPost);
  const BASE_URL =`${process.env.NEXT_PUBLIC_PAGE_BASEURL}api/v1/posts/page/`;
  const POSTS_IN_PAGE = 3;
  const [page,setPage] = useState(posts?.length==0?0:Math.ceil(posts?.length/POSTS_IN_PAGE));
  const [pagesCount,setPagesCount] = useState(null);
  const [fetchFailure, setfetchFailure] = useState(false)
  const [loading, setloading] = useState(false);
  const dispatch = useDispatch();
  const {data: session} = useSession();

  useEffect(() => {
    const observer = new IntersectionObserver(
      entries => {
        if (entries[0].isIntersecting&&!loading&&(pagesCount==null||pagesCount>page)) {
          //console.log("trying, "+ pagesCount+">"+page)
          setloading(true);
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
  }, [observerTarget, pagesCount, page]);

  useEffect(() => {
    if (posts.length==0||page<pagesCount||pagesCount==null)
      fetchData();
  }, [loading,page,pagesCount])

  const fetchData = useCallback(async () => {
    if (!loading) return;
    if (fetchFailure) setfetchFailure(false);   
    try {
      await axios.get(BASE_URL+page+"?size="+POSTS_IN_PAGE)
      .then((res) => {
        dispatch(addAllPost(res.data.posts));
        //console.log(page);
        setPagesCount(res.data.size);
        setPage(prev => prev +1);
      })
    } 
    catch (error) {
      console.log(error);
      setfetchFailure(true);
    } 
    finally {
      setloading(false);
      //console.log("executed")
    };
  }, [loading]);
    
  return (
    
    <div>
      <div className='absolute top-0 hidden' id="home"></div>
      <div className='bg-white rounded-md flex justify-between text-xs md:text-md pl-3 h-10 items-center mt-6'>
        <div className='hidden md:inline-flex  font-semibold text-lg'>Most recent Posts</div>
        <SearchRegex className='lg:hidden'/>
        {/*Go to TOP arrow button*/}
        <GoToTopArrow/>
      </div>      
      {/*If posts fetched*/}
      {posts?.map((post, index) =>
        (<Post post={post} key={index} postIndex={index}/>))}
      {/*If data fetching*/}
      {loading&&(<LoadingCircle className="text-center py-16 m-auto"/>)}
      {/*If data fetch failure*/}
      {fetchFailure&&(<ContentNotLoading reload = {()=>setloading(true)}/>)}
      <div ref={observerTarget} className=''></div>
    </div>
    
  )
}

export default PostsByPage