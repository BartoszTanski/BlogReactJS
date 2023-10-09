import React from 'react'
import Releases from './Releases';
import { useState, useEffect } from 'react';
import axios from 'axios';
import LoadingCircle from './LoadingCircle';
import ContentNotLoading from './ContentNotLoading';
import { useDispatch, useSelector } from 'react-redux';
import { addTopPosts, selectTop } from '@/public/src/features/postSlice';

const RightSideBar = () => {
    const [loading, setloading] = useState(false)
    const [releases, setReleases] = useState(useSelector(selectTop))
    const [fetchFailure, setfetchFailure] = useState(false)
    const TOP_POSTS_API_ENDPOINT=`${process.env.NEXT_PUBLIC_PAGE_BASEURL}api/v1/posts/top`;
    const dispatch = useDispatch();

    async function getData () {
      setloading(true);
      try {
      const response = await axios.get(TOP_POSTS_API_ENDPOINT)
        setReleases(response.data);
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
    <div className='hidden lg:inline-flex my-2 bg-gray-50 flex-col max-w-[250px] pt-4 px-2 rounded-md md:min-w-[200px] lg:min-w-[250px]'>
        <div className='flex items-center text-gray-500'>
            <p className='flex text-2xl pb-1 text-gray-700 font-semibold flex-grow'>Top posts this week:</p>
        </div>
        {loading&&(<LoadingCircle className="text-center py-24 m-auto pl-14"/>)}
        {fetchFailure&&(<ContentNotLoading/>
          )}
        {/*here releases*/}
        {releases !=null &&(
        <div className='py-1 pr-2 overflow-y-auto no-scrollbar h-5/6'>
          <div> 
            {releases.filter((v,i,a)=>a.findIndex(v2=>(v2.id===v.id))===i).sort((a, b) => a.likes > b.likes ? -1 : 1).map((release) =>
          (<Releases release={release} key={release.id}/>))}
          <div className='h-[20rem]'></div>
          </div>
        </div>)}
    </div>
  )
}

export default RightSideBar