import Image from 'next/image'
import React from 'react'
import Comment from './Comment';
import { useState, useEffect } from 'react';
import axios from 'axios';
import AddComment from './AddComment';
import BottomOfThePage from './BottomOfThePage';
import MediaEditorExample from './RichTextEdit';
import RichTextEdit from './RichTextEdit';

const SinglePost = ({postId}) => {
    const POST_API_ENDPOINT=`${process.env.NEXT_PUBLIC_PAGE_BASEURL}api/v1/posts/${postId}`;
    const [newComment, setnewComment] = useState(false)
    const [post, setpost] = useState(null)
    useEffect(()=>{
      const fetchData = () =>{
        const response = axios.get(POST_API_ENDPOINT)
        .then((response)=>{
          setpost(response.data);
        });
      };
      fetchData();
    },[newComment]);
  return (
    <div>
      {post !=null &&(<div className='flex flex-col '>
          <div className='bg-white mt-6 rounded-md p-3'>
              <div className='flex items-center space-x-2'>
                  <img src={post.profilePic} alt="profilePic" className='rounded-full w-12 h-12 border border-gray-300'></img>
                  <div className='pl-2'>
                      <p className=' font-medium text-lg'>{post.title}</p>
                      <p className='text-xs text-gray-500'>{post.author+ "  " + post.time?.substring(0, 10)+" "+post.time?.substring(11, 16)}</p>
                    
                  </div>
                
          </div>
              {post.tags !=null &&(<div className='pl-2 pt-2 flex space-x-1'>
                          {post.tags.map((tag) =>
                          (<a href="https://www.facebook.com" key={tag} rel="noreferrer" target="_blank">
                          <div className=' px-1 bg-gray-100 text-gray-600 rounded-md border-2 text-sm hover:bg-gray-200 cursor-pointer'>{tag}
                          </div></a>
                          ))}
                  </div>)}
              <p className='pt-2 '>{post.description}</p>
          </div>
          {/*If Any Image*/}
          {post.image !=null &&(
          <div className='relative h-60 md:h-96 bg-white'>
              <Image 
              src={post.image} priority={true} alt="Foto" fill  sizes="(max-width: 768px) 100vw,
              (max-width: 1200px) 50vw,
              33vw"></Image>
          </div>)}
          {/*Content*/}
          <div>
              <div className='mt-2 mb-4 p-2 bg-white'>
                 <div className='bg-gray-100 p-2 rounded-xl '>
                  {/*Styles for post content*/}
                 <style>{`
                    .myowncss p{
                      text-indent: 50px;
                      margin-bottom: 15px;
                    }
                    .myowncss span{

                    }`}
                  </style>
                  <div className='myowncss' dangerouslySetInnerHTML={{ __html: post.content}} />
                  </div>
              </div>
          </div>
          {/*Comments*/}
          <div id="comments" className='p-2 space-y-2'>
            {post.comments?.sort((a, b) => a.time > b.time ? 1 : -1).map((comment) =>
            (<Comment comment={comment} key={comment.id}/>))}
          </div>
          {/*Add new comment*/}
          <AddComment postId={post.id} newComment={newComment} setnewComment={setnewComment}/>
          <BottomOfThePage/>
      </div>)}
    </div>
  )  
}


export default SinglePost;