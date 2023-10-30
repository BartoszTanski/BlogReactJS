import React from 'react'
import axios from 'axios';
import { useSession } from 'next-auth/react';

// export const getVideo = (id) => {
//     const VIDEO_API_ENDPOINT=`${process.env.NEXT_PUBLIC_PAGE_BASEURL}api/v1/video/stream/`;
//     console.log("works get" + id);
// }
export const deleteVideo = async ({session,id}) => {
    const DELETE_VIDEO_API_ENDPOINT =`${process.env.NEXT_PUBLIC_PAGE_BASEURL}api/v1/video/${id}`;
    if (id==null) return;
    await axios.delete(DELETE_VIDEO_API_ENDPOINT,{
      headers:{
        Accept:"application/json",
        Authorization: session.backend_token,
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

