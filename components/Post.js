import Image from 'next/image'
import React from 'react'
import {FiThumbsUp} from 'react-icons/fi';
import {FaRegCommentAlt} from 'react-icons/fa';
import {RiShareForwardLine} from 'react-icons/ri'; 
import Link from 'next/link';

const Post = ({post}) => {
    var datetime =post.time?.substring(0, 10)+" "+post.time?.substring(11, 16)
  return (
    <div className='flex flex-col 'key={post.id}>
        <div className='bg-white mt-6 rounded-md p-3'>
            <div className='flex items-center space-x-2'>
                <img src={post.profilePic} alt="profilePic" className='rounded-full w-12 h-12 border border-gray-300'></img>
                <div className='pl-2'>
                    <p className=' font-medium text-lg'>{post.title}</p>
                    <p className='text-xs text-gray-500'>{post.author+ "  " + datetime}</p>
                   
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
        {/*Footer*/}
        <div className='flex items-center justify-center bg-white p-2'>
            <div className='flex items-center space-x-1 hover:bg-gray-100 flex-grow justify-center p-2 px-7 rounded-xl cursor-pointer'>
                <FiThumbsUp className='h-4'/>
                <p className='text-xs sm:text-base'>Like</p>
            </div>
            <div className='flex items-center space-x-1 hover:bg-gray-100 flex-grow justify-center rounded-xl cursor-pointer'>
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
            <div className='flex items-center space-x-1 hover:bg-gray-100 flex-grow justify-center rounded-xl cursor-pointer'>
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