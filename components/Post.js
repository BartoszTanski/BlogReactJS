import Image from 'next/image'
import React, { useState } from 'react'
import {FiThumbsUp} from 'react-icons/fi';
import {FaRegCommentAlt} from 'react-icons/fa';
import {RiShareForwardLine} from 'react-icons/ri'; 
import Link from 'next/link';
import axios from 'axios';

const Post = ({post}) => {
    const [liked, setLiked] = useState(false);
    const [likes, setLikes] = useState(post.likes);
    var API_ENDPOINT;
    var datetime =post.time?.substring(0, 10)+" "+post.time?.substring(11, 16)
    const LIKE_API_ENDPOINT=`${process.env.NEXT_PUBLIC_PAGE_BASEURL}api/v1/posts/${post.id}/like`;
    const UNLIKE_API_ENDPOINT=`${process.env.NEXT_PUBLIC_PAGE_BASEURL}api/v1/posts/${post.id}/unlike`;
    const handleLike = async (e) => {
        e.preventDefault();
        liked == false?API_ENDPOINT = LIKE_API_ENDPOINT:API_ENDPOINT = UNLIKE_API_ENDPOINT;

        await axios.put(API_ENDPOINT)
          .then((response)=>{
            setLiked(!liked);  
            if(liked)
            {setLikes(likes-1)}
            else
            {setLikes(likes+1)};
            console.log(response);
          })
          .catch((error)=>{
            console.log(error);
          })
      }
  return (
    <div className='flex flex-col 'key={post.id}>
        <div className='bg-white mt-6 rounded-md px-3 pl-3 pb-1 pt-2'>
            <div className='flex items-center space-x-2'>
                <img src={post.profilePic} alt="profilePic" className='rounded-full md:w-12 md:h-12 h-10 w-10 border border-gray-300'></img>
                <div className='pl-1'>
                    <p className=' font-medium text-lg'>{post.title}</p>
                    <p className='text-xs text-gray-500'>{post.author+ "  " + datetime}</p>
                   
                </div>
               
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
            <p className='md:pt-2 py-1 '>{post.description}</p>
        </div>
        {/*If Any Image*/}
        {post.image !=null &&(
        <div className='relative h-60 md:h-96 lg:h-[450px] bg-white'>
            <Image 
            src={post.image} priority={true} alt="Foto" fill  sizes="(max-width: 768px) 100vw,
            (max-width: 1200px) 50vw,
            33vw"></Image>
        </div>)}
        {/*Footer*/}
        <div className='flex items-center justify-center bg-white p-2'>
            {liked == false &&(
            <div onClick={handleLike} className='flex w-1/3 items-center space-x-1 hover:bg-gray-100 flex-grow justify-center p-2  rounded-xl cursor-pointer'>
                <p className='font-semibold px-1 text-xs'>{likes!=null&&likes!=0?likes:""}</p>
                <FiThumbsUp className='h-4'/>
                <p className='text-xs sm:text-base'>Like</p>
            </div>)}
            {liked == true &&(
            <div onClick={handleLike} className='flex w-1/3 items-center space-x-1 hover:bg-gray-100 flex-grow justify-center text-blue-400 p-2 rounded-xl cursor-pointer'>
                <p className='font-semibold px-1 text-xs'>{likes!=null&&likes!=0?likes:""}</p>
                <FiThumbsUp className='h-4'/>
                <p className='text-xs sm:text-base'>Like</p>
            </div>)}
            <div className='flex items-center space-x-1 w-1/3 hover:bg-gray-100 flex-grow justify-center rounded-xl cursor-pointer'>
                <Link href={{
                    pathname: `/posts/[postId]`,
                    query: { postId: post.id},
                    }} className='text-xs sm:text-base'>
                    <div className='flex items-center space-x-1 hover:bg-gray-100 justify-center p-2 rounded-xl cursor-pointer'>
                    <FaRegCommentAlt className='h-4'/>
                    <p className='text-xs sm:text-base'>Comment</p>
                    </div>
                </Link>
            </div >
            <div className='flex items-center space-x-1 w-1/3 hover:bg-gray-100 flex-grow justify-center rounded-xl cursor-pointer'>
            <Link href={{
                    pathname: '/posts/[postId]',
                    query: { postId: post.id},
                    }} className='text-xs sm:text-base'>
                < div className='flex items-center space-x-1 hover:bg-gray-100 flex-grow justify-center p-2 rounded-xl cursor-pointer'>
                    <RiShareForwardLine className='h-4'/>
                    Read More
                </div>
            </Link>
            </div>
        </div>
    </div>
  )
}

export default Post;