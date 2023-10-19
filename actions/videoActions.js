import React from 'react'
import axios from 'axios';

// export const getVideo = (id) => {
//     const VIDEO_API_ENDPOINT=`${process.env.NEXT_PUBLIC_PAGE_BASEURL}api/v1/video/stream/`;
//     console.log("works get" + id);
// }
export const deleteVideo = async (id) => {
    const DELETE_VIDEO_API_ENDPOINT =`${process.env.NEXT_PUBLIC_PAGE_BASEURL}api/v1/video/${id}`;
    await axios.delete(DELETE_VIDEO_API_ENDPOINT,{
      headers:{
        Accept:"application/json" 
      },})
    .then((response)=>{
        console.log("Video deleted");
        //return true;
    })
    .catch((error)=>{
        console.log(error);
        //return false;
    })
}

