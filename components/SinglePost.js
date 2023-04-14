import Image from 'next/image'
import React from 'react'
import Comment from './Comment';
import { useState, useEffect } from 'react';
import axios from 'axios';
import AddComment from './AddComment';
import BottomOfThePage from './BottomOfThePage';
import Link from 'next/link';
import DropDownMenuPost from './DropDownMenuPost';

const SinglePost = ({postId}) => {
    const POST_API_ENDPOINT=`${process.env.NEXT_PUBLIC_PAGE_BASEURL}api/v1/posts/${postId}`;
    const [newComment, setnewComment] = useState(false)
    const [post, setpost] = useState(null)
    useEffect(()=>{
      const fetchData = () =>{
        const response = axios.get(POST_API_ENDPOINT)
        .then((response)=>{
          setpost(response.data);
        }).catch((error)=>{
          console.log(error);
          alert("Couldn't retrive this post data");
        });
      };
      fetchData();
    },[newComment]);
  return (
    <div>
      {post !=null &&(<div className='flex flex-col '>
          <div className='bg-white mt-6 rounded-md p-3'>
              <div className='flex items-center justify-between space-x-2'>
                  <div className='flex'>
                    <img src={post.profilePic} alt="profilePic" className='rounded-full w-12 h-12 border border-gray-300'></img>
                    <div className='pl-2'>
                        <p className=' font-medium text-lg'>{post.title}</p>
                        <p className='text-xs text-gray-500'>{post.author+ "  " + post.time?.substring(0, 10)+" "+post.time?.substring(11, 16)}</p>
                    </div>
                  </div>
                  <DropDownMenuPost postId={postId}/>
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
                      text-indent: 30px;
                      margin-bottom: 15px;
                    }
                    .myowncss ul {
                      margin: 20px;
                      text-indent: 0px;
                      list-style-type: square;
                      padding: 0
                    }
                    .myowncss h1{
                      text-indent: 20px;
                      font-size:26px;
                      text-align:center;
                    }
                    .myowncss h2{
                      font-size:20px;
                      font-weight:600;
                    }
                    .myowncssSM p{
                      text-indent: 12px;
                      margin-bottom: 5px;
                      font-size:15px;
                    }
                    .myowncssSM ul {
                      margin: 10px;
                      text-indent: 0px;
                      list-style-type: square;
                      padding: 0
                    }
                    .myowncssSM h1{
                      text-indent:20px;
                      font-size:20px;
                      text-align:center;
                    }
                    .myowncssSM h2{
                      font-size:18px;
                      font-weight:600;
                    }
                    .myowncssSM span{
                      font-size:24px;
                      font-weight:600;
                    }`}
                  </style>
                  <div className='md:myowncss myowncssSM' dangerouslySetInnerHTML={{ __html: post.content}} />
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