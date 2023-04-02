import React from 'react'
import { useRef } from 'react';
import { useSession } from 'next-auth/react';
import axios from 'axios';
import Image from 'next/image';

const AddComment = ({postId, newComment, setnewComment}) => {
    const COMMENT_API_ENDPOINT=`http://localhost:8080/api/v1/post/${postId}/comments`;
    const inputRef = useRef("");
    const {data: session} = useSession();
    const handleSubmit = (e) => {
        e.preventDefault();
        if(!inputRef.current.value) return;
        const formData = new FormData();
        formData.append("content", inputRef.current.value);
        formData.append("author", session?.user.name);
        formData.append("postId", postId);
        formData.append("profilePic", session?.user.image);
    
        axios.post(COMMENT_API_ENDPOINT,formData,{
          headers:{
            Accept:"application/json" 
          },})
          .then((response)=>{
            inputRef.current.value = "";
            setnewComment(!newComment);
          })
          .catch((error)=>{
            console.log(error);
          })
      }
  return (
    <div className='flex w-full flex-col flex-grow-1'>
        
          <div className='flex flex-row py-2 pl-2 rounded-l-xl '>
            <div className='p-2'>
              <Image src={session?.user.image} height={40}  alt="profilePic"   width={40}
              className='rounded-full border border-gray-300'>
              </Image>
            </div>
           <textarea className='p-2 mr-2 resize-none h-20 w-full rounded-md' ref={inputRef} placeholder='Write new comment'></textarea>
          </div>
        <button className='m-1 rounded-md bg-gray-300 w-full hover:bg-gray-400 cursor-pointer text-gray-700' onClick={handleSubmit}>Add comment</button>
      </div>
  )
}

export default AddComment