import React from 'react'
import Release from './Release';
import { useState, useEffect } from 'react';
import axios from 'axios';
import LoadingCircle from './pageControlls/LoadingCircle';
import ContentNotLoading from './pageControlls/ContentNotLoading';
import { useDispatch, useSelector } from 'react-redux';
import { addTopPosts, selectTopPosts } from '@/public/src/features/postSlice';

const TopPosts = () => {
    const [loading, setloading] = useState(false)
    const [fetchFailure, setfetchFailure] = useState(false)
    const TOP_POSTS_API_ENDPOINT=`${process.env.NEXT_PUBLIC_PAGE_BASEURL}api/v1/posts/top`;
    const releases = useSelector(selectTopPosts);
    const dispatch = useDispatch();

    async function getData () {
      setloading(true);
      if(fetchFailure) setfetchFailure(false);
      try {
      const response = await axios.get(TOP_POSTS_API_ENDPOINT)
        dispatch(addTopPosts(response.data));
      } 
      catch(error) {
        console.log("Data Fetch Error: "+error);
        setfetchFailure(true);
      }
      finally {
        setloading(false);
      }
    }
    useEffect(()=>{
        if (releases.length>0) return;
        if (loading) return;
        getData();
      },[]);

  return (
    <div>
        <div className='flex items-center text-gray-500'>
            <p className='flex text-2xl pb-1 text-gray-700 font-semibold flex-grow'>Top posts this week:</p>
        </div>
        {loading&&(<LoadingCircle className="text-center relative  left-0 top-1/4 right-0  z-50 m-auto"/>)}
        {fetchFailure&&(<ContentNotLoading reload={()=>getData()}/>
          )}
        {/*here releases*/}
        {releases !=null &&(
        <div className='py-1 pr-2 overflow-y-auto no-scrollbar h-5/6'>
          <div> 
            {releases.filter((v,i,a)=>a.findIndex(v2=>(v2.id===v.id))===i).sort((a, b) => a.likes > b.likes ? -1 : 1).map((release) =>
          (<Release release={release} key={release.id}/>))}
          <div className='h-[20rem]'></div>
          </div>
        </div>)}
    </div>
  )
}

export default TopPosts