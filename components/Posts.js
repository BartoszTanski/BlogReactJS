import { addAllPost, selectPost } from '@/public/src/features/postSlice';
import axios from 'axios';
import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import {FiFilter} from 'react-icons/fi';
import Post from './Post'

const Posts = ({newPost}) => {
  const POSTS_API_ENDPOINT="https://bartosztanski.azurewebsites.net/api/v1/posts";
    const dispatch = useDispatch();
    const posts = useSelector(selectPost);
    useEffect(()=>{
      const fetchData = () =>{
        const response = axios.get(POSTS_API_ENDPOINT)
        .then((response)=>{
          //console.log(response.data)
          dispatch(addAllPost(response.data));
        });
      };
      fetchData();
    },[newPost]);
  return (
    
    <div>
      <div className='bg-white flex justify-between h-8 mt-6'>
        <div className='pl-3 font-semibold pt-1'>Posts</div>
        <div className='pr-3 flex bg-gray-200 space-x-2 hover:bg-gray-300 rounded-lg flex-row w-20 m-1 text-sm pt-1'>
          <div className='w-5 px-2'>
          <FiFilter size={18} className="mx-18"/>
          </div>
          <p>Filters</p>
        </div>
      </div>
      {posts.filter((v,i,a)=>a.findIndex(v2=>(v2.id===v.id))===i).sort((a, b) => a.time > b.time ? -1 : 1).map((post) =>
        (<Post post={post} key={post.id}/>))}
    </div>
    
  )
}

export default Posts