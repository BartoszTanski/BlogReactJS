import { addAllPost, selectPost} from '@/public/src/features/postSlice';
import axios from 'axios';
import React, { useEffect, useState, useRef } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import Post from './Post'
import SearchRegex from './SearchRegex';
import LoadingCircle from './LoadingCircle';
import ContentNotLoading from './ContentNotLoading';
import { GoToTopArrow } from './GoToTopArrow';

const PostsByPage = ({className}) => {
  const observerTarget = useRef(null);
  const byPageRef = useRef(null);
  const posts = useSelector(selectPost);
  const POSTS_IN_PAGE = 3;
  const [page,setPage] = useState(posts?.length==0?0:Math.ceil(posts?.length/POSTS_IN_PAGE-1));
  const [pagesCount,setPagesCount] = useState(null);
  const [fetchFailure, setfetchFailure] = useState(false)
  const POSTS_API_ENDPOINT=`${process.env.NEXT_PUBLIC_PAGE_BASEURL}api/v1/posts/page/${page+"?size="+POSTS_IN_PAGE}`;
  const [loading, setloading] = useState(false);
  const dispatch = useDispatch();

  useEffect(() => {
    const observer = new IntersectionObserver(
      entries => {
        if (entries[0].isIntersecting) {
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
  
  const fetchData = async () => {
    if (loading) return;
    setloading(true);
    if (fetchFailure) setfetchFailure(false);   
    try {
      const response = await axios.get(POSTS_API_ENDPOINT);
      console.log(POSTS_API_ENDPOINT)
      dispatch(addAllPost(response.data.posts));
      console.log(response.data.posts.length)
      setPagesCount(response.data.size);
      console.log("fetched" + page)
    } 
    catch(error){
      console.log(error);
      console.log(error.response?.data);
      setfetchFailure(true);
    }
    finally {
      setloading(false);
    }
  }

  useEffect(() => {
    if (posts?.length==0||page<pagesCount||pagesCount==null) //pagesCount is null after reload
      fetchData();
    else console.log("not fetching bcs page = " + page+" a pages count = " + pagesCount)
  }, [page])
    
  return (
    
    <div ref = {byPageRef}>
      <div className='absolute top-0 hidden' id="home"></div>
      <div className='bg-white rounded-md flex justify-between text-xs md:text-md pl-3 h-10 items-center mt-6'>
        <div className='hidden md:inline-flex  font-semibold text-lg'>Most recent Posts</div>
        <SearchRegex className='lg:hidden'/>
        {/*Go to TOP arrow button*/}
        <GoToTopArrow/>
      </div>      
      {/*If posts fetched*/}
      {posts&&(
        <div>
          {posts.map((post, index) =>(<Post post={post} key={post.index} postIndex={index}/>))}
          <div ref={observerTarget} className='h-1'></div>
        </div>
        )}
      {/*If data fetching*/}
      {loading&&(<LoadingCircle className="text-center py-16 m-auto"/>)}
      {/*If data fetch failure*/}
      {fetchFailure&&(<ContentNotLoading reload = {()=>fetchData()}/>)}
    </div>
    
  )
}

export default PostsByPage