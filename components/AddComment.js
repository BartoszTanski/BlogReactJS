import React from 'react'
import { useRef } from 'react';
import { useSession } from 'next-auth/react';
import axios from 'axios';

const AddComment = ({postId, newComment, setnewComment}) => {
    const COMMENT_API_ENDPOINT=`${process.env.NEXT_PUBLIC_PAGE_BASEURL}api/v1/post/${postId}/comments`;
    const inputRef = useRef("");
    const {data: session} = useSession();
    const handleSubmit = (e) => {
        e.preventDefault();
        if(!inputRef.current.value) return;
        const formData = new FormData();
        formData.append("content", inputRef.current.value);
        formData.append("author", session?session.user.name:"Anonymous");
        formData.append("postId", postId);
        formData.append("profilePic", session?session.user.image:"/anonimousUser.jpg");
    
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
              <img src={session?session.user.image:"/anonimousUser.jpg"} height={40}  alt="profilePic"   width={40}
              className='rounded-full border border-gray-300'>
              </img>
            </div>
           <textarea className='p-2 mr-2 resize-none h-20 w-full rounded-md' ref={inputRef} placeholder={'Write new comment as '+(session?session.user.name:"Anonymous")}></textarea>
          </div>
        <button className='m-1 rounded-md bg-gray-300 w-full hover:bg-gray-400 cursor-pointer text-gray-700' onClick={handleSubmit}>Add comment</button>
      </div>
  )
}

export default AddComment