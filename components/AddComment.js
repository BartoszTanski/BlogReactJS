import React from 'react'
import { useRef, useState } from 'react';
import { useSession } from 'next-auth/react';
import { dialogBoxMessages} from '@/constants/dialogBoxMessages';
import DialogBox from './pageControlls/DialogBox';
import axios from 'axios';

const AddComment = ({postId, addNewComment}) => {
    const COMMENT_API_ENDPOINT=`${process.env.NEXT_PUBLIC_PAGE_BASEURL}api/v1/post/${postId}/comments`;
    const inputRef = useRef("");
    const [dialogBoxMessage, setdialogBoxMessage] = useState(null);
    const [dialogBoxOpen, setdialogBoxOpen] = useState(false);
    const {data: session} = useSession();
    const handleSubmit = (e) => {
        e.preventDefault();
        if(!inputRef.current.value) return;
        const formData = new FormData();
        formData.append("content", inputRef.current.value);
        formData.append("author", session?session.user.name:"Anonymous");
        formData.append("postId", postId);
        formData.append("profilePic", session?session.user.image:"/resources/anonimousUser.jpg");
    
        axios.post(COMMENT_API_ENDPOINT,formData,{
          headers:{
            Accept:"application/json" 
          },})
          .then((response)=>{
           
            addNewComment({
              id: response.data+"",
              author: session?session.user.name:"Anonymous",
              profilePic: session?session.user.image:"/resources/anonimousUser.jpg",
              content: inputRef.current.value,
              time: response.data
            });
            inputRef.current.value = "";
            
          })
          .catch((error)=>{
            console.log(error);
            setdialogBoxMessage(dialogBoxMessages.commentUploadFailure);
            setdialogBoxOpen(true); 
          })
      }
  return (
    <div className='flex w-full flex-col flex-grow-1'>
        
          <div className='flex flex-row py-2 pl-2 rounded-l-xl '>
            <div className='p-2'>
              <img src={session?session.user.image:"/resources/anonimousUser.jpg"} height={40}  alt="profilePic"   width={40}
              className='rounded-full border border-gray-300'>
              </img>
            </div>
           <textarea className='p-2 mr-2 resize-none h-20 w-full rounded-md' ref={inputRef} placeholder={'Write new comment as '+(session?session.user.name:"Anonymous")}></textarea>
          </div>
        <button className='m-1 rounded-md bg-gray-300 w-full hover:bg-gray-400 cursor-pointer text-gray-700' onClick={handleSubmit}>Add comment</button>
        {dialogBoxOpen &&(<DialogBox messageHead={dialogBoxMessage?.messageHead} message={dialogBoxMessage?.message} handleSucces={()=>setdialogBoxOpen(false)}/>)}
      </div>
  )
}

export default AddComment