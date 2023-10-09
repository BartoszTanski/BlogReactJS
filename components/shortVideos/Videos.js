import React, { useState, useEffect} from 'react'
import LoadingCircle from '../LoadingCircle';
import ContentNotLoading from '../ContentNotLoading';
import axios from 'axios';


const Videos = () => {

const [videos, setVideos] = useState(null);
const [videoNumber,setVideoNumber] = useState(0);
const [fetchFailure, setfetchFailure] = useState(false)
const [loading, setloading] = useState(false);
const VIDEOS_LIST_API_ENDPOINT = `${process.env.NEXT_PUBLIC_PAGE_BASEURL}api/v1/videos/`;
const VIDEO_API_ENDPOINT = `${process.env.NEXT_PUBLIC_PAGE_BASEURL}api/v1/video/stream/`;

const fetchData = async () =>{
    setloading(true);
    const response = await axios.get(VIDEOS_LIST_API_ENDPOINT)
    .then((response)=>{
      console.log(response)
      setVideos(response.data);
      if(fetchFailure){setfetchFailure(false);}
      setloading(false)
    }).catch((error)=>{
      console.log(error);
      setfetchFailure(true);
      setloading(false)
    })
};

const nextVideo = () => {
  if(videoNumber+2>videos.length) return;
  setVideoNumber(prevState => prevState+1);
}
const prevVideo = () => {
  if (videoNumber>0) {
  setVideoNumber(prevState => prevState-1);
  }
}
// if (typeof document !== 'undefined') {
// {document.querySelector('#video1').on('loadstart', function (event) {
//   document.querySelector(this).addClass('background');
//   document.querySelector(this).attr("poster", "/your/loading.gif");
// });

// document.querySelector('#video1').on('canplay', function (event) {
//   document.querySelector(this).removeClass('background');
//   document.querySelector(this).removeAttr("poster");
// });}
// }

useEffect(()=>{
  if(videos==null){
  fetchData();}
},[]);

  return (
    <div>
        <div>
              <div className=' flex flex-grow p-3 mt-10 w-full justify-center '>
                  <div className=' flex border-4 2xl:h-[34rem] 2xl:w-[60rem] lg:h-[28,5rem] lg:w-[50rem] h-[10,5rem] w-[20rem]  justify-center border-black bg-black'>
                  {videos!=null&&(<video id="video1" key={videoNumber} poster='loading.gif' className='rounded-sm bg-black' alt="Video"  controls>
                     <source src={VIDEO_API_ENDPOINT+videos[videoNumber]}></source>
                  </video>)}
                  </div>
              </div>
              <div className='flex justify-center items-center space-x-8 '>
                <button
                className='p-4 rounded-xl bg-red-600 font-semibold hover:bg-red-800 '
                onClick={()=>prevVideo()}>Previous Video</button>
                <p className='py-3 px-5 font-bold text-xl rounded-xl bg-neutral-400'>{videoNumber}</p>
                <button
                className='p-4 bg-red-600 rounded-xl font-semibold hover:bg-red-800'
                onClick={()=>nextVideo()}>Next Video</button>
              </div>
              
              {loading&&(<LoadingCircle className="text-center absolute top-1/2 left-1/2 m-auto"/>)}
              {/*While posts fetched*/}
              {/*While data fetch failure*/}
              {fetchFailure&&(<ContentNotLoading/>)}
        </div>
    </div>
  )
}

export default Videos
