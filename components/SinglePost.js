import Image from 'next/image'
import React from 'react'
import Comment from './Comment';
import { useState, useEffect } from 'react';
import axios from 'axios';
import AddComment from './AddComment';
import BottomOfThePage from './BottomOfThePage';
import Link from 'next/link';
import DropDownMenuPost from './DropDownMenuPost';
import DialogBox from './DialogBox';
import ContentNotLoading from './ContentNotLoading';
import LoadingCircle from './LoadingCircle';
import styles from '../cssModules/content.module.css';
import { dialogBoxMessages } from '@/constants/dialogBoxMessages';

const SinglePost = ({postId,postIndex}) => {
    {/*Dialog box states*/}  
    const [dialogBoxMessage, setdialogBoxMessage] = useState(null);
    const [dialogBoxOpen, setdialogBoxOpen] = useState(false);
    const [fetchFailure, setfetchFailure] = useState(false)
    const [loading, setloading] = useState(false)

    const VIDEO_API_ENDPOINT=`${process.env.NEXT_PUBLIC_PAGE_BASEURL}api/v1/video/stream/`;
    const POST_API_ENDPOINT=`${process.env.NEXT_PUBLIC_PAGE_BASEURL}api/v1/posts/${postId}`;
    const [post, setpost] = useState(null);
    const [comments, setComments] = useState(null);
    const addNewComment = (newComment) => {
      if (comments?.length>0){
      setComments([...comments, newComment]);
      }
      else setComments([newComment]);
    }
    const fetchData = async () =>{
      setloading(true)
      await axios.get(POST_API_ENDPOINT)
      .then((response)=>{
        setpost(response.data);
        setComments(response.data.comments);
        if(fetchFailure) {setfetchFailure(false);}
        setloading(false)
      }).catch((error)=>{
        console.log(error);
        setloading(false);
        setdialogBoxMessage(dialogBoxMessages.postFetchFailure);
        setdialogBoxOpen(true);
        setfetchFailure(true);
      });
    };
    useEffect(()=>{
      if (post==null)
        fetchData();
    },[]);

  return (
    <div className=''>
      {post !=null &&(<div className='flex flex-col '>
          <div className='bg-white mt-6 rounded-md p-3'>
              <div className='flex items-center justify-between space-x-2'>
                  <div className='flex'>
                    {/*<img src={post.profilePic} alt="profilePic" className='rounded-full w-12 h-12 border border-gray-300'></img>*/}
                    <div className='pl-2'>
                        <p className=' font-medium text-xl'>{post.title}</p>
                        <p className='text-xs text-gray-500'>{post.author+ "  " + post.time?.substring(0, 10)+" "+post.time?.substring(11, 16)}</p>
                    </div>
                  </div>
                  <DropDownMenuPost postId={postId} authorEmail={post.email} postVideoId={post.video}/>
              </div>
          {post.tags !=null &&(<div className='pl-2 pt-2 flex space-x-1'>
                         {post.tags.map((tag) =>
                         (   <Link key={tag} href={{
                                pathname: `/posts/tag/[tagId]`,
                                query: { tagId: tag},
                                }} className='text-xs sm:text-base'>
                                <div className=' px-1 bg-gray-100 text-gray-600 rounded-md border-2 text-sm hover:bg-gray-200 cursor-pointer'>{tag}
                                </div>
                            </Link>
                         ))}
                </div>)}
              <p className='pt-2 '>{post.description}</p>
          </div>
          {/*If Any Image*/}
          {post.image !=null &&(
          <div className='relative h-60 md:h-96 bg-white'>
              <Image 
              src={post.image} alt="Foto" fill="true"  sizes="(max-width: 768px) 100vw,
              (max-width: 1200px) 50vw,
              33vw">
              </Image>
          </div>)}
          {/*If Any Video*/}
          {post?.video!=null &&post.video!="null" &&(
          <div className='relative {/*h-60 lg:h-72*/} pt-6  mb-2 bg-white'>
              <video  alt="Video" sizes="(max-width: 768px) 100vw,
                (max-width: 1200px) 50vw,
                33vw" controls>
                <source src={VIDEO_API_ENDPOINT+post.video}></source>
              </video>
          </div>)}
          {/*Content*/}
          <div className='md:pt-3 bg-white'>
              <div className='md:mt-2 mb-4 p-2 bg-white'>
                 <div className='px-3'>                   
                  <div className={styles.myowncss} dangerouslySetInnerHTML={{ __html: post.content}} />
                  </div>
              </div>
          </div>
          {/*Comments*/}
          <div id="comments" className='p-2 space-y-2'>
            {comments?.sort((a, b) => a.time > b.time ? 1 : -1).map((comment) =>
            (<Comment comment={comment} key={comment.id}/>))}
          </div>
          {/*Add new comment*/}
          <AddComment postId={post.id} addNewComment={addNewComment}/>
          <BottomOfThePage/>
      </div>)}
      {/*Dialog Boxes*/}
        {dialogBoxOpen &&(<DialogBox messageHead={dialogBoxMessage?.messageHead} message={dialogBoxMessage?.message} handleSucces={()=>setdialogBoxOpen(false)}/>)}
      {loading&&(<LoadingCircle className="text-center  py-20 m-auto"/>)}
      {fetchFailure&&(<ContentNotLoading reload = {()=>fetchData()}/>)}
    </div>
  )  
}


export default SinglePost;