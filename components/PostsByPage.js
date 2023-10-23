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

  useEffect(() => {
    const observer = new IntersectionObserver(
      entries => {
        if (entries[0].isIntersecting) {
          if (!loading){
            setPage(prevPage => prevPage+1)
          }
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
  const dispatch = useDispatch();

  useEffect(() => {
    if (loading) return;
    // If we dont have any post || have less pages than in db || dont know how many pages are in db
    if (posts.length==0||posts.length+POSTS_IN_PAGE<=pagesCount*POSTS_IN_PAGE||pagesCount==null)
      fetchData();
    // If we have posts && have the same count of pages that in db && know how many pages are in db
    if (posts.length!=0&&posts.length+POSTS_IN_PAGE>pagesCount*POSTS_IN_PAGE&&pagesCount!=null){
        if(byPageRef.current.lastChild == (observerTarget.current))
          byPageRef.current.removeChild((observerTarget.current));
    }
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
    
    <div ref = {byPageRef}>
      <div className='absolute top-0 hidden' id="home"></div>
      <div className='bg-white rounded-md flex justify-between text-xs md:text-md pl-3 h-10 items-center mt-6'>
        <div className='hidden md:inline-flex  font-semibold text-lg'>Most recent Posts</div>
        <SearchRegex className='lg:hidden'/>
        {/*Go to TOP arrow button*/}
        <GoToTopArrow/>
      </div>      
      {/*If posts fetched*/}
      {posts?.map((post, index) =>
        (<Post post={post} key={post.id} postIndex={index}/>))}
      {/*If data fetching*/}
      {loading&&(<LoadingCircle className="text-center py-16 m-auto"/>)}
      {/*If data fetch failure*/}
      {fetchFailure&&(<ContentNotLoading reload = {()=>fetchData()}/>)}
      <div ref={observerTarget} className='h-1'></div>
    </div>
    
  )
}

export default PostsByPage