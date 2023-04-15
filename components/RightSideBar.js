import React from 'react'
import Releases from './Releases';
import { useState, useEffect } from 'react';
import axios from 'axios';
import DialogBox from './DialogBox';
import LoadingCircle from './LoadingCircle';

const RightSideBar = () => {
    var message = "Couldn't retrive posts data. Please contact us if this problem reoccurs"
    var messageHead = "Sorry something went wrong :("
    const handleSucces = (e) => {
      setfetchFailure(false);
    }
    const [loading, setloading] = useState(false)
    const [fetchFailure, setfetchFailure] = useState(false)
    const TOP_POSTS_API_ENDPOINT=`${process.env.NEXT_PUBLIC_PAGE_BASEURL}api/v1/posts/top`;
    const [releases, setReleases] = useState(null);
    useEffect(()=>{
        const fetchData = () =>{
          setloading(true);
          axios.get(TOP_POSTS_API_ENDPOINT)
          .then((response)=>{
            setReleases(response.data);
          }).catch((error)=>{
            console.log(error);
            setfetchFailure(true);
          }).finally(setloading(false));
        };
        fetchData();
      },[]);
  return (
    <div className='hidden lg:inline-flex my-2 bg-gray-50 flex-col max-w-[250px] pt-4 px-2 rounded-md md:min-w-[200px] lg:min-w-[250px]'>
        <div className='flex items-center text-gray-500'>
            <p className='flex text-2xl pb-1 text-gray-700 font-semibold flex-grow'>Top posts this week:</p>
        </div>
        {loading&&(<LoadingCircle/>)}

        {/*here releases*/}
        {releases !=null &&(
        <div className='py-1 pr-2 overflow-y-auto no-scrollbar h-4/6'>
        {releases.filter((v,i,a)=>a.findIndex(v2=>(v2.id===v.id))===i).sort((a, b) => a.likes > b.likes ? -1 : 1).map((release) =>
        (<Releases release={release} key={release.id}/>))}
        </div>)}
        <div className='h-60'></div>
        {fetchFailure &&(<DialogBox messageHead={messageHead} message={message} handleSucces={handleSucces}/>)}
    </div>
  )
}

export default RightSideBar